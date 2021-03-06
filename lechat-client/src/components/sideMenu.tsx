import * as React from "react";
import {Link} from "react-router-dom";
import Convo from "./convo";

class SideMenu extends React.Component <any, any, any>{
    constructor(props:any){
        super(props);

        console.log("SideMenu: props: ", this.props);
        this.state = {
          convoList : this.props.user.convos || [],
          convoFocus : Array.isArray(this.props.user.convos) && this.props.user.convos.length > 0 ? this.props.user.convos[0]._id : null
        }
    }

    componentDidMount(){
      if(this.props.user.convos){
        this.props.fetchConvos(this.props.user.email)
      }
    }

    componentDidUpdate (){
      console.log("Side menu updated: ", this.state);
    }

    render(){
      console.log("Render SideMenu: state and app", this.state, this.props);
      let list = this.props.convos;
      console.log(list);

        const html = (
              <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" > 
          
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                  <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                  </div>
                  <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </a>
          
                {/* Divider */}
                <hr className="sidebar-divider my-0"/>
          
                {/* Nav Item - Dashboard  */}
                <li className="nav-item active">
                  <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-comments"></i>
                    <span>Convos</span></a>
                </li>

                {/* List of conversations */}
                <div id="convo-list">
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#">
                        <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>                    
                        <span className="ml-2 d-none d-lg-inline small">Juanita</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>                    
                        <span className="ml-2 d-none d-lg-inline small">Perenganita</span>
                        </a>
                    </li> */}
                    {
                        list && list.length > 0 ?
                        list.map((convo:any)=>{
                        //console.log("Posts list:", post);
                        return <Convo convoID={convo._id} convoName={convo.name} convoLoader={this.props.convoLoader}/> 
                        }) : <p>Forever alone.</p>
                    }
                </div>
          
                {/* Divider */}
                <hr className="sidebar-divider"/>
          
                {/* Heading */}
                <div className="sidebar-heading">
                  Interface
                </div>
          
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                  <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Settings</span>
                  </a>
                  <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                      <h6 className="collapse-header">Custom Components:</h6>
                      <a className="collapse-item" href="buttons.html">Buttons</a>
                      <a className="collapse-item" href="cards.html">Cards</a>
                    </div>
                  </div>
                </li>
          
                {/* Nav Item - Utilities Collapse Menu */}
                <li className="nav-item">
                  <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>Utilities</span>
                  </a>
                  <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                      <h6 className="collapse-header">Custom Utilities:</h6>
                      <a className="collapse-item" href="utilities-color.html">Colors</a>
                      <a className="collapse-item" href="utilities-border.html">Borders</a>
                      <a className="collapse-item" href="utilities-animation.html">Animations</a>
                      <a className="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                  </div>
                </li>
          
              </ul>          
        );
        return html;
    }

};



export default SideMenu;