import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, Routes, HashRouter, Navigate} from "react-router-dom";
import Music from "./components/Navbar/Music/Music";
import News from "./components/Navbar/News/News";
import Settings from "./components/Navbar/Settings/Settings";
import FindUsersContainer from "./components/Navbar/FindUsers/FindUsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader_2 from "./components/common/preloader/Preloader_2";
import {compose} from "redux";
import withRouter from "./withRouter";
import store from "./redux/ReduxStore";
import {withSuspense} from "./hoc/withSuspense";

const ProfileContainer = withSuspense(React.lazy(() => import('./components/Navbar/Profile/ProfileContainer.jsx')))
const DialogsContainer = withSuspense(React.lazy(() => import('./components/Navbar/Dialogs/DialogsContainer.jsx')))

class App extends React.Component {
    catchAllUnhandledErrors = (reason, promise) => {
        alert('Some error occured')
    }

    componentDidMount() { // происхоидит в первую очередь
        this.props.initializeApp(); // происхоидит инициализация приложения
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader_2/>;
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/Socialnetwork' element={<Navigate to={'/profile'}/>}/>
                        <Route path="/" element={<Navigate to={'/profile'}/>}/>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                        <Route path="/dialogs" element={<DialogsContainer/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/find_users" element={<FindUsersContainer/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<div>404 NOT FOUND</div>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
// хэш роутер нужен для github Pages, для остальных - BrowserRouter
export default MainApp;
