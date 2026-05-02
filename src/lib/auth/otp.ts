import { otpWhitelist } from "./otpWhitelist";

export function normalizePhone(
phone:string
){
return phone.replace(/\D/g,'').trim();
}


export function isAllowedPhone(
phone:string
){
const cleaned=
normalizePhone(phone);

/* strict exact match only */
return otpWhitelist.some(
allowed =>
normalizePhone(allowed)===cleaned
);
}


export function generateOTP(){

return Math.floor(
1000 + Math.random()*9000
).toString();

}