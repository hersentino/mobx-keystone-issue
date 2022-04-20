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

const createId = () => {
  const baseLocalId = nanoid();
  const localId = 0;
  return `${localId.toString(36)}-${baseLocalId}`;
}

@model("todoSample/Todo")
export class Todo extends DataModel({
  id: tProp(types.string, () => createId()),
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
}

export const todoRef = rootRef<ModelData<Todo>>("todoSample/TodoRef", {
  getId(maybeTodo: any) {
    return maybeTodo.$modelType === undefined && maybeTodo.id !== undefined ? maybeTodo.id : undefined
  }
});


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
    return selectedTodoValue ? selectedTodoValue.maybeCurrent : undefined;
  }

  @modelAction
  add(todo: Todo) {
    this.todos.push(todo.$)
  }

  @modelAction
  selectTodo(todo: ModelData<Todo>) {
    const ref = todoRef(todo);
    this.selectedTodoRef = ref;
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
