import { model, prop, Model } from "mobx-keystone";
import Quote from "./main-model";
import MainModelMatrixHeaders from "./main-model-matrix-headers";

@model("Rootstore/MainModelMatrix")
class MainModelMatrix extends Model({
  headers: prop<MainModelMatrixHeaders | undefined>(),
  quotes: prop<Quote[]>(() => []),
}) {
  static fromGrpc(mainModelMatrix: any): MainModelMatrix {
    return new this({
      quotes: mainModelMatrix.quotes.map((quote: any) => Quote.fromGrpc(quote)),
      headers: mainModelMatrix.headers ? MainModelMatrixHeaders.fromGrpc(mainModelMatrix.headers) : undefined,
    });
  }
}

export default MainModelMatrix;
