import { DataModel, model, ModelData, prop } from "mobx-keystone";
import QuantityUnit from "./quantity-unit";

@model("MobxStore/Common/Quantity/Quantity")
class Quantity extends DataModel({
  quantity: prop<number>(0),
  unit: prop<QuantityUnit>(QuantityUnit.UNRECOGNIZED),
}) {
  static fromGrpc(quantity: any): ModelData<Quantity> {
    return {
      quantity: quantity.quantity,
      unit: quantity.unit as unknown as QuantityUnit,
    };
  }
}

export default Quantity;
