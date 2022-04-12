import { types } from "mobx-state-tree"
import MainModelStatusStatusType from "./main-model-status-status-type";

const MainModelStatus = types.model("MainModelStatus", {
  type: types.number, // types.literal(MainModelStatusStatusType.UNRECOGNIZED),
  details: "",
});

export function fromGrpc(mainModelStatus: any) {
  return MainModelStatus.create({
    details: mainModelStatus.details,
    type: mainModelStatus.type,
  });
}

export default MainModelStatus;
