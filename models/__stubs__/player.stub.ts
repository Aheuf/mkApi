import { ROLE } from "../../constants";
import { NewPlayerPayload, PlayerType } from "../player";

export const stubedPlayers: PlayerType[] = [
  {
    username:"bobrat",
    prenom : "CLEMENT",
    nom : "GENTY",
    password: "password",
    pv : 3,
    role : ROLE.ADMIN
  },{
    username:"bobcat",
    prenom : "LUCIANA",
    nom : "DOMINGOS",
    password: "password",
    pv : 2,
    role : ROLE.PLAYER
  },{
    username:"bobhorse",
    prenom : "CLEMENT",
    nom : "LAILLE",
    password: "password",
    pv : 3,
    role : ROLE.PLAYER
  },{
    username:"bobdog",
    prenom : "AURELIEN",
    password: "password",
    nom : "BURIE",
    pv : 3,
    role : ROLE.PLAYER
  }
];

export const newStubedPlayer: NewPlayerPayload = {
    username: "bob",
    prenom : "robert",
    nom : "squarepants",
    password: "b!k1ni_b0tt0m"
}