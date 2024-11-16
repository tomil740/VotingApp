class VotingUiState{
    votableItems;
    user;

    constructor(user){
        this.votableItems = [];
        this.user = user;
    }
}

export default VotingUiState;