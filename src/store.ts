import { computed } from "mobx"
import {
  DataModel,
  model,
  Model,
  modelAction,
  ModelAutoTypeCheckingMode,
  ModelData,
  prop,
  Ref,
  registerRootStore,
  rootRef,
  setGlobalConfig,
  tProp,
  types,
} from "mobx-keystone"
import { nanoid } from "nanoid";


setGlobalConfig({
  modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
})

const test  = () => {
  const baseLocalId = nanoid();
  const localId = 0;
  return `${localId.toString(36)}-${baseLocalId}`;
}

@model("todoSample/Todo")
export class Todo extends DataModel({
  id: tProp(types.string, () => test()),
  text: tProp(types.string), // a required string
  done: tProp(types.boolean, false), // an optional boolean that will default to false
}) {
  @modelAction
  setDone(done: boolean) {
    this.done = done
  }

  @modelAction
  setText(text: string) {
    this.text = text
  }

  getRefId = () => {
    return this.id
  }
}

export const todoRef = rootRef<ModelData<Todo>>("todoSample/TodoRef", {});


@model("todoSample/TodoList")
export class TodoList extends Model({
  todos:  prop<ModelData<Todo>[]>(() => []),
  selectedTodoRef: prop<Ref<ModelData<Todo>> | undefined>(),
}) {
  @computed
  get pending() {
    return this.todos.filter((t) => !t.done)
  }

  @computed
  get done() {
    return this.todos.filter((t) => t.done)
  }

  get selectedTodo() {
    const selectedTodoValue = this.selectedTodoRef
    return selectedTodoValue ? selectedTodoValue.current : undefined;
  }

  @modelAction
  add(todo: Todo) {
    this.todos.push(todo.$)
  }

  @modelAction
  selectTodo(todo: ModelData<Todo>) {
    console.log("mais nan", this.selectedTodo)

    const ref = todoRef(todo);
    this.selectedTodoRef = ref;
    console.log("mais nan2", this.selectedTodo)
  }

  @modelAction
  remove(todo: ModelData<Todo>) {
    const index = this.todos.indexOf(todo)
    if (index >= 0) {
      this.todos.splice(index, 1)
    }
  }
}

export function createRootStore(): TodoList {
  const rootStore = new TodoList({
    todos: [
      new Todo({ text: "make mobx-keystone awesome!" }).$,
      new Todo({ text: "spread the word" }).$,
      new Todo({ text: "buy some milk", done: true }).$,
    ],
  })

  registerRootStore(rootStore)

  return rootStore
}
