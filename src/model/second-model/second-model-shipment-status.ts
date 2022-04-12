import { DataModel, model, ModelData, prop } from "mobx-keystone";
import SecondModelShipmentStatusType from "./second-model-shipment-status-type";

@model("Rootstore/SecondModelShipmentStatus")
class SecondModelShipmentStatus extends DataModel({
  type: prop<SecondModelShipmentStatusType>(SecondModelShipmentStatusType.UNRECOGNIZED),
  details: prop<string>(""),
}) {
  static fromGrpc(secondModelShipmentStatus: any): ModelData<SecondModelShipmentStatus> {
    return {
      type: secondModelShipmentStatus.type,
      details: secondModelShipmentStatus.details
    };
  }
}

export default SecondModelShipmentStatus;
