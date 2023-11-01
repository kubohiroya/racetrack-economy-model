import { GraphLayout } from "@/graph/graphLayout";

export class FruchtermanReingoldGraphLayout extends GraphLayout {
  reset() {
    super.reset();
    this.temperature = Math.sqrt(
      this.width * this.width + this.height + this.height,
    );
  }

  calculateRepulsion(
    temperature: number,
    node1: { x: number; y: number },
    node2: { x: number; y: number },
  ): { dx: number; dy: number } {
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;
    const distance = Math.sqrt(dx * dx + dy * dy) + 1;
    const force = (temperature * temperature) / distance; // リーマン-シュワルツの力学モデル

    return {
      dx: (dx / distance) * force,
      dy: (dy / distance) * force,
    };
  }

  calculateAttraction(
    temperature: number,
    node1: { x: number; y: number },
    node2: { x: number; y: number },
  ): { dx: number; dy: number } {
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;
    const distance = Math.sqrt(dx * dx + dy * dy) + 1;
    const force = (distance * distance) / temperature; // リーマン-シュワルツの力学モデル

    return {
      dx: (dx / distance) * force,
      dy: (dy / distance) * force,
    };
  }

  decreaseTemperature() {
    if (this.temperature > 0) {
      this.temperature -= 1;
    }
  }
}
