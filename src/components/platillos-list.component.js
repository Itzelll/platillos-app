import React, { Component } from "react";
import PlatillosDataService from "../services/platillo.service";

import cv from "../cv.jpeg";
import LoveButton from "./reactions/LoveButton.component";
import SadButton from "./reactions/SadButton.component";
import CommentComponent from "./comment.component";

import { AuthProvider } from "../context/AuthContext";


export default class PlatillosList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      platillos: [],
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
    let platillos = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      platillos.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
        url: data.url,
      });
    });

    this.setState({
      platillos: platillos,
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
    const { platillos } = this.state;

    return (

      <div className="list-row cont-center">
        <div className="col-md-6">

          <ul className="list-group">
            {platillos &&
              platillos.map((platillo, index) => (
                <p
                  className={"list-group-item "}
                  onClick={() => this.setActiveTutorial(platillo, index)}
                  key={index}
                >
                  <div className="user">
                    <header>
                      <div className="Post-user">
                        <div className="Post-user-profilepicture">
                          <img src={cv} alt="itzelm" />
                        </div>
                        <div className="Post-user-nickname">
                          <span>Itzel Mendez</span>
                        </div>
                      </div>
                    </header>
                    <div className="Post-image">
                      <div className="Post-image-bg">
                        <img src={platillo.url} alt="post" />
                      </div>
                    </div>

                    <div className="Post-caption">
                      <div className="reactions">
                        <AuthProvider>
                          <LoveButton pubId={platillo.id} />
                          <SadButton pubId={platillo.id} />
                        </AuthProvider>
                      </div>
                      <div className="user">
                        <strong>__itzelm__ </strong> {platillo.title}: {platillo.description}
                      </div>
                      <div className="comentarios">
                        <CommentComponent pubId={platillo.id} />
                      </div>
                    </div>
                  </div>
                </p>
              ))}
          </ul>
        </div>

      </div>
    );
  }
}
