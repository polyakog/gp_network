import { APIResponseType, ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/user-api";
import { actions, follow, unfollow } from "./users-reducer";

jest.mock('../api/user-api') // ставим заглушку на API запрос
const usersAPI_Mock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}

const userID = 1
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach (()=>{
    dispatchMock.mockClear()
    getStateMock.mockClear()
})


test(`test_1 success of follow thunk dispatch`, async () => {
    /* 1. test data */
    const thunk = follow(userID)
 
    usersAPI_Mock.followUsers.mockReturnValue(Promise.resolve(result))
    /* 2. test action */
    await thunk(dispatchMock, getStateMock, {})

    /* 3. test expectation: */
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgess(true, userID))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgess(false, userID))
});
test(`test_2 success of unfollow thunk dispatch`, async () => {
    /* 1. test data */
     const thunk = unfollow(userID)

    usersAPI_Mock.unfollowUsers.mockReturnValue(Promise.resolve(result))
    /* 2. test action */
    await thunk(dispatchMock, getStateMock, {})

    /* 3. test expectation: */
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgess(true, userID))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgess(false, userID))
});