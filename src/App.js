import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import News from './components/Content/News/News';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import NavContainer from './components/Nav/NavContainer';
import UsersContainer2 from './components/Content/Users/UsersContainer';
import Login from './components/Login/Login';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect} from 'react-redux/es/exports';
import { Provider } from 'react-redux';
import { withRouter } from './hoc/withRouter';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';



class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader message='initialization (app) loading' />
    }


    return (
      <div className="App-wrapper">

        <HeaderContainer />
        <NavContainer store={this.props.store} />


        <div className='App-wrapper-content'>
          <Routes>
            <Route path='/' element={<ProfileContainer />} />
            <Route path='profile' element={<ProfileContainer />} >
              <Route path=':userId' element={<ProfileContainer />} />
            </Route>
            <Route path='dialogs/*' element={<DialogsContainer />} />
            <Route path='news' element={<News />} />
            <Route path='music' element={<Music />} />
            <Route path='users' element={<UsersContainer2 />} />

            <Route path='settings' element={<Settings />} />
            <Route path='login' element={<Login />} />


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
  connect(mapStateToProps, { initializeApp }),

)(App);


const GpNetworkApp = (props) =>{
  return <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter >
  </React.StrictMode>

}

export default GpNetworkApp;
