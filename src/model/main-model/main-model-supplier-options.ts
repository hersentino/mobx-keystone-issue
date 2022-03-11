import { model, prop, Model } from "mobx-keystone";
import MainModelSupplierIdOrName from "./main-model-supplier-id-or-name";

enum MainModelSupplierOptionsMode {
  PREFERRED = 0,
  LOCKED = 1,
  AVOID = 2,
  FORBID = 3,
  UNRECOGNIZED = -1,
}


@model("Rootstore/MainModelSupplierOptions")
class MainModelSupplierOptions extends Model({
  mode: prop<MainModelSupplierOptionsMode>(MainModelSupplierOptionsMode.UNRECOGNIZED),
  supplierIdOrName: prop<MainModelSupplierIdOrName | undefined>(undefined),
}) {
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
