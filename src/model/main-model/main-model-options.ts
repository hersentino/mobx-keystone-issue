import { model, prop, ModelData, DataModel } from "mobx-keystone";
import MainModelOptionsItemTypeSupplierOptions from "./main-model-options-item-type-supplier-options";

@model("MobxStore/Supplier/Quote/MainModelOptions")
class MainModelOptions extends DataModel({
  itemTypeSupplierOptions: prop<ModelData<MainModelOptionsItemTypeSupplierOptions>[]>(() => []),
}) {
  static fromGrpc(mainModelOptions: any): ModelData<MainModelOptions> {
    return {
      itemTypeSupplierOptions: mainModelOptions.itemTypeSupplierOptions.map((itemTypeSupplierOption: any) =>
      MainModelOptionsItemTypeSupplierOptions.fromGrpc(itemTypeSupplierOption)
      ),
    };
  }
}

export default MainModelOptions;
