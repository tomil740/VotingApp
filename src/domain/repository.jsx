import User from "./models/User"
import VotableItem from "./models/VotableItem";

class Repository{

    constructor(){
        this.usersLst = this.#initUsers();
    }

    #initUsers(){
        const res = [];
        const names = ["yahav","liam"];
        //get users votes/initalize the localStorage key values
        for(let i =0 ; i < names.length; i++){
            const userVote = this.getUserVoteById(i);
            const user = new User(i,names[i],`${names[i]}@something`,`${names[i]}-p-${names[i]}`,(i%2 != 0),userVote);
            res.push(user);
        }
        return res;
    }

    getAllUsers(){
        const res = [];
        this.usersLst.forEach((item)=>{
            const userVote = this.getUserVoteById(item.id);
            res.push({...item,userVote:userVote});
        })
        this.usersLst =res;
        return this.usersLst;
    }

    getLoginUser(){
        const userId = localStorage.getItem("signedUserId");
        const userVote = this.getUserVoteById(userId);
        const user = {...this.usersLst[userId],userVote:userVote};
        return user
    }

    onUserVote(userId,userVote){
       localStorage.setItem(`userId${userId}`,userVote);
    }

    getVotingOptions(){
        //init some voting items:
        const names = ["goku","vegeta","gohn","cell"];
        const imgUrls = ["https://www.pngall.com/wp-content/uploads/13/Goku-PNG-Images-HD.png","https://www.pngall.com/wp-content/uploads/15/Majin-Vegeta-PNG-Background.png",
            "https://www.pngall.com/wp-content/uploads/14/Goku-Hair.png","https://www.pngall.com/wp-content/uploads/14/Goku-Hair-PNG-Background.png"
        ]
        const newData=[];
        for(let i = 0; i<4; i++){
            newData[i] = new VotableItem(i,names[i],0,imgUrls[i]);
        }

        return newData;
    }

    /*
    arguments : email,password
    the function wil go over all the user and search for a match to our data
        * on one field mathced,a mtched note will be send back to the user
            will go through the fake object name/password in corelation
    
    on secusess we will return a matched user object
    
    *will break into use case funciton 
    */
    signIn(email,passWord){
        let res = new User(-1,"someName","someEmail@","somePassowrd@",false,-1);
        let counter = 0;
        while(res.id == -1 && counter < this.usersLst.length){
            const item  = this.usersLst[counter];

            if(item.email == email || item.passWord == passWord){
                //there is a matche
                if(item.email == email && item.passWord == passWord){
                //sync the update voteing state
                const userVote = localStorage.getItem(`userId${item.id}`);
                localStorage.setItem("signedUserId",item.id);
                //update the state
                res = {...item,userVote:userVote};
                }else if(item.email == email){
                    res.email = ""
                    res.passWord = "passWrod is not correct";
                }else{
                    res.passWord = ""
                    res.email = "email is not correct";
                }
            }else{
                res.passWord = "passWrod is not correct";
                res.email = "email is not correct";
                res.name = "there is no matche user,try again..."
            }
            counter++;
        }
        return res;
    }

    getUserVoteById(userId){
        const userVote = localStorage.getItem(`userId${userId}`);
        if(userVote == undefined || userVote == null){
            localStorage.setItem(`userId${userId}`,-1);
        }
        return userVote;
    }
}

export default Repository;