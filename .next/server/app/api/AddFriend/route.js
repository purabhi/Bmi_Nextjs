"use strict";(()=>{var e={};e.id=224,e.ids=[224],e.modules={1185:e=>{e.exports=require("mongoose")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2781:e=>{e.exports=require("stream")},3837:e=>{e.exports=require("util")},5660:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>b,patchFetch:()=>x,requestAsyncStorage:()=>c,routeModule:()=>f,serverHooks:()=>y,staticGenerationAsyncStorage:()=>g});var a={};r.r(a),r.d(a,{POST:()=>m});var i=r(9303),n=r(8716),s=r(670),d=r(3222),u=r(3570),o=r(7070),p=r(1482),l=r.n(p);async function m(e){let t;let{Fname:r,Femail:a,token:i}=await e.json();if(!i)return o.NextResponse.json({message:"Unauthorized"},{status:401});try{t=l().verify(i,"your-secret-key")}catch(e){return o.NextResponse.json({message:"Invalid or expired token"},{status:401})}try{await (0,d.Z)();let e=await u.Z.findOne({_id:t.userId});if(!e)return o.NextResponse.json({message:"User not found"},{status:404});if(e.friend.some(e=>e.Femail===a))return o.NextResponse.json({message:"Friend with this email already exists"},{status:400});return e.friend.push({Fname:r,Femail:a,Fbmi:[]}),await e.save(),o.NextResponse.json({message:"Friend added successfully"})}catch(e){return console.error(e),o.NextResponse.json({message:"Error adding friend"},{status:500})}}let f=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/AddFriend/route",pathname:"/api/AddFriend",filename:"route",bundlePath:"app/api/AddFriend/route"},resolvedPagePath:"C:\\Users\\Admin\\Downloads\\BMI\\app\\api\\AddFriend\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:c,staticGenerationAsyncStorage:g,serverHooks:y}=f,b="/api/AddFriend/route";function x(){return(0,s.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:g})}},3222:(e,t,r)=>{r.d(t,{Z:()=>s});var a=r(1185),i=r.n(a);let n=!1,s=async()=>{let e="mongodb+srv://purnima3590:purnima@cluster1.0ytx8.mongodb.net/bmiNextjs?retryWrites=true&w=majority";if(!e)throw Error("Database URL not Defined");if(n){console.log("Alread Connected");return}try{await i().connect(e),console.log("Connected to DB"),n=!0}catch(e){console.log(e)}}},3570:(e,t,r)=>{r.d(t,{Z:()=>s});var a=r(1185),i=r.n(a);let n=new a.Schema({Name:{type:String,default:""},Email:{type:String,required:!1,default:""},Pass:{type:String,required:!1,default:""},bmi:[{Weight:{type:Number,required:!1,default:0},Height:{type:Number,required:!1,default:0},Age:{type:Number,required:!1,default:0},Gender:{type:String,required:!1,default:""},date:{type:Date},bmiValue:{type:Number,default:0}}],friend:[{Fname:{type:String,required:!1,default:""},Femail:{type:String,required:!1,default:""},Fbmi:[{Fheight:{type:Number,required:!1,default:0},Fage:{type:Number,required:!1,default:0},Fweight:{type:Number,required:!1,default:0},Fgender:{type:String,required:!1,default:""},date:{type:Date},FbmiValue:{type:Number,default:0}}]}]},{timestamps:!0}),s=i().models.bmiTable||i().model("bmiTable",n)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[948,972,482],()=>r(5660));module.exports=a})();