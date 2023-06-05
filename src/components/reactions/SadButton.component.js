import React, { useEffect, useState } from 'react';
import sad from '../img/sad.png';
import KafkaService from "../../services/kafka.service";
import { useAuth } from '../../context/AuthContext';

const MongoDBService = require('../../services/MongoDb.service');

function SadButton({pubId}) {
    const {user} = useAuth();
    const [sads, setLikes] = useState(0);
    const [saded, setLiked] = useState(false);


    useEffect(()=>{
        // Crea una instancia de MongoDBService con la URL base del backend
        const mongoDBService = new MongoDBService('http://localhost:3001');
    
        // Define los parámetros deseados para la llamada a getReactionsByObjectAndReaction
        const objectId = pubId;
        const reactionId = 'sad';
    
        // Define una función asincrónica para cargar los datos
        const fetchData = async () => {
          try {
            const response = await mongoDBService.getReactionsByObjectAndReaction(objectId, reactionId);
            const data= response[0];
            setLikes(data.n);
          } catch (error) {
            console.error(error);
          }
        };
    
        // Llama a fetchData al montar o actualizar el componente
        fetchData();
        })
    

    function saveLike(e) {  
        const uId= user.uid;    
        const oId= pubId;
        const rId= "sad"
        KafkaService.reaction(uId, oId, rId);
        e.preventDefault();
    }

    
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${saded ? 'liked' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1);
                    setLikes(sads + 1);
                    setLiked(true);                    
                }}
            >
                <img src={sad} className='img' width={35} height={35} alt="" /> {sads} <br/>
                
            </button>
        </div>
    );
}
export default SadButton
