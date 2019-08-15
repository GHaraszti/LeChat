// import {handleActions, ActionMeta} from "redux-actions";
export default function convos(state = {}, action:any) {
    switch (action.type) {
        case 'ADD_CONVO':
            console.log("Action received!!! addConvo", state);
            return state;
        default:
            return state
    }
}
  