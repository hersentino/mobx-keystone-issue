import { DataModel, prop, ModelData } from "mobx-keystone";

class Duration extends DataModel({
  seconds: prop<number>(0).withSetter(),
  nanos: prop<number>(0).withSetter(),
}) {
  static fromGrpc(duration: any): ModelData<Duration> {
    return {
      seconds: duration.seconds,
      nanos: duration.nanos,
    };
  }
}

export default Duration;
