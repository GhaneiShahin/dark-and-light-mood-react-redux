import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

const initialState = {
  isLightOn: false
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case "FLIP":
      return {
        ...state,
        isLightOn: !state.isLightOn
      };
    default:
      return state;
  }
}
const store = createStore(reducer);

class Room extends React.Component {
  flipLight = () => {
    this.props.dispatch({ type: "FLIP" });
  };

  render() {
    const lightedness = this.props.isLightOn ? "light" : "dark";
    return (
      <div className={`room ${lightedness}`}>
        <h2>the room is {lightedness}</h2> <br />
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          onChange={this.flipLight}
        />
        <label for="toggle"></label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLightOn: state.isLightOn
});
const ConnectedRoom = connect(mapStateToProps)(Room);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRoom />
  </Provider>,
  document.getElementById("root")
);
