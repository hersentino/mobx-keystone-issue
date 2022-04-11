import { makeAutoObservable } from "mobx";
import MainModelSupplierIdOrName from "./main-model-supplier-id-or-name";

enum MainModelSupplierOptionsMode {
  PREFERRED = 0,
  LOCKED = 1,
  AVOID = 2,
  FORBID = 3,
  UNRECOGNIZED = -1,
}

class MainModelSupplierOptions {
  mode: MainModelSupplierOptionsMode = MainModelSupplierOptionsMode.UNRECOGNIZED;
  supplierIdOrName: MainModelSupplierIdOrName | undefined = undefined;

  constructor(mainModel: MainModelSupplierOptions) {
    makeAutoObservable(this);
    this.mode = mainModel.mode;
    this.supplierIdOrName = mainModel.supplierIdOrName;
  }

  static fromGrpc(mainModelSupplierOptions: any): MainModelSupplierOptions {
    return new this({
      supplierIdOrName: mainModelSupplierOptions.supplierIdOrName
        ? MainModelSupplierIdOrName.fromGrpc(mainModelSupplierOptions.supplierIdOrName)
        : undefined,
      mode: mainModelSupplierOptions.mode as unknown as MainModelSupplierOptionsMode,
    });
  }
}

export default MainModelSupplierOptions;
