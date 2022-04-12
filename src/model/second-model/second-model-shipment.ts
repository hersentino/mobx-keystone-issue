import { DataModel, model, ModelData, prop } from "mobx-keystone";
import Shipper from "./shipper";
import SecondModelShipmentStatus from "./second-model-shipment-status";
import SecondModelItem from "./second-model-item";

@model("Rootstore/SecondModelShipment")
class SecondModelShipment extends DataModel({
  id: prop<string>(""),
  trackingId: prop<string>(""),
  shipper: prop<Shipper>(Shipper.UNRECOGNIZED),
  status: prop<ModelData<SecondModelShipmentStatus> | undefined>(undefined),
  content: prop<ModelData<SecondModelItem>[]>(() => []),
  receivedAt: prop<string | undefined>(),
  orderIds: prop<string[]>(() => []),
}) {
  static fromGrpc(secondModelShipment: any): ModelData<SecondModelShipment> {
    return {
      id: secondModelShipment.id,
      trackingId: secondModelShipment.trackingId,
      receivedAt: secondModelShipment.receivedAt,
      orderIds: secondModelShipment.orderIds,
      shipper: secondModelShipment.shipper as unknown as Shipper,
      status: secondModelShipment.status ? SecondModelShipmentStatus.fromGrpc(secondModelShipment.status) : undefined,
      content: secondModelShipment.content.map((c: any) => SecondModelItem.fromGrpc(c)),
    };
  }
}

export default SecondModelShipment;
