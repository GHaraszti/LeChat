// import {handleActions, ActionMeta} from "redux-actions";

// const FETCH_COMMENTS = "comments/FETCH_COMMENTS";

// const fetchCommentsActionCreator = (comments:any) => {
//     return {
//         type: FETCH_COMMENTS,
//         comments
//     }
// };

// const reducer = handleActions({
//     [FETCH_COMMENTS]: (state:Object, action:any) => ({
//         ...state,
//         all: action.comments
//     })
// },{
//     comments: []
// });

// export {
//     fetchCommentsActionCreator,
//     reducer
// }

export default function comments(state = {}, action:any) {
    switch (action.type) {
        case 'FETCH_COMMENTS':
            console.log("Action received!!! fetchComments:", state);
            return {...action};
        case 'ADD_COMMENT':
            console.log("Action received!!! addComment", action);
            return {result: action.payload};
        default:
            return state
    }
}
  