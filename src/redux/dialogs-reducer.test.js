import dialogsReducer, { deleteMessage, sendMessageActionCreator, testMessageState } from "./dialogs-reducer";

let state = testMessageState.initialState
let text = 'new message'


test('test_1 length of messages should be incremented', () => {
    /* 1. test data */
    let action = sendMessageActionCreator(text)

    /* 2. test action */
    let newState = dialogsReducer(state, action)

    /* 3. test expectation: measage array increase*/
    expect(newState.messageData.length).toBe(5);
});

test('test_2 length of messages should be decremented', () => {
    /* 1. test data */
    let action = deleteMessage(2);

    /* 2. test action */
    let newState = dialogsReducer(state, action);

    /* 3. test expectation: measage array increase*/
    expect(newState.messageData.length).toBe(3);
});

test(`test_3 length of messages shouldn't be decremented if wrong postId`, () => {
    /* 1. test data */
    let action = deleteMessage(100);

    /* 2. test action */
    let newState = dialogsReducer(state, action);

    /* 3. test expectation */
    /* after deleting length of posts shouldn't be decremented if postId is incorrect */
    expect(newState.messageData.length).toBe(4);
});