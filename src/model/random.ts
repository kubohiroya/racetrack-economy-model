import seedrandom from "seedrandom";

export class SeedRandom {
  rng: seedrandom.PRNG;

  constructor(seed: any) {
    if (seed == undefined) {
      seed = Math.random().toString();
    }
    this.rng = seedrandom(seed);
  }

  random() {
    return this.rng.double();
  }
}

const seed = new URLSearchParams(location.search).get("seed") || Math.random();
let seedRandom: SeedRandom | null = null;

export function random() {
  if (!seedRandom) {
    seedRandom = new SeedRandom(seed);
  }
  return seedRandom.random();
}
