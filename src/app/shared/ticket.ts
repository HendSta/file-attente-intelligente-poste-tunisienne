import { Poste } from "./poste";

export interface Ticket{
    numTicket:number;

    cin_client:number;

    status:string;

    poste: Poste;

    service: string;
}