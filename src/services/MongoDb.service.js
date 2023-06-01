const axios = require('axios');

class MongoDBService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(`${this.baseUrl}/users`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
      throw new Error('Error al obtener los usuarios');
    }
  }

  async getReactionsByObjectAndReaction(objectId, reactionId) {
    try {
      const response = await axios.get(`${this.baseUrl}/documents/${objectId}/reactions/${reactionId}`);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta', error);
      throw new Error('Error al realizar la consulta');
    }
  }

  async getCommentsByUserId(userId) {
    try {
      const response = await axios.get(`${this.baseUrl}/commentsByUserId/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta', error);
      throw new Error('Error al realizar la consulta');
    }
  }
}

module.exports = MongoDBService;