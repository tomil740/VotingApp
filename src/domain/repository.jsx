import User from "./models/User"

class Repository{

    constructor(){
        this.usersLst = this.#initUsers();
    }

    #initUsers(){
        const res = [];
        const names = ["yahav","liam"];
        for(let i =0 ; i < names.length; i++){
            const user = new User(i,names[i],`${names[i]}@somthing`,`${names[i]}-p-${names[i]}`,(i%2 != 0),-1)
            res.push(user);
        }
        return res;
    }

    getAllUsers(){
        return this.usersLst;
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
                res = item;
                }else if(item.email == email){
                    res.email = "valid"
                    res.passWord = "passWrod is not correct";
                }else{
                    res.passWord = "valid"
                    res.email = "email is not correct";
                }
                console.log("end");
            }else{
                res.name = "there is no matche user,try again..."
            }
            counter++;
        }
        return res;
    }
}

export default Repository;