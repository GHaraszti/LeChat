import axios from "axios";
import {getToken} from "./authHelperFunctions";

const url = "http://localhost:3000";

const fetchPosts = (convoID:string) =>{
    console.log("????????????????:", getToken(window.document.cookie));
    console.log("fetching comments for convo: ", convoID);
    return axios.get(
        url + '/api/posts/' + convoID
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
        {...post}
    ).then(
        function(response:any){
            return {success: true};
        },
        function(){

        }
    )
}

export {
    fetchPosts,
    addPost
}