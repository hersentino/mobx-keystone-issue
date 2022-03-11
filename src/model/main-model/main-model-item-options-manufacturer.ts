import { model, Model, prop } from "mobx-keystone";

@model("Rootstore/MainModelItemOptionsManufacturer")
class MainModelItemOptionsManufacturer extends Model({
  manufacturer: prop<string>(),
  mpn: prop<string>(),
}) {
  static fromGrpc(mainModelItemOptionsManufacturer: any): MainModelItemOptionsManufacturer {
    return new this({
      manufacturer: mainModelItemOptionsManufacturer.manufacturer,
      mpn: mainModelItemOptionsManufacturer.mpn
    });
  }
}

export default MainModelItemOptionsManufacturer;
