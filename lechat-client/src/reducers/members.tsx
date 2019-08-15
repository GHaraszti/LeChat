interface State {
    members?:any[]
}

export default function members(state:any[] = [], action:any) {
    switch (action.type) {
        case 'USER_RECEIVED':
            console.log("Action received!!! userReceived:", state, action);
            if(action.content){
                // if(!state.includes(action.content)){
                //     state.push(action.content);
                // }
                // return state.push(action.content);
                return action.content
            } else {
                console.log("something went wrong fetching:", action);
            }

            console.log("UPDATED state from members reducer: ", state);
            return state;
        // case 'UPDATE_MEMBER_LIST':
        //     console.log("Action received!!! updating member list:", state, action);
        //     return state;
        default:
            return state
    }
}
  