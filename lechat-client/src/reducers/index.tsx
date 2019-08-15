import {combineReducers} from "redux";
import comments from "./comments";
import members from "./members";
import convos from "./convos";

//import counter from "./counters";

export default combineReducers({
    comments,
    members,
    convos
});
