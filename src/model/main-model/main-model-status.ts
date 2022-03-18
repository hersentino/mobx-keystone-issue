import { model, Model, prop } from "mobx-keystone";
import MainModelStatusStatusType from "./main-model-status-status-type";

@model("Rootstore/MainModelStatus")
class MainModelStatus extends Model({
  type: prop<MainModelStatusStatusType>(MainModelStatusStatusType.UNRECOGNIZED),
  details: prop<string>(""),
}) {
  static fromGrpc(mainModelStatus: any): void {
    mainModelStatus.$modelType = "Rootstore/MainModelStatus";
  }
}

export default MainModelStatus;
