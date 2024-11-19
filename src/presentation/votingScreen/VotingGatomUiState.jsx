// counterState.js
import { atom } from "recoil";
import VotingUiState from './VotingUiState';
import User from "../../domain/models/User";

// Define the counter state as an atom
export const VotingGatomUiState = atom({
  key: "counterState", // Unique ID (important)
  default: new VotingUiState(new User(-1,"someName","someEmail@","somePassowrd@",false,-1)) // Default value (initial state)
});
 