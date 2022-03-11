import { model, prop, Model } from "mobx-keystone";

import Duration from "../duration";
import Quantity from "../quantity";

@model("Rootstore/QuantityOriginDuration")
class QuantityOriginDuration extends Model({
  quantity: prop<Quantity | undefined>(undefined),
  origin: prop<string>(""),
  duration: prop<Duration | undefined>(undefined),
}) {
  static fromGrpc(quantityOriginDuration: any): QuantityOriginDuration {
    return new this({
      origin: quantityOriginDuration.origin,
      quantity: quantityOriginDuration.quantity ? Quantity.fromGrpc(quantityOriginDuration.quantity) : undefined,
      duration: quantityOriginDuration.duration ? Duration.fromGrpc(quantityOriginDuration.duration) : undefined,
    });
  }
}

export default QuantityOriginDuration;
