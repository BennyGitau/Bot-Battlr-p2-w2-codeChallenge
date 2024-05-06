import React from "react";
import axios from 'axios';


const botTypeClasses = {
  Assault: "icon military",
  Defender: "icon shield",
  Support: "icon plus circle",
  Medic: "icon ambulance",
  Witch: "icon magic",
  Captain: "icon star",
};

function BotCard({ bot , handleSelect, deleteBot }) {
  const {id, avatar_url, bot_class, catchphrase, health, damage, armor} = bot

  function handleDelete(){
    axios.delete(`http://localhost:8002/bots/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> {
      if(res.status >= 200 && res.status < 300){
        deleteBot(bot)
      } else {
        throw new Error('Error was encontered when removing bot')
      }
    })
    .catch(error =>
    console.error(error, 'Failed to remove bot')); 
  }
  return (
    <div className="ui column">
      <div
        className="ui card"
        key={id}
        onClick={()=>handleSelect(bot)}
      >
        <div className="image">
          <img alt="oh no!" src={avatar_url} />
        </div>
        <div className="content">
          <div className="header">
            {bot.name}
            <i className={botTypeClasses[bot_class]} />
          </div>
          <div className="meta text-wrap">
            <small>{catchphrase}</small>
          </div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat" />
            {health}
          </span>

          <span>
            <i className="icon lightning" />
            {damage}
          </span>
          <span>
            <i className="icon shield" />
            {armor}
          </span>
          <span>
            <div className="ui center aligned segment basic">
              <button
                className="ui mini red button"
                onClick={handleDelete}
                
              >
                x
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BotCard;
