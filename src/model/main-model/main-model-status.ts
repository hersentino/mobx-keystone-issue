import { makeAutoObservable } from "mobx";
import MainModelStatusStatusType from "./main-model-status-status-type";

class MainModelStatus {
  type: MainModelStatusStatusType = MainModelStatusStatusType.UNRECOGNIZED;
  details: string = ""

  constructor(mainModel: MainModelStatus) {
    makeAutoObservable(this);
    this.type = mainModel.type;
    this.details = mainModel.details;
  }
  
  static fromGrpc(mainModelStatus: any): MainModelStatus {
    return new this({
      details: mainModelStatus.details,
      type: mainModelStatus.type as unknown as MainModelStatusStatusType,
    });
  }
}

export default MainModelStatus;
