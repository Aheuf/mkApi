import { ROLE } from "../../constants.js";
import { PlayerType } from "../player.js";

export const stubedPlayers: PlayerType[] = [
  {
    id: "1",
    username:"bobrat",
    prenom : "CLEMENT",
    nom : "GENTY",
    password: "password",
    pv : 3,
    role : ROLE.ADMIN
  },{
    id: "2",
    username:"bobcat",
    prenom : "LUCIANA",
    nom : "DOMINGOS",
    password: "password",
    pv : 2,
    role : ROLE.PLAYER
  },{
    id: "3",
    username:"bobhorse",
    prenom : "CLEMENT",
    nom : "LAILLE",
    password: "password",
    pv : 3,
    role : ROLE.PLAYER
  },{
    id: "4",
    username:"bobdog",
    prenom : "AURELIEN",
    password: "password",
    nom : "BURIE",
    pv : 3,
    role : ROLE.PLAYER
  }
];