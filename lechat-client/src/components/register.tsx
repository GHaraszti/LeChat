import * as React from "react";
import {Link} from "react-router-dom";

class Register extends React.Component <any, any, any>{
    constructor(props:any){
      super(props);
      console.log("Loading register");
      this.state = {
        nameInput: "",
        emailInput: "",
        passwordInput: "",
        confirmInput: "",
        validationErrors: {
          name: "",
          email: "",
          password: "",
          confirmation: ""
        }
      };
    }

    validateFields = () =>{
      let errors:{[key:string]:any} = {};
      if(this.state.nameInput == ""){
        errors.name = "Name is required";
      } 

      if(this.state.emailnput == ""){
        errors.email = "Email is required";
      }

      if(this.state.passwordInput == ""){
        errors.password = "Password is requierd";
      }

      if(this.state.confirmInput !== this.state.passwordInput){
        errors.confirmation = "Password is not the same";
      }

      if (Object.keys(errors) !== []){
        console.log(errors);
        this.setState({
          validationErrors : {...errors},
          passwordInput: "",
          confirmInput: ""
        });
      } 
    } 

    register = async (event: any) => {
      this.validateFields();

      //alert(this.props);
      let newUser = {
        name: this.state.nameInput,
        email: this.state.emailInput,
        password: this.state.passwordInput
      };

      let success = await this.props.registerHandler(newUser);
      console.log("Creating new user", {name: newUser.name, email: newUser.email});

      // //Erasing input 
      // this.setState({
      //   nameInput: "",
      //   emailInput: "",
      //   passwordInput: "",
      //   confirmInput: ""
      // });

    }

    updateTextInput = (event: any) => {
        const target = event.target;
        this.setState({
            [target.id] : event.target.value
        });
    }

    render(){

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
                    <h1 className="h4 text-gray-900 mb-4">New account</h1>
                  </div>
                  <form className="user">
                    <div className="form-group">
                    <input type="text" className="form-control form-control-user" id="nameInput" placeholder="Username" onChange={this.updateTextInput} required/>
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-user" id="emailInput" placeholder="Email Address" onChange={this.updateTextInput} required pattern=".+@.+\.com"/>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="password" className="form-control form-control-user" id="passwordInput" placeholder="Password" onChange={this.updateTextInput} required/>
                      </div>
                      <div className="col-sm-6">
                        <input type="password" className="form-control form-control-user" id="confirmInput" placeholder="Repeat Password" onChange={this.updateTextInput} required/>
                      </div>
                    </div>
                    <a className="btn btn-primary btn-user btn-block" onClick={this.register}>Register</a>
                  </form>
                  <hr/>
      
                  <div className="text-center">
                      <Link to={"/login"} className="small">Already have an account? Login!</Link>
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



export default Register;