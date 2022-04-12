import { makeAutoObservable } from "mobx";
import MainModelOptionsItemTypeSupplierOptions from "./main-model-options-item-type-supplier-options";

class MainModelOptions {
  itemTypeSupplierOptions: MainModelOptionsItemTypeSupplierOptions[] = [];

  constructor(mainModel?: MainModelOptions) {
    makeAutoObservable(this);
    if (mainModel)
      this.itemTypeSupplierOptions = mainModel.itemTypeSupplierOptions;
  }

  static fromGrpc(mainModelOptions: any): MainModelOptions {
    return new this({
      itemTypeSupplierOptions: mainModelOptions.itemTypeSupplierOptions.map((itemTypeSupplierOption: any) =>
      MainModelOptionsItemTypeSupplierOptions.fromGrpc(itemTypeSupplierOption)
      ),
    });
  }
}

export default MainModelOptions;
