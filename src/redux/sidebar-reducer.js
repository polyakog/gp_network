

let initialState = {

    friendsData: {
        friendsId1: [
            { id: 2, name: "Sergey" },
            { id: 3, name: "Alexey" },
            { id: 5, name: "Dhaval" },
        ],
        friendsId2: [
            { id: 1, name: "Gennadij" },
            { id: 4, name: "Anton" },
            { id: 3, name: "Alexey" },
        ],

    }


}

const sidebarReducer = (state = initialState,action) =>{
    return state;
}

export default sidebarReducer