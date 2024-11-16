class VotableItem{
    id;
    name;
    itemVotes;
    imgUrl;

    constructor(id,name,itemVotes,imgUrl){
        this.id = id;
        this.name = name;
        this.itemVotes = itemVotes;
        this.imgUrl = imgUrl
    }
}

export default VotableItem;