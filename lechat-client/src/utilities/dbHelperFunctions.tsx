import axios from "axios";
import {getToken} from "./authHelperFunctions";

//ENV variables 
const api_hostname = process.env.API_HOST || "localhost";
const api_port = process.env.API_PORT || 3000;

const apiURL = `http://${api_hostname}:${api_port}`;

//const url = "http://localhost:3000";

const fetchPosts = (convoID:string) =>{
    console.log("????????????????:", getToken(window.document.cookie));
    console.log("fetching comments for convo: ", convoID);
    return axios.get(
        apiURL + '/api/posts/' + convoID,
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

const fetchConvos = (email:string) =>{
    console.log("????????????????:", getToken(window.document.cookie));
    console.log("fetching convos for email: ", email);
    return axios.get(
        apiURL + '/api/convos/' + email,
        {withCredentials: true}
    ).then(
        function(response:any){
        let list = response.data.convos;
        console.log("GET Convos: response: ", list);

        return {list, success: true};
    },
        function(response:any){

        console.log("FAIL: Coud not retrieve convos");
        return {success: false};
    });
}

const addPost = (post:object) => {
    return axios.post(
        apiURL + '/api/post',
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
        apiURL + '/api/user/' + email,
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
        apiURL + '/api/convos/',
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
        apiURL + '/api/users/',
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
    addUser,
    addConvo,
    fetchConvos
}