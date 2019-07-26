export default function sockets(state = {}, action:any) {
    switch (action.type) {
        case 'MESSAGE_RECEIVED':
            console.log("Action received!!! fetchComments:", state);
            return {...action};
        case 'MESSAGE_RECEIVED':
                console.log("Action received!!! fetchComments:", state);
                return {...action};
        default:
            return state
    }
}
  