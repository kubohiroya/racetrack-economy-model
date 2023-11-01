import { Node } from "@/graph/node";
import { Timer } from "@/model/timer";
import { GraphModel } from "@/graph/graphModel";

export abstract class GraphLayout {
  protected temperature: number = 0;

  protected model: GraphModel;
  protected nodes: Node[];
  protected width: number;
  protected height: number;

  protected minimumVelocityThreshold = 0.014;
  protected minimumVelocity = Number.POSITIVE_INFINITY;

  constructor(model: GraphModel, nodes: Node[], width: number, height: number) {
    this.model = model;
    this.nodes = nodes;
    this.width = width;
    this.height = height;

    this.reset();

    this.model.addNumRegionsChangedListener(() => {
      this.reset();
    });

    Timer.getLayoutTimer().addTimeEventListener(() => {
      this.tick();
    });
    Timer.getLayoutTimer().start();
  }

  reset(): void {
    this.minimumVelocity = Number.POSITIVE_INFINITY;
  }

  abstract calculateRepulsion(
    temperature: number,
    node1: { x: number; y: number },
    node2: { x: number; y: number },
  ): { dx: number; dy: number };

  abstract calculateAttraction(
    temperature: number,
    node1: { x: number; y: number },
    node2: { x: number; y: number },
  ): { dx: number; dy: number };

  calculateFrictionalForce(node: { x: number; y: number }) {
    const m = 0.1; // 比例定数 < 1
    return { dx: -m * node.x, dy: -m * node.y }; // 摩擦力は速度の逆向きに比例
  }

  calculateDistance(
    node1: { x: number; y: number },
    node2: { x: number; y: number },
  ) {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  tick() {
    if (this.minimumVelocity < this.minimumVelocityThreshold) {
      return;
    }

    const displacement = 1; // ノードの移動量

    // 各ノードについて、他のノードとの斥力と引力を計算
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.model?.focusedRegionIds.includes(i)) {
        continue;
      }

      let totalDisplacementX = 0;
      let totalDisplacementY = 0;

      for (let j = 0; j < this.nodes.length; j++) {
        if (i !== j) {
          const repulsionForce = this.calculateRepulsion(
            this.temperature,
            this.nodes[i],
            this.nodes[j],
          );
          totalDisplacementX += repulsionForce.dx;
          totalDisplacementY += repulsionForce.dy;
        }
      }

      const m = this.model?.country.matrices.adjacencyMatrix;
      for (let j = 0; j < this.nodes.length; j++) {
        if (
          m &&
          m.length &&
          m[i] &&
          0 < m[i].length &&
          0 < m[i][j] &&
          m[i][j] < Number.POSITIVE_INFINITY
        ) {
          m[i][j] = this.calculateDistance(this.nodes[i], this.nodes[j]);
          const attractionForce = this.calculateAttraction(
            this.temperature,
            this.nodes[i],
            this.nodes[j],
          );
          totalDisplacementX += attractionForce.dx;
          totalDisplacementY += attractionForce.dy;
        }
      }

      const ff = this.calculateFrictionalForce({
        x: totalDisplacementX,
        y: totalDisplacementY,
      });
      totalDisplacementX += ff.dx;
      totalDisplacementY += ff.dy;

      this.nodes[i].x += totalDisplacementX;
      this.nodes[i].y += totalDisplacementY;
      this.minimumVelocity = Math.min(
        Math.max(Math.abs(totalDisplacementX), Math.abs(totalDisplacementY)),
        this.minimumVelocity,
      );
    }

    // 温度を徐々に下げて局所最適解に収束
    this.decreaseTemperature();

    if (this.minimumVelocity < this.minimumVelocityThreshold) {
      this.temperature = 0;
      this.model.notifyGraphUpdate();
    }
  }

  abstract decreaseTemperature(): void;
}
