export default function comments(state = {}, action:any) {
    switch (action.type) {
        case 'COMMENTS_RECEIVED':
            console.log("Action received!!! commentsReceived:", state, action);
            if(!action.content){
                console.log("something went wrong fetching:", action);

                return state;
            }
            return action.content;
        case 'ADD_COMMENT':
            console.log("Action received!!! addComment", state);
            return state;
        case 'SEND_COMMENT':
            console.log("Action received!!! sendComment", state);
            return {...action};
        case 'NEW_COMMENT':
            console.log("Action received!!! newComment", state);
            if(!action.content){
                console.log("something went wrong fetching while new message:", action);

                return state;
            }
            return action.content;
        case 'BROADCAST_COMMENT':
                console.log("Action received!!! broadcastComment", state);
                return state;
        default:
            return state
    }
}
  