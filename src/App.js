import "./App.css";
import Header from "./components/Header";
import MainArea from "./components/MainArea";
import Quote from "./components/Quote";

function App() {
  return (
    <div className="app">
      <div className="app__overlay"></div>
      <Header />
      <MainArea />
      <Quote />
    </div>
  );
}

export default App;
