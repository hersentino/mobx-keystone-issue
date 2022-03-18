import { model, prop, Model } from "mobx-keystone";
import MainModelOptionsItemTypeSupplierOptions from "./main-model-options-item-type-supplier-options";

@model("MobxStore/Supplier/Quote/MainModelOptions")
class MainModelOptions extends Model({
  itemTypeSupplierOptions: prop<MainModelOptionsItemTypeSupplierOptions[]>(() => []),
}) {
  static fromGrpc(mainModelOptions: any): void {
    mainModelOptions.$modelType = "MobxStore/Supplier/Quote/MainModelOptions";
    mainModelOptions.itemTypeSupplierOptions.map((itemTypeSupplierOption: any) => MainModelOptionsItemTypeSupplierOptions.fromGrpc(itemTypeSupplierOption));
  }
}

export default MainModelOptions;
