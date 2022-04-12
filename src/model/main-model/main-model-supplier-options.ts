import { types } from "mobx-state-tree"
import MainModelSupplierIdOrName, { fromGrpc as MainModelSupplierIdOrNameFromGrpc } from "./main-model-supplier-id-or-name";

enum MainModelSupplierOptionsMode {
  PREFERRED = 0,
  LOCKED = 1,
  AVOID = 2,
  FORBID = 3,
  UNRECOGNIZED = -1,
}

const MainModelSupplierOptions = types.model("MainModelSupplierOptions", {
  mode: types.number, // types.literal(MainModelSupplierOptionsMode.UNRECOGNIZED),
  supplierIdOrName: types.maybe(MainModelSupplierIdOrName),
});

export function fromGrpc(mainModelSupplierOptions: any) {
  return MainModelSupplierOptions.create({
    supplierIdOrName: mainModelSupplierOptions.supplierIdOrName
      ? MainModelSupplierIdOrNameFromGrpc(mainModelSupplierOptions.supplierIdOrName)
      : undefined,
    mode: mainModelSupplierOptions.mode,
  });
}

export default MainModelSupplierOptions;
