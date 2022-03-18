import { model, prop, Model } from "mobx-keystone";

import Duration from "../duration";
import Quantity from "../quantity";

@model("Rootstore/QuantityOriginDuration")
class QuantityOriginDuration extends Model({
  quantity: prop<Quantity | undefined>(undefined),
  origin: prop<string>(""),
  duration: prop<Duration | undefined>(undefined),
}) {
  static fromGrpc(quantityOriginDuration: any): void {
    quantityOriginDuration.$modelType = "Rootstore/QuantityOriginDuration";
    if (quantityOriginDuration.quantity) Quantity.fromGrpc(quantityOriginDuration.quantity);
    if (quantityOriginDuration.duration) Duration.fromGrpc(quantityOriginDuration.duration);
  }
}

export default QuantityOriginDuration;
