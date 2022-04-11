import { makeAutoObservable } from "mobx";
import QuantityUnit from "./quantity-unit";

class Quantity {
  quantity: number = 0;
  unit: QuantityUnit = QuantityUnit.UNRECOGNIZED;

  constructor(mainModel?: Quantity) {
    makeAutoObservable(this);
    if (mainModel) {
      this.quantity = mainModel.quantity;
      this.unit = mainModel.unit;
    }
  }

  static fromGrpc(quantity: any): Quantity {
    return new this({
      quantity: quantity.quantity,
      unit: quantity.unit as unknown as QuantityUnit,
    });
  }
}

export default Quantity;
