import { Response } from "express";
import { JwtUserPayload } from "../types/express";
import { PlayerType } from "./player";

export default interface ServerSentEventClient {
    player: JwtUserPayload,
    res: Response
}

export enum ServerSentEventType {
    DELETE = "delete",
    UPDATE = "update",
    CREATE = "create"
}

export type ServerSentEventPayload = {
    action: ServerSentEventType.DELETE,
    username: string
} | {
    action: ServerSentEventType.UPDATE,
    username: string,
    pv: number
} | {
    action: ServerSentEventType.CREATE,
    player: PlayerType
}
