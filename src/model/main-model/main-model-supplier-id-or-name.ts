import { types } from "mobx-state-tree"

const MainModelSupplierIdOrName = types.model("MainModelSupplierIdOrName", {
  supplierId: types.maybe(types.string),
  supplierName:  types.maybe(types.string),
});

export function fromGrpc(mainModelSupplierIdOrName: any) {
  return MainModelSupplierIdOrName.create({
    supplierId: mainModelSupplierIdOrName.supplierId,
    supplierName: mainModelSupplierIdOrName.supplierName
  });
}

export default MainModelSupplierIdOrName;
