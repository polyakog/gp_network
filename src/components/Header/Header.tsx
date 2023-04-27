import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import css from './Header.module.css';
import noPic from '../../assets/images/noPic.jpg'
import logo from '../../assets/images/API_logo2.png'
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'antd/es/grid';
import { Avatar, Space } from 'antd';
import { GithubOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { selectIsAuth, selectCurrentUserLogin, selectCurrentUserId, selectCurrentUserPhoto } from './../../redux/auth-selectors';
import { AppDispatchType } from "../../redux/redux-store";
import { logout } from "../../redux/auth-reducer";


type PropsType = {

}

export const Header: React.FC<PropsType> = (props) => {

  const login = useSelector(selectCurrentUserLogin)
  const isAuth = useSelector(selectIsAuth)
  const userId = useSelector(selectCurrentUserId)
  const userPhoto = useSelector(selectCurrentUserPhoto)

  const dispatch: AppDispatchType = useDispatch()

  const logoutCallBack = () => {

    dispatch(logout())
  }

  const { Header } = Layout;
  const urlNoPic = noPic;
  const urlLogo = logo;


  return (<div className={css.header}>
    {/* <header className={css.subheader}> */}

    <Header className="header">
      
      <div className={css.logo} > 
        <img src={urlLogo} alt="logo" />
      </div>
      <div className={css.wrapper_Menu_UserData}>
        <Row align="middle">
          <div className={css.menu}>
            <Col flex={'300px'}>
              <Menu theme="dark" mode="horizontal"
              // defaultSelectedKeys={['2']}
              // items={items1} 
              >
                <Menu.Item key='1' icon={<UsergroupAddOutlined/>} ><NavLink to="/users"> Users </NavLink></Menu.Item>
                <Menu.Item key='2' icon={<GithubOutlined />}><NavLink to="/github"> Github </NavLink></Menu.Item>
                
              </Menu>
            </Col>
          </div>

        
          <Col flex={'auto'} push={2} >
          {isAuth
            ? (<div className={css.userData}>
              <Space size={5}>
                <Avatar src={<img src={!userPhoto ? urlNoPic : userPhoto} alt="avatar" />} />
                <div className={css.userName}> Login: {login} / ID: {userId} </div>
                <button onClick={logoutCallBack}>Log out</button>
              </Space>
            </div>)
            : <div>
              <Space size={5}>
                <div className={css.userName}>
                  <span>Please login </span>
                </div>
                <NavLink to={'/login/'} className={css.login}>LOGIN</NavLink>

              </Space>

            </div>
          }

        </Col>
        </Row>             
      </div>
      
    </Header>



    <h1 className={css.subheader_name}>API Social Network</h1>
    {/* 
    {isAuth
      ? (<div className={css.userData}>
        <div className={css.userLogBut}>
          <img className={css.userPhoto} src={!userPhoto ? noPic : userPhoto} alt="avatar" />
          <button onClick={props.logout}>Log out</button>
        </div>

        <div className={css.userName}>
          <span>Login: {login} / ID: {userId} </span>
        </div>
      </div>)
      : (<div>
        <NavLink to={'/login/'} className={css.login}>LOGIN</NavLink>
        <div className={css.userName}>
          <span>Please login </span>
        </div>
      </div>)
      
    } */}


    {/* </header > */}
  </div>


  );
}

