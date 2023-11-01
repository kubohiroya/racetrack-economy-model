import { Node } from "@/graph/node";
import { Route } from "@/graph/route";
import { createRandomNode } from "@/graph/createRandomNode";
import { random } from "@/model/random";

export function generateRandomGraph(
  topLeft: DOMPoint,
  bottomRight: DOMPoint,
  existingNodes: Node[] = [],
  existingRoutes: Route[] = [],
  desiredNumRegions: number,
  desiredNumRoutes: number,
  candidateNumRegions: number,
): { nodes: Node[]; routes: Route[] } {
  // 既存の都市と交通経路の一部を保持し、不要な部分を削除
  const nodes: Node[] = existingNodes.slice(0, desiredNumRegions);
  const routes: Route[] = existingRoutes.filter(
    (edge) => edge.start < desiredNumRegions && edge.end < desiredNumRegions,
  );

  // 削除された都市を端点とする交通経路を削除
  routes.forEach((edge, index) => {
    if (edge.start >= desiredNumRegions || edge.end >= desiredNumRegions) {
      routes.splice(index, 1);
    }
  });

  for (let i = 0; i < desiredNumRegions; i++) {
    const node = createRandomNode(
      nodes.length,
      topLeft,
      bottomRight,
      i == 0 ? null : nodes[i - 1],
    );
    nodes.push(node);
  }

  // 不足している交通経路を追加して補完
  let attempts = 0; // 試行回数をカウント
  while (
    routes.length < desiredNumRoutes &&
    attempts < desiredNumRegions * candidateNumRegions
  ) {
    const startIndex = Math.floor(random() * desiredNumRegions);
    let endIndex = Math.floor(random() * desiredNumRegions);

    // 同じ都市を結ぶ経路や既存の経路と重複する経路を避ける
    const isDuplicate = routes.some(
      (route) =>
        (route.start === startIndex && route.end === endIndex) ||
        (route.start === endIndex && route.end === startIndex),
    );

    // 新しい経路を追加
    if (!isDuplicate && startIndex !== endIndex) {
      routes.push({ start: startIndex, end: endIndex });
    }

    attempts++; // 試行回数をインクリメント
  }

  return { nodes, routes };
}
