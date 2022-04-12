import { model, prop, DataModel, ModelData } from "mobx-keystone";
import Duration from "../duration";

@model("Rootstore/MainModelMatrixHeaders")
class MainModelMatrixHeaders extends DataModel({
  delays: prop<ModelData<Duration>[]>(() => []),
  quantities: prop<number[]>(() => []),
}) {
  static fromGrpc(mainModelMatrixHeaders: any): ModelData<MainModelMatrixHeaders> {
    return {
      quantities: mainModelMatrixHeaders.quantities,
      delays: mainModelMatrixHeaders.delays.map((delay: any) => Duration.fromGrpc(delay)),
    };
  }
}

export default MainModelMatrixHeaders;
