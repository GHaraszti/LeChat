import {put, takeEvery, all, fork} from 'redux-saga/effects';
import {fetchPosts, addPost, fetchUser,  fetchConvos, addConvo} from "../utilities/dbHelperFunctions";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* fetchDBPosts(){
    yield takeEvery('FETCH_COMMENTS', function*(action:any){
        console.log("SAGAS: fetching posts for convo: ", action)
        let fetched = yield fetchPosts(action.content.convoID);
        yield put({type: 'COMMENTS_RECEIVED', content: fetched.list });
    })
}

function* fetchDBUser(){
    yield takeEvery('FETCH_USER', function*(action:any){
        console.log("SAGAS: fetching user with email: ", action)
        let fetched = yield fetchUser(action.content.email);
        console.log("Fetched data: ", fetched);
        yield put({type: 'USER_RECEIVED', content: fetched.user });
    })
}

function* fetchDBConvos(){
    yield takeEvery('FETCH_CONVOS', function*(action:any){
        console.log("SAGAS: fetching posts for convo: ", action)
        let fetched = yield fetchConvos(action.content.email);
        yield put({type: 'CONVOS_RECEIVED', content: fetched.list });
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

function* addDBConvo(){
    yield takeEvery('ADD_CONVO', function* (action:any){
        console.log("SAGAS[addDBConvo] action content: ", action.content);
        let payload = yield addConvo(action.content.convo);

        let fetched = yield fetchConvos(action.content.createdBy.email);

        yield put({type: 'FETCH_CONVOS', content: {email: action.content.createdBy.email} });

        // yield action.socket.emit("broadcastPost", {convoID: action.content.post.convoID});
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

function* memberAdded(){
    yield takeEvery("MEMBER_ADDED", function* (action:any){
        console.log("SAGAS member added to list");
        //yield delay(2000);
        yield put({type: 'UPDATE_MEMBER_LIST'});
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
        fetchDBUser(),
        fetchDBConvos(),
        addDBPost(),
        addDBConvo(),
        newPost(),
        broadcastPost()
    ])
}