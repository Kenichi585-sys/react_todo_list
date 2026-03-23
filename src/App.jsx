import Title from "./Title";
import TodoContainer from "./components/TodoContainer";

function App() {
  return (
    <div id="root">
      <Title text="ToDo List" />
      <TodoContainer />
    </div>
  );
}

export default App;
