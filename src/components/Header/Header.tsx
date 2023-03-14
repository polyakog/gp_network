import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import css from './Header.module.css';
import noPic from '../../assets/images/noPic.jpg'
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'antd/es/grid';
import { Avatar, Space } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
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
  const url = noPic;

  return (<div className={css.header}>
    {/* <header className={css.subheader}> */}

    <Header className="header">
      <div className="logo" />
      <Row align="middle">
        <Col flex='auto'>
          <Menu theme="light" mode="horizontal"
          // defaultSelectedKeys={['2']}
          // items={items1} 
          >
            <Menu.Item key='1' icon={<LaptopOutlined />}><NavLink to="/users"> Users </NavLink></Menu.Item>
          </Menu>
        </Col>
        <Col flex="300px" push={1} >

          {isAuth
            ? (<div className={css.userData}>
              <Space size={5}>
                <Avatar src={<img src={!userPhoto ? url : userPhoto} alt="avatar" />} />
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

