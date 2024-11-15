import VotableItem from "../../domain/VotableItem";
import VotingUiState from "./VotingUiState";


class VotingVm{
    uiState;
    

    constructor(initUiState){
        this.uiState = initUiState;
        this.initData();
    }

    initData(){
        //init some voting items:
        const names = ["goku","vegeta","gohn","cell"];
        const newData=[];
        for(let i = 0; i<4; i++){
            newData[i] = new VotableItem(i,names[i],false,this.onVote,0);
        }
        this.uiState = {...this.uiState,votableItems:newData};
    }

    /*
        will get a item id and update our ui state accordingly 
        * on -1 id the function will clean the votes from our screen only 
    */
    onVote(id){
        console.log("called");
            //clean previous vote
            const updateItems =  this.uiState.votableItems.map((item)=> {
                if(this.uiState.userVote != -1){
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
            this.uiState = {...this.uiState,votableItems:updateItems,userVote:id};        
    }
}

export default VotingVm;