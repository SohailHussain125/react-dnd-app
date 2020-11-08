import "./App.css";
// import {Simpledrag} from "./component/Simpledrag/index";
// import {Board} from "./component/Board/index";
import { DrazzlingListDrag } from "./component/DrazzlingListDrag/index";

import { Header } from "./component/layout/Header.js";

function App() {
  return (
    <div className="App">
      <Header />
      <DrazzlingListDrag />
    </div>
  );
}

export default App;
