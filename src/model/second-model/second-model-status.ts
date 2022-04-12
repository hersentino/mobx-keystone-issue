import { types } from "mobx-state-tree"
import SecondModelStatusType from "./second-model-status-type";

const SecondModelStatus = types.model("SecondModelStatus", {
  type: types.number, // types.literal(SecondModelStatusType.UNRECOGNIZED),
  details: types.string,
});

export function fromGrpc(secondModelStatus: any) {
  return SecondModelStatus.create({
    details: secondModelStatus.details,
    type: secondModelStatus.type ,
  });
}

export default SecondModelStatus;
