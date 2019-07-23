import axios from "axios";

const knockknock = async (cookies: string) => {
    console.log("KK:", cookies);
    console.log(1);
    if(!cookies){
        return new Promise((resolve, reject)=>{
            reject("FAIL");
        });
    }
    console.log(2);
    const token = await getToken(cookies);
    console.log("KK:token: ", token);
    if(token){
        console.log(3);

        return axios.get(
            `http://localhost:3000/auth/${token}`
        );  
    }
    console.log(4);

    // return new Promise((resolve, reject)=>(reject({success:false})));
};

const login = async (email:any, password:any) =>{

    if(!validEmail(email)){
        console.log(email, " is not a valid email.");
        return new Promise(()=>{return false});
    }

    return axios.post(
        'http://localhost:3000/login/',
        {
            email, password
        }
    ).then(
        function(response:any){
        let token = response.data.token;
        console.log("Login: token response: ", response.data);

        setToken(token, 300000);

        return token;
    },
        function(response:any){

        console.log(response);
        return "";
    });
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

const validEmail = (email:string) => {
    return /.+\@.+\..+/.test(email);
}

export {
    login,
    getToken,
    setToken,
    knockknock
}