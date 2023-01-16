import React, { FC } from "react";
import { UserType } from "../../../types/types";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pages: number) => void
    users: Array<UserType>

    followingInProgress: Array<number>
    follow: (id:number) => void
    unfollow: (id:number) => void

}

const Users: FC<UsersPropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props }) => {

    return (
        <div >
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />

            {users.map(u => <User user={u}
                followingInProgress={props.followingInProgress}
                unfollow={props.unfollow}
                follow={props.follow}
                key={u.id}
            />
            )}
        </div>
    )
}


export default Users;