import { model, prop, DataModel, ModelData } from "mobx-keystone";
import SecondModelItemType from "../second-model/second-model-item-type";
import MainModelSupplierOptions from "./main-model-supplier-options";

@model("Rootstore/MainModelOptionsItemTypeSupplierOptions")
class MainModelOptionsItemTypeSupplierOptions extends DataModel({
  type: prop<SecondModelItemType>(SecondModelItemType.UNRECOGNIZED),
  supplierOptions: prop<ModelData<MainModelSupplierOptions> | undefined>(undefined),
}) {
  static fromGrpc(
    mainModelOptionsItemTypeSupplierOptions: any
  ): ModelData<MainModelOptionsItemTypeSupplierOptions> {
    return {
      supplierOptions: mainModelOptionsItemTypeSupplierOptions.supplierOptions
        ? MainModelSupplierOptions.fromGrpc(mainModelOptionsItemTypeSupplierOptions.supplierOptions)
        : undefined,
      type: mainModelOptionsItemTypeSupplierOptions.type as unknown as SecondModelItemType,
    };
  }
}

export default MainModelOptionsItemTypeSupplierOptions;
