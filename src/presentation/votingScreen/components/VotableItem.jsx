import { useEffect, useState } from "react"

function VotableItem({isVoted,item,callBack}) {

    const [buttonText,setButtonText] = useState("Vote!");

    
    useEffect(()=>{
        if(isVoted != -1){
            setButtonText("change vote")
        }
    },[isVoted])


  return (
    <section className="votableItem">
        <h1>{item.name}</h1>
        <h3>the voted item : {item.itemVotes}</h3>
        <button onClick={callBack}>{buttonText}</button>
    </section> 
  )
}

export default VotableItem
