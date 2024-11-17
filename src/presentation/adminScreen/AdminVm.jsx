class AdminVm{
    uiState;
    repository;
    onSignOutState;

    constructor(repo,initUiState,onSignOutState,onBackToVote){
        this.repository = repo;
        this.uiState = initUiState;
        this.onSignOutState = onSignOutState;
        this.onBackToVote = onBackToVote;
        this.initUserData();
    }

    initUserData(){
        const a = this.repository.getAllUsers();
        const c = this.repository.getVotingOptions().length;
        const b = [];
        for(let i = 0; i < c; i++){
            //pull the user pick
            //update our local users
            b.push(0);
        }
        let counter = 0;
        for(let item of a){
            if(item.userVote != -1){
                counter++;
                b[item.userVote] = b[item.userVote] + 1;
            }
        }
        b.push(counter);
        this.uiState = {...this.uiState,usersList:a,voteSumArr:b};
    }

    onSignOut(){
        console.log("signOut")
        localStorage.setItem("signedUserId",-1);
        this.onSignOutState()
    }

    onBackToVote(){
        this.onBackToVote()
    }

    getVotAbleHeaderByIndex(theIndex){
        let res =  "All Users:";
        let imgUrl = 'https://cch.edu.pk/wp-content/uploads/2023/05/Exam-Result-3-1-1200x600.jpg';
        if(theIndex != 4){
            let ress = this.repository.getVotingOptions()[theIndex]
            imgUrl =ress.imgUrl;
            res = ress.name;
        }
        return [imgUrl,res];
    }
}

export default AdminVm;