import * as React from "react";
import { Route, Link, withRouter} from "react-router-dom";
//import {addConvo} from "../utilities/dbHelperFunctions" 

import * as IO from "socket.io-client";

import {connect} from "react-redux";

//import PostBox from "./postBox";
import ConvoArea from "./convoArea";
import SideMenu from "./sideMenu";
import DropDown from "./dropDown";
import DropUser from "./dropUser";

const pbStyle = {
    "width": "50%", 
    "ariaValuenow": 50, 
    "ariaValuemin": 0, 
    "ariaValuemax": 100
}

const mapDispatcherToProps = {
  // dispatching plain actions
  getComments: (convoID:string) => ({ type: 'FETCH_COMMENTS', 
      content: {
          convoID
      }
  }),
  getConvos: (email:string) => ({ type: 'FETCH_CONVOS', 
    content: {
        email
    }
  }),
  getUser: (email:string) => ({type: 'FETCH_USER',
    content: {
      email
    }
  }),
  addConvo: (convo:any, createdBy:string, socket:any) => ({type: 'ADD_CONVO',
    content: {
      convo: convo,
      createdBy
    },
    socket: socket
  })
};

const socket = IO();

const mapStateToProps = (state:any, ownProps:any) => {
console.log("Store updated!!! dashboard: ", state, ownProps);
// this.state.socket.emit("newPost");
return {state,
ownProps};
};

class Dashboard extends React.Component <any, any, any>{
    private newMessagePop = React.createRef<HTMLDivElement>();

    constructor(props:any){
        super(props);
        props = {
          ...this.props,
          ...props
        }

        console.log("Dashboard:properties: ", props);
        this.state = {
            ui: {
                notif: {
                    count: 69
                },
                pendMsg: {
                    count: 0
                }
            },
            session: {
                user: {
                    name: "John Doe"
                }
            },
            convos: this.props.user.convos || [],
            focus: {
                convo: {
                    ID: null,

                }
            },
            messages:[

            ]
        };


        //this.postMessage = this.postMessage.bind(this);
    }

    componentDidMount(){
      if(this.props.user.email) this.fetchConvos(this.props.user.email);
    }

    convoLoader = (convoID:string)=>{
      console.log("Loading convo...", convoID);
      // this.setState({
      //   focus: {
      //       convo: {
      //           ID: convoID,
      //       },
      //       messages: []
      //   }
      // })
      if(convoID) {
        this.props.getComments(convoID);  
        this.setState({
          focus: {
            convo: {
              ID: convoID
            }
          }
        });
      } else {
        console.log("Need convoID to fetch convo.");
      }
    }

    // toggleVisibility = (e:any)=>{
    //   console.log(":)");
    //   let popup = this.newMessagePop.current;
    //   popup.classList.toggle("show");

    //   //alert(popup);
    //   console.log("POPUP", popup);
    // }

    fetchUser = (email:string)=>{
      if(email) this.props.getUser(email);
      else console.log("No email to fetch user.");
    }

    fetchConvos = (email:string)=>{
      if(email) this.props.getConvos(email);
      else console.log("No email to fetch convos.");
    }
    // postNewConvo = (convo: {members:[any], name:string, isP2P:boolean})=>{
    //   this.props.addConvo(convo);
    //   console.log("Dashboard will require re-render");
    // }

  // postNewConvo = (newConvo:{[key:string]:any}) => {
  //     if(this.state.nameInput !== ""){
  //         addConvo(newConvo).then((result:any)=>{
  //             if(result && result.success){
  //                 console.log("New group has been created!", result);
  //                 socket.emit('joinRooms', [result.convo._id]);

  //                 let newConvoArray = [...this.state.convos, result.convo._id];
  //                 this.setState({
  //                   convos: newConvoArray
  //                 })
  //             } else{
  //                 console.log("New group couldn't be created!");
  //             }
  //         })
  //     } else {
  //         console.log("A name is mandatory for the new Convo!");
  //     }
  // }

  postNewConvo = (newConvo:{[key:string]:any}) => {
    console.log("Adding new convo", newConvo, this.props.user);
    this.props.addConvo(newConvo, this.props.user, socket);
  }

    render(){
      console.log("Dashboard: render: props & state: ", this.props, this.state);
        let convosList = this.props.state.convos || [];
        console.log("Dashboard: convos: ", this.props.state.convos);
        const html = 
            // {/*<!-- Page Wrapper -->*/}
            <div id="wrapper">
          
            <SideMenu convos={convosList} convoLoader={this.convoLoader} fetchConvos={this.fetchConvos} user={this.props.user}/>
          
              {/* {/*<!-- Content Wrapper -->*/}
              <div id="content-wrapper" className="d-flex flex-column">
          
                {/* {/*<!-- Main Content -->*/}
                <div id="content">
          
                  {/* {/*<!-- Topbar -->*/}
                  <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          
                    {/*<!-- Sidebar Toggle (Topbar) -->*/}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                      <i className="fa fa-bars"></i>
                    </button>
          
                    {/*<!-- Topbar Search -->
                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                      <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
          
                    {/*<!-- Topbar Navbar -->*/}
                    <ul className="navbar-nav ml-auto">
                      
                      <DropDown fetchUser={this.fetchUser} postNewConvo={this.postNewConvo} members={this.props.state.members} user={this.props.user} socket={socket}/>

                      <div className="topbar-divider d-none d-sm-block"></div>
          
                      {/*<!-- Nav Item - User Information -->*/}
                      {/* <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.session.user.name}</span>
                          <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
                        </a> */}
                        {/*<!-- Dropdown - User Information -->*/}
                        {/* <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
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
                      </li> */}
                      <DropUser/>
                    </ul>
          
                  </nav>
                  {/*<!-- End of Topbar -->*/}
          
                    <ConvoArea convoID={this.state.focus.convo.ID} user={this.props.user} socket={socket}/>
          
                </div>
                {/*<!-- End of Main Content -->*/}
          
                {/*<!-- Footer -->*/}
                <footer className="sticky-footer bg-white">
                  <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                      <span>Copyright &copy; Your Website 2019</span>
                    </div>
                  </div>
                </footer>
                {/*<!-- End of Footer -->*/}
          
              </div>
              {/*<!-- End of Content Wrapper -->*/}
          
            </div>
            {/*<!-- End of Page Wrapper -->*/}
          
            {/*<!-- Scroll to Top Button-->*/}
            <a className="scroll-to-top rounded" href="#page-top">
              <i className="fas fa-angle-up"></i>
            </a>
          
            {/*<!-- Logout Modal-->*/}
            <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                  </div>
                </div>
              </div>
            </div>
        ;

        return html;
    }

};

// export default Dashboard;
export default connect(mapStateToProps, mapDispatcherToProps)(Dashboard);
// export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(Dashboard))
