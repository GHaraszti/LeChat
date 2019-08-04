import axios from "axios";

const apiURL = "http://localhost:3000";
const knockknock = async (cookies: string) => {

    const token = await getToken(cookies);
    console.log("KK:token: ", token);

    if(token){
        return axios({
            method: "GET",
            url:`${apiURL}/auth/${token}`,
            validateStatus: function (status) {
                return status >= 200 && status < 300; // default
            }
        }
        );
    }

    return Promise.reject(new Error("Token was not provided")).then(null, ()=> false);
};

// const knockknock = async (cookies: string) => {
//     let token = await getToken(cookies);

//     return axios.get(`${apiURL}/auth/${token}`).then(
//             (response:any)=>{
//             let token = response.data.token;
//             console.log("Token is valid, welcome: ", token);    
//             //this.setState(()=>({isAuthenticated: true}));
//             return true;
//         },
//             function(response:any){
//             console.log("Token is not valid, back off: ", response);
//             //this.setState(()=>({isAuthenticated: false}));
//             return false;
//         }
//     );  
// }

const login = async (email:any, password:any) =>{

    if(!validEmail(email)){
        console.log(email, " is not a valid email.");
        return new Promise(()=>{return false});
    }

    return axios({
        method: "POST",
        url:`${apiURL}/login/`,
        data: {
            email, password
        },
        validateStatus: function (status) {
            return status >= 200 && status < 300; // default
        }
    }
    ).then(
        function(response:any){
        let token = response.data.token;
        //console.log("Login: token response: ", response.data);

        setToken(token, 60000);

        return response;
    },
        function(reason:any){

        //console.log(response);
        return {error: reason};
    });
}

const logout = () => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const setToken = (token:string, exp:number) => {
    if(token && exp){
        var d = new Date();
        d.setTime(d.getTime() + (exp));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "authToken=" + token + ";" + expires + ";path=/";
        //console.log("setToken=>Cookie: ", document.cookie);
    }
}

const tokenIsValid = (token:string)=>{
    //return /\S{8,}/.test(token);
    return true;
}

const getToken = (cookie:string) => {
    //console.log("getToken=>Cookie: ", cookie)
    let token = ""; 
    
    cookie.split(';').forEach((value:string, index:number, array:[])=>{
        let pair = value.split("=");
        //console.log(pair);

        if(pair[0] === "authToken"){
            token = pair[1];
        }
    });
    
    if(!tokenIsValid(token)){
        return "";
    }
    
    console.log("getToken: Token returned: ", token)
    return token;
}

const removeCookie = () => {

}

const validEmail = (email:string) => {
    return /.+\@.+\..+/.test(email);
}

export {
    login,
    getToken,
    setToken,
    knockknock,
    logout
}