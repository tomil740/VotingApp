//there is no need foer data object because there is no build phase and no dependecny inversion ...
import User from "../domain/models/User";
import VotableItem from "../domain/models/VotableItem";

class DbDao {
  #users;
  #votingItems;

  constructor() {
    this.#users = this.#initUsers();
    this.#votingItems = this.#getVotingOptions;
  }

  getAllUsers() {
    return this.#users;
  }

  getUserByEmail(email) {
    return (this.#users.filter((item)=>item.email == email));
  }

  getUserById(id) {
    return this.#users[id];
  }

  updateUserVote(userId, theVote) {
    localStorage.setItem(`userId${userId}`, theVote);
    const res = [];
    this.#users.forEach((item) => {
      const userVote = this.#getUserVoteById(item.id);
      res.push({ ...item, userVote: userVote });
    });
    this.#users = res;

  }

  getAllVotingItems() {
    return this.#votingItems();
  }

  #initUsers() {
    const res = [];
    const names = ["yahav", "liam"];
    //get users votes/initalize the localStorage key values
    for (let i = 0; i < names.length; i++) {
      const userVote = this.#getUserVoteById(i);
      const user = new User(
        i,
        names[i],
        `${names[i]}@something`,
        `${names[i]}-p-${names[i]}`,
        i % 2 != 0,
        userVote
      );
      res.push(user);
    }
    return res;
  }

  //temp function to minimze the local sotrage use we will regenrate the user and only save the vote of each
  #getUserVoteById(userId) {
    const userVote = localStorage.getItem(`userId${userId}`);
    if (userVote == undefined || userVote == null) {
      localStorage.setItem(`userId${userId}`, -1);
    }
    return userVote;
  }

  #getVotingOptions() {
    //init some voting items:
    const names = ["goku", "vegeta", "gohn", "cell"];
    const imgUrls = [
      "https://www.pngall.com/wp-content/uploads/13/Goku-PNG-Images-HD.png",
      "https://www.pngall.com/wp-content/uploads/15/Majin-Vegeta-PNG-Background.png",
      "https://www.pngall.com/wp-content/uploads/14/Goku-Hair.png",
      "https://www.pngall.com/wp-content/uploads/14/Goku-Hair-PNG-Background.png",
    ];
    const newData = [];
    for (let i = 0; i < 4; i++) {
      newData[i] = new VotableItem(i, names[i], 0, imgUrls[i]);
    }

    return newData;
  }
}
const dbDao = new DbDao();
export default dbDao;