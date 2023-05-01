import React, { Component } from "react";
import PlatillosDataService from "../services/platillo.service";

import Platillo from "./platillo.component";

export default class PlatillosList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      platillo: [],
      currentPlatillo: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = PlatillosDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let platillo = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      platillo.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
        platillo: platillo,
    });
  }

  refreshList() {
    this.setState({
      currentPlatillo: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(platillo, index) {
    this.setState({
      currentPlatillo: platillo,
      currentIndex: index,
    });
  }

  render() {
    const { platillo, currentPlatillo, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Platillos List</h4>

          <ul className="list-group">
            {platillo &&
              platillo.map((platillo, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveTutorial(platillo, index)}
                  key={index}
                >
                  {platillo.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentPlatillo ? (
            <Platillo
              platillo={currentPlatillo}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Porfavor selecciona un Platillo...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
