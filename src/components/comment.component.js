import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import '../App.css';

import kafkaService from '../services/kafka.service';
import { useAuth } from '../context/AuthContext';

const CommentComponent = ({ pubId }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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

    const comment = { id: Date.now(), content: newComment };
    saveComment(comment);
    setComments((prevComments) => [...prevComments, comment]);
    setNewComment('');
  };

  return (
    <View>
      <div class="newComment">
        <FlatList
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
                placeholder=" Agrega nuevo comentario"
                onChangeText={(text) => setNewComment(text)}
                value={newComment}
              />
            </div>
            <Button class="btnAgregar" title="Agregar" onPress={handleAddComment}>Agregar</Button>
          </div>
        </View>
      </div>
    </View>
  );
};

export default CommentComponent;
