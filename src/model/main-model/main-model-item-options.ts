import { model, prop, Model } from "mobx-keystone";
import MainModelSupplierOptions from "./main-model-supplier-options";
import MainModelItemOptionsManufacturer from "./main-model-item-options-manufacturer";

@model("Rootstore/MainModelItemOptions")
class MainModelItemOptions extends Model({
  supplierOptions: prop<MainModelSupplierOptions[]>(() => []),
  manufacturerOptions: prop<MainModelItemOptionsManufacturer | undefined>(undefined),
}) {
  static fromGrpc(mainModelItemOptions: any): MainModelItemOptions {
    return new this({
      supplierOptions: mainModelItemOptions.supplierOptions.map((quoteItemOption:any) => MainModelSupplierOptions.fromGrpc(quoteItemOption)),
      manufacturerOptions: mainModelItemOptions.manufacturerOptions
        ? MainModelItemOptionsManufacturer.fromGrpc(mainModelItemOptions.manufacturerOptions)
        : undefined,
    });
  }


}

export default MainModelItemOptions;
