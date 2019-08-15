import * as React from "react";
import {connect} from "react-redux";

import {fetchUser, addConvo} from "../utilities/dbHelperFunctions" 
import { string } from "prop-types";

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

class DropDown extends React.Component<any, any, any>{
    private newMessagePop = React.createRef<HTMLDivElement>()

    constructor (props:any){
        super(props);
        this.state = {
            emailInput: "",
            membersOutput: [this.props.user],
            nameInput : "",
            isP2P: false
        };
    }

    componentDidMount = ()=>{
        // this.setState({emailInput: ""})
    }

    toggleVisibility = (e:any)=>{
        console.log(":)");
        let popup = this.newMessagePop.current;
        popup.classList.toggle("show");
  
        //alert(popup);
        // console.log("POPUP", popup);
      }


    addConvo = (event: any) => {
        //alert(this.props);
        this.props.clickHandler({name: this.state.name, convos: this.state.convos, isP2P: false});
        console.log(this.state.textInput);
        this.setState({
            emailInput : "",
            nameInput : ""
        });
    }

    searchAndAddUser = ()=>{

        let isMember = this.state.membersOutput.some((element:{email:string} = {email:""})=>{
            return  this.state.emailInput == element.email;
        })

        let isUser = this.props.user.email == this.state.emailInput;

        console.log(isMember, isUser);

        if(!isMember){
            fetchUser(this.state.emailInput).then((response:any = {})=>{
                if(response.success){
                    console.log("User retrieved>>>", response.user);
                    let newState = [...this.state.membersOutput, response.user];
    
                    this.setState({
                        membersOutput: newState,
                        emailInput: ""
                    });
                }
            }) 
        } else {
            console.log("User is already a member.");
        }
    }

    createConvo = () => {
        if(this.state.nameInput !== ""){
            let members = this.state.membersOutput.map((member:any)=>{
                return member._id;
            })
    
            let newConvo = {
                members,
                name: this.state.nameInput,
                P2P: false
            };

            addConvo(newConvo).then((result:any)=>{
                if(result && result.success){
                    console.log("New group has been created!");
                } else{
                    console.log("New group couldn't be created!");
                }
            })
        } else {
            console.log("A name is mandatory for the new Convo!");
        }
    }

    updateTextInput = (event: any) => {
        this.setState({
            [event.target.id] : event.target.value
        });
        //console.log(event.target);
    }

    render(){
        console.log("Dropdown: state: ", this.state);
        console.log("Dropdown: props: ", this.props);
        let members = this.state.membersOutput;
        let membersText = "";

        if(members.length > 0){
            membersText = members.reduce((acc:string, member:any, index:number, arr:any[])=>{
                console.log("STEP: ", member);
                return acc + member.name;
            }, "");
        }
        console.log("Dropdown: MEMBERS: ", members);
        console.log("Dropdown: MEMBERS TEXT: ", membersText);

        const html = 
                <li className="nav-item dropdown no-arrow mx-1" >
                        {/*<!-- Drop down trigger>*/}
                        <a className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleVisibility}>
                          <i className="fas fa-plus fa-fw"></i>
                          {/*<!-- Counter - Alerts -->*/}
                          <span className="badge badge-danger badge-counter">{5}</span>
                        </a>

                        {/*<!-- Drop down container>*/}
                        <div ref={this.newMessagePop} className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="newMessageDropdown">
                          <h6 className="dropdown-header">
                            New conversation
                          </h6>
                        

                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div>
                                <input type="text" id="membersOutput" className="tokenfield" readOnly onChange={this.updateTextInput} value={membersText}/>
                            </div>
                            <div className="input-group">
                                <input type="text" id="emailInput" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" onChange={this.updateTextInput} value={this.state.emailInput} />
                                <div className="input-group-append">
                                <button className="btn btn-primary" type="button" onClick={this.searchAndAddUser}>
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                                </div>
                            </div>
                        </form>
                          
                    {/*<!-- Nav Item - Search Dropdown (Visible Only XS) -->*/}
                        {/* <li className="nav-item dropdown no-arrow d-sm-none">
                            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw"></i>
                            </a> */}

                            {/*<!-- Dropdown - Messages -->*/}
                            {/* <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
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
                        </li> */}
          
                        <div className="dropdown-item d-flex align-items-center">
                            <div className="small text-gray-500">New convo name:</div>

                            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
                                    <div className="input-group">
                                        <input type="text" id="nameInput" className="form-control border-0" placeholder="guess what..." aria-label="Post message" onChange={this.updateTextInput} value={this.state.nameInput}/>
                                    </div>
                                    <div className="mr-3">
                                        <div className="icon-circle bg-primary">
                                        <i className="fas fa-plus text-white" onClick={this.createConvo}></i>
                                        </div>
                                    </div>
                            </form>
                        </div>
                        <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                </li>
          
        ;

        console.log("\n\n");
        return html;
    }
}

export default connect(null, null)(DropDown);
// export default DropDown