import React, { useState } from 'react';
import love from '../img/love.png';
import KafkaService from "../../services/kafka.service";

function saveLike(e, status) {
  
    let data = {
      id: 0,
      status: status
    };
 
    console.log(JSON.stringify(data));
 
    KafkaService.reaction("love-button");
    e.preventDefault();
}


function LoveButton() {
    const [loves, setLikes] = useState(0);
    const [loved, setLiked] = useState(false);
    
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
