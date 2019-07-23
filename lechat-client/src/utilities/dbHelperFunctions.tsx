import axios from "axios";

const fetchPosts = () =>{

    return axios.get(
        'http://localhost:3000/api/posts'
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

export {
    fetchPosts
}