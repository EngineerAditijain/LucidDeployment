import './App.css'
import Homepage from "./components/homepage/homepage"
import Login from "./components/login/login"
import Register from "./components/register/register"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useState } from 'react';
import AddUser from './components/subdomain/addsubdomain';
import SideBar from './components/Header/sidebar';

function App() {
  const [loginUser, setLoginUser] = useState(null); 

  // Function to store token in local storage
  const storeToken = (token) => {
    localStorage.setItem('token', token);
  };
  const token = localStorage.getItem('token');
  // Function to check if sidebar should be shown
  const showSidebar = () => {
    return token;
  };

  return (
    <div className="App flex flex-col">
      <Router>
        <div className='flex flex-row h-full items-center justify-center'>
          {showSidebar() && <SideBar />}
          <Switch>
            <Route exact path="/">
              {token && loginUser ? <Redirect to="/home" /> : <Redirect to="/login" />}
            </Route>
            <Route path="/home">
            <Homepage setLoginUser={setLoginUser} user={loginUser} />
            </Route>
            <Route path="/login">
              <Login setLoginUser={setLoginUser} storeToken={storeToken} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/add">
              <AddUser />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
