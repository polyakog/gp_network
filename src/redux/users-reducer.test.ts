import { UserType } from "../types/types";
import usersReducer, { actions} from "./users-reducer";

let state = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}

let users = [
    {
        "name": "lastname2000",
        "id": 26561,
        "uniqueUrlName": null,
        "photos": {
            "small": null,
            "large": null
        },
        "status": null as null|string,
        "followed": false
    },
    {
        "name": "lionariman",
        "id": 26532,
        "uniqueUrlName": null,
        "photos": {
            "small": null,
            "large": null
        },
        "status": null as null | string,
        "followed": false
    },
    {
        "name": "Lord_KRONOS",
        "id": 26531,
        "uniqueUrlName": null,
        "photos": {
            "small": null,
            "large": null
        },
        "status": null as null | string,
        "followed": false
    }

] 

test(`test_1 array length of users should be 3`, () => {
    /* 1. test data */

    let action = actions.setUsers(users)
 
    /* 2. test action */
    let newState = usersReducer(state, action)

    /* 3. test expectation: length NaN */
    expect(newState.users.length).toBe(3);
});