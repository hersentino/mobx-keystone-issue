import Shipper from "./shipper";
import SecondModelShipmentStatus from "./second-model-shipment-status";
import SecondModelItem from "./second-model-item";
import { makeAutoObservable } from "mobx";

class SecondModelShipment {
  id: string = "";
  trackingId: string = "";
  shipper: Shipper = Shipper.UNRECOGNIZED;
  status: SecondModelShipmentStatus | undefined;
  content: SecondModelItem[] = [];
  receivedAt: string | undefined;
  orderIds: string[] = [];

  constructor(mainModel: SecondModelShipment) {
    makeAutoObservable(this);
    this.id = mainModel.id;
    this.trackingId = mainModel.trackingId;
    this.shipper = mainModel.shipper;
    this.status = mainModel.status;
    this.content = mainModel.content;
    this.receivedAt = mainModel.receivedAt;
    this.orderIds = mainModel.orderIds;
  }

  static fromGrpc(secondModelShipment: any): SecondModelShipment {
    return new this({
      id: secondModelShipment.id,
      trackingId: secondModelShipment.trackingId,
      receivedAt: secondModelShipment.receivedAt,
      orderIds: secondModelShipment.orderIds,
      shipper: secondModelShipment.shipper as unknown as Shipper,
      status: secondModelShipment.status ? SecondModelShipmentStatus.fromGrpc(secondModelShipment.status) : undefined,
      content: secondModelShipment.content.map((c: any) => SecondModelItem.fromGrpc(c)),
    });
  }
}

export default SecondModelShipment;
