import axios from "axios";
import {getToken} from "./authHelperFunctions";

const url = "http://localhost:3000";

const fetchPosts = () =>{
    console.log("????????????????:", getToken(window.document.cookie));

    return axios.get(
        url + '/api/posts'
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
        url + '/api/posts',
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