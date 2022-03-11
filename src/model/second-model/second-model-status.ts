import { model, Model, prop } from "mobx-keystone";
import SecondModelStatusType from "./second-model-status-type";

@model("Rootstore/SecondModelStatus")
class SecondModelStatus extends Model({
  type: prop<SecondModelStatusType>(SecondModelStatusType.UNRECOGNIZED),
  details: prop<string>(),
}) {
  static fromGrpc(secondModelStatus: any): SecondModelStatus {
    return new this({
      details: secondModelStatus.details,
      type: secondModelStatus.type as unknown as SecondModelStatusType,
    });
  }
}

export default SecondModelStatus;
