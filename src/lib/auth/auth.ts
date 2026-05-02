export const adminEmails = [
"2305133@kiit.ac.in",
"pratyushahiya2005@gmail.com",
"yogendra1yogi@gmail.com"
];

export const officialEmails = [
"2305133@kiit.ac.in",
"pratyushahiya2005@gmail.com",
"yogendra1yogi@gmail.com",
"dwsm.drdaboudh@gmail.com"
];

/* district-restricted accounts */
export const districtRestrictedUsers = {
"dwsm.drdaboudh@gmail.com":"Boudh"
};

export function normalizeEmail(
email:string
){
return email.trim().toLowerCase();
}

export function isAllowedAdminEmail(
email:string
){
return adminEmails.includes(
normalizeEmail(email)
);
}

export function isAllowedOfficialEmail(
email:string
){
return officialEmails.includes(
normalizeEmail(email)
);
}

// New combined function that accepts a portal type
export function isAllowedEmail(
email: string,
portal: 'admin' | 'official'
): boolean {
  if (portal === 'admin') {
    return isAllowedAdminEmail(email);
  } else if (portal === 'official') {
    return isAllowedOfficialEmail(email);
  }
  return false;
}

export function canAccessDistrict(
email:string,
district:string
){
const user=
normalizeEmail(email);

const selectedDistrict=
district.trim();

const restrictedDistrict=
districtRestrictedUsers[
user as keyof typeof districtRestrictedUsers
];

if(!restrictedDistrict){
return true;
}

return (
restrictedDistrict.toLowerCase()===
selectedDistrict.toLowerCase()
);
}