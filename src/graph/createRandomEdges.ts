import { random } from "@/model/random";
import { Region } from "@/model/region";
import { Node } from "@/graph/node";

export function createRandomEdges(
  regions: Region[],
  nodes: Node[],
  adjacencyMatrix: number[][],
  numAddingEdges: number,
) {
  const numNodes = regions.length;

  let candidates = [] as number[][];

  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      const distance = adjacencyMatrix[i][j];
      if (distance == Number.POSITIVE_INFINITY) {
        const distance = Math.sqrt(
          (nodes[i].x - nodes[1].x) ** 2 + (nodes[0].y - nodes[1].y) ** 2,
        );
        candidates.push([i, j, distance]);
      }
    }
  }

  candidates.sort((a, b) => b[2] - a[2]);

  if (candidates.length == 0) return;

  for (
    let i = 0;
    i < numAddingEdges && numAddingEdges < candidates.length;
    i++
  ) {
    const index = Math.floor(Math.sqrt(random()) * candidates.length);
    const c = candidates[i];
    candidates[i] = candidates[index];
    candidates[index] = c;
  }

  //const numRequiredEdges = numNodes * (numNodes - 1) / 2 - candidates.length;

  for (let i = 0; i < numAddingEdges; i++) {
    const selected = candidates[i];

    const y = selected[0];
    const x = selected[1];
    const distance = Math.sqrt(selected[2]);
    adjacencyMatrix[y][x] = distance;
    adjacencyMatrix[x][y] = distance;
    i++;
  }
}

export function createEdgesBetweenSelectedNodes(
  sourceNode: Node,
  addedNode: Node,
  adjacencyMatrix: number[][],
): number[][] {
  const distance = Math.sqrt(
    (sourceNode.x - addedNode.x) ** 2 + (sourceNode.y - addedNode.y) ** 2,
  );
  adjacencyMatrix[sourceNode.id][addedNode.id] = distance;
  adjacencyMatrix[addedNode.id][sourceNode.id] = distance;
  return adjacencyMatrix;
}

export function removeEdgesBetweenSelectedNodes(
  sourceNode: Node,
  addedNode: Node,
  adjacencyMatrix: number[][],
): number[][] {
  adjacencyMatrix[sourceNode.id][addedNode.id] = Number.POSITIVE_INFINITY;
  adjacencyMatrix[addedNode.id][sourceNode.id] = Number.POSITIVE_INFINITY;
  return adjacencyMatrix;
}
