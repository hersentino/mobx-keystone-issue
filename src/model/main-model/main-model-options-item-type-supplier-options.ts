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
  ): void {

    mainModelOptionsItemTypeSupplierOptions.$modelType = "Rootstore/MainModelOptionsItemTypeSupplierOptions";
    if (mainModelOptionsItemTypeSupplierOptions.supplierOptions) MainModelSupplierOptions.fromGrpc(mainModelOptionsItemTypeSupplierOptions.supplierOptions);
  }
}

export default MainModelOptionsItemTypeSupplierOptions;
