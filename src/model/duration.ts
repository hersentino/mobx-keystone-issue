import { idProp, model, Model, prop } from "mobx-keystone";

@model("MobxStore/Common/Google/Protobuf/Duration")
class Duration extends Model({
//  id: idProp,
  seconds: prop<number>(0).withSetter(),
  nanos: prop<number>(0).withSetter(),
},{
  valueType: true,
}) {
  static fromGrpc(duration: any): void {
    duration.$modelType = "MobxStore/Common/Google/Protobuf/Duration";
  }
}

export default Duration;
