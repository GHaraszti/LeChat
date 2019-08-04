import {put, takeEvery, all, fork} from 'redux-saga/effects';
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

// function* fetchDBPosts(){
//     let fetched = yield fetchPosts();
//     yield put({type: 'FETCH_COMMENTS', content: fetched.list });
// }



function* fetchDBPosts(){
    yield takeEvery('FETCH_COMMENTS', function*(action:any){
        console.log("SAGAS: fetching posts for convo: ", action)
        let fetched = yield fetchPosts(action.content.convoID);
        yield put({type: 'COMMENTS_RECEIVED', content: fetched.list });
    })
}

function* addDBPost(){
    yield takeEvery('ADD_COMMENT', function* (action:any){
        console.log("SAGAS[addDBPost] action content: ", action.content);
        let payload = yield addPost(action.content.post);

        //let fetched = yield fetchPosts(action.payload.convoID);

        yield put({type: 'FETCH_COMMENTS', content: {convoID: action.content.post.convoID} });
        //yield console.log("SOCKET: ", action.socket);
        yield action.socket.emit("broadcastPost", {convoID: action.content.post.convoID});
        //yield put({type: "BROADCAST_COMMENT", socket: action.socket})
    });
}

function* broadcastPost(){

    yield takeEvery("BROADCAST_COMMENT", (action:any)=>{
        console.log("SAGAS Broadcasting new message.", action);
        action.socket.emit("broadcastPost", action.content.convoID);
    });
}

function* newPost(){
    yield takeEvery("NEW_COMMENT", function* (action:any){
        console.log("SAGAS New post");
        //yield delay(2000);
        yield put({type: 'FETCH_COMMENTS', content: {convoID: action.content.convoID} });
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