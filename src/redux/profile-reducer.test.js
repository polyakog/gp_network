import profileReducer, { actions } from "./profile-reducer";

let state = {
    postData: [
        { id: 1, postId: 1, message: 'Very interesting', likeCount: 21, Name: 'Alexey' },
        { id: 2, postId: 2, message: 'How to add data?', likeCount: 2, Name: 'Anton' },
        { id: 2, postId: 3, message: 'OK', likeCount: 3, Name: 'Anton' },
    ],
};

let text = "test"

test('test_1 length of posts should be incremented', () => {
    /* 1. test data */
    let action = actions.addPostActionCreator(text)
    
    /* 2. test action */
    let newState = profileReducer(state, action) 

    /* 3. test expectation */
    expect(newState.postData.length).toBe(4);
    
});

test('test_2 message of a new post should be correct', () => {
    /* 1. test data */
    let action = actions.addPostActionCreator(text)

    /* 2. test action */
    let newState = profileReducer(state, action)

    /* 3. test expectation */
    expect(newState.postData[3].message).toBe(text);
});

test('test_3 length of posts should be decremented(decreased) if correct postId', () => {
    /* 1. test data */
    let action = actions.deletePost(1);

    /* 2. test action */
    let newState = profileReducer(state, action);

    /* 3. test expectation */
    expect(newState.postData.length).toBe(2);
});

test(`test_4 length of posts shouldn't be decremented if wrong postId`, () => {
    /* 1. test data */
    let action = actions.deletePost(1000);

    /* 2. test action */
    let newState = profileReducer(state, action);

    /* 3. test expectation */
    /* after deleting length of posts shouldn't be decremented if postId is incorrect */
    expect(newState.postData.length).toBe(3);
});