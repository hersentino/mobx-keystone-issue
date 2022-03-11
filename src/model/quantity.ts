import { model, Model, prop } from "mobx-keystone";
import QuantityUnit from "./quantity-unit";

@model("MobxStore/Common/Quantity/Quantity")
class Quantity extends Model({
  quantity: prop<number>(0),
  unit: prop<QuantityUnit>(QuantityUnit.UNRECOGNIZED),
}, {
  valueType: true,
}) {
  static fromGrpc(quantity: any): Quantity {
    return new this({
      quantity: quantity.quantity,
      unit: quantity.unit as unknown as QuantityUnit,
    });
  }
}

export default Quantity;
