import { makeAutoObservable } from "mobx";
import SecondModelItemType from "../second-model/second-model-item-type";
import MainModelSupplierOptions from "./main-model-supplier-options";

class MainModelOptionsItemTypeSupplierOptions {
  type: SecondModelItemType = SecondModelItemType.UNRECOGNIZED
  supplierOptions: MainModelSupplierOptions | undefined;

  constructor(mainModel?: MainModelOptionsItemTypeSupplierOptions) {
    makeAutoObservable(this);

    if (mainModel){
      this.type = mainModel.type;
      this.supplierOptions = mainModel.supplierOptions;
    }
  }

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
