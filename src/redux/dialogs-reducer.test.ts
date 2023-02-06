import { DialogDataType, MessageDataType } from "../types/types";
import dialogsReducer, { actions } from "./dialogs-reducer";

let state = {
    dialogData: [
        { id: 1, name: "Gennadij" },
        { id: 2, name: "Sergey" },
        { id: 3, name: "Alexey" },
        { id: 4, name: "Anton" },
        { id: 5, name: "Jhon" },
        { id: 6, name: "David" }
    ] as Array<DialogDataType>,
    messageData: [
        { id: 2, idMessage: 1, name: "Sergey", text: "Hi, I have a request from the customer" },
        { id: 1, idMessage: 2, name: "Gennadij", text: "happy to hear" },
        { id: 2, idMessage: 3, name: "Sergey", text: "What is your plans?" },
        { id: 1, idMessage: 4, name: "Gennadij", text: "preparation" }
    ] as Array<MessageDataType>,
}
let text = 'new message'


it('test_1 length of messages should be incremented', () => {
    /* 1. test data */
    let action = actions.sendMessage(text)

    /* 2. test action */
    let newState = dialogsReducer(state, action)

    /* 3. test expectation: measage array increase*/
    expect(newState.messageData.length).toBe(5);
});

test('test_2 length of messages should be decremented', () => {
    /* 1. test data */
    let action = actions.deleteMessage(2);

    /* 2. test action */
    let newState = dialogsReducer(state, action);

    /* 3. test expectation: measage array increase*/
    expect(newState.messageData.length).toBe(3);
});

test(`test_3 length of messages shouldn't be decremented if wrong postId`, () => {
    /* 1. test data */
    let action = actions.deleteMessage(100);

    /* 2. test action */
    let newState = dialogsReducer(state, action);

    /* 3. test expectation */
    /* after deleting length of posts shouldn't be decremented if postId is incorrect */
    expect(newState.messageData.length).toBe(4);
});