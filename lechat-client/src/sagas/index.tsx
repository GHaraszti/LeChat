import {put, takeEvery, all} from 'redux-saga/effects';
import {fetchPosts} from "../utilities/dbHelperFunctions";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* helloSaga():any{
    console.log('Hello sagas!');
}
function* incrementAsync(){
    console.log('Init: inc\n');
    yield delay(1000);
    console.log('Delayed: inc\n');
    yield put({type: 'INCREMENT'});
}

function* watchIncrementAsync(){
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

// function* watchNewComments(){
//     console.log("New comment detected.");
//     yield takeEvery('ADD_COMMENT', fetchComments);
// }

// function* fetchComments(){
//     console.log("Fetching comments...");
//     yield delay(1000);
//     // yield [
//     //     {username: "Pepe", text: "Hey Juanita, ontas"},
//     //     {username: "Juanita", text: "**Visto**"},
//     // ];
//     let comments = [
//             {username: "Pepe", text: "Hey Juanita, ontas"},
//             {username: "Juanita", text: "**Visto**"},
//         ];
//     yield put({type: 'FETCH_COMMENTS', content: comments });
// }

function* fetchDBPosts(){
    let fetched = yield fetchPosts();
    yield put({type: 'FETCH_COMMENTS', content: fetched.list });
}

export default function* rootSaga(){
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        // watchNewComments(),
        fetchDBPosts()
    ])
}