import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import heroesReducer from "./heroes";
import monstersReducer from "./monsters";
import battlesReducer from "./battles";
import goldReducer from "./gold";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  heroes: heroesReducer,
  monsters: monstersReducer,
  battles: battlesReducer,
  gold: goldReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
