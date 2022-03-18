import { model, prop, Model } from "mobx-keystone";
import Quote from "./main-model";
import MainModelMatrixHeaders from "./main-model-matrix-headers";

@model("Rootstore/MainModelMatrix")
class MainModelMatrix extends Model({
  headers: prop<MainModelMatrixHeaders | undefined>(),
  quotes: prop<Quote[]>(() => []),
}) {
  static fromGrpc(mainModelMatrix: any): void {
    mainModelMatrix.$modelType = "Rootstore/MainModelMatrix";
    mainModelMatrix.quotes.map((quote: any) => Quote.fromGrpc(quote));
    if (mainModelMatrix.headers) MainModelMatrixHeaders.fromGrpc(mainModelMatrix.headers);
  }
}

export default MainModelMatrix;
