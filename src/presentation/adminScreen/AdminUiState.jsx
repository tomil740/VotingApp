class AdminUiState{
    //the users domain object list
    usersList;
    //an array of which every index represent the matched options vote sum
    voteSumArr;

    constructor(){
        this.usersList = [];
        this.voteSumArr = [];
    }
}

export default AdminUiState;