import { createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);