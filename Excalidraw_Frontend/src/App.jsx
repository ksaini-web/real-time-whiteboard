import {
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import CanvasBoard from "./components/CanvasBoard";
import Signup from "./pages/Signup";

import Login from "./pages/Login";
import CreateBoard from "./pages/CreateBoard";
import Landing from "./pages/Landing";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/canvas"
        element={<CanvasBoard />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route
      path="/login"
      element={<Login/>}
      />

      <Route path="/dashboard" element={<Dashboard/>}/>

      <Route
      path="/board/:boardCode"
      element={<CanvasBoard/>}
      />

      <Route
  path="/create-board"
  element={<CreateBoard />}
/>

    </Routes>
  );
}

export default App;
