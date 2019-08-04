import * as React from "react";
import { Route, Link } from "react-router-dom";

import {connect} from "react-redux";

//import PostBox from "./postBox";
import ConvoArea from "./convoArea";
import SideMenu from "./sideMenu";

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
  })
};

const mapStateToProps = (state:any, ownProps:any) => {
console.log("Store updated!!! dashboard: ", state, ownProps);
// this.state.socket.emit("newPost");
return {state,
ownProps};
};

class Dashboard extends React.Component <any, any>{
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

      this.props.getComments(convoID);  
      this.setState({
        focus: {
          convo: {
            ID: convoID
          }
        }
      });
    }
    
    componentDidUpdate = ()=>{

    }

    render(){
      console.log("Dashboard: render: user & state: ", this.props.user, this.state);
        const html = 
            // {/*<!-- Page Wrapper -->*/}
            <div id="wrapper">
          
            <SideMenu convos={this.state.convos} convoLoader={this.convoLoader}/>
          
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
          
                    {/*{/*<!-- Topbar Search -->*/}
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
          
                      {/*<!-- Nav Item - Search Dropdown (Visible Only XS) -->*/}
                      <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-search fa-fw"></i>
                        </a>
                        {/*<!-- Dropdown - Messages -->*/}
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                          <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                              <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                  <i className="fas fa-search fa-sm"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </li>
          
                      {/*<!-- Nav Item - Alerts -->*/}
                      <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-bell fa-fw"></i>
                          {/*<!-- Counter - Alerts -->*/}
                          <span className="badge badge-danger badge-counter">{this.state.ui.notif.count}</span>
                        </a>
                        {/*<!-- Dropdown - Alerts -->*/}
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                          <h6 className="dropdown-header">
                            Alerts Center
                          </h6>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                              <div className="icon-circle bg-primary">
                                <i className="fas fa-file-alt text-white"></i>
                              </div>
                            </div>
                            <div>
                              <div className="small text-gray-500">December 12, 2019</div>
                              <span className="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                          </a>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                              <div className="icon-circle bg-success">
                                <i className="fas fa-donate text-white"></i>
                              </div>
                            </div>
                            <div>
                              <div className="small text-gray-500">December 7, 2019</div>
                              $290.29 has been deposited into your account!
                            </div>
                          </a>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                              <div className="icon-circle bg-warning">
                                <i className="fas fa-exclamation-triangle text-white"></i>
                              </div>
                            </div>
                            <div>
                              <div className="small text-gray-500">December 2, 2019</div>
                              Spending Alert: We've noticed unusually high spending for your account.
                            </div>
                          </a>
                          <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                        </div>
                      </li>
          
                      {/*<!-- Nav Item - Messages -->*/}
                      <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-envelope fa-fw"></i>
                          {/*<!-- Counter - Messages -->*/}
                          <span className="badge badge-danger badge-counter">7</span>
                        </a>
                        {/*<!-- Dropdown - Messages -->*/}
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                          <h6 className="dropdown-header">
                            Message Center
                          </h6>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                              <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt=""/>
                              <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="font-weight-bold">
                              <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                              <div className="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                          </a>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                              <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt=""/>
                              <div className="status-indicator"></div>
                            </div>
                            <div>
                              <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                              <div className="small text-gray-500">Jae Chun · 1d</div>
                            </div>
                          </a>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                              <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt=""/>
                              <div className="status-indicator bg-warning"></div>
                            </div>
                            <div>
                              <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                              <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                            </div>
                          </a>
                          <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                              <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt=""/>
                              <div className="status-indicator bg-success"></div>
                            </div>
                            <div>
                              <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                              <div className="small text-gray-500">Chicken the Dog · 2w</div>
                            </div>
                          </a>
                          <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                        </div>
                      </li>
          
                      <div className="topbar-divider d-none d-sm-block"></div>
          
                      {/*<!-- Nav Item - User Information -->*/}
                      <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.session.user.name}</span>
                          <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
                        </a>
                        {/*<!-- Dropdown - User Information -->*/}
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
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
          
                    </ul>
          
                  </nav>
                  {/*<!-- End of Topbar -->*/}
          
                    <ConvoArea convoID={this.state.focus.convo.ID} user={this.props.user}/>
          
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