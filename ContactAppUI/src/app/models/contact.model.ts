import { Email } from "./email.model";
import { Num } from "./number.model";

export interface Contact {
  id:number,
  firstname: string,
  lastname: string,
  adress: string,
  tag:string,
  number: Num[],
  email: Email[]

}
