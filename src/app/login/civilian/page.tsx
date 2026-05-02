'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OdishaLogo } from '@/components/odisha-logo';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mrfData } from '@/lib/mrf-data';

import {
isAllowedPhone,
generateOTP
} from '@/lib/auth/otp';



export default function CivilianLoginPage(){

const router=useRouter();
const {toast}=useToast();

const [name,setName]=useState('');
const [phone,setPhone]=useState('');
const [otp,setOtp]=useState('');
const [role,setRole]=useState('');

const [district,setDistrict]=useState('');
const [block,setBlock]=useState('');
const [ulb,setUlb]=useState('');

const [generatedOtp,setGeneratedOtp]=
useState('');



const {
districts,
blocksByDistrict,
ulbsByBlock
}=useMemo(()=>{

const dSet=new Set<string>();
const bMap:Record<string,Set<string>>={};
const uMap:Record<string,Set<string>>={};

mrfData.forEach(item=>{

dSet.add(
item.district
);

if(
!bMap[item.district]
){
bMap[item.district]=
new Set();
}

bMap[item.district].add(
item.blockCovered
);


if(
!uMap[item.blockCovered]
){
uMap[item.blockCovered]=
new Set();
}

uMap[item.blockCovered].add(
item.ulbName
);

});


return{

districts:
Array.from(
dSet
).sort(),

blocksByDistrict:
Object.fromEntries(
Object.entries(
bMap
).map(
([k,v])=>
[
k,
Array.from(v).sort()
]
)
),

ulbsByBlock:
Object.fromEntries(
Object.entries(
uMap
).map(
([k,v])=>
[
k,
Array.from(v).sort()
]
)
)

};

},[]);




const handleLogin=()=>{

if(
!name ||
!district ||
!block ||
!ulb ||
!role ||
!phone
){
toast({
title:'Information Required',
description:
'Please fill all fields.',
variant:'destructive'
});
return;
}



/* HARD BLOCK
ONLY THIS NUMBER CAN LOGIN */
if(
!isAllowedPhone(phone)
){
toast({
title:'Unauthorized Number',
description:
'Access denied. Number not whitelisted.',
variant:'destructive'
});
return;
}



/* FIRST CLICK
GENERATE OTP */
if(
!generatedOtp
){

const newOtp=
generateOTP();

setGeneratedOtp(
newOtp
);

toast({
title:'OTP Generated',
description:
`Demo OTP: ${newOtp}`
});

return;

}



/* VERIFY OTP */
if(
otp !== generatedOtp
){
toast({
title:'Invalid OTP',
description:
'Incorrect OTP entered.',
variant:'destructive'
});
return;
}



/* SUCCESS */
toast({
title:'Login Successful',
description:
'Access granted.'
});


const params=
new URLSearchParams();

params.set(
'name',
name
);

params.set(
'role',
role
);

params.set(
'district',
district
);

params.set(
'block',
block
);

params.set(
'ulb',
ulb
);

params.set(
'contact',
phone
);


router.push(
`/civilian?${params.toString()}`
);

};




return(

<div className="min-h-screen flex flex-col items-center justify-center bg-secondary p-4">

<Card className="w-full max-w-md shadow-lg border-2 border-primary/10">

<CardHeader className="text-center">

<Link
href="/"
className="inline-block mb-4"
>
<OdishaLogo className="h-14 w-14 mx-auto"/>
</Link>

<CardTitle className="text-3xl font-headline font-black uppercase tracking-tight">
Personnel Portal Access
</CardTitle>

<CardDescription className="font-medium">
Enter credentials to access route.
</CardDescription>

</CardHeader>



<CardContent className="space-y-4">

<div className="grid gap-4">


<div className="space-y-2">

<Label className="text-xs font-black uppercase">
Official Role
</Label>

<Select
onValueChange={setRole}
>

<SelectTrigger className="h-11 font-bold">
<SelectValue placeholder="Select Role"/>
</SelectTrigger>

<SelectContent>

<SelectItem value="driver">
Logistical Driver
</SelectItem>

<SelectItem value="sanitation_worker">
Sanitation Worker
</SelectItem>

<SelectItem value="nodal_gp">
Nodal Person (GP)
</SelectItem>

<SelectItem value="nodal_ulb">
Nodal Person (ULB)
</SelectItem>

</SelectContent>

</Select>

</div>




<div className="space-y-2">

<Label className="text-xs font-black uppercase">
Full Name
</Label>

<Input
placeholder="Official name"
value={name}
onChange={(e)=>
setName(
e.target.value
)}
/>

</div>




<div className="grid grid-cols-2 gap-4">

<div className="space-y-2">

<Label>
District
</Label>

<Select
onValueChange={(v)=>{
setDistrict(v);
setBlock('');
setUlb('');
}}
>

<SelectTrigger>
<SelectValue placeholder="District"/>
</SelectTrigger>

<SelectContent>

<ScrollArea className="h-60">

{districts.map(d=>(
<SelectItem
key={d}
value={d}
>
{d}
</SelectItem>
))}

</ScrollArea>

</SelectContent>

</Select>

</div>




<div className="space-y-2">

<Label>
Block
</Label>

<Select
value={block}
disabled={!district}
onValueChange={(v)=>{
setBlock(v);
setUlb('');
}}
>

<SelectTrigger>
<SelectValue placeholder="Block"/>
</SelectTrigger>

<SelectContent>

<ScrollArea className="h-60">

{
district &&
blocksByDistrict[
district
]?.map(b=>(
<SelectItem
key={b}
value={b}
>
{b}
</SelectItem>
))
}

</ScrollArea>

</SelectContent>

</Select>

</div>

</div>




<div className="space-y-2">

<Label>
Assigned ULB
</Label>

<Select
value={ulb}
disabled={!block}
onValueChange={setUlb}
>

<SelectTrigger>
<SelectValue placeholder="Select ULB"/>
</SelectTrigger>

<SelectContent>

<ScrollArea className="h-48">

{
block &&
ulbsByBlock[
block
]?.map(u=>(
<SelectItem
key={u}
value={u}
>
{u}
</SelectItem>
))
}

</ScrollArea>

</SelectContent>

</Select>

</div>




<div className="grid grid-cols-2 gap-4">


<div className="space-y-2">

<Label>
Phone Number
</Label>

<Input
type="tel"
placeholder="10 digit"
value={phone}
onChange={(e)=>
setPhone(
e.target.value
)}
/>

</div>




<div className="space-y-2">

<Label>
OTP
</Label>

<Input
maxLength={4}
placeholder="0000"
value={otp}
onChange={(e)=>
setOtp(
e.target.value
)}
/>

</div>

</div>

</div>




<Button
onClick={handleLogin}
className="w-full h-12 text-lg font-black uppercase"
>
{
generatedOtp
?
'Verify OTP & Login'
:
'Send OTP'
}
</Button>


</CardContent>

</Card>




<div className="mt-6 text-center">
<Button
variant="link"
asChild
>
<Link href="/roles">
← Back to Role Selection
</Link>
</Button>
</div>


</div>

);

}