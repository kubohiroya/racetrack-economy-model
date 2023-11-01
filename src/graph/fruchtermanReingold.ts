import { Node } from "@/graph/node";
import { Route } from "@/graph/route";

export function fruchtermanReingold1(
  iterations: number,
  nodes: Node[],
  edges: Route[],
  width: number,
  height: number,
): Node[] {
  const c = 1;
  const k = c * Math.sqrt((width * height) / nodes.length);
  let temperature = Math.max(width, height) / 10.0;

  for (let itr = 0; itr < iterations; itr++) {
    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];
      nodeA.dx = 0;
      nodeA.dy = 0;
      for (let j = 0; j < nodes.length; j++) {
        if (i == j) continue;
        const nodeB = nodes[j];
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = (k * k) / distance;
        nodeA.dx += (dx / distance) * force;
        nodeA.dy += (dy / distance) * force;
      }
    }

    //console.log(nodes[0].vx, nodes[0].vy)

    for (const edge of edges) {
      const nodeA = nodes[edge.start];
      const nodeB = nodes[edge.end];
      const dx = nodeB.x - nodeA.x;
      const dy = nodeB.y - nodeA.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const fr = (distance * distance) / k;
      nodeA.dx -= (dx / distance) * fr;
      nodeA.dy -= (dy / distance) * fr;
      nodeB.dx += (dx / distance) * fr;
      nodeB.dy += (dy / distance) * fr;
      //console.log(temperature, displacement)
    }

    for (const node of nodes) {
      const displacement = Math.sqrt(node.dx * node.dx + node.dy * node.dy);
      const ratio = Math.min(displacement, temperature) / displacement;
      //const ratio = 1;
      node.x += node.dx * ratio;
      node.y += node.dy * ratio;
      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));
    }

    //temperature -= dt;
    temperature *= 0.95;
  }

  // 温度を徐々に下げて局所最適解に収束させる
  return nodes;
}

export function fruchtermanReingold2(
  iterations: number,
  nodes: Node[],
  edges: Route[],
  width: number,
  height: number,
): Node[] {
  const k = Math.sqrt((width * height) / nodes.length);
  let temperature = Math.max(width, height) / 10;

  for (let i = 0; i < iterations; i++) {
    // 各ノードについて、他のノードとの斥力と引力を計算

    for (const node of nodes) {
      node.dx = 0;
      node.dy = 0;

      for (const otherNode of nodes) {
        if (node !== otherNode) {
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = (k * k) / distance;

          node.dx += (dx / distance) * force;
          node.dy += (dy / distance) * force;
        }
      }
    }

    // ノード同士の重なりを避けるための斥力を計算
    for (const edge of edges) {
      const start = nodes[edge.start];
      const end = nodes[edge.end];
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = (distance * distance) / k;

      start.dx = start.dx - (dx / distance) * force;
      start.dy = start.dy - (dy / distance) * force;
      end.dx = end.dx + (dx / distance) * force;
      end.dy = end.dy + (dy / distance) * force;
    }

    // ノードの位置を更新
    for (const node of nodes) {
      const displacement = Math.sqrt(node.dx * node.dx + node.dy * node.dy);
      const ratio = Math.min(displacement, temperature) / displacement;

      node.x += node.dx * ratio;
      node.y += node.dy * ratio;

      // ノードが画面外に出ないように制約を追加することもできます
      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));
    }

    // 温度を徐々に下げて局所最適解に収束させる
    temperature *= 0.95;
  }

  return nodes;
}

export function fruchtermanReingold3(
  nodes: Node[],
  adjacencyMatrix: number[][],
  width: number,
  height: number,
): Node[] {
  const base = Math.min(width, height);
  const k = Math.sqrt((width * height) / nodes.length);

  // Update node positions based on forces
  for (const regionA of nodes) {
    for (const regionB of nodes) {
      if (regionA.id === regionB.id) continue;
      const nodeA = nodes[regionA.id];
      const nodeB = nodes[regionB.id];
      if (!nodeA || !nodeB || !adjacencyMatrix[regionA.id]) continue;
      const dx = nodeB.x - nodeA.x;
      const dy = nodeB.y - nodeA.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const adjDistance = adjacencyMatrix[regionA.id][regionB.id];

      const isEdgeExist =
        0 < adjDistance && adjDistance < Number.POSITIVE_INFINITY;

      // const force = ((isEdgeExist? 0.1: 0.05) * (distance - base)) / distance ** 2;

      const fa = ((isEdgeExist ? 1 : 0) * (k * k)) / distance;
      const fr = k / distance ** 2;
      const f = (fr - fa) * 0.0001;

      nodeA.dx += dx * f;
      nodeA.dy += dy * f;
      nodeB.dx -= dx * f;
      nodeB.dy -= dy * f;
    }
  }

  for (const region of nodes) {
    const node = nodes[region.id];
    if (!node) continue;
    node.x += node.dx;
    node.y += node.dy;
    node.dx *= 0.99; // damping
    node.dy *= 0.99; // damping

    node.x = 10 + Math.max(10, Math.min(width - 20, node.x));
    node.y = 10 + Math.max(10, Math.min(height - 20, node.y));
  }

  return nodes;
}

export class FruchtermanReingoldLayout {
  // ... (他のメンバ変数とコンストラクタの部分は変更なし)

  private temperature: number = 100; // 温度をインスタンス変数として設定

  tick(
    nodes: Node[],
    adjacencyMatrix: number[][],
    width: number,
    height: number,
  ): Node[] {
    const displacement = 20; // ノードの移動量
    const temperature = 100; // 温度

    // 各ノードについて、他のノードとの斥力と引力を計算
    for (let i = 0; i < nodes.length; i++) {
      let totalDisplacementX = 0;
      let totalDisplacementY = 0;

      for (let j = 0; j < nodes.length; j++) {
        if (i !== j) {
          const repulsionForce = this.calculateRepulsion(nodes[i], nodes[j]);
          totalDisplacementX += repulsionForce.dx;
          totalDisplacementY += repulsionForce.dy;
        }
      }

      for (let j = 0; j < nodes.length; j++) {
        if (
          0 < adjacencyMatrix[i][j] &&
          adjacencyMatrix[i][j] < Number.POSITIVE_INFINITY
        ) {
          const attractionForce = this.calculateAttraction(nodes[i], nodes[j]);
          totalDisplacementX += attractionForce.dx;
          totalDisplacementY += attractionForce.dy;
        }
      }

      const totalDisplacementMagnitude = Math.sqrt(
        totalDisplacementX * totalDisplacementX +
          totalDisplacementY * totalDisplacementY,
      );
      const ratio =
        Math.min(displacement, totalDisplacementMagnitude) /
        totalDisplacementMagnitude;

      nodes[i].x += totalDisplacementX * ratio;
      nodes[i].y += totalDisplacementY * ratio;
    }

    // 温度を徐々に下げて局所最適解に収束
    if (this.temperature > 1) {
      this.temperature -= 1;
    }
    return nodes;
  }

  private calculateRepulsion(
    node1: { x: number; y: number },
    node2: { x: number; y: number },
  ): { dx: number; dy: number } {
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // リーマン-シュワルツの力学モデルの定数を適切に設定
    const repulsionForce = (this.temperature * this.temperature) / distance; // 温度に応じて変化させる

    return {
      dx: (dx / distance) * repulsionForce,
      dy: (dy / distance) * repulsionForce,
    };
  }

  private calculateAttraction(
    node1: { x: number; y: number },
    node2: { x: number; y: number },
  ): { dx: number; dy: number } {
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const force = (distance * distance) / 100; // リーマン-シュワルツの力学モデル

    return {
      dx: (dx / distance) * force,
      dy: (dy / distance) * force,
    };
  }
}
