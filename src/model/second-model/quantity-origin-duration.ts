import { model, prop, DataModel, ModelData } from "mobx-keystone";

import Duration from "../duration";
import Quantity from "../quantity";

@model("Rootstore/QuantityOriginDuration")
class QuantityOriginDuration extends DataModel({
  quantity: prop<ModelData<Quantity> | undefined>(undefined),
  origin: prop<string>(""),
  duration: prop<ModelData<Duration> | undefined>(undefined),
}) {
  static fromGrpc(quantityOriginDuration: any): ModelData<QuantityOriginDuration> {
    return {
      origin: quantityOriginDuration.origin,
      quantity: quantityOriginDuration.quantity ? Quantity.fromGrpc(quantityOriginDuration.quantity) : undefined,
      duration: quantityOriginDuration.duration ? Duration.fromGrpc(quantityOriginDuration.duration) : undefined,
    };
  }
}

export default QuantityOriginDuration;
