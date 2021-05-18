import React, { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import News from "./components/News/News";
import CoursesContainer from "./components/Courses/CoursesContainer";
import Profile from './components/Profile/Profile';
import { RegistrationForm } from './components/Registration/RegistrationForm';
import Login from "./components/Registration/Login";
import Disk from "./components/Disk/Disk"
import { useDispatch, useSelector } from 'react-redux';
import { authAPI } from './api/api';
import Admin from './components/Admin/Admin';
import ProfileInfoEdit from "./components/Profile/ProfileInfo/ProfileInfoEdit/ProfileInfoEdit";
import EditCourse from "./components/Courses/EditCourse";
import Mycourses from "./components/Courses/Mycourses";
import CourseItem from "./components/Courses/CourseItem/CourseItem";
import ChapterItem from "./components/Courses/CourseItem/ChapterItem";
import Users from './components/Users/Users';
import CourseCertificate from './components/Courses/CourseCertificate';
import CreateTheme from './components/Courses/CourseItem/CreateTheme';

function App() {
  const isAuth = useSelector((s) => s.profilePage.isAuth);
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("token")) {
      dispatch(authAPI());
    }
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
                <Route exact path="/login" render={() => <Login />} />
                <Route path="/registration" render={() => <RegistrationForm />} />
                <Redirect to="/login" />
              </Switch>
            ) : (
              <>
                <Switch>
                  <Route path="/profile/:userId?" render={() => <Profile />} />
                  <Route path="/dialogs" render={() => <DialogsContainer />} />
                  <Route path="/news" component={News} />
                  <Route path="/courses" render={() => <CoursesContainer />} />
                  <Route path="/course/:courseId/chapter/:chapterId?" render={() => <ChapterItem />} />
                  <Route path="/course/:courseId?" render={() => <CourseItem />} />
                  <Route path="/mycourses" render={() => <Mycourses />} />
                  <Route path="/mycourse/certificate/:courseId?" render={() => <CourseCertificate />} />
                  <Route path="/disk" render={() => <Disk />} />
                  <Route path="/admin" render={() => <Admin />} />
                  <Route path="/users" render={() => <Users />} />
                  <Route path="/profileditor" render={() => <ProfileInfoEdit />} />
                  <Route path="/courseditor" render={() => <EditCourse />} />
                  <Route path="/themeditor" render={() => <CreateTheme />} />
                  <Redirect to="/profile" />
                </Switch>
              </>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
