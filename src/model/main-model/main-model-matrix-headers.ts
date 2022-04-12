import { types } from "mobx-state-tree"
import Duration, { fromGrpc as DurationFromGrpc} from "../duration";

const MainModelMatrixHeaders = types.model("MainModelMatrixHeaders", {
  delays: types.array(Duration),
  quantities: types.array(types.number),
});

export function fromGrpc(mainModelMatrixHeaders: any) {
  return MainModelMatrixHeaders.create({
    quantities: mainModelMatrixHeaders.quantities,
    delays: mainModelMatrixHeaders.delays.map((delay: any) => DurationFromGrpc(delay)),
  });
}

export default MainModelMatrixHeaders;
