import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { ROLE } from "../constants.js";

export const playerSchema = new Schema({
  id:{
    type:String,
    default: uuidv4,
    immutable: true
  },
  prenom:{
    type:String,
    required:true,
    upperCase:true
  },
  password:{
    type:String,
    required:true
  },
  nom:{
    type:String,
    required:true,
    upperCase:true
  },
  username:{
    type:String,
    unique:true,
    required:true
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

playerSchema.pre('save', function(next) {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});

export default mongoose.model("player", playerSchema);

export type PlayerType = {
  id?: string;
  username: string;
  prenom : string;
  nom : string;
  password: string;
  pv?: number;
  role?: ROLE;
}