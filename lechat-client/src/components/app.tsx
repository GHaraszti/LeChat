import * as React from "react";
import {connect} from "react-redux";

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect,
  } from 'react-router-dom';
// import * as IO from 'socket.io-client';

import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import HeaderMenu from "./dropMenu";

var users = {
    "user1": {pw: "123"},
    "user2": {pw: "321"}
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(callback:Function) {
      this.isAuthenticated = true;
      setTimeout(callback, 100);
    },
    signout(callback:Function) {
      this.isAuthenticated = false;
      setTimeout(callback, 100);
    }
}

// const socket = IO();

import * as auth from "../utilities/authHelperFunctions" 

class App extends React.Component <any, any>{
    constructor(props:any){
        super(props);
        // console.log("App: constr /////////////");
        //console.log("Current token: ", auth.getToken(props.cookie));
        // console.log("props: ", props.cookie);

        // props = { 
        //     ...this.props,
        //     props
        // }

        //props.isAuthenticated = true;
        
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            user: null
        }

        console.log("App: initial state:", this.state);
        console.log("App: initial state:", props);
        console.log("---------------------------------");
    }
     

    async componentDidMount (){
        // socket.on('connect', () =>{
        //     console.log('New user connected');
        // });

        // socket.on('disconnect', () =>{
        //     console.log('Disconected from server');
        // });

        // socket.on('newPost', (newPost:{text: string, from: string})=>{
        //     console.log("New post arrived: ", newPost.text);
        // })
        auth.knockknock(this.props.cookie).then(
            (response:any)=>{
            let token = response.data.token;
            console.log("Token is valid, welcome: ", token);    
            this.setState({isAuthenticated: true});
            //return true;
        },
        function(response:any){
            console.log("Token is not valid, back off: ", response);
            this.setState({isAuthenticated: false});
            //return false;
        }).catch((reason)=>{
            console.log("Authentication failed: ", reason);
            this.setState({isAuthenticated: false});
        });  

    }

    // componentDidUpdate = () => {
    //     console.log("Component did updated.", this.state);

    // }

    login = (a:any, b:any)=>{
        //making request to server: /login
        auth.login(a, b).then(
            (result:any)=>{
                let {token , err, user} = result.data;
                if(token){
                    console.log("Authentication completed.", token);
                } else {
                    console.log("Authentication failed.", err);
                }

                console.log("RESULT: ", result);

                this.setState({
                    isAuthenticated: token ? true : false,
                    user: user
                })

                console.log("Auth STATE: .", this.state.isAuthenticated);
                console.log("User STATE: .", this.state);
            }
        ); 
    }

    logout = ()=>{
        auth.logout();
    }

    // authenticate = async () => {
    //     auth.knockknock(this.props.cookie).then(
    //         (response:any)=>{
    //         let token = response.data.token;
    //         console.log("Token is valid, welcome: ", token);    
    //         //this.setState(()=>({isAuthenticated: true}));
    //         return true;
    //     },
    //     function(response:any){
    //         console.log("Token is not valid, back off: ", response);
    //         //this.setState(()=>({isAuthenticated: false}));
    //         return false;
    //     });  
    // }

    authenticate = async () => {
        let result = await auth.knockknock(this.props.cookie);
        //this.setState({isAuthenticated: result});
        console.log("AUTH result: ", result)
    }

    // changeState = async (history:any)=>{
    //     if(this.state.isAuthenticated){
    //         history.push("/home");
    //         //this.setState({isAuthenticated: true});
    //         //return true;
    //     } else {
    //         history.push("/login");
    //         //this.setState({isAuthenticated: false});
    //         //return false;
    //     }
    // }

    componentDidUpdate(){
        console.log("UPDATE!!!!!!!");
    }

    // async componentWillMount(){
    //     console.log("Chotto matte kudasai...");
    //     await setTimeout(()=>{
    //         console.log("There, I waited...");
    //     }, 5000);
    //     await console.log("Cool, thanks brah...");

    // }
      
    //{ "_id" : ObjectId("5d251411c54599a46a44ce67"), "email" : "qwe@zxc.com", "name" : "EL", "pw_hash" : "$2a$05$6LY5hQO0sAzIUxyYS7Un6O16XSbkp.bkLNhTLcNf9XVNuul.laVtK", "__v" : 0 }

    render(){
        console.log("app:render...");
        let rNum = Math.random();
        // console.log("App:render:state: ", this.state);
        // console.log("---------------------------------");
        //this.state = {isAuthenticated:true};

        let html = <Router>
            <div>
                <HeaderMenu/>
                <Switch>
                    {/* <Route path="/logout" children={()=>{
                        this.logout();
                        return <Redirect to="/login"/>;
                    }}></Route> */}
                    <Route path="/login" render={()=><Login loginHandler={this.login} />}></Route>
                    <Route path="/register" render={()=><Register/>}></Route>
                    <Route path="/home" render={()=><Dashboard user={this.state.user}/>}></Route>
                    <Route exact path="/" children={(props:any)=>{
                            // console.log("app:state: ", this.state);
                            // console.log("app:props: ", props);
                            // console.log("app:path: ", props.location.pathname);
                            // console.log("---------------------------------");
    
                            // setInterval(()=>{
                            //     props.history.push("/home");
                            // }, 5000)
                            return this.state.user ? <Redirect to="/home"/> : <Redirect to="/login"/>;
                            // if(this.props.isAuthenticated){
                            //     props.history.push("/home");
                            // } else {
                            //     props.history.push("/login");
                            // }
                    
                            //this.changeState(props.history);
                    }}></Route>
                </Switch>
            </div>
        </Router>

        console.log("Final html: ", html);

        return html;
    }
}

// const mapDispatcherToProps = {
//     // dispatching plain actions
//     getComments: () => ({ type: 'FETCH_COMMENTS' }),
//     addComment: (content:any) => ({type: 'ADD_COMMENT',
//     payload: {
//         content
//     }
//   })
// };

// const mapStateToProps = (state:any, ownProps:any) => {
//   console.log("Store updated!!! state: ", state);
//   return {state,
//   ownProps};
// };

// export default connect(mapStateToProps, mapDispatcherToProps)(App);
export default App;