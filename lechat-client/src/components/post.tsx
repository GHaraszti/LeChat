import * as React from "react";

class Post extends React.Component<any, any, any>{
    constructor (props:any){
        super(props);
    }

    render(){
        let postRef = null;
        if(this.props.refersTo){
            postRef = <a target="_blank" rel="nofollow" href="https://undraw.co/">Go to [Message ref]&rarr;</a>; 
        }

        const html = 
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">{this.props.username || "Unknown"}</h6>
                </div>
                <div className="card-body">
                <div className="text-center">

                </div>
                <p>{this.props.text}</p>
                {/* {
                    this.props.refersTo ? postRef : ""
                }  */}
                </div>
            </div>
        ;

        return html;
    }
}

export default Post;