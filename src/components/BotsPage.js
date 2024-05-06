import React, {useEffect, useMemo, useState} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import axios from 'axios'
import BotSpecs from './BotSpecs';
import SortBar from "./SortBar";

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [selectedBots, setselectedBots] = useState([]);
  const [showBots, setShowBots] = useState(false);
  const [myArmy, setMyArmy] = useState([]);
  const [category, setCategory] = useState('');



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
const sortedBots = useMemo(()=>{
  let sortedItems = [...bots]
  if(category === 'armor'){
    sortedItems.sort((a,b) => b.armor - a.armor)
  } else if (category === 'health'){
    sortedItems.sort((a,b) => b.health - a.health)
  } else if(category === 'damage'){
    sortedItems.sort((a,b)=> b.damage - a.damage)
  } 
  return sortedItems

},[category, bots])

function sortByArmor(){
setCategory('armor')
}
function sortByDamage(){
  setCategory('damage')

}
function sortByHealth(){
  setCategory('health')
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
        <>
        <SortBar sortByArmor={sortByArmor} sortByDamage={sortByDamage} sortByHealth={sortByHealth}/>
        <BotCollection  bots={sortedBots}
          handleSelect={handleSelect}
          deleteBot={deleteBot}/>
        </>
        }
      </div>
      
    
  )
}

export default BotsPage;
