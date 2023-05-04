import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import '../App.css';

const CommentComponent = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return; // Evitar agregar comentarios vacíos
    }

    const comment = { id: Date.now(), content: newComment };
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
