import { Model } from "./model/model";
import { Region } from "./model/region";
import { ValueType } from "./model/valueType";

export function createMapper(
  model: Model,
): { mapper: (region: Region) => number; type: ValueType }[] {
  return [
    {
      mapper: (region: Region) => region.manufacturingShare,
      type: ValueType.ratioToMax,
    },
    {
      mapper: (region: Region) => region.priceIndex,
      type: ValueType.multiply100aroundOne,
    },
    {
      mapper: (region: Region) => region.nominalWage,
      type: ValueType.multiply1000aroundOne,
    },
    {
      mapper: (region: Region) => region.realWage,
      type: ValueType.multiply1000aroundOne,
    },
    {
      mapper: (region: Region) => model.country.averageRealWage,
      type: ValueType.multiply1000aroundOne,
    },
  ];
}
