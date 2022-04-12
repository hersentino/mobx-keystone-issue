import { makeAutoObservable } from "mobx";

class MainModelSupplierIdOrName {
  supplierId: string | undefined;
  supplierName:  string | undefined;

  constructor(mainModel?: MainModelSupplierIdOrName) {
    makeAutoObservable(this);
    if (mainModel){
      this.supplierId = mainModel.supplierId;
      this.supplierName = mainModel.supplierName;
    }
  }
  
  static fromGrpc(mainModelSupplierIdOrName: any): MainModelSupplierIdOrName {
    return new this({
      supplierId: mainModelSupplierIdOrName.supplierId,
      supplierName: mainModelSupplierIdOrName.supplierName
    });
  }
}

export default MainModelSupplierIdOrName;
