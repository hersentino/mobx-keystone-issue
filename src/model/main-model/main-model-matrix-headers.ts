import { model, prop, Model } from "mobx-keystone";
import Duration from "../duration";

@model("Rootstore/MainModelMatrixHeaders")
class MainModelMatrixHeaders extends Model({
  delays: prop<Duration[]>(() => []),
  quantities: prop<number[]>(() => []),
}) {
  static fromGrpc(mainModelMatrixHeaders: any): MainModelMatrixHeaders {
    return new this({
      quantities: mainModelMatrixHeaders.quantities,
      delays: mainModelMatrixHeaders.delays.map((delay: any) => Duration.fromGrpc(delay)),
    });
  }
}

export default MainModelMatrixHeaders;
