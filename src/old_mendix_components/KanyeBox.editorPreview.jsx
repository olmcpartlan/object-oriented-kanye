import { Component, createElement } from "react";
import GameBoard from "./components/GameBoard";

export class preview extends Component {
    render() {
        return <GameBoard/>
    }
}

export function getPreviewCss() {
    return require("./ui/KanyeBox.css");
}
