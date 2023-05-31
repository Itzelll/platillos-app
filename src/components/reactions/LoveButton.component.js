import React, { useState } from 'react';
import love from '../img/love.png';
import KafkaService from "../../services/kafka.service";
import { useAuth } from '../../context/AuthContext';


function LoveButton({pubId}) {
    const {user} = useAuth();
    const [loves, setLikes] = useState(0);
    const [loved, setLiked] = useState(false);

    function saveLike(e) { 
        const uId= user.uid;    
        const oId= pubId;
        const rId= "love"
        KafkaService.reaction(uId, oId, rId);
        e.preventDefault();
    }
    
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${loved ? 'liked' : ''}`}
                onClick={(e) => {
                    setLikes(loves + 1);
                    setLiked(true);
                    e.preventDefault();
                    saveLike(e, 1);
                }}
            >
                <img src={love} className='img' width={35} height={35} alt="" /> {loves} <br/>
                 
            </button>
        </div>
    );
}
export default LoveButton
