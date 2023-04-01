import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeightCalculator from "./routes/WeightForm/weightCalculator";
import Advise from "./routes/advise/Advise";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<WeightCalculator />} />
          <Route path={"/advise"} element={<Advise />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
