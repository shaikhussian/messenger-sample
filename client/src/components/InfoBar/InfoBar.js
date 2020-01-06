import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
import adminIcon from '../../images/photo.jpg';

import './InfoBar.css';

const InfoBar = ({ room }) => {
    console.log("room_123", room)
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="adminIcon" src={adminIcon} alt="online" />
                <img className="onlineIcon" src={onlineIcon} alt="online" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close" /></a>
            </div>
        </div>
    )
}

export default InfoBar;