import { DataModel, model, ModelData, prop } from "mobx-keystone";
import SecondModelStatusType from "./second-model-status-type";

@model("Rootstore/SecondModelStatus")
class SecondModelStatus extends DataModel({
  type: prop<SecondModelStatusType>(SecondModelStatusType.UNRECOGNIZED),
  details: prop<string>(),
}) {
  static fromGrpc(secondModelStatus: any): ModelData<SecondModelStatus> {
    return {
      details: secondModelStatus.details,
      type: secondModelStatus.type as unknown as SecondModelStatusType,
    };
  }
}

export default SecondModelStatus;
