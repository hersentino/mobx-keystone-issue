import { model, Model, prop } from "mobx-keystone";

@model("Rootstore/MainModelSupplierIdOrName")
class MainModelSupplierIdOrName extends Model({
  supplierId: prop<string | undefined>(),
  supplierName:  prop<string | undefined>(),
}) {
  static fromGrpc(mainModelSupplierIdOrName: any): void {
    mainModelSupplierIdOrName.$modelType = "Rootstore/MainModelSupplierIdOrName";
  }
}

export default MainModelSupplierIdOrName;
