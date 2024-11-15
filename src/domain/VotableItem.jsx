class VotableItem{
    id;
    name;
    isVoted;
    onVote;
    itemVotes;

    constructor(id,name,isVoted,onVote,itemVotes){
        this.id = id;
        this.name = name;
        this.isVoted = isVoted;
        this.onVote = onVote;
        this.itemVotes = itemVotes;
    }
}

export default VotableItem;