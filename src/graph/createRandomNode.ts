import { random } from "@/model/random";

function createRandomXY(
  topLeft: DOMPoint,
  bottomRight: DOMPoint,
  node: { x: number; y: number } | null,
): { x: number; y: number } {
  // ランダムな角度を生成 (0から2πの範囲で)
  const w = bottomRight.x - topLeft.x;
  const h = bottomRight.y - topLeft.y;
  const t = topLeft.y + h * 0.1;
  const l = topLeft.x + w * 0.1;
  return { x: l + random() * w * 0.8, y: t + random() * h * 0.8 };
}

function createRandomXY2(
  topLeft: DOMPoint,
  bottomRight: DOMPoint,
  node: { x: number; y: number } | null,
): { x: number; y: number } {
  const ellipseCenterX = (topLeft.x + bottomRight.x) / 2;
  const ellipseCenterY = (topLeft.y + bottomRight.y) / 2;

  const k = 0.8;
  // 楕円の長軸と短軸
  const ellipseMajorAxis = node
    ? node.x
    : ((bottomRight.x - topLeft.x) / 2) * k;
  const ellipseMinorAxis = node
    ? node.y
    : ((bottomRight.y - topLeft.y) / 2) * k;

  // ランダムな角度を生成 (0から2πの範囲で)
  const randomAngle = random() * 2 * Math.PI;

  const factor = Math.sqrt(Math.sqrt(random()));

  // ランダムな楕円上の座標を計算
  const randomX =
    ellipseCenterX + factor * ellipseMajorAxis * Math.cos(randomAngle);
  const randomY =
    ellipseCenterY + factor * ellipseMinorAxis * Math.sin(randomAngle);
  return { x: randomX, y: randomY };
}

export function createRandomNode(
  id: number,
  topLeft: DOMPoint,
  bottomRight: DOMPoint,
  node: { x: number; y: number } | null,
) {
  const { x, y } = createRandomXY2(topLeft, bottomRight, node);
  return {
    id,
    x,
    y,
    dx: 0,
    dy: 0,
    radius: 1,
  };
}
