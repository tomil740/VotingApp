import AdminUiState from "./AdminUiState";
import AdminVm from './AdminVm';
import {useState,useEffect} from "react";


function AdminScreen({repo,signOut,exposeAdmin}){
    const [uiState,setUiState] = useState(new AdminUiState());
    const vm = useState(new AdminVm(repo,uiState,signOut,exposeAdmin))[0];

    const userItems = uiState.usersList.map(item =>
        //create matched list item component
        <h1>the user:{Object.values(item)}</h1>
    )

    const voteValues = uiState.voteSumArr.map(item =>
        //create matched list item component
        <h1>{`${item}/${uiState.usersList.length}`}</h1>
    )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUiState(vm.uiState) 
      }, 10); 
        // Clean up interval on component unmount
    return () => clearInterval(intervalId);
    }, [vm]);

    return (
    <section className="AdminContainer">
        <h1>Admin view:</h1>
        <button className="signOutBut" onClick={()=>{vm.onSignOut()}}>sign out:</button>
        <button className="signOutBut" onClick={()=>{vm.onBackToVote()}}>voting view</button>
      <section className="UsersTable">
        {userItems}
      </section>
      <section className="VotesSummary">
        {voteValues}
      </section>
    </section>);
    
}

export default AdminScreen
 
