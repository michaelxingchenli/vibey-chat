import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { useStateValue } from "../StateProvider";

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">{/*<Chat />*/}</Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
