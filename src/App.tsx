import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
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

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { Header } from './components/Header/Header';
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

    return (


      <Layout>

        <Header />
        <Content style={{ padding: '0 20px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{
            padding: '10px 0',
            background: colorBgContainer,
            borderRadius: '10px',
          }}
          >
            <Sider style={{ background: colorBgContainer, }} width={200}>


              <Menu
                mode="inline"
                style={{
                  height: '100%',
                  margin: '0 10px'
                }}
              >

                <SubMenu key='sub1' icon={<UserOutlined />} title='My Profile'>
                  <Menu.Item key='1'><Link to="/profile"> Profile </Link></Menu.Item>
                  <Menu.Item key='2'><Link to="/dialogs"> Messages </Link></Menu.Item>
                  <Menu.Item key='3'><Link to="/github"> Github </Link></Menu.Item>
                  {/* <Menu.Item key='4'>option4</Menu.Item> */}
                </SubMenu>
                <SubMenu key='sub2' icon={<LaptopOutlined />} title='Developers'>
                  <Menu.Item key='5'><Link to="/users"> Users </Link></Menu.Item>
                  <Menu.Item key='6'><Link to="/chat"> Chat </Link></Menu.Item>
                  <Menu.Item key='7'><Link to="/game"> Game </Link></Menu.Item>
                </SubMenu>
                <Menu.Item key='8' icon={<NotificationOutlined />} >
                  <Link to="/settings" > Settings </Link>
                </Menu.Item>


              </Menu>


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
    <BrowserRouter basename="/">
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter >
  /* </React.StrictMode> */
  )
}

export default GpNetworkApp;
