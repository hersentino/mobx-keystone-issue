import { ModelData } from "mobx-keystone"
import { observer } from "mobx-react"
import React, { useState } from "react"
import { createRootStore, Todo, TodoList } from "./store"

// we use mobx-react to connect to the data, as it is usual in mobx
// this library is framework agnostic, so it can work anywhere mobx can work
// (even outside of a UI)

const App = observer(() => {
  const [rootStore] = useState(() => createRootStore())

  return (
    <>
      <TodoListView list={rootStore} />
      <br />
    </>
  )
})

export default App;

export const TodoListView = observer(({ list }: { list: TodoList}) => {
  const [newTodo, setNewTodo] = React.useState("")

  const renderTodo = (todo: ModelData<Todo>) => (
    <TodoView
      id={todo.id}
      key={todo.id}
      done={todo.done}
      text={todo.text}
      onClick={() => {
        todo.done = !todo.done
      }}
      onRemove={() => list.remove(todo)}
      selectTodo={() => list.selectTodo(todo)}
    />
  )

  return (
    <div>
      <div>
        {list.selectedTodo !== undefined ? 
            <>
              the id of selected todo id : {list.selectedTodo.text}
            </>
          :
            <>no selected todo</>
        }
      </div>
      {list.pending.length > 0 && (
        <>
          <h5>TODO</h5>
          {list.pending.map((t) => renderTodo(t))}
        </>
      )}

      {list.done.length > 0 && (
        <>
          <h5>DONE</h5>
          {list.done.map((t) => renderTodo(t))}
        </>
      )}
      <br />
      <input
        value={newTodo}
        onChange={(ev) => {
          setNewTodo(ev.target.value || "")
        }}
        placeholder="I will..."
      />
      <button
        onClick={() => {
          list.add(new Todo({ text: newTodo }))
          setNewTodo("")
        }}
      >
        Add todo
      </button>
    </div>
  )
})

function TodoView({
  done,
  text,
  onClick,
  onRemove,
  selectTodo,
  id,
}: {
  done: boolean
  text: string
  onClick(): void
  onRemove(): void
  selectTodo(): void
  id: string
}) {
  return (
    <div style={{ cursor: "pointer" }}>
      <span
        onClick={onClick}
        style={{
          textDecoration: done ? "line-through" : "inherit",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "1.5rem",
            textAlign: "center",
            marginRight: 8,
          }}
        >
          {done ? "✔️" : "👀"}
        </span>
        {text}{" "}
        {`(${id})`}
      </span>
      <span onClick={onRemove} style={{ marginLeft: 16 }}>
        ❌
      </span>
      <span onClick={selectTodo} style={{ marginLeft: 16 }}>
        select me
      </span>
    </div>
  )
}