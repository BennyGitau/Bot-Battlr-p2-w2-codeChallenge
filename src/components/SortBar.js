import React from 'react'

export default function SortBar({ sortByArmor, sortByDamage, sortByHealth}) {
    const butStyle ={
        backgroundColor: "#877d7c",
        fontWeight: '300',
        fontStyle: 'italic',
        fontSize: '2em',
        border: 'none'
    }
  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', margin: '5px', padding: 'none'}}>
        <p style={{fontSize: 'large'}}>Sort By:</p>
        <button style={butStyle} onClick={sortByHealth}>Health</button>
        <button style={butStyle} onClick={sortByDamage}>Damage</button>
        <button style={butStyle} onClick={sortByArmor}>Armor</button>
    </div>
  )
}
