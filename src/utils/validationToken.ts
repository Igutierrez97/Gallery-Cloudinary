import { verify } from "jsonwebtoken";

export function validationsToken(token: string) {
   if(verify(token, `${process.env.SECRET_kEY}`)) {
    return true
   }
   return false
}