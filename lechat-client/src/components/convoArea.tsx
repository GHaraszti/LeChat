import * as React from "react";

// //Reducers
// import {fetchCommentsActionCreator} from "../reducers/comments";
import {connect} from "react-redux";

//Components
import PostBox from "./postBox";
import Post from "./post";

const messages = [
    {username: "Pepe", text: "Hey Juanita, ontas"},
    {username: "Juanita", text: "**Visto**"},
]

class ConvoArea extends React.Component<any, any, any>{
    constructor (props:any){
        super(props);
        console.log("ConvoArea:properties: ", props);
        console.log("ConvoArea:properties(instance): ", this.props);
        console.log("ConvoArea:store", props.store);
        //this.props.fetchCommentsActionCreator(messages);

        // this.state = {
        //     messages : [
        //         {username: "Pepe", text: "Hey Juanita, ontas"},
        //         {username: "Juanita", text: "**Visto**"},
        //     ],
        //     received: [
        //     ]
        // };
        this.state = {
            messages: this.props.getComments()
        }
    }

    componentWillMount() {
        //this.props.fetchComments(messages);
        //this.props.getComments();
        //console.log("convoAreaProperties: ", this.props);
    }

    componentDidMount(){
        // this.props.addComment("This is content");
        // this.props.addComment("This is too");
        // this.props.addComment("This may be");

    }

    componentDidUpdate(){
        console.log("Component did update", this.props.state);
    }

    updateContent = (newMessage:{username: string, text: string}) => {
        this.state.messages.push(newMessage);
        //console.log(this.state.messages);

        this.setState(this.state.messages);
    }

    handleAddComments = ()=>{

    }

    componentWillReceiveProps = ()=>{
        console.log("Will receive props: ", this.props.state);
    }

    render(){
        //const messages = this.props.messages.comments.comments;
       let list = this.props.state.comments.content;
       console.log("Rendering...: ", list);


        const html = 
        <div className="container-fluid">
            
        {/*<!-- Page Heading -->*/}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">{this.props.convo.ID}, </h1>
            <PostBox envelope={{username:"user", text:"text"}} clickHandler={this.updateContent}/>
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
                    console.log("Posts list:", post);
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


const mapDispatcherToProps = {
      // dispatching plain actions
      getComments: () => ({ type: 'FETCH_COMMENTS' }),
      addComment: (content:any) => ({type: 'ADD_COMMENT',
      payload: {
          id: 1,
          content
      }
    })
};

const mapStateToProps = (state:any, ownProps:any) => {
    console.log("Store updated!!! state: ", state);
    return {state,
    ownProps};
};

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