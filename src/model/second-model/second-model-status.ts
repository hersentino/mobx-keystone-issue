import { makeAutoObservable } from "mobx";
import SecondModelStatusType from "./second-model-status-type";

class SecondModelStatus {
  type: SecondModelStatusType = SecondModelStatusType.UNRECOGNIZED;
  details: string = "";
 
  constructor(mainModel?: SecondModelStatus) {
    makeAutoObservable(this);
    if (mainModel){
      this.type = mainModel.type;
      this.details = mainModel.details;
    }
  }

  static fromGrpc(secondModelStatus: any): SecondModelStatus {
    return new this({
      details: secondModelStatus.details,
      type: secondModelStatus.type as unknown as SecondModelStatusType,
    });
  }
}

export default SecondModelStatus;
