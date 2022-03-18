import { model, Model, prop } from "mobx-keystone";
import SecondModelShipmentStatusType from "./second-model-shipment-status-type";

@model("Rootstore/SecondModelShipmentStatus")
class SecondModelShipmentStatus extends Model({
  type: prop<SecondModelShipmentStatusType>(SecondModelShipmentStatusType.UNRECOGNIZED),
  details: prop<string>(""),
}) {
  static fromGrpc(secondModelShipmentStatus: any): void {
    secondModelShipmentStatus.$modelType = "Rootstore/SecondModelShipmentStatus";
  }
}

export default SecondModelShipmentStatus;
