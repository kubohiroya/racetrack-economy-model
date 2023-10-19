const BLOCK_SIZE = 16;

const floydWarshallShaderCode = `
struct Distances {
    data: array<f32>
};

@group(0) @binding(0) var<storage, read> adjMatrix: Distances;
@group(0) @binding(1) var<storage, read_write> distances: Distances;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>, @builtin(num_workgroups) num_groups: vec3<u32>) {
    let totalSize = num_groups.x * ${BLOCK_SIZE};

    let bxi = global_id.x * ${BLOCK_SIZE};
    let byj = global_id.y * ${BLOCK_SIZE};
    let bz = global_id.z;

    for (var k = 0u; k < ${BLOCK_SIZE}; k++) {
        for (var i = 0u; i < ${BLOCK_SIZE} && bxi + i < totalSize; i++) {
            for (var j = 0u; j < ${BLOCK_SIZE} && byj + j < totalSize; j++) {
                let ik = (bxi + i) * totalSize + byj + k + bz * ${BLOCK_SIZE};
                let kj = (bxi + k + bz * ${BLOCK_SIZE}) * totalSize + byj + j;
                let ij = (bxi + i) * totalSize + byj + j;

                let ikj = adjMatrix.data[ik] + adjMatrix.data[kj];
                if (ikj < adjMatrix.data[ij]) {
                    distances.data[ij] = ikj;
                }
            }
        }
    }
}
`;

export class FloydWarshallGPU {
  // matrixSize: number;

  device: GPUDevice | undefined;
  pipeline: GPUComputePipeline | undefined;

  bindGroup: GPUBindGroup | undefined;
  bindGroupLayout: GPUBindGroupLayout | undefined;

  constructor() {}

  async computeShortestPaths(
    matrix: number[][],
    matrixSize: number,
  ): Promise<number[][][]> {
    const f32matrix: Float32Array = new Float32Array(matrixSize * matrixSize);
    matrix.forEach((row, index) => {
      f32matrix.set(row, index * matrixSize);
    });
    const [f32results, predecessor] = await this.computeShortestPathsF32(
      f32matrix,
      matrixSize,
    );
    const results0 = new Array(matrixSize);
    for (let i = 0; i < matrixSize; i++) {
      results0[i] = Array.of(
        f32results.slice(i * matrixSize, i * matrixSize + matrixSize - 1),
      );
    }
    const results1 = new Array(matrixSize);
    for (let i = 0; i < matrixSize; i++) {
      results1[i] = Array.of(
        predecessor.slice(i * matrixSize, i * matrixSize + matrixSize - 1),
      );
    }
    return [results0, results1];
  }

  async computeShortestPathsF32(
    f32matrix: Float32Array,
    matrixSize: number,
  ): Promise<[Float32Array, Int32Array]> {
    await this.initialize();
    if (!this.device || !this.pipeline || !this.bindGroupLayout)
      throw new Error(
        `WebGPU is not available device=${!!this.device}, pipeline=${
          this.pipeline
        } bindGroupLayout=${!!this.bindGroupLayout}`,
      );

    const size = matrixSize * matrixSize * 4;
    const computeBuffer = this.device.createBuffer({
      size,
      usage:
        GPUBufferUsage.STORAGE |
        GPUBufferUsage.COPY_DST |
        GPUBufferUsage.COPY_SRC,
      mappedAtCreation: true,
    });
    const readBuffer0 = this.device.createBuffer({
      size,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
      mappedAtCreation: true,
    });

    const readBuffer1 = this.device.createBuffer({
      size,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
      mappedAtCreation: true,
    });

    const commandEncoder = this.device.createCommandEncoder();
    commandEncoder.copyBufferToBuffer(computeBuffer, 0, readBuffer0, 0, size);
    commandEncoder.copyBufferToBuffer(computeBuffer, 0, readBuffer1, 1, size);

    const commandBuffer = commandEncoder.finish();
    this.device.queue.submit([commandBuffer]);

    await readBuffer0.mapAsync(GPUMapMode.READ);
    const arrayBuffer0 = readBuffer0.getMappedRange();

    new Float32Array(readBuffer0.getMappedRange()).set(f32matrix);
    readBuffer0.unmap();

    await readBuffer1.mapAsync(GPUMapMode.READ);
    const arrayBuffer1 = readBuffer1.getMappedRange();

    new Int32Array(readBuffer1.getMappedRange()).fill(0);
    readBuffer1.unmap();

    this.bindGroup = this.device.createBindGroup({
      layout: this.bindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: {
            buffer: computeBuffer,
          },
        },
      ],
    });

    const numBlocks = Math.ceil(matrixSize / BLOCK_SIZE);
    // 通常のブロックを処理
    this.dispatchShader(numBlocks, numBlocks, matrixSize);

    // 境界ブロックの処理
    const boundaryBlocks = matrixSize % BLOCK_SIZE;
    if (boundaryBlocks) {
      this.dispatchShader(numBlocks, boundaryBlocks, matrixSize);
      this.dispatchShader(boundaryBlocks, numBlocks, matrixSize);
      this.dispatchShader(boundaryBlocks, boundaryBlocks, matrixSize);
    }

    // 結果の取得と返却
    const results0 = new Float32Array(matrixSize * matrixSize);
    await readBuffer0.mapAsync(GPUMapMode.READ);
    results0.set(new Float32Array(readBuffer0.getMappedRange()));
    readBuffer0.unmap();

    const results1 = new Int32Array(matrixSize * matrixSize);
    await readBuffer1.mapAsync(GPUMapMode.READ);
    results1.set(new Float32Array(readBuffer1.getMappedRange()));
    readBuffer1.unmap();

    return [results0, results1];
  }

  private async initialize() {
    const adapter: GPUAdapter | null = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error("GPU is not available");
    }
    if (!this.device) {
      this.device = await adapter.requestDevice();

      this.bindGroupLayout = this.device.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
              type: "storage",
            },
          },
        ],
      });

      this.pipeline = this.device.createComputePipeline({
        layout: this.device.createPipelineLayout({
          bindGroupLayouts: [this.bindGroupLayout],
        }),
        compute: {
          module: this.device.createShaderModule({
            code: floydWarshallShaderCode,
          }),
          entryPoint: "main",
        },
      });
    }
  }

  private dispatchShader(x: number, y: number, z: number): void {
    if (
      !this.device ||
      !this.pipeline ||
      !this.bindGroupLayout ||
      !this.bindGroup
    )
      throw new Error("WebGPU is not available");

    const commandEncoder = this.device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(this.pipeline);
    passEncoder.setBindGroup(0, this.bindGroup);
    passEncoder.dispatchWorkgroups(x, y, z);
    passEncoder.end();

    const commandBuffer = commandEncoder.finish();
    this.device.queue.submit([commandBuffer]);
  }
}
