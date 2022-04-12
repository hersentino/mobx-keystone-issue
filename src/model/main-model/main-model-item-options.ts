import { model, prop, DataModel, ModelData } from "mobx-keystone";
import MainModelSupplierOptions from "./main-model-supplier-options";
import MainModelItemOptionsManufacturer from "./main-model-item-options-manufacturer";

@model("Rootstore/MainModelItemOptions")
class MainModelItemOptions extends DataModel({
  supplierOptions: prop<ModelData<MainModelSupplierOptions>[]>(() => []),
  manufacturerOptions: prop<ModelData<MainModelItemOptionsManufacturer> | undefined>(undefined),
}) {
  static fromGrpc(mainModelItemOptions: any): ModelData<MainModelItemOptions> {
    return {
      supplierOptions: mainModelItemOptions.supplierOptions.map((quoteItemOption:any) => MainModelSupplierOptions.fromGrpc(quoteItemOption)),
      manufacturerOptions: mainModelItemOptions.manufacturerOptions
        ? MainModelItemOptionsManufacturer.fromGrpc(mainModelItemOptions.manufacturerOptions)
        : undefined,
    };
  }


}

export default MainModelItemOptions;
