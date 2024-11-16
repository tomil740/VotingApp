import VotableItem from "../../domain/models/VotableItem";
import VotingUiState from "./VotingUiState";
import Repository from "../../domain/repository";


class VotingVm{
    uiState;
    repository;
    

    constructor(initUiState){
        this.uiState = initUiState;
        this.repository = new Repository();
        this.initData();

        const theS =(this.repository.signIn("yahav@somthing","yahav-p-yahav"));
        this.uiState = {...this.uiState, user:theS};
        console.log("sign in as",this.uiState.user);
    }

    initData(){
        //init some voting items:
        const names = ["goku","vegeta","gohn","cell"];
        const newData=[];
        for(let i = 0; i<4; i++){
            newData[i] = new VotableItem(i,names[i],0);
        }
        this.uiState = {...this.uiState,votableItems:newData};
    }

    /*
        will get a item id and update our ui state accordingly 
        * on -1 id the function will clean the votes from our screen only 
    */
    onVote(id){
            //clean previous vote
            const updateItems =  this.uiState.votableItems.map((item)=> {
                if(this.uiState.user.userVote != -1){
                    if(id == -1){
                        item.isVoted = false;
                    }
                    item.itemVotes = 0;
                }
                if(item.id == id){
                    item.itemVotes = 1;
                }
                return item;
            })
            //update the ui state object
            const user = {...this.uiState.user, userVote:id}
            this.uiState = {...this.uiState,votableItems:updateItems,user:user};     
            
            console.log(this.uiState.user);
   
    }
}

export default VotingVm;