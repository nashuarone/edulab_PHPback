import React, { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import CoursesContainer from "./components/Courses/CoursesContainer";
import Profile from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import Login from "./components/Registration/Login";
import Disk from "./components/Disk/Disk"
import { useDispatch, useSelector } from 'react-redux';
import { authAPI } from './api/api';
import Admin from './components/Admin/Admin';

function App() {
  const isAuth = useSelector((s) => s.profilePage.isAuth);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authAPI());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div>
        <div className="app-wrapper">
          <Header />
          <Navbar />
          <div className="app-wrapper-content">
            {!isAuth ? (
              <Switch>
                <Route path="/registration" render={() => <Registration />} />
                <Route exact path="/login" render={() => <Login />} />
                <Redirect to="/login" />
              </Switch>
            ) : (
              <Switch>
                <Route path="/profile" render={() => <Profile />} />
                <Route path="/dialogs" render={() => <DialogsContainer />} />
                <Route path="/news" component={News} />
                <Route path="/courses" render={() => <CoursesContainer />} />
                <Route path="/disk" render={() => <Disk />} />
                <Route path="/admin" render={() => <Admin />} />
                <Redirect to="/profile" />
              </Switch>
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
