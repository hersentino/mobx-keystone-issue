import { makeAutoObservable } from "mobx";
import SecondModelShipmentStatusType from "./second-model-shipment-status-type";

class SecondModelShipmentStatus {
  type: SecondModelShipmentStatusType = SecondModelShipmentStatusType.UNRECOGNIZED;
  details: string = "";

  constructor(mainModel: SecondModelShipmentStatus) {
    makeAutoObservable(this);
    this.type = mainModel.type;
    this.details = mainModel.details;
  }

  static fromGrpc(secondModelShipmentStatus: any): SecondModelShipmentStatus {
    return new this({
      type: secondModelShipmentStatus.type,
      details: secondModelShipmentStatus.details
    });
  }
}

export default SecondModelShipmentStatus;
