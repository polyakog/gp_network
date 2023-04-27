import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import ico from './assets/images/cloud-api.ico'
// import css from './../src/components/Nav/Nav.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { withRouter } from './hoc/withRouter';
import { initializeApp } from './redux/app-reducer';

// import NavContainer from './components/Nav/NavContainer';
import Preloader from './components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';
import Settings from './components/Content/Settings/Settings';

import { LaptopOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import { Header } from './components/Header/Header';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { Github } from './components/Content/Github/Github';
// import { ChatPage } from './pages/Chat/ChatPage';



// import ProfileContainer from './components/Content/Profile/ProfileContainer';
// import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
// import News from './components/Content/News/News';
// import Music from './components/Content/Music/Music';
// import { UsersPage } from './components/Content/Users/UsersContainer';
// import { LoginPage } from './components/Login/Login';




const LoginPage = React.lazy(
  () => import('./components/Login/Login').then(promise => ({ default: promise.LoginPage }))
);
const ProfileContainer = React.lazy(() => import('./components/Content/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Content/Dialogs/DialogsContainer'));
const UsersPage = React.lazy(() => import('./components/Content/Users/UsersContainer').then(promise => ({ default: promise.UsersPage })));
const News = React.lazy(() => import('./components/Content/News/News'));
const Music = React.lazy(() => import('./components/Content/Music/Music'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage').then(promise => ({ default: promise.ChatPage })));
const Game = React.lazy(() => import('./components/Content/Game/Game').then(promise => ({ default: promise.Game })));
const Github = React.lazy(() => import('./components/Content/Github/Github').then(promise => ({ default: promise.Github })));

// const Settings = React.lazy(() => import('./components/Content/Settings/Settings'));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const { Content, Footer, Sider } = Layout;

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {

    alert(`Some error \n --------------\n Name: ${e.reason.name} \n Description: ${e.reason.message}`)
  }


  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);

  }

  UNSAFE_componentWillMount() {
    this.props.initializeApp();
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader message='initialization (app) loading' />
    }

    const colorBgContainer = "#89c58ed1"

     type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[],
    ): MenuItem {
      return {
        key,
        icon,
        children,
        label,
      } as MenuItem;
    }

    function getSubitem(
      key: React.Key,
      label?: React.ReactNode,
      icon?: React.ReactNode,
      children?: React.ReactNode,
    ): MenuItem {
      return {
        key,
        icon,
        children,
        label,
      } as MenuItem;
    }

    const items: MenuItem[] = [
      getItem('My Profile', 'sub1', <UserOutlined />, [
        getSubitem('1', <Link to="/profile">Profile</Link>),
        getSubitem('2', <Link to="/dialogs"> Messages </Link>),
        getSubitem('3', <Link to="/github"> Github </Link>),
      ]),
      getItem('Developers', 'sub2', <LaptopOutlined />, [
        getSubitem('4', <Link to="/users"> Users </Link>),
        getSubitem('5', <Link to="/chat"> Chat </Link>),
        getSubitem('6', <Link to="/game"> Game </Link>),
      ]),
      getSubitem('7', <Link to="/settings" > Settings </Link>, <SettingOutlined />,),
    ];

    console.log(items)

    return (

      <Layout>

        <Helmet> {/* renaming title, changing icons etc */}
          {/* <title>Hello World</title> */}
          <link rel="icon" href={ico} />
        </Helmet>

        <Header />
        <Content style={{
          padding: '5px 10px',

        }}>
         
          <Layout style={{
            padding: '10px 0',
            boxSizing: 'border-box',
            background: colorBgContainer,
            borderRadius: '10px',
          }}
          >
            <Sider style={{
              margin: '0 10px',
              borderRadius: '5px',
              backgroundColor: colorBgContainer,
            }} width={180}>
              <Menu
                mode="inline"
                style={{
                  height: '100%',
                  backgroundColor: 'rgba(1, 15, 57, 0.15)',
                  borderRadius: '5px'
                }}
                items={items}
              />

            </Sider>
            <Content
              style={{
                padding: '0 15px',
                minHeight: 280,
              }}
            >
              {/* <div className="App-wrapper"> */}

              {/* <HeaderContainer />
                <NavContainer store={store} /> */}

              {/* <div className='App-wrapper-content'> */}
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
                  <Route path='chat' element={<ChatPage />} />
                  <Route path='game' element={<Game />} />
                  <Route path='github' element={<Github />} />
                  <Route path='*' element={<div>404 NOT FOUND</div>} />
                </Routes>
              </React.Suspense>
              {/* </div> */}
              {/* </div> */}


            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center', }}>
          API Social Network ©2023 Created by GP Production
        </Footer>
      </Layout>

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
  return (
    // <React.StrictMode> // строгий режим
    <HelmetProvider> {/* for title, icon */}
      <BrowserRouter basename="/">
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter >
    </HelmetProvider>
    /* </React.StrictMode> */
  )
}

export default GpNetworkApp;
