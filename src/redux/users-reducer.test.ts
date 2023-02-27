import usersReducer, { actions, InitialStateType } from "./users-reducer";

let state: InitialStateType 

beforeEach(()=>{
    state = {
        users: [{
            "name": "lastname2000", "id": 0, "uniqueUrlName": null,
            "photos": { "small": null, "large": null }, "status": 'status 0', "followed": false
        },
            {
                "name": "lionariman", "id": 1, "uniqueUrlName": null,
                "photos": { "small": null, "large": null }, "status": 'status 1', "followed": false
            },
            {
                "name": "Lord_KRONOS", "id": 2, "uniqueUrlName": null,
                "photos": { "small": null, "large": null }, "status": 'status 2', "followed": true
            },
            {
                "name": "GeniouS", "id": 3, "uniqueUrlName": null,
                "photos": { "small": null, "large": null }, "status": 'status 3', "followed": true
            }],
        pageSize: 10,
        totalUsersCount: 3,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }    
})


test(`test_1 array length of users should be 3`, () => {
    /* 1. test data */
    const users = [
        {
            "name": "lastname2000", "id": 0, "uniqueUrlName": null,
            "photos": { "small": null, "large": null }, "status": 'status 0', "followed": false
        },
        {
            "name": "lionariman", "id": 1, "uniqueUrlName": null,
            "photos": { "small": null, "large": null }, "status": 'status 1', "followed": false
        },
        {
            "name": "Lord_KRONOS", "id": 2, "uniqueUrlName": null,
            "photos": { "small": null, "large": null }, "status": 'status 2', "followed": true
        }
    ]

    let action = actions.setUsers(users)

    /* 2. test action */
    let newState = usersReducer(state, action)

    /* 3. test expectation: length NaN */
    expect(newState.users.length).toBe(3);
});

test(`test_2 follow success`, () => {
    /* 1. test data */
  
    let action = actions.followSuccess(1)

    /* 2. test action */
    let newState = usersReducer(state, action)

    /* 3. test expectation: length NaN */
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});
test(`test_3 unfollow success`, () => {
    /* 1. test data */
    let action = actions.unfollowSuccess(3) 

    /* 2. test action */
    let newState = usersReducer(state, action)

    /* 3. test expectation: length NaN */
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});