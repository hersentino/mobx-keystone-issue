import { model, prop, Model } from "mobx-keystone";
import MainModelSupplierOptions from "./main-model-supplier-options";
import MainModelItemOptionsManufacturer from "./main-model-item-options-manufacturer";

@model("Rootstore/MainModelItemOptions")
class MainModelItemOptions extends Model({
  supplierOptions: prop<MainModelSupplierOptions[]>(() => []),
  manufacturerOptions: prop<MainModelItemOptionsManufacturer | undefined>(undefined),
}) {
  static fromGrpc(mainModelItemOptions: any): void {
    mainModelItemOptions.$modelType = "Rootstore/MainModelItemOptions";
    mainModelItemOptions.supplierOptions.map((quoteItemOption:any) => MainModelSupplierOptions.fromGrpc(quoteItemOption));
    if (mainModelItemOptions.manufacturerOptions) MainModelItemOptionsManufacturer.fromGrpc(mainModelItemOptions.manufacturerOptions);
  }


}

export default MainModelItemOptions;
