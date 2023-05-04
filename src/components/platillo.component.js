import React, { Component } from "react";
import PlatillosDataService from "../services/platillo.service";

export default class Platillo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePlatillo = this.updatePlatillo.bind(this);
    this.deletePlatillo = this.deletePlatillo.bind(this);

    this.state = {
      currentPlatillo: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { platillo } = nextProps;
    if (prevState.currentPlatillo.id !== platillo.id) {
      return {
        currentPlatillo: platillo,
        message: ""
      };
    }

    return prevState.currentPlatillo;
  }

  componentDidMount() {
    this.setState({
      currentPlatillo: this.props.platillo,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPlatillo: {
          ...prevState.currentPlatillo,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentPlatillo: {
        ...prevState.currentPlatillo,
        description: description,
      },
    }));
  }

  updatePublished(status) {
    PlatillosDataService.update(this.state.currentPlatillo.id, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentPlatillo: {
            ...prevState.currentPlatillo,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePlatillo() {
    const data = {
      title: this.state.currentPlatillo.title,
      description: this.state.currentPlatillo.description,
    };

    PlatillosDataService.update(this.state.currentPlatillo.id, data)
      .then(() => {
        this.setState({
          message: "The platillo was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deletePlatillo() {
    PlatillosDataService.delete(this.state.currentPlatillo.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentPlatillo } = this.state;

    return (
      <div>
        <h4>Platillo: {this.state.title}</h4>
        {currentPlatillo ? (
          <div className="edit-form">
            <img src={this.state.url} alt=""></img>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPlatillo.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPlatillo.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPlatillo.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPlatillo.published ? (
              <button
                className="badge badge-primary mr-2" id="unpublish"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2" id="publish"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2" id="delete"
              onClick={this.deletePlatillo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success" id="update"
              onClick={this.updatePlatillo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor seleccione un Platillo...</p>
          </div>
        )}
        <div>
          <div>
              <img src={currentPlatillo.url} alt="imagenes"></img>
          </div>
        </div>
      </div> 
    );

  }
}
