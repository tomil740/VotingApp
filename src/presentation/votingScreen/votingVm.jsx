import VotableItem from "../../domain/models/VotableItem";
import VotingUiState from "./VotingUiState";
import Repository from "../../domain/repository";


class VotingVm{
    uiState;
    repository;
    onSignOutState;
    

    constructor(initUiState,repo,onSignOutState){
        this.uiState = initUiState;
        this.repository = repo;
        this.onSignOutState = onSignOutState;

        const theS =(this.repository.signIn("yahav@somthing","yahav-p-yahav"));
        this.uiState = {...this.uiState, user:theS};

        this.initData();

    }

    initData(){
        //init some voting items:
        const names = ["goku","vegeta","gohn","cell"];
        const imgUrls = ["https://www.pngall.com/wp-content/uploads/13/Goku-PNG-Images-HD.png","https://www.pngall.com/wp-content/uploads/15/Majin-Vegeta-PNG-Background.png",
            "https://www.pngall.com/wp-content/uploads/14/Goku-Hair.png","https://www.pngall.com/wp-content/uploads/14/Goku-Hair-PNG-Background.png"
        ]
        const newData=[];
        for(let i = 0; i<4; i++){
            const myVote = (this.uiState.user.userVote == i) ? 1 : 0;
            newData[i] = new VotableItem(i,names[i],myVote,imgUrls[i]);
        }
        this.uiState = {...this.uiState,votableItems:newData};
    }

    onSignOut(){
        console.log("signOut")
        localStorage.setItem("signedUserId",-1);
        this.onSignOutState()
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
            this.repository.onUserVote(this.uiState.user.id,id);
            //update the ui state object
            const user = {...this.uiState.user, userVote:id}
            this.uiState = {...this.uiState,votableItems:updateItems,user:user};     
               
    }
}

export default VotingVm;