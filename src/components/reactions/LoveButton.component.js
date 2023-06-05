import React, { useEffect, useState } from 'react';
import love from '../img/love.png';
import KafkaService from "../../services/kafka.service";
import { useAuth } from '../../context/AuthContext';

const MongoDBService = require('../../services/MongoDb.service');

function LoveButton({ pubId }) {
    const { user } = useAuth();
    const [loves, setLikes] = useState(0);
    const [loved, setLiked] = useState(false);


    useEffect(() => {
        // Crea una instancia de MongoDBService con la URL base del backend
        const mongoDBService = new MongoDBService('http://localhost:3001');

        // Define los parámetros deseados para la llamada a getReactionsByObjectAndReaction
        const objectId = pubId;
        const reactionId = 'love';

        // Define una función asincrónica para cargar los datos
        const fetchData = async () => {
            try {
                const response = await mongoDBService.getReactionsByObjectAndReaction(objectId, reactionId);
                const data = response[0];
                setLikes(data.n);
            } catch (error) {
                console.error(error);
            }
        };

        // Llama a fetchData al montar o actualizar el componente
        fetchData();
    })
    

    function saveLike(e) {
        const uId = user.uid;
        const oId = pubId;
        const rId = "love"
        KafkaService.reaction(uId, oId, rId);
        e.preventDefault();
    }

    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${loved ? 'liked' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1);
                    setLikes(loves + 1);
                    setLiked(true);                    
                }}
            >
                <img src={love} className='img' width={35} height={35} alt="" /> {loves} <br />

            </button>
        </div>
    );
}
export default LoveButton
