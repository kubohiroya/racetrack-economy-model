import { GraphLayout } from "@/graph/graphLayout";

export class SpringGraphLayout extends GraphLayout {
  reset() {
    super.reset();
    this.temperature = 1;
  }

  calculateRepulsion(
    temperature: number,
    n0: { x: number; y: number },
    n1: { x: number; y: number },
  ): { dx: number; dy: number } {
    const dx = n0.x - n1.x;
    const dy = n0.y - n1.y;
    const dldl = dx * dx + dy * dy;
    const dl = Math.sqrt(dldl);
    if (dl < Number.EPSILON) {
      const randomForces = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
      ];
      return randomForces[Math.floor(Math.random() * randomForces.length)];
    }
    const g = 500; // 比例定数 500
    const f = g / dldl; // 2次元での反発は距離に反比例
    return {
      dx: (f * dx) / dl,
      dy: (f * dy) / dl,
    };
  }

  calculateAttraction(
    temperature: number,
    n0: { x: number; y: number },
    n1: { x: number; y: number },
  ): { dx: number; dy: number } {
    const dx = n0.x - n1.x;
    const dy = n0.y - n1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < Number.EPSILON) {
      const randomForces = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
      ];
      return randomForces[Math.floor(Math.random() * randomForces.length)];
    }
    const k = 0.01; // ばね定数 0.1
    const l = 100; // ばねの自然長
    const force = -k * (distance - l); // ばねの弾性力
    return {
      dx: (force * dx) / distance,
      dy: (force * dy) / distance,
    };
  }

  decreaseTemperature() {}
}
