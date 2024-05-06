import React, {useEffect, useState} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import axios from 'axios'
import BotSpecs from './BotSpecs';

function BotsPage() {
  const [bots, setBots] = useState([])
  const [selectedBots, setselectedBots] = useState([])
  const [showBots, setShowBots] = useState(false)
  const [myArmy, setMyArmy] = useState([])


  //start here with your code for step one
  //fetching bots
  useEffect(()=>{
    axios.get(`http://localhost:8002/bots`)
    .then(res => setBots(res.data))
    .catch(error=> console.error(error `Could not fetch bots`))
  },[])
  function handleSelect(botSelected){
    setselectedBots(botSelected);
    setShowBots(true)
  }
  function handleGoBack(){
    setShowBots(false)
    setselectedBots(null)
    
  }
  function handleEnlist(botEnlisted){
    if(!myArmy.find(bot => bot.id === botEnlisted.id))
    setMyArmy([...myArmy,botEnlisted])
  
}
function deleteFromMyArmy(selectedBot){
  const updatedArmy = myArmy.filter(bot=> bot.id !== selectedBot.id);
  setMyArmy(updatedArmy)
}
function deleteBot(deletedBot){
  const filteredBots =  bots.filter(bot=> bot.id !== deletedBot.id)
  setBots(filteredBots)

  const updatedMyArmy = myArmy.filter(bot=> bot.id !== deletedBot.id);
  setMyArmy(updatedMyArmy)
}
return (
  

        
      <div>
        <YourBotArmy 
          bots={myArmy} 
          removeBot={deleteFromMyArmy}
          deleteBot={deleteBot}/>
        {showBots ? <BotSpecs 
          bot={selectedBots}
          handleGoBack={handleGoBack}
          handleEnlist={handleEnlist}
        /> : 
        <BotCollection  bots={bots}
          handleSelect={handleSelect}
          deleteBot={deleteBot}/>
        }
      </div>
      
    
  )
}

export default BotsPage;
