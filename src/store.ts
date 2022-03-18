import {
  model,
  Model,
  modelAction,
  ModelAutoTypeCheckingMode,
  modelFlow,
  prop,
  registerRootStore,
  setGlobalConfig,
  _async,
  _await,
} from "mobx-keystone"
import MainModel from "./model/main-model/main-model"

import { actionTrackingMiddleware } from "mobx-keystone";
import getData from "./data";
import MainModelStatus from "./model/main-model/main-model-status";


setGlobalConfig({
  modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
})


@model("RootStore")
export class RootStore extends Model({
  mainModel: prop<MainModel | undefined>().withSetter(),
  name: prop<string>("").withSetter(),
  result1: prop<number| undefined>().withSetter(),
  result2: prop<number| undefined>().withSetter(),
}) {

  @modelFlow
  getData = _async(function* () {
    const data = yield* _await(getData())
    return data
  });

  @modelAction
  instanceModel(data: any) {
    return MainModel.fromGrpc(data)
  }

  @modelFlow
  asyncSet = _async(function* (this: RootStore, time: number) {
    yield* _await(new Promise(() => this.setResult1(time)));
  });

  @modelFlow
  asyncSet2 = _async(function* (this: RootStore, time: number) {
    yield* _await(new Promise(() => this.setResult2(time)));
  });

  @modelFlow
  doSomeThing = _async(function* (this: RootStore) {
    const t0 = performance.now();

    const data = yield* _await(this.getData());
    const mainModel = this.instanceModel(data);
    this.setMainModel(mainModel);
    const t1 = performance.now();

    // make the set in async mode to not interfere in the middleware time mesure
    this.asyncSet(t1-t0);
  });


  @modelAction
  doSomeThing2 = () => {
    const t0 = performance.now();
    const mainModel = this.instanceModel(new MainModel({status : new MainModelStatus({})}));
    this.setMainModel(mainModel);
    const t1 = performance.now();

    // make the set in async mode to not interfere in the middleware time mesure
    this.asyncSet2(t1 - t0);
  };


}

export const timerSymbol = Symbol("timer");

function tracesMiddleWare(rootStore: RootStore) {
  actionTrackingMiddleware(rootStore, {
    // do anything in onStart/onFinish to not interfere in the middleware time mesure
    onStart(ctx) {},
    onFinish(ctx) {},
  });
}

export default tracesMiddleWare;


export function createRootStore(): RootStore {
  // the parameter is the initial data for the model
  const rootStore = new RootStore({})

  // although not strictly required, it is always a good idea to register your root stores
  // as such, since this allows the model hook `onAttachedToRootStore` to work and other goodies
  registerRootStore(rootStore)

  // we can also connect the store to the redux dev tools
  // const remotedev = require("remotedev")
  // const connection = remotedev.connectViaExtension({
  //   name: "Todo List Example",
  // })
  // connectReduxDevTools(remotedev, connection, rootStore)

  tracesMiddleWare(rootStore)

  return rootStore
}