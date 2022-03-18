import { model, Model, prop } from "mobx-keystone";

@model("Rootstore/MainModelItemOptionsManufacturer")
class MainModelItemOptionsManufacturer extends Model({
  manufacturer: prop<string>(),
  mpn: prop<string>(),
}) {
  static fromGrpc(mainModelItemOptionsManufacturer: any): void {
    mainModelItemOptionsManufacturer.$modelType = "Rootstore/MainModelItemOptionsManufacturer";
  }
}

export default MainModelItemOptionsManufacturer;
