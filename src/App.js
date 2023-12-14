import React from 'react';
import Die from "./components/Die.js";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';

function App() {
//created a state to hold the array of number
const[dice,setDice]=React.useState(allNewDice); 

//created another state to check whether user is won or not

const[tenzies,setTenzies]=React.useState(false);

//using reactEffect to synchronize both the above states 

React.useEffect(()=>{

     const allHeld=dice.every(die=>die.isHeld)
      const firstValue=dice[0].value
      const allSameValue=dice.every(die => die.value===firstValue )
      if (allHeld && allSameValue) {
        setTenzies(true)
        
      }



}
,[dice])

//function to create an array of random numbers
  function allNewDice(){
    const newNumberArray=[];
    for (let i = 0; i < 10; i++) {
      
      newNumberArray.push(randomNumberGenerator())
    }
    
    return newNumberArray
    
  }
  //to generate random number 
 function randomNumberGenerator(){
  return {
  
    value:Math.ceil(Math.random()*6),
    isHeld:false,
    id:nanoid()
  
  }
 }


  //creating a function to check whether the element is clicked

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die,isHeld: !die.isHeld}:die
    }))

  }
  


  //creating function for roll button which onclick generates new array
  function rollDice(){
    //adding the feature to restart a the game if game is won
    if(!tenzies)
    {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
      die :
      randomNumberGenerator()
    }))
  }
  
  else{
    setTenzies(false)
    setDice(allNewDice())
  }
  }

  
  //to create 10 components using map function
   const diceElements=dice.map(die => <Die holdDice={()=> holdDice(die.id)} isHeld={die.isHeld} key={die.id}  value={die.value}/>)


  return (
    <main>
    {tenzies && <Confetti/>}
     <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className='die--container'>
    {diceElements}
    </div>
    <button onClick={rollDice} className='roll--button'>{tenzies?"New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
