import React from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";



const Users = ({ totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props }) => {

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