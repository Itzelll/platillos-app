import React, { useState } from 'react';
import sad from '../img/sad.png';
import KafkaService from "../../services/kafka.service";
import { useAuth } from '../../context/AuthContext';


function SadButton() {
    const {user} = useAuth();
    const [sads, setLikes] = useState(0);
    const [saded, setLiked] = useState(false);

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
