import QuantityUnit from "./quantity-unit";
import { types } from "mobx-state-tree"

const Quantity = types.model("Quantity", {
  quantity: 0,
  unit: types.literal(QuantityUnit.UNRECOGNIZED),
});

export function fromGrpc(quantity: any) {
  return Quantity.create({
    quantity: quantity.quantity,
    unit: quantity.unit,
  });
}

export default Quantity;
