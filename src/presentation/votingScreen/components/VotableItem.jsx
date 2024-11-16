import { useEffect, useState } from "react"

function VotableItem({isVoted,item,callBack}) {

    const [buttonText,setButtonText] = useState("Vote!");

    
    useEffect(()=>{
        if(isVoted != -1){
            setButtonText("change vote")
        }
    },[isVoted])


  return (
    <div className="votableItem">
      <div className="ImageContainer">
        <img src={item.imgUrl}></img>
      </div>
      <div className="itemData">
        <h1>{item.name}</h1>
        <h3 className="voteCounter">Votes:{item.itemVotes}</h3>
        <button onClick={callBack}>{buttonText}</button>
      </div>
    </div>
  )
}

export default VotableItem
