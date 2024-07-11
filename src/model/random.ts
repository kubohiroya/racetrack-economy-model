import seedrandom from "seedrandom";
import { URL_SEARCH_PARAMS } from "@/model/urlSearchParams";

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

const seed = URL_SEARCH_PARAMS.get("seed") || Math.random();
let seedRandom: SeedRandom | null = null;

export function random() {
  if (!seedRandom) {
    seedRandom = new SeedRandom(seed);
  }
  return seedRandom.random();
}
