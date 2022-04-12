import { DataModel, model, ModelData, prop } from "mobx-keystone";

@model("Rootstore/MainModelItemOptionsManufacturer")
class MainModelItemOptionsManufacturer extends DataModel({
  manufacturer: prop<string>(),
  mpn: prop<string>(),
}) {
  static fromGrpc(mainModelItemOptionsManufacturer: any): ModelData<MainModelItemOptionsManufacturer> {
    return {
      manufacturer: mainModelItemOptionsManufacturer.manufacturer,
      mpn: mainModelItemOptionsManufacturer.mpn
    };
  }
}

export default MainModelItemOptionsManufacturer;
