import { Routes, Route } from "react-router-dom";
import SQLPracticeApp from "./components/SQLPracticeApp";
import SQLEditor from "./components/SQLEditor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SQLPracticeApp />} />
      <Route path="/assignment/:id" element={<SQLEditor />} />
    </Routes>
  );
}

export default App;
