import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { withRouter } from './hoc/withRouter';
import { initializeApp } from './redux/app-reducer';
import HeaderContainer from './components/Header/HeaderContainer';
import NavContainer from './components/Nav/NavContainer';
import Preloader from './components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';

// import ProfileContainer from './components/Content/Profile/ProfileContainer';
// import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
// import UsersContainer2 from './components/Content/Users/UsersContainer';
// import News from './components/Content/News/News';
// import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
// import { UsersPage } from './components/Content/Users/UsersContainer';
// import { Login } from './components/Login/Login';


const LoginPage = React.lazy(
  () => import('./components/Login/Login').then(promise => ({ default: promise.LoginPage }))
  );
const ProfileContainer = React.lazy(() => import('./components/Content/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Content/Dialogs/DialogsContainer'));
const UsersPage = React.lazy(() => import('./components/Content/Users/UsersContainer').then(promise => ({default:promise.UsersPage})));
const News = React.lazy(() => import('./components/Content/News/News'));
const Music = React.lazy(() => import('./components/Content/Music/Music'));
// const Settings = React.lazy(() => import('./components/Content/Settings/Settings'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: ()=>void
}

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {

    alert(`Some error \n --------------\n Name: ${e.reason.name} \n Description: ${e.reason.message}`)
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillMount() {
    this.props.initializeApp();
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {


    if (!this.props.initialized) {
      return <Preloader message='initialization (app) loading' />
    }


    return (
      <div className="App-wrapper">

        <HeaderContainer />
        <NavContainer store={store} />

        <div className='App-wrapper-content'>
          <React.Suspense fallback={<div><Preloader message='suspensed component loading' /></div>}>
            <Routes>
              <Route path='/' element={<ProfileContainer />} />
              <Route path='/gp_network' element={<ProfileContainer />} />
              <Route path='profile' element={<ProfileContainer />} >
                <Route path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route path='dialogs/*' element={<DialogsContainer />} />
              <Route path='news' element={<News />} />
              <Route path='music' element={<Music />} />
              <Route path='users' element={<UsersPage pageTitle='Users' />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='settings' element={<Settings />} />
              <Route path='*' element={<div>404 NOT FOUND</div>} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    );

  }

}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }),

)(App);


const GpNetworkApp: React.FC = () => {
  return <React.StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter >
  </React.StrictMode>

}

export default GpNetworkApp;
