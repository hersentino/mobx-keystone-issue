import { model, prop, ModelData, DataModel } from "mobx-keystone";
import Quote from "./main-model";
import MainModelMatrixHeaders from "./main-model-matrix-headers";

@model("Rootstore/MainModelMatrix")
class MainModelMatrix extends DataModel({
  headers: prop<ModelData<MainModelMatrixHeaders> | undefined>(),
  quotes: prop<ModelData<Quote>[]>(() => []),
}) {
  static fromGrpc(mainModelMatrix: any): ModelData<MainModelMatrix> {
    return {
      quotes: mainModelMatrix.quotes.map((quote: any) => Quote.fromGrpc(quote)),
      headers: mainModelMatrix.headers ? MainModelMatrixHeaders.fromGrpc(mainModelMatrix.headers) : undefined,
    };
  }
}

export default MainModelMatrix;
