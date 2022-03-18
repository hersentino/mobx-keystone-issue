import { model, prop, Model } from "mobx-keystone";
import Duration from "../duration";

@model("Rootstore/MainModelMatrixHeaders")
class MainModelMatrixHeaders extends Model({
  delays: prop<Duration[]>(() => []),
  quantities: prop<number[]>(() => []),
}) {
  static fromGrpc(mainModelMatrixHeaders: any): void {
    mainModelMatrixHeaders.$modelType = "Rootstore/MainModelMatrixHeaders";
    mainModelMatrixHeaders.delays.map((delay: any) => Duration.fromGrpc(delay));
  }
}

export default MainModelMatrixHeaders;
