import * as React from "react";
import {Link, withRouter} from "react-router-dom";
import * as auth from "../utilities/authHelperFunctions" 
import { AnySoaRecord } from "dns";
import { connect } from "net";

const mapDispatcherToProps = {
  // dispatching plain actions
  getComments: (convoID:string) => ({ type: 'FETCH_COMMENTS', 
      content: {
          convoID
      }
  })
};

const mapStateToProps = (state:any, ownProps:any) => {
console.log("Store updated!!! dashboard: ", state, ownProps);
// this.state.socket.emit("newPost");
return {state,
ownProps};
};

class Login extends React.Component<any, any>{

  constructor(props:any){
      super(props);
      console.log("Login: properties: ", this.props)
      this.state = {
        userEmail: "",
        userPassword: ""
      };

      //console.log("Parent properties: ", this.props);
      //console.log("Child properties: ", props);
      //this.props.loginHandler.bind(this);
  }
    
    //props.auth.authenticate(()=>{console.log("Heya")});
    // auth.login("Yo", "shhhh");
  //{ "_id" : ObjectId("5d251411c54599a46a44ce67"), "email" : "qwe@zxc.com", "name" : "EL", "pw_hash" : "$2a$05$6LY5hQO0sAzIUxyYS7Un6O16XSbkp.bkLNhTLcNf9XVNuul.laVtK", "__v" : 0 }

    postLogin = async (event: any) => {
        //alert(this.props);
        var success = this.props.loginHandler(this.state.userEmail, this.state.userPassword, this.props.routing);
        console.log("---------------------------------");

        if(success){
          console.log("Login waiting results...", success)
          //auth.setToken(success, 60000);
        }

        //Erasing input 
        this.setState({
          emailInput: "",
          userPassword: ""        
        });

    }

    updateTextInput = (event: any) => {
        const target = event.target;
        this.setState({
            [target.id] : event.target.value
        });
    }

      render(){
        console.log("login:render... ", this.props);
        console.log("---------------------------------");

        const html = (

          <div className="container">
        
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Login</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user" id="userEmail" onChange={this.updateTextInput} placeholder="Email Address"/>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input type="password" className="form-control form-control-user" id="userPassword" onChange={this.updateTextInput} placeholder="Password"/>
                        </div>
                      </div>
                      <Link to={"/"} className="btn btn-primary btn-user btn-block" onClick={this.postLogin}>Login</Link>
                    </form>
                    <hr/>
                    {/* <div className="text-center">
                      <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div> */}
                    <div className="text-center">
                    <Link to={"/register"} className="small">Don't have account yet? Register</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>);
          return html;
      }
};


// export default withRouter(Login)
export default Login;