import { DataModel, model, ModelData, prop } from "mobx-keystone";
import MainModelStatusStatusType from "./main-model-status-status-type";

@model("Rootstore/MainModelStatus")
class MainModelStatus extends DataModel({
  type: prop<MainModelStatusStatusType>(MainModelStatusStatusType.UNRECOGNIZED),
  details: prop<string>(""),
}) {
  static fromGrpc(mainModelStatus: any): ModelData<MainModelStatus> {
    return {
      details: mainModelStatus.details,
      type: mainModelStatus.type as unknown as MainModelStatusStatusType,
    };
  }
}

export default MainModelStatus;
