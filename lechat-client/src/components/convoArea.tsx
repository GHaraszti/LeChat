import * as React from "react";
// //Reducers
// import {fetchCommentsActionCreator} from "../reducers/comments";
import {connect} from "react-redux";

import {
    withRouter
  } from 'react-router-dom';

//Components
import PostBox from "./postBox";
import Post from "./post";

const mapDispatcherToProps = {
    // dispatching plain actions
    getComments: (convoID:string) => ({ type: 'FETCH_COMMENTS', 
        content: {
            convoID
        }
    }),
    addComment: (comment:any, socket:any) => ({type: 'ADD_COMMENT',
        content: {
            post: comment
        },
        socket: socket
    }),
    newComment: (convoID:string) => ({ type: 'NEW_COMMENT', content: {
        convoID
    }})
};

const mapStateToProps = (state:any, ownProps:any) => {
  console.log("Store updated!!! convoarea: ", state, ownProps);
// this.state.socket.emit("newPost");
  return {state,
  ownProps};
};

// const messages = [
//     {username: "Pepe", text: "Hey Juanita, ontas"},
//     {username: "Juanita", text: "**Visto**"},
// ]

class ConvoArea extends React.Component<any, any, any>{
    constructor (props:any){
        super(props);
        // props = { 
        //     ...this.props,
        //     props
        // }

        console.log("ConvoArea:properties: ", props);

        this.state = {
            convos: this.props.user.convos
        }; 
    }

    componentWillMount() {
        // this.state.socket = IO();
    }

    componentDidMount (){
        console.log("Did mount?");

        const s = this.props.socket;

        s.on('connect', () =>{
            console.log('New user on convo: ', this.props.user.convos);

            s.emit("listen");
            //socket.emit('join', {convos: this.props.user.convos});
            
        });

        s.on("listen", ()=>{
            console.log("Im listening server...");
        });

        // s.on("listen", ()=>{
        //     console.log("I'm listening...");
        // });
        
        s.on('disconnect', () =>{
            console.log('Disconected from server');
            s.removeAllListeners();
        });
        
        s.on('newPost', async ()=>{
            console.log("New post arrived: ");
            //await this.props.newComment("5d36425fc092f1520b39a081");
            this.props.newComment(this.props.convoID);

            // this.props.addComment({sentBy: "qwe@asd.com", text: newPost.text, convo: "5d36425fc092f1520b39a081"});
        })

        if(this.state.convos.length > 0){
            s.emit('joinRooms', this.props.user.convos);
        }
        
        if(this.props.convoID){
            this.props.getComments(this.props.convoID);
        }
    }

    // componentDidUpdate(){
    //     console.log("Component did update", this.props.state);
    //     this.getComments(this.convoID);
    // }
    // componentWillUpdate(){
    //     this.props.getComments(this.props.convoID);
    // }

    uploadNewMessage = async (newMessage:{sentBy: string, text: string, convoID:string}) => {
        newMessage.sentBy = this.props.user.email;
        // this.state.messages.push(newMessage);
        // //console.log(this.state.messages);
        //await         console.log("Before dispatch: ", socket);
        // this.setState(this.state.messages);
        newMessage.convoID = this.props.convoID;
        await this.props.addComment(newMessage, this.props.socket);
        await this.props.newComment(this.props.convoID);
        // this.updateDState({focus:{
        //     convo:{
        //         ID: convoID
        //     }
        // }});
    }

    // updateConvoArea = () => {
    //     this.props.state.comments = ;
    // }

    // componentWillReceiveProps = ()=>{
    //     console.log("Will receive props: ", this.props.state);
    // }

    render(){
        //const messages = this.props.messages.comments.comments;
        let list = this.props.state.comments;
        console.log("ConvoArea: render...: ", this.props);


        const html = 
        <div className="container-fluid">
            
        {/*<!-- Page Heading -->*/}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">{this.props.user.name}, </h1>
            <PostBox envelope={{username:"user", text:"text"}} clickHandler={this.uploadNewMessage}/>
        </div>

        {/*<!-- Content Row -->*/}
        <div className="row">

            {/*<!-- Content Column -->*/}
            <div className="col-lg-6 mb-4">

            </div>

            <div id="post-list" className="col-lg-12 mb-4">
                {
                    list && list.length > 0 ?
                    list.map((post:any)=>{
                    //console.log("Posts list:", post);
                    return <Post username={post.username} text={post.text} refersTo={true}/> 
                    }) : <p>No comments yet.</p>
                }
            </div>
        </div>

        </div>
        ;

        return html;
    }
}




// export default connect((messages) => {
//     //console.log(messages);
//     return {messages};
// }, {
//     fetchComments: fetchCommentsActionCreator
// })(ConvoArea);

// module.exports = connect(({movies}) => ({
//     movies: movies.all
//   }), {
//     fetchMovies: fetchActionCreator
//   })(Movies)

export default connect(mapStateToProps, mapDispatcherToProps)(ConvoArea);
// export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(ConvoArea));