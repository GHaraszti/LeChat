import * as React from "react";
import {connect} from "react-redux";

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect,
    withRouter
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


// const Logger = (ComponentToProtect:any, loginHandler:any, routing:any)=>{
//     return class extends React.Component <any, any, any>{
//       constructor(props:any) {
//         super(props);
//         props = {
//             ...this.props,
//             loginHandler,
//             routing
//         }
//         this.state = {
//           loggedIn: false
//         };
//       }

//       login = (a:any, b:any, routing:any)=>{
//         //making request to server: /login
//         auth.login(a, b).then(
//             (result:any)=>{
//                 
//                 let {token , err, user} = result.data;
//                 if(user){
//                     


//                     routing.history.push('/');

//                     // this.setState({
//                     //     isAuthenticated: true,
//                     //     user: user
//                     // })

//                 } else {
//                     
//                 }

//                 

//                 
//                 
//             }
//         ); 
//     }

  
  
//       render() {
//         const { loggedIn } = this.state;
//         

//         if (loggedIn) {
//           return <Redirect to="/" />;
//         }
//         return (
//             <ComponentToProtect {...this.props} routing={this.props.routing} loginHandler= {this.login} />
//         );
//       }
//     }
//   }

// const PrivateRoute = (Component: any, ...rest:any ) => (
//     <Route {...rest} render={props => (
//       rest.user ? (
//         <Component {...props}/>
//       ) : (
//         <Redirect to={{
//           pathname: '/login',
//           state: { from: props.location }
//         }}/>
//       )
//     )}/>
// )
const Container = (ComponentToProtect:any, u:any, cookie:any)=>{
    

    let CC = class extends React.Component <any, any, any>{
      constructor(props:any) {
        super(props);
        let params = this.props;

        console.log("CONSTRUCTOR: Container.");

        props = {
            ...this.props,
            user : u ||  (params ? params.user : null),
            cookie: cookie || window.document.cookie
        };
        this.state = {
          loading: true,
          redirect: false,
          user: u,
          cookie: cookie || window.document.cookie
        };
      }
  
      componentDidMount() {

        auth.knockknock(cookie).then(
            (response:any)=>{
            console.log("KK: Container.", this.state, response);

            // let user = response.data.user;
            let user = this.state.user || response.data.user;
            if(user){
                console.log("KK: Container -> Welcome");

                this.setState({ loading: false, redirect: false, user: user});
            } else {
                console.log("KK: Container -> Denied");

                this.setState({ loading: false, redirect: true });
            }
        },
        (response:any)=>{
            console.log("KK: Container -> ERROR");

            const error = new Error(response.error);
            throw error;
        }).catch((reason)=>{
            console.log("KK: Container -> ERROR");

            //this.setState({ loading: false, redirect: true });
    });     
    }

    componentDidUpdate(){
        // 
    }

    componentWillReceiveProps(nextProps:any){
        
    }
  
  
      render() {
        console.log("RENDER: Container.");

        let params = this.props;
        

        const { loading, redirect } = this.state;
        if (loading) {
            console.log("loading: Container.");

          return null;
        }
        if (redirect) {
            console.log("redirecting: Container.");

            return <Redirect to={{
                pathname: "/login",
                state:{
                    from:"/"
                }
            }} />;
            // return null;
        }
        console.log("returning component: Container.");

        return (
            <ComponentToProtect {...this.props} user= {this.state.user} />
        );
      }
    }
    return withRouter(CC);
  }

class App extends React.Component <any, any>{
    constructor(props:any){
        super(props);
        // 
        console.log("CONSTRUCTOR: App.");

        // 

        // props = { 
        //     ...this.props,
        //     props
        // }

        //props.isAuthenticated = true;
        
        this.state = {
            isAuthenticated: false,
            user: null
        }

        // 
        // 
        // 
    }
     

    async componentDidMount (){
        // socket.on('connect', () =>{
        //     
        // });

        // socket.on('disconnect', () =>{
        //     
        // });

        // socket.on('newPost', (newPost:{text: string, from: string})=>{
        //     
        // })
        // auth.knockknock(this.props.cookie).then(
        //     (response:any)=>{
        //     let token = response.data.token;
        //     
        //     this.setState({isAuthenticated: true});
        //     //return true;
        // },
        // function(response:any){
        //     
        //     this.setState({isAuthenticated: false});
        //     //return false;
        // }).catch((reason)=>{
        //     
        //     this.setState({isAuthenticated: false});
        // });  

    }

    // componentDidUpdate = () => {
    //     

    // }

    login = (a:any, b:any, routing:any)=>{
        //making request to server: /login
        auth.login(a, b).then(
            (result:any)=>{
                console.log("logging: App");

                let {token , err, user} = result.data;
                if(user){
                    console.log("logging: App-> SUCCESS");



                    // setTimeout(routing.history.push('/'), 5000);
                    this.setState({
                        isAuthenticated: true,
                        user: user
                    })
                    // 
                    // 


                    //routing.history.push('/');
                    //this.props.history.push('/');
                    // this.setState({
                    //     isAuthenticated: true,
                    //     user: user
                    // })

                    // return <Redirect to="/"/>

                } else {
                    console.log("logging: App-> FAILURE");

                }

                // 

                // 
                // 

            }
        ); 
    }

    logout = ()=>{
        auth.logout();
    }

    authenticate = async () => {
        let result = await auth.knockknock(this.props.cookie);
        //this.setState({isAuthenticated: result});
        
    }



    componentDidUpdate(){
        // 
        
        
        if(this.state.user && this.props.location.pathname == "/login"){
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps:any){
        
    }

    //{ "_id" : ObjectId("5d251411c54599a46a44ce67"), "email" : "qwe@zxc.com", "name" : "EL", "pw_hash" : "$2a$05$6LY5hQO0sAzIUxyYS7Un6O16XSbkp.bkLNhTLcNf9XVNuul.laVtK", "__v" : 0 }

    render(){
        console.log("RENDER: App.");

        let rNum = Math.random();
        // 
        // 
        //this.state = {isAuthenticated:true};

        let html =             
        <div>
        <HeaderMenu/>
        <Switch>
            {/* <Route path="/logout" children={()=>{
                this.logout();
                return <Redirect to="/login"/>;
            }}></Route> */} 

            {/* <Route exact path="/login" render={(props)=><Login loginHandler={this.login} routing={props}/>}></Route> */}
            {/* <Route exact path="/login" render={(props:any)=>{
                    
                    return Logger(Login, this.props.login, props);
                }
            }/> */}
            {/* <Route exact path="/login" render={(props:any)=><Login loginHandler={this.login} routing={{}}/>}/> */}




            <Route exact path="/login" children={(props:any)=>{
                    
                    console.log("ROUTE: /login.");

                    // return (this.state.user) ? <Redirect to="/"/> : <Login loginHandler={this.login} routing={props}/>
                    if(this.state.user){
                        console.log("ROUTE: /login. ->USER AVAILABLE -> Redirecting to /");

                        // props.history.push("/lol")
                        return <Redirect to={{
                            pathname: "/",
                            state: {
                                user: this.state.user
                            }
                        }}/>
                        // return <Redirect to="/lol"/>;
                        // props.history.push({
                        //     pathName: '/',
                        //     state: {
                        //         user: this.state.user,

                        //     }
                        // });

                    } else {
                        console.log("ROUTE: /login. ->NO USER -> Return <Login/>");

                        // props.history.push("/login")
                        
                        return <Login loginHandler={this.login} routing={props}/>
                    }
                    // return <Login loginHandler={this.login} routing={props}/>

                }
            }/>
            <Route path="lol" render={(props:any)=>{
                        console.log("ROUTE: /lol.");

                
                return <div>Aleluya!!!</div>
            }}
            />
            
            {/* <Route path="/login" render={(props:any)=>{

                    return this.state.user ? <Redirect to="/"/> : <Login loginHandler={this.login} />
            }}></Route>
            <Route path="/register" render={()=><Register/>}></Route> */}
            {/* <Route path="/home" component={()=><Dashboard user={this.state.user}/>}></Route>
            <Route exact path="/" component={(props:any)=>{
                    
                    return this.state.user ? <Redirect to="/home"/> : <Redirect to="/login"/>;

            }}></Route> */}
            <Route exact path="/" component={(props:any)=>{
                
                console.log("ROUTE: /.");

                let Component = Container(Dashboard, this.state.user, this.props.cookie);
                return <Component/>;
            }
            } />

        </Switch>
        </div>

        

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
//   
//   return {state,
//   ownProps};
// };

// export default withRouter(connect(null, null)(App));
export default withRouter(App)

// export default App;