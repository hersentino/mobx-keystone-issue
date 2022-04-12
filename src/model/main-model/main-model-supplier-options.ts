import { model, prop, DataModel, ModelData } from "mobx-keystone";
import MainModelSupplierIdOrName from "./main-model-supplier-id-or-name";

enum MainModelSupplierOptionsMode {
  PREFERRED = 0,
  LOCKED = 1,
  AVOID = 2,
  FORBID = 3,
  UNRECOGNIZED = -1,
}


@model("Rootstore/MainModelSupplierOptions")
class MainModelSupplierOptions extends DataModel({
  mode: prop<MainModelSupplierOptionsMode>(MainModelSupplierOptionsMode.UNRECOGNIZED),
  supplierIdOrName: prop<ModelData<MainModelSupplierIdOrName> | undefined>(undefined),
}) {
  static fromGrpc(mainModelSupplierOptions: any): ModelData<MainModelSupplierOptions> {
    return {
      supplierIdOrName: mainModelSupplierOptions.supplierIdOrName
        ? MainModelSupplierIdOrName.fromGrpc(mainModelSupplierOptions.supplierIdOrName)
        : undefined,
      mode: mainModelSupplierOptions.mode as unknown as MainModelSupplierOptionsMode,
    };
  }
}

export default MainModelSupplierOptions;
