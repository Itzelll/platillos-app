import React, { useState } from 'react';
import sad from '../img/sad.png';
import KafkaService from "../../services/kafka.service";

function saveLike(e, status) {
  
    let data = {
      id: 0,
      status: status
    };
 
    console.log(JSON.stringify(data));
 
    KafkaService.reaction("sad-button");
    e.preventDefault();
}


function SadButton() {
    const [sads, setLikes] = useState(0);
    const [saded, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${saded ? 'liked' : ''}`}
                onClick={(e) => {
                    setLikes(sads + 1);
                    setLiked(true);
                    e.preventDefault();
                    saveLike(e, 1);
                }}
            >
                <img src={sad} className='img' width={35} height={35} alt="" /> {sads} <br/>
                
            </button>
        </div>
    );
}
export default SadButton
