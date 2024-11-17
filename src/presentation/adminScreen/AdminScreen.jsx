import AdminUiState from "./AdminUiState";
import AdminVm from './AdminVm';
import {useState,useEffect} from "react";
import UserTableItem from './components/UserTableItem';
import VerticalProgressBar from './components/VerticalProgressBar';

function AdminScreen({repo,signOut,exposeAdmin}){
    const [uiState,setUiState] = useState(new AdminUiState());
    const vm = useState(new AdminVm(repo,uiState,signOut,exposeAdmin))[0];

    const voteValues = uiState.voteSumArr.map((item,index) =>{return(
        //create matched list item component
        <VerticalProgressBar
            currentValue={item}
            maxValue={2}
            header={`${vm.getVotAbleHeaderByIndex(index)[1]}`}
            imgUrl={`${vm.getVotAbleHeaderByIndex(index)[0]}`}
          />
        )
    }    
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
      <div className="topBar">
        <h1>Admin view:</h1>
        <div className="buttonContainer">
          <button className="signOutBut" onClick={() => vm.onSignOut()}>Sign Out</button>
          <button className="signOutBut" onClick={() => vm.onBackToVote()}>Voting View</button>
        </div>
      </div>
      <section className="UsersTable">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>isAdmin</th>
              <th>userVote</th>
            </tr>
          </thead>
          <tbody>
             {uiState.usersList.map(user => (
            <UserTableItem key={user.id} user={user} />
          ))}
          </tbody>
        </table>
      </section>
      <section className="progressBarRow">
         {voteValues}
      </section>
    </section>)
    
}

export default AdminScreen
 
