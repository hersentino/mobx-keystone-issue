import { model, DataModel, prop, ModelData } from "mobx-keystone";

@model("Rootstore/MainModelSupplierIdOrName")
class MainModelSupplierIdOrName extends DataModel({
  supplierId: prop<string | undefined>(),
  supplierName:  prop<string | undefined>(),
}) {
  static fromGrpc(mainModelSupplierIdOrName: any): ModelData<MainModelSupplierIdOrName> {
    return {
      supplierId: mainModelSupplierIdOrName.supplierId,
      supplierName: mainModelSupplierIdOrName.supplierName
    };
  }
}

export default MainModelSupplierIdOrName;
