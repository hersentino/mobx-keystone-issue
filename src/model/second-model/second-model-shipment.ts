import { types } from "mobx-state-tree"
import Shipper from "./shipper";
import SecondModelShipmentStatus, {fromGrpc as SecondModelShipmentStatusFromGrpc} from "./second-model-shipment-status";
import SecondModelItem, {fromGrpc as SecondModelItemFromGrpc} from "./second-model-item";


const SecondModelShipment = types.model("SecondModelShipment", {
  id: "",
  trackingId: "",
  shipper: types.literal(Shipper.UNRECOGNIZED),
  status: types.maybe(SecondModelShipmentStatus),
  content: types.array(SecondModelItem),
  receivedAt: types.maybe(types.string),
  orderIds: types.array(types.string),
});

export function fromGrpc(secondModelShipment: any) {
  return SecondModelShipment.create({
    id: secondModelShipment.id,
    trackingId: secondModelShipment.trackingId,
    receivedAt: secondModelShipment.receivedAt,
    orderIds: secondModelShipment.orderIds,
    shipper: secondModelShipment.shipper,
    status: secondModelShipment.status ? SecondModelShipmentStatusFromGrpc(secondModelShipment.status) : undefined,
    content: secondModelShipment.content.map((c: any) => SecondModelItemFromGrpc(c)),
  });
}

export default SecondModelShipment;
