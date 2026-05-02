'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { OdishaLogo } from '@/components/odisha-logo';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mrfData } from '@/lib/mrf-data';
import { useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

/* ADDED */
import { isAllowedEmail, canAccessDistrict } from '@/lib/auth/auth';

const formSchema = z.object({
name: z.string().min(2,{message:'Name must be at least 2 characters.'}),
role: z.enum(['block','district','ulb'],{
required_error:'You must select a representative type.'
}),
district:z.string().optional(),
block:z.string().optional(),
ulb:z.string().optional(),
email:z.string().email({
message:'Please enter a valid email address.'
}),
password:z.string().min(8,{
message:'Password must be at least 8 characters.'
}),
})
.refine(
data=>data.role!=='district' || data.district,
{
message:'Please select a district.',
path:['district']
}
)
.refine(
data=>data.role!=='block' || data.block,
{
message:'Please select a block.',
path:['block']
}
)
.refine(
data=>data.role!=='ulb' ||
(data.ulb && data.block && data.district),
{
message:'District, Block and ULB required.',
path:['ulb']
}
);


export default function OfficialLoginPage(){

const router=useRouter();
const {toast}=useToast();


const {
odishaDistricts,
blocksByDistrict,
ulbsByBlock
}=useMemo(()=>{

const districts=new Set<string>();
const blocks:{[key:string]:Set<string>}={};
const ulbHierarchy:{[key:string]:Set<string>}={};

mrfData.forEach(item=>{

districts.add(item.district);

if(!blocks[item.district]){
blocks[item.district]=new Set<string>();
}

blocks[item.district].add(
item.blockCovered
);


const key=`${item.district}-${item.blockCovered}`;

if(!ulbHierarchy[key]){
ulbHierarchy[key]=new Set<string>();
}

ulbHierarchy[key].add(item.ulbName);

});

return{
odishaDistricts:Array.from(districts).sort(),

blocksByDistrict:Object.fromEntries(
Object.entries(blocks).map(
([k,v])=>[k,Array.from(v).sort()]
)
),

ulbsByBlock:Object.fromEntries(
Object.entries(ulbHierarchy).map(
([k,v])=>[k,Array.from(v).sort()]
)
)
};

},[]);



const form=useForm<z.infer<typeof formSchema>>({
resolver:zodResolver(formSchema),
defaultValues:{
name:'',
email:'',
password:''
}
});

const selectedRole=form.watch('role');
const selectedDistrict=form.watch('district');
const selectedBlock=form.watch('block');



function onSubmit(
values:z.infer<typeof formSchema>
){

/* WHITELIST CHECK ADDED - For official portal */
if(
!isAllowedEmail(
values.email,
'official'
)
){
toast({
title:'Unauthorized Email',
description:'This email is not approved for Official Portal access. Only specific official emails are allowed.',
variant:'destructive'
});

return;
}

// Check district restriction for specific email
if (values.role === 'district' && values.district) {
  if (!canAccessDistrict(values.email, values.district)) {
    toast({
      title: 'Access Restricted',
      description: `This email can only access Boudh district.`,
      variant: 'destructive'
    });
    return;
  }
}

// For block and ULB roles, check if the selected district is allowed for this email
if ((values.role === 'block' || values.role === 'ulb') && values.district) {
  if (!canAccessDistrict(values.email, values.district)) {
    toast({
      title: 'Access Restricted',
      description: `This email can only access data for Boudh district.`,
      variant: 'destructive'
    });
    return;
  }
}

const params=new URLSearchParams();

params.set(
'name',
values.name
);

params.set(
'role',
values.role
);



if(
values.role==='ulb'
&& values.ulb
){
params.set('ulb',values.ulb);
params.set('block',values.block||'');
params.set('district',values.district||'');

router.push(
`/gp-ulb?${params.toString()}`
);
}



else if(
values.role==='district'
&& values.district
){
params.set(
'district',
values.district
);

router.push(
`/official/dashboard?${params.toString()}`
);
}

 

else if(
values.role==='block'
&& values.block
){

if(values.district){
params.set(
'district',
values.district
);
}

params.set(
'block',
values.block
);

router.push(
`/official/block-dashboard?${params.toString()}`
);
}

}



return(
<div className="min-h-screen flex flex-col items-center justify-center bg-secondary p-4">

<Card className="w-full max-w-lg shadow-lg">

<CardHeader className="text-center">

<Link href="/" className="inline-block mb-4">
<OdishaLogo className="h-14 w-14 mx-auto"/>
</Link>

<CardTitle className="text-3xl font-headline">
Official Portal
</CardTitle>

<CardDescription>
Enter your details to access the portal.
</CardDescription>

</CardHeader>


<CardContent>

<Form {...form}>
<form
onSubmit={form.handleSubmit(onSubmit)}
className="space-y-4"
>

<FormField
control={form.control}
name="name"
render={({field})=>(
<FormItem>
<FormLabel>Name</FormLabel>
<FormControl>
<Input
placeholder="Enter your full name"
{...field}
/>
</FormControl>
<FormMessage/>
</FormItem>
)}
/>


<FormField
control={form.control}
name="role"
render={({field})=>(
<FormItem className="space-y-3">

<FormLabel>
You are a...
</FormLabel>

<FormControl>
<RadioGroup
onValueChange={field.onChange}
defaultValue={field.value}
className="grid grid-cols-1 sm:grid-cols-3 gap-4"
>

<FormItem className="flex items-center space-x-2">
<FormControl>
<RadioGroupItem value="block"/>
</FormControl>
<FormLabel className="font-normal">
Block Rep.
</FormLabel>
</FormItem>

<FormItem className="flex items-center space-x-2">
<FormControl>
<RadioGroupItem value="district"/>
</FormControl>
<FormLabel className="font-normal">
District Rep.
</FormLabel>
</FormItem>

<FormItem className="flex items-center space-x-2">
<FormControl>
<RadioGroupItem value="ulb"/>
</FormControl>
<FormLabel className="font-normal">
ULB Rep.
</FormLabel>
</FormItem>

</RadioGroup>
</FormControl>

<FormMessage/>

</FormItem>
)}
/>


{(selectedRole==='district'
|| selectedRole==='block'
|| selectedRole==='ulb')
&&(

<FormField
control={form.control}
name="district"
render={({field})=>(
<FormItem>
<FormLabel>District</FormLabel>

<Select
onValueChange={(value)=>{
field.onChange(value);
form.setValue('block',undefined);
form.setValue('ulb',undefined);
}}
defaultValue={field.value}
>

<FormControl>
<SelectTrigger>
<SelectValue placeholder="Select your district"/>
</SelectTrigger>
</FormControl>

<SelectContent>
<ScrollArea className="h-64">
{odishaDistricts.map(d=>(
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

<FormMessage/>

</FormItem>
)}
/>

)}


{(
(selectedRole==='block'
|| selectedRole==='ulb')
&& selectedDistrict
)&&(

<FormField
control={form.control}
name="block"
render={({field})=>(
<FormItem>

<FormLabel>
Block
</FormLabel>

<Select
onValueChange={(value)=>{
field.onChange(value);
form.setValue('ulb',undefined);
}}
defaultValue={field.value}
>

<FormControl>
<SelectTrigger>
<SelectValue placeholder="Select your block"/>
</SelectTrigger>
</FormControl>

<SelectContent>
<ScrollArea className="h-64">
{blocksByDistrict[selectedDistrict]?.map(block=>(
<SelectItem
key={block}
value={block}
>
{block}
</SelectItem>
))}
</ScrollArea>
</SelectContent>

</Select>

<FormMessage/>

</FormItem>
)}
/>

)}


{selectedRole==='ulb'
&& selectedBlock
&& selectedDistrict
&&(

<FormField
control={form.control}
name="ulb"
render={({field})=>(
<FormItem>

<FormLabel>
ULB (Facility Node)
</FormLabel>

<Select
onValueChange={field.onChange}
defaultValue={field.value}
>

<FormControl>
<SelectTrigger>
<SelectValue placeholder="Select your ULB"/>
</SelectTrigger>
</FormControl>

<SelectContent>
<ScrollArea className="h-48">
{ulbsByBlock[
`${selectedDistrict}-${selectedBlock}`
]?.map(name=>(
<SelectItem
key={name}
value={name}
>
{name}
</SelectItem>
))}
</ScrollArea>
</SelectContent>

</Select>

<FormMessage/>

</FormItem>
)}
/>

)}


<FormField
control={form.control}
name="email"
render={({field})=>(
<FormItem>
<FormLabel>Email</FormLabel>
<FormControl>
<Input
type="email"
placeholder="your-email@example.com"
{...field}
/>
</FormControl>
<FormMessage/>
<FormLabel className="text-xs text-muted-foreground mt-1">
Only authorized official emails are permitted. 
</FormLabel>
</FormItem>
)}
/>


<FormField
control={form.control}
name="password"
render={({field})=>(
<FormItem>
<FormLabel>Password</FormLabel>
<FormControl>
<Input
type="password"
placeholder="********"
{...field}
/>
</FormControl>
<FormMessage/>
</FormItem>
)}
/>

<Button
type="submit"
className="w-full"
>
Login
</Button>

</form>
</Form>

</CardContent>
</Card>


<div className="mt-6 text-center">
<Button variant="link" asChild> 
<Link href="/roles">
← Back to Role Selection
</Link>
</Button>
</div>

</div>
);

}
