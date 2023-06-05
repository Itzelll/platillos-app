import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ListGroup, Form, Button } from 'react-bootstrap'
import '../App.css';

import kafkaService from '../services/kafka.service';
import { useAuth } from '../context/AuthContext';

import MongoDBService from '../services/MongoDb.service';

const CommentComponent = ({ pubId }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Crea una instancia de MongoDBService con la URL base del backend
    const mongoDBService = new MongoDBService('http://localhost:3001');

    // Define una función asincrónica para cargar los datos
    const fetchData = async () => {
      try {
        const response = await mongoDBService.getCommentsByObjectId(pubId);
        setComments(response); // Actualiza el estado 'comments' con los comentarios recibidos
      } catch (error) {
        console.error(error);
      }
    };

    // Llama a fetchData al montar o actualizar el componente
    fetchData();
  }, [pubId]);

  function saveComment(comm) {
    const uId = user.uid;
    const oId = pubId;
    const comment = comm.content;
    //console.log("user id", uId, "object id", oId, "comentario", comment);
    kafkaService.comment(uId, oId, comment);

  }

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return; // Evitar agregar comentarios vacíos
    }

    const comment = { _id: Date.now(), comment: newComment };
    saveComment(comment);
    setComments((prevComments) => [...prevComments, comment]);
    setNewComment('');
  };

  return (
    <View>
      <div class="newComment">
      <strong>Comentarios:</strong>
      <ListGroup className='comment-list'>
          {comments.map((comment) => (
            <ListGroup.Item key={comment._id}>
              {comment.comment}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form className="comment-list">
          <Form.Control
            type="text"
            placeholder="Agrega nuevo comentario"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button variant="primary" type="button" onClick={handleAddComment}>
            Agregar
          </Button>
        </Form>
        
        {/* <FlatList
          class="comment-list"
          data={comments}
          renderItem={({ item }) => <Text>{item.content}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />  
        <View>
          <div class="comentarios">
            <div class="comment">
              <TextInput
                id="new-comment"
                type="text"
                placeholder=" Agrega nuevo comentario"
                onChangeText={(e) => setNewComment(e.target.value)}
                value={newComment}
              />
            </div>
            <Button class="btnAgregar" title="Agregar" onPress={handleAddComment}>Agregar</Button>
          </div>
          <div>
            <ListGroup>
              {comments.map((comment) => (
                <ListGroup.Item key={comment._id}>
                  {comment.comment}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </View> */}
      </div>
    </View>
  );
};

export default CommentComponent;
