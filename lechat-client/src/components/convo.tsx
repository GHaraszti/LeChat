import * as React from "react";

class Convo extends React.Component<any, any, any>{
    constructor (props:any){
        super(props);
    }

    clickHandler = (event:any)=>{
        console.log("Convo event: Click: convoID", this.props.convoID);
        this.props.convoLoader(this.props.convoID);
    }

    render(){
        const html = 
        <li className="nav-item" onClick={this.clickHandler}>
            <a className="nav-link" >
            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>                    
            <span className="ml-2 d-none d-lg-inline small">{this.props.convoName || "[LeConvo]"}</span>
            </a>
        </li>
        ;

        return html;
    }
}

export default Convo;