import { model, Model, prop } from "mobx-keystone";
import SecondModelStatusType from "./second-model-status-type";

@model("Rootstore/SecondModelStatus")
class SecondModelStatus extends Model({
  type: prop<SecondModelStatusType>(SecondModelStatusType.UNRECOGNIZED),
  details: prop<string>(),
}) {
  static fromGrpc(secondModelStatus: any): void {
    secondModelStatus.$modelType = "Rootstore/SecondModelStatus";
  }
}

export default SecondModelStatus;
