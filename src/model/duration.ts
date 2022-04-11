import { makeAutoObservable } from "mobx";

class Duration {
  seconds: number = 0;
  nanos: number = 0;

  constructor(mainModel?: Duration) {
    makeAutoObservable(this);
    if (mainModel) {
      this.seconds = mainModel.seconds;
      this.nanos = mainModel.nanos;
    }
  }

  static fromGrpc(duration: any): Duration {
    return new this({
      seconds: duration.seconds,
      nanos: duration.nanos,
    });
  }
}

export default Duration;
