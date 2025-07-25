import mongoose, { Schema } from "mongoose";
import { ROLE } from "../constants.js";

export const playerSchema = new Schema({
  prenom:{
    type:String,
    required:true,
    upperCase:true
  },
  nom:{
    type:String,
    required:true,
    upperCase:true
  },
  pv:{
    type:Number,
    required:true,
    default:3,
    min:0,
    max:3
  },
  role:{
    type: String,
    enum: Object.values(ROLE),
    required:true,
    default:ROLE.PLAYER
  }
});

export default mongoose.model("player", playerSchema);

export type PlayerType = {
  _id: string;
  prenom : string;
  nom : string;
  password: string;
  pv : number;
  role : ROLE;
}