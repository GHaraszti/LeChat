import {put, takeEvery, all, takeLatest} from 'redux-saga/effects';
import {fetchPosts, addPost} from "../utilities/dbHelperFunctions";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* incrementAsync(){
    console.log('Init: inc\n');
    yield delay(1000);
    console.log('Delayed: inc\n');
    yield put({type: 'INCREMENT'});
}

function* watchIncrementAsync(){
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

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

function* addDBPost(){
    yield takeEvery('ADD_COMMENT', function* (action:any){
        console.log("SAGAS[addDBPost]: ", action.payload);
        let payload = yield addPost(action.payload);

        // yield addStorePost(payload);
        //yield put({type: "NEW_COMMENT"});
        //yield broadcastPost();
        //console.log("SAGAS New comment added? ", payload);
        yield fetchDBPosts();
        //yield console.log("SOCKET: ", action.socket);
        //yield box.socket.emit("broadcastPost");
        // yield put({type: BROADCAST_COMMENT})
    });
}

function* broadcastPost(){

    yield takeEvery("BROADCAST_COMMENT", (action:any)=>{
        console.log("SAGAS Broadcasting new message.", action.socket);
        action.socket.emit("broadcastPost");
    });
}

function* newPost(){
    yield takeEvery("NEW_COMMENT", function* (){
        console.log("SAGAS New post");
        //yield delay(2000);
        yield fetchDBPosts();
    });
}

function* watchNewComments(){
    console.log("SAGAS New comment detected.");
    yield takeEvery('NEW_COMMENT', fetchDBPosts);
}

export default function* rootSaga(){
    yield all([
        //watchIncrementAsync(),
        // watchNewComments(),
        fetchDBPosts(),
        addDBPost(),
        newPost(),
        broadcastPost()
    ])
}