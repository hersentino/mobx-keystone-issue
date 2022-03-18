import { model, Model, prop } from "mobx-keystone";
import Shipper from "./shipper";
import SecondModelShipmentStatus from "./second-model-shipment-status";
import SecondModelItem from "./second-model-item";

@model("Rootstore/SecondModelShipment")
class SecondModelShipment extends Model({
  id: prop<string>(""),
  trackingId: prop<string>(""),
  shipper: prop<Shipper>(Shipper.UNRECOGNIZED),
  status: prop<SecondModelShipmentStatus | undefined>(undefined),
  content: prop<SecondModelItem[]>(() => []),
  receivedAt: prop<string | undefined>(),
  orderIds: prop<string[]>(() => []),
}) {
  static fromGrpc(secondModelShipment: any): void {
    secondModelShipment.$modelType = "Rootstore/SecondModelShipment";
    if (secondModelShipment.status) SecondModelShipmentStatus.fromGrpc(secondModelShipment.status);
    secondModelShipment.content.forEach((c: any) => SecondModelItem.fromGrpc(c));
  }
}

export default SecondModelShipment;
