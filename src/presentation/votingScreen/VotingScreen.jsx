import VotingVm from "./votingVm"
import { useState ,useEffect} from "react";
import VotingUiState from "./VotingUiState";
import VotableItem from "./components/VotableItem";
import User from "../../domain/models/User";

function VotingScreen({repo,signOut,exposeAdmin}){
    const [uiState,setUiState] = useState(new VotingUiState(new User(-1,"someName","someEmail@","somePassowrd@",false,-1)));
    const vm = useState(new VotingVm(uiState,repo,signOut,exposeAdmin))[0];

    const listItems = uiState.votableItems.map(item =>
        <VotableItem isVoted={uiState.userVote} item={item} callBack={()=> {vm.onVote(item.id)}}/>
    )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUiState(vm.uiState) 
      }, 10); 
        // Clean up interval on component unmount
    return () => clearInterval(intervalId);
    }, [vm]);
    
    const theLine = (uiState.user.userVote != -1) ? `you vote to :${(uiState.votableItems[uiState.user.userVote].name)}` : "please vote:"
    

  return (
    <section className="votingContiner">
        <h1>Hay {uiState.user.name},{theLine}</h1>
        <button className="signOutBut" onClick={()=>{vm.onSignOut()}}>sign out:</button>
        <button className="adminViewBut" onClick={()=>{vm.onExposeAdmin()}}>admin view</button>
      <section className="VotableItemsContatiner">
        {listItems}
      </section>
    </section>);
}

export default VotingScreen
