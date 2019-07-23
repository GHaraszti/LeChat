import * as React from "react";
import {Link} from "react-router-dom";

const Register = (props: any) => {
    console.log("Loading register");

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
              <input type="text" className="form-control form-control-user" id="userName" placeholder="Username"/>
              </div>
              <div className="form-group">
                <input type="email" className="form-control form-control-user" id="userEmail" placeholder="Email Address"/>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password"/>
                </div>
                <div className="col-sm-6">
                  <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password"/>
                </div>
              </div>
              <Link to={"/register"} className="btn btn-primary btn-user btn-block">Register</Link>
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

};



export default Register;