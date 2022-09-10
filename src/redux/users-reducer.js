// import React from "react";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS ='SET_USERS'

let initialState = {
    users: [
        // { id: 5, followed: true, imgURL: 'https://android-obzor.com/wp-content/uploads/2022/02/24-7.jpg', name: 'Anton', status: 'text', locaction: { city: 'Moscow', country: 'Russia' } },
        // { id: 3, followed: false, imgURL: 'https://android-obzor.com/wp-content/uploads/2022/02/29-7.jpg', name: 'Aleksey', status: 'text', locaction: { city: 'Rostov-on-don', country: 'Russia' } }

    ]
};


const usersReducer = (state=initialState, action) => {
    switch (action.type) {
        case FOLLOW: 
            return {
                ...state,
                users: state.users.map (u=> {
                    if (u.id===action.userId) {
                        return {...u, followed: true}
                    }
                        return u;
                })
               
            };
                   

        case UNFOLLOW:
           return { 
            ...state,
            users: state.users.map (u => {
                if (u.id===action.userId) {
                    return {...u, followed: false}
                } else {
                    return u;
                }
            })
            
        };

        case SET_USERS: {
            return {...state, 
                users: [...state.users, ...action.users]
                
            }
        }
        default:
            return state;
  
    
    }
}

export const followAC = (userId) => ({ type: FOLLOW, userId })

export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })

export const setUsersAC = (users) => ({ type: SET_USERS, users})


export default usersReducer;