import axios from "axios";
import {getToken} from "./authHelperFunctions";

const url = "http://localhost:3000";

const fetchPosts = (convoID:string) =>{
    console.log("????????????????:", getToken(window.document.cookie));
    console.log("fetching comments for convo: ", convoID);
    return axios.get(
        url + '/api/posts/' + convoID,
        {withCredentials: true}
    ).then(
        function(response:any){
        let list = response.data.posts;
        console.log("GET Posts: response: ", list);

        return {list, success: true};
    },
        function(response:any){

        console.log("FAIL: Coud not retrieve posts");
        return {success: false};
    });
}

const addPost = (post:object) => {
    return axios.post(
        url + '/api/post',
        {...post},
        {withCredentials: true}
    ).then(
        function(response:any){
            return {success: true};
        },
        function(){

        }
    )
}

const fetchUser = (email:string) =>{
    console.log("fetching comments for convo: ", email);
    return axios.get(
        url + '/api/user/' + email,
        {withCredentials: true}
    ).then(
        function(response:any){
        let user = response.data;
        console.log("GET Posts: response: ", user);

        return {user, success: true};
    },
        function(response:any){

        console.log("FAIL: Coud not retrieve posts");
        return {success: false};
    });
}

const addConvo = (convo:object) => {
    return axios.post(
        url + '/api/convos/',
        {...convo},
        {withCredentials: true}
    ).then(
        function(response:any){
            return {success: response.data.success, convo: response.data.convo};
        },
        function(){
            return {success: false}
        }
    )
}

const addUser = (user:object) => {
    return axios.post(
        url + '/api/users/',
        {...user},
        {withCredentials: true}
    ).then(
        function(response:any){
            return {success: true};
        },
        function(){
            return {success: false}
        }
    )
}

export {
    fetchPosts,
    addPost,
    fetchUser,
    addConvo,
    addUser
}