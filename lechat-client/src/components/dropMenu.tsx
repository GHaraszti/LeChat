import * as React from "react";
import {Link} from "react-router-dom";

class DropMenu extends React.Component {
    constructor(props:any){
        super(props);
    }

    render(){
        const html = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#navbarSupportedContent">LeChat</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/login" className="nav-link">Login <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link disabled" tabIndex={-1} aria-disabled="true">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/groups" className="nav-link disabled" tabIndex={-1} aria-disabled="true">Groups</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
        return html;
    }

};



export default DropMenu;