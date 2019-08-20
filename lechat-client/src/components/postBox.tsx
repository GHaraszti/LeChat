import * as React from "react";

class PostBox extends React.Component<any, any, any>{
    constructor (props:any){
        super(props);
        this.state = {
            textInput : ""
        };
        // this.myRef = (element:any) => {
        //     this.textInput = element;
        // };
        // this.postMessage = this.postMessage.bind(this);
        // this.updateTextInput = this.updateTextInput.bind(this);

    }

    whoAmI = ()=>{

    }

    postMessage = (event: any) => {
        //alert(this.props);
        this.props.clickHandler({text: this.state.textInput});
        console.log(this.state.textInput);
        this.setState({
            textInput : ""
        });
    }

    updateTextInput = (event: any) => {
        this.setState({
            textInput : event.target.value
        });
        console.log(event.target.value);
    }

    render(){
        const html = 
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
            <div className="input-group">
                <input type="text" className="form-control border-0" placeholder="guess what..." aria-label="Post message" onChange={this.updateTextInput} value={this.state.textInput}/>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={this.postMessage}>
                        <i className="fas fa-comment-medical fa-sm"></i>
                    </button>
                </div>
            </div>
        </form>
        ;

        return html;
    }
}

export default PostBox;