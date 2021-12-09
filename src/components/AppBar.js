import React, { Component, useEffect } from "react";

export default class AppBar extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    console.log(this.props)
  }
  render() {

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#" onClick={() => this.props.changeGame("wumw")}>
                wum.w
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                href="#"
                onClick={() => this.props.changeGame("maze")}
              >
                maze
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  }
}
