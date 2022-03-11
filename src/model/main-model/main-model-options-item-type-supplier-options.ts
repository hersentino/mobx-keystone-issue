import { model, prop, Model } from "mobx-keystone";
import SecondModelItemType from "../second-model/second-model-item-type";
import MainModelSupplierOptions from "./main-model-supplier-options";

@model("Rootstore/MainModelOptionsItemTypeSupplierOptions")
class MainModelOptionsItemTypeSupplierOptions extends Model({
  type: prop<SecondModelItemType>(SecondModelItemType.UNRECOGNIZED),
  supplierOptions: prop<MainModelSupplierOptions | undefined>(undefined),
}) {
  static fromGrpc(
    mainModelOptionsItemTypeSupplierOptions: any
  ): MainModelOptionsItemTypeSupplierOptions {
    return new this({
      supplierOptions: mainModelOptionsItemTypeSupplierOptions.supplierOptions
        ? MainModelSupplierOptions.fromGrpc(mainModelOptionsItemTypeSupplierOptions.supplierOptions)
        : undefined,
      type: mainModelOptionsItemTypeSupplierOptions.type as unknown as SecondModelItemType,
    });
  }
}

export default MainModelOptionsItemTypeSupplierOptions;
