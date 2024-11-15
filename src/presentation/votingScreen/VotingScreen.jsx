import VotingVm from "./votingVm"
import { useState ,useEffect} from "react";
import VotingUiState from "./VotingUiState";
import VotableItem from "../../domain/VotableItem";


function VotingScreen(){
    const [uiState,setUiState] = useState(new VotingUiState());
    const vm = useState(new VotingVm(uiState,setUiState))[0];

    const listItems = uiState.votableItems.map(item =>
        <section className="votableItem">
                <h1>{item.name}</h1>
                <h3>the voted item : {item.itemVotes}</h3>
                <button onClick={()=> {vm.onVote(item.id)}}> vote !</button>
            </section> 
    )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUiState(vm.uiState) 
      }, 10); 
        // Clean up interval on component unmount
    return () => clearInterval(intervalId);
    }, [vm]);
            
  return (<>
  <h1>the list</h1>
  {listItems}
  </>);
}

export default VotingScreen
