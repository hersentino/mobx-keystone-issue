import { makeAutoObservable, action, intercept } from "mobx";
import MainModel from "./model/main-model/main-model"

export class RootStore {
  mainModel: MainModel | undefined;
  name: string = "";

  constructor(rootStore?: RootStore) {
    makeAutoObservable(this, {
      increment: action,
      setName: action,
      setMainModel: action
    })
    if (rootStore){
      this.mainModel = rootStore.mainModel;
      this.name = rootStore.name;
    }
  }

  increment = () => {
    console.log("lol")
  }

  setName = (name: string) => {
    this.name = name;
  }

  setMainModel = (mainModel?: MainModel) => {
    this.mainModel = mainModel;
  }

}

export function createRootStore(): RootStore {
  // the parameter is the initial data for the model
  const rootStore = new RootStore()

  // intercept(rootStore, "mainModel", change => {
  //   console.log("change", change)
  //   return new MainModel()
  // })

  // although not strictly required, it is always a good idea to register your root stores
  // as such, since this allows the model hook `onAttachedToRootStore` to work and other goodies
  // registerRootStore(rootStore)

  // we can also connect the store to the redux dev tools
  // const remotedev = require("remotedev")
  // const connection = remotedev.connectViaExtension({
  //   name: "Todo List Example",
  // })

  // connectReduxDevTools(remotedev, connection, rootStore)

  return rootStore
}