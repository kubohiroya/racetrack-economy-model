import { RegionView } from "@/graph/regionView";
import { Route } from "@/graph/route";

export function generateTrafficRoutes(
  width: number,
  height: number,
  existingCities: RegionView[] = [],
  existingRoutes: Route[] = [],
  desiredRegionCount: number,
  desiredRouteCount: number,
  candidateRegionCount: number,
): { cities: RegionView[]; routes: Route[] } {
  // 既存の都市数と交通経路数
  const existingRegionCount = existingCities.length;
  const existingRouteCount = existingRoutes.length;

  // 既存の都市と交通経路の一部を保持し、不要な部分を削除
  const cities: RegionView[] = existingCities.slice(0, desiredRegionCount);
  const routes: Route[] = existingRoutes.filter(
    (edge) => edge.start < desiredRegionCount && edge.end < desiredRegionCount,
  );

  // 削除された都市を端点とする交通経路を削除
  routes.forEach((edge, index) => {
    if (edge.start >= desiredRegionCount || edge.end >= desiredRegionCount) {
      routes.splice(index, 1);
    }
  });

  // 不足している交通経路を追加して補完
  let attempts = 0; // 試行回数をカウント
  while (routes.length < desiredRouteCount && attempts < desiredRegionCount * candidateRegionCount) {
    const startIndex = Math.floor(Math.random() * desiredRegionCount);
    let endIndex = Math.floor(Math.random() * desiredRegionCount);

    // 同じ都市を結ぶ経路や既存の経路と重複する経路を避ける
    const isDuplicate = routes.some(
      route =>
        (route.start === startIndex && route.end === endIndex) ||
        (route.start === endIndex && route.end === startIndex)
    );

    // 新しい経路を追加
    if (!isDuplicate && startIndex !== endIndex) {
      routes.push({ start: startIndex, end: endIndex });
    }

    attempts++; // 試行回数をインクリメント
  }

  // 新しい都市と経路を生成し、返す
  while (cities.length < desiredRegionCount) {
    const newRegion: RegionView = new RegionView(
      existingRegionCount + cities.length,
      Math.random() * width,
      Math.random() * height,
    );
    cities.push(newRegion);
  }

  return { cities, routes };
}

function createAdjacencyMatrix(numCities: number, edges: Route[]): boolean[][] {
  // 都市間の接続情報を初期化し、すべての要素を false で埋める
  const connections: boolean[][] = Array.from({ length: numCities }, () =>
    Array.from({ length: numCities }, () => false),
  );

  // エッジ情報から接続情報を設定
  for (const edge of edges) {
    const { start, end } = edge;
    connections[start][end] = true;
    connections[end][start] = true; // 無向グラフの場合、逆向きも接続として設定
  }

  return connections;
}

// ユークリッド距離を計算する関数
function euclideanDistance(p1: RegionView, p2: RegionView): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
