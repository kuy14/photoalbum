import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./features/login/containers/LoginPage";
import AlbumPage from "./features/album/containers/AlbumPage";
import PhotoPage from "./features/photo/containers/PhotoPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/album">
            <AlbumPage />
          </Route>
          <Route path="/photo/:id">
            <PhotoPage />
          </Route>
          <Route path="/">
            <Redirect to={{ pathname: "/login" }} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
