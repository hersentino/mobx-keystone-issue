import { makeAutoObservable } from "mobx";
import Quote from "./main-model";
import MainModelMatrixHeaders from "./main-model-matrix-headers";

class MainModelMatrix {
  headers: MainModelMatrixHeaders | undefined;
  quotes: Quote[] = [];

  constructor(mainModel?: MainModelMatrix) {
    makeAutoObservable(this);

    if (mainModel){
      this.headers = mainModel.headers;
      this.quotes = mainModel.quotes;
    }
  }

  static fromGrpc(mainModelMatrix: any): MainModelMatrix {
    return new this({
      quotes: mainModelMatrix.quotes.map((quote: any) => Quote.fromGrpc(quote)),
      headers: mainModelMatrix.headers ? MainModelMatrixHeaders.fromGrpc(mainModelMatrix.headers) : undefined,
    });
  }
}

export default MainModelMatrix;
