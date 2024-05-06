import React from "react";
import BotCard from './BotCard'


function BotCollection({ bots, handleSelect, deleteBot }) {
  // Your code here

  const botList = bots.map((bot)=>{
    return <BotCard  key={bot.id} 
      bot={bot}
      handleSelect={handleSelect}
      deleteBot={deleteBot}
      />
  })
  return (
    <div className="ui four column grid">
      <div className="row">
        {botList}
        Collection of all bots
      </div>
    </div>
  );
}

export default BotCollection;
