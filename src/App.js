import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./Components/layout";
import Login from "./feature/login/login";
import PrivateRoute from "./routers/privatedRoute";
import PublicRoute from "./routers/publicRoute";
// import Task from "./feature/task/Task";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route element={<PrivateRoute />}>
            <Route path="home/*" element={<Layout />} exact />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/account/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
      {/* <Task /> */}
    </div>
  );
};

export default App;
