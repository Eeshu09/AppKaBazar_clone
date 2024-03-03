
import { legacy_createStore as createstore } from "redux";
import rootReducer from "../reducer"; 
const store=createstore(rootReducer);
export default store;