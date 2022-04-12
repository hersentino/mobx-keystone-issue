import {
  connectReduxDevTools,
  model,
  Model,
  ModelAutoTypeCheckingMode,
  ModelData,
  prop,
  registerRootStore,
  setGlobalConfig,
} from "mobx-keystone"
import MainModel from "./model/main-model/main-model"

setGlobalConfig({
  modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
})


@model("RootStore")
export class RootStore extends Model({
  mainModel: prop<ModelData<MainModel> | undefined>().withSetter(),
  name: prop<string>("").withSetter(),
}) {}

export function createRootStore(): RootStore {
  // the parameter is the initial data for the model
  const rootStore = new RootStore({})

  // although not strictly required, it is always a good idea to register your root stores
  // as such, since this allows the model hook `onAttachedToRootStore` to work and other goodies
  // registerRootStore(rootStore)

  // // we can also connect the store to the redux dev tools
  // const remotedev = require("remotedev")
  // const connection = remotedev.connectViaExtension({
  //   name: "Todo List Example",
  // })

  // connectReduxDevTools(remotedev, connection, rootStore)

  return rootStore
}