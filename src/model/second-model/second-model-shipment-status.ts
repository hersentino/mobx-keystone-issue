import { types } from "mobx-state-tree"
import SecondModelShipmentStatusType from "./second-model-shipment-status-type";

const SecondModelShipmentStatus = types.model("SecondModelShipmentStatus", {
  type: types.number, // types.literal(SecondModelShipmentStatusType.UNRECOGNIZED),
  details: "",
});

export function fromGrpc(secondModelShipmentStatus: any) {
  return SecondModelShipmentStatus.create({
    type: secondModelShipmentStatus.type,
    details: secondModelShipmentStatus.details
  });
}

export default SecondModelShipmentStatus;
