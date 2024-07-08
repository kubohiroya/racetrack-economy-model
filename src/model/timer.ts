export class TimerEvent {
  static tick = new TimerEvent("tick");
  static start = new TimerEvent("start");
  static stop = new TimerEvent("stop");
  static reset = new TimerEvent("reset");

  type: "tick" | "start" | "stop" | "reset";

  constructor(type: "tick" | "start" | "stop" | "reset") {
    this.type = type;
  }
}

export class Timer {
  static layoutTimer: Timer | null = null;
  static simulationTimer: Timer | null = null;

  speed: number;
  timeout: NodeJS.Timeout | null;

  timeCounter: number;

  timeEventListeners: Array<(event: TimerEvent) => void>;

  constructor(speed: number = 0.5) {
    this.timeCounter = 0;
    this.speed = speed;
    this.timeout = null;
    this.timeEventListeners = new Array<(event: TimerEvent) => void>();
  }

  static getLayoutTimer() {
    if (!Timer.layoutTimer) {
      Timer.layoutTimer = new Timer(1.0);
    }
    return Timer.layoutTimer;
  }

  static getSimulationTimer() {
    if (!Timer.simulationTimer) {
      Timer.simulationTimer = new Timer(0.5);
    }
    return Timer.simulationTimer;
  }

  isStarted() {
    return this.timeout != null;
  }

  changeSpeed(speed: number): void {
    if (speed != this.speed) {
      this.speed = speed;
      if (this.timeout != null) {
        this.start();
      }
    }
  }

  start(): void {
    if (this.timeout != null) {
      clearInterval(this.timeout);
    }
    const expScale = (value: number): number => {
      const minLog = Math.log(1);
      const maxLog = Math.log(1000);
      const scale = minLog + (1 - value) * (maxLog - minLog);
      return Math.exp(scale);
    };
    const interval = expScale(this.speed);
    this.timeout = setInterval(() => this.tick(), interval);
  }

  stop(): void {
    if (this.timeout != null) {
      clearInterval(this.timeout);
    }
    this.timeout = null;
  }

  addTimeEventListener(listener: (event: TimerEvent) => void) {
    this.timeEventListeners.push(listener);
  }

  reset() {
    this.timeCounter = 0;
  }

  tick() {
    this.timeCounter++;
    this.timeEventListeners.forEach((listener) => {
      listener(TimerEvent.tick);
    });
  }
}
