import React, { useState } from 'react';
import love from '../img/love.png';

function LoveButton() {
    const [loves, setLikes] = useState(0);
    const [loved, setLiked] = useState(false);
    return (
        <div className="like-button-container">
            <button id="like"
                className={`like-button ${loved ? 'liked' : ''}`}
                onClick={() => {
                    setLikes(loves + 1);
                    setLiked(true);
                }}
            >
                <img src={love} className='img' width={35} height={35} alt="" /> {loves} <br/>
                 
            </button>
        </div>
    );
}
export default LoveButton
