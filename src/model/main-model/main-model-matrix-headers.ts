import { makeAutoObservable } from "mobx";
import Duration from "../duration";

class MainModelMatrixHeaders  {
  delays: Duration[] = [];
  quantities: number[] = [];

  constructor(mainModel: MainModelMatrixHeaders) {
    makeAutoObservable(this);
    this.delays = mainModel.delays;
    this.quantities = mainModel.quantities;
  }

  static fromGrpc(mainModelMatrixHeaders: any): MainModelMatrixHeaders {
    return new this({
      quantities: mainModelMatrixHeaders.quantities,
      delays: mainModelMatrixHeaders.delays.map((delay: any) => Duration.fromGrpc(delay)),
    });
  }
}

export default MainModelMatrixHeaders;
