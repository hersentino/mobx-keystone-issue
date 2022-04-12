import MainModelSupplierOptions from "./main-model-supplier-options";
import MainModelItemOptionsManufacturer from "./main-model-item-options-manufacturer";
import { makeAutoObservable } from "mobx";

class MainModelItemOptions{
  supplierOptions: MainModelSupplierOptions[] = [];
  manufacturerOptions: MainModelItemOptionsManufacturer | undefined;

  constructor(mainModel?: MainModelItemOptions) {
    makeAutoObservable(this);
    if (mainModel) {
      this.supplierOptions = mainModel.supplierOptions;
      this.supplierOptions = mainModel.supplierOptions;
    }
  }

  static fromGrpc(mainModelItemOptions: any): MainModelItemOptions {
    return new this({
      supplierOptions: mainModelItemOptions.supplierOptions.map((quoteItemOption: any) => MainModelSupplierOptions.fromGrpc(quoteItemOption)),
      manufacturerOptions: mainModelItemOptions.manufacturerOptions
        ? MainModelItemOptionsManufacturer.fromGrpc(mainModelItemOptions.manufacturerOptions)
        : undefined,
    });
  }
}

export default MainModelItemOptions;
