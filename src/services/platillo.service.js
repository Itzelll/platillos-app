import firebase from "../firebase";

const db = firebase.collection("/platillos");

class PlatillosDataService {
  getAll() {
    return db;
  }

  create(platillo) {
    return db.add(platillo);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

const platillosDataService = new PlatillosDataService();

export default platillosDataService;