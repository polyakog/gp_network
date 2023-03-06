import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from './../../common/Preloader/Preloader';
import css from './Users.module.css';
import { getIsFetching } from '../../../redux/users-selectors';
import { Users } from './Users';


type UsersPagePropsType = {
    pageTitle: string,

}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <div className={css.main}>
        <h2>{props.pageTitle}</h2>
        {/* Выбираем показ Loading (пока не загрузились данные) или демонстрацию юзерс */}
        {isFetching ? <Preloader /> : null}
        <Users />

    </div>
}

// export default UsersPage