// useCounterViewModel.js
import { useRecoilState } from "recoil";
import { VotingGatomUiState } from "./VotingGatomUiState";

class VotingVm {
  setUiStateFun;
  uiState;
  repository;
  onSignOutState;
  onExposeAdmin;


  constructor(repo, onSignOutState, onExposeAdmin) {
    const [uiState, setUiState] = useRecoilState(VotingGatomUiState);
    this.uiState = uiState;
    this.setUiStateFun = setUiState;
    this.repository = repo;
    this.onSignOutState = onSignOutState;
    this.onExposeAdmin = onExposeAdmin;

    //const theS =(this.repository.signIn("yahav@somthing","yahav-p-yahav"));
    const theS = this.repository.getLoginUser();
    this.uiState = { ...this.uiState, user: theS };

    this.initData();
  }

  initData() {
    const newData = [];
    const votableItems = this.repository.getVotingOptions();
    for (let i = 0; i < votableItems.length; i++) {
      const myVote = this.uiState.user.userVote == i ? 1 : 0;
      newData[i] = { ...votableItems[i], itemVotes: myVote };
    }
    this.uiState = { ...this.uiState, votableItems: newData };
  }

  onSignOut() {
    localStorage.setItem("signedUserId", -1);
    this.onSignOutState();
  }

  onExposeAdmin() {
    this.onExposeAdmin();
  }

  /*
        will get a item id and update our ui state accordingly 
        * on -1 id the function will clean the votes from our screen only 
    */
  onVote(id) {
    //clean previous vote
    const updateItems = this.uiState.votableItems.map((theItem) => {
    // when migrate the state from regular object to the global useRecoil state,theItem inside the 
    //current map function became imutable ,the line below solve the isuses
      const item = { ...theItem };
      if (this.uiState.user.userVote != -1) {
        if (id == -1) {
          item.isVoted = false;
        }
        item.itemVotes = 0;
      }
      if (item.id == id) {
        item.itemVotes = 1;
      }
      return item;
    });
    this.repository.onUserVote(this.uiState.user.id, id);
    //update the ui state object
    const user = { ...this.uiState.user, userVote: id };
    const a = {
      ...this.uiState,
      votableItems: updateItems,
      user: user,
    };
    this.setUiStateFun(a);
    //react need a cahnge in the element to rerender when its update through the set function we are changing the mutable object accordingly recat want rerender...
    this.uiState = a;
  }
}

export default VotingVm;
