import { ROLE } from "../../constants";
import { PlayerType } from "../Player";

export const stubedPlayers: PlayerType[] = [
  {
    prenom : "CLEMENT",
    nom : "GENTY",
    pv : 3,
    role : ROLE.ADMIN
  },{
    prenom : "LUCIANA",
    nom : "DOMINGOS",
    pv : 2,
    role : ROLE.PLAYER
  },{
    prenom : "CLEMENT",
    nom : "LAILLE",
    pv : 3,
    role : ROLE.PLAYER
  },{
    prenom : "AURELIEN",
    nom : "BURIE",
    pv : 3,
    role : ROLE.PLAYER
  }
];