import dbDao from "../data/dbDao";
import User from "./models/User"
import VotableItem from "./models/VotableItem";

class Repository{

    constructor(){
        //this.usersLst = this.#initUsers();
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
        return dbDao.getAllUsers();
    }

    getLoginUser(){
        const userId = localStorage.getItem("signedUserId");
        return dbDao.getUserById(userId);
    }

    onUserVote(userId,userVote){
        dbDao.updateUserVote(userId,userVote);
    }

    getVotingOptions(){
        return dbDao.getAllVotingItems();
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

        const a = dbDao.getUserByEmail(email);
        
        const theRes = (a.length < 1) ? res : a[0];

        if(theRes.id == -1){
             res.passWord = "passWrod is not correct";
             res.email = "email is not correct";
             res.name = "there is no matche user,try again..."
        }else if(theRes.passWord == passWord){
            res = theRes;
            localStorage.setItem("signedUserId", theRes.id);
        }else {
            res.email = "";
            res.passWord = "passWrod is not correct";
        }

        return res;

/*
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
        */
    }

    
}

export default Repository;