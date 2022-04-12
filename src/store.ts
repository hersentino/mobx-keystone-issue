import { types } from "mobx-state-tree"

import MainModel from "./model/main-model/main-model"

const RootStore2 = types.model({
  mainModel: types.maybe(MainModel),
  name: types.maybe(types.string)
}).actions((self) => {
  return {
    setMainModel: (mainModel: any) => {
      self.mainModel = mainModel;
    },
    setName: (s: string) => {
      self.name = s;
    }
  }
})

export function createRootStore() {
  // the parameter is the initial data for the model
  const rootStore = RootStore2.create({})

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