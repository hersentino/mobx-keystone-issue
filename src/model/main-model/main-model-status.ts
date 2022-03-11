import { model, Model, prop } from "mobx-keystone";
import MainModelStatusStatusType from "./main-model-status-status-type";

@model("Rootstore/MainModelStatus")
class MainModelStatus extends Model({
  type: prop<MainModelStatusStatusType>(MainModelStatusStatusType.UNRECOGNIZED),
  details: prop<string>(""),
}) {
  static fromGrpc(mainModelStatus: any): MainModelStatus {
    return new this({
      details: mainModelStatus.details,
      type: mainModelStatus.type as unknown as MainModelStatusStatusType,
    });
  }
}

export default MainModelStatus;
