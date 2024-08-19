import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import Music from "./components/Navbar/Music/Music";
import News from "./components/Navbar/News/News";
import Settings from "./components/Navbar/Settings/Settings";
import DialogsContainer from "./components/Navbar/Dialogs/DialogsContainer";
import FindUsersContainer from "./components/Navbar/FindUsers/FindUsersContainer";
import ProfileContainer from "./components/Navbar/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = () => {
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                    <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/find_users" element={<FindUsersContainer/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
