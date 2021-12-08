import devTools from "devtools-detect";
import { Component, createElement } from "react";
import GameBoard from "./components/GameBoard";

export default class KanyeBox extends Component {
    constructor(props) {
      super(props);

    }

    render() {
        return <GameBoard mainProps={this.props} />;
    }
}
