import * as React from "react";
import {connect} from "react-redux";

// const mapDispatcherToProps = {
//     // dispatching plain actions
//     getUser: (email:string) => ({type: 'FETCH_USER',
//       content: {
//         email
//       }
//     })
// };
  
// const mapStateToProps = (state:any, ownProps:any) => {
//   console.log("Store updated!!! dropDown: ", state, ownProps);
//   // this.state.socket.emit("newPost");
//   return {state,
//   ownProps};
// };

class DropUser extends React.Component<any, any, any>{
    private userMenuDrop = React.createRef<HTMLDivElement>()

    constructor (props:any){
        super(props);
        this.state = {
            emailInput: "",
            membersOutput: [this.props.user],
            nameInput : "",
            isP2P: false
        };
    }

    toggleVisibility = (e:any)=>{
        console.log(":)");
        let popup = this.userMenuDrop.current;
        popup.classList.toggle("show");
  
        //alert(popup);
        // console.log("POPUP", popup);
      }

    render(){
        console.log("Dropdown: state: ", this.state);
        console.log("Dropdown: props: ", this.props);

        const html =                       
        <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleVisibility}>
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.session.user.name}</span>
            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
            </a>
            {/*<!-- Dropdown - User Information -->*/}
            <div ref={this.userMenuDrop} className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                </a>
                <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                </a>
                <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                </a>
            </div>
        </li>
    ;

        console.log("\n\n");
        return html;
    }
}

export default connect(null, null)(DropUser);
// export default DropDown