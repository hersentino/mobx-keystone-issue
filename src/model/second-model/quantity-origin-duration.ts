
import { makeAutoObservable } from "mobx";
import Duration from "../duration";
import Quantity from "../quantity";

class QuantityOriginDuration {
  quantity: Quantity | undefined;
  origin: string = "";
  duration: Duration | undefined;

  constructor(mainModel?: QuantityOriginDuration) {
    makeAutoObservable(this);
    if (mainModel){
      this.quantity = mainModel.quantity;
      this.origin = mainModel.origin;
      this.duration = mainModel.duration;
    }
  }

  static fromGrpc(quantityOriginDuration: any): QuantityOriginDuration {
    return new this({
      origin: quantityOriginDuration.origin,
      quantity: quantityOriginDuration.quantity ? Quantity.fromGrpc(quantityOriginDuration.quantity) : undefined,
      duration: quantityOriginDuration.duration ? Duration.fromGrpc(quantityOriginDuration.duration) : undefined,
    });
  }
}

export default QuantityOriginDuration;
