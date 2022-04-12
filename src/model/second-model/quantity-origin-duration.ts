import { types } from "mobx-state-tree"

import Duration, {fromGrpc as DurationFromGrpc} from "../duration";
import Quantity, {fromGrpc as QuantityFromGrpc} from "../quantity";

const QuantityOriginDuration = types.model("QuantityOriginDuration", {
  quantity: types.maybe(Quantity),
  origin: "",
  duration: types.maybe(Duration),
});

export function fromGrpc(quantityOriginDuration: any) {
  return QuantityOriginDuration.create({
    origin: quantityOriginDuration.origin,
    quantity: quantityOriginDuration.quantity ? QuantityFromGrpc(quantityOriginDuration.quantity) : undefined,
    duration: quantityOriginDuration.duration ? DurationFromGrpc(quantityOriginDuration.duration) : undefined,
  });
}

export default QuantityOriginDuration;
