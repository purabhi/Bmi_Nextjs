"use strict";(()=>{var e={};e.id=873,e.ids=[873],e.modules={1185:e=>{e.exports=require("mongoose")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2781:e=>{e.exports=require("stream")},3837:e=>{e.exports=require("util")},4015:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>b,patchFetch:()=>h,requestAsyncStorage:()=>c,routeModule:()=>g,serverHooks:()=>y,staticGenerationAsyncStorage:()=>f});var a={};r.r(a),r.d(a,{POST:()=>m});var i=r(9303),u=r(8716),n=r(670),o=r(7070),s=r(1482),d=r.n(s),l=r(3570),p=r(3222);async function m(e){let{Email:t,Pass:r}=await e.json();await (0,p.Z)();let a=await l.Z.findOne({Email:t});if(!a||a.Pass!==r)return o.NextResponse.json({message:"Invalid email or password"},{status:400});let i=d().sign({userId:a._id,username:a.Email,user:a},"your-secret-key",{expiresIn:"1h"});return o.NextResponse.json({message:"Login successful",token:i})}let g=new i.AppRouteRouteModule({definition:{kind:u.x.APP_ROUTE,page:"/api/auth/login/route",pathname:"/api/auth/login",filename:"route",bundlePath:"app/api/auth/login/route"},resolvedPagePath:"C:\\Users\\Admin\\Downloads\\BMI\\app\\api\\auth\\login\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:c,staticGenerationAsyncStorage:f,serverHooks:y}=g,b="/api/auth/login/route";function h(){return(0,n.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:f})}},3222:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(1185),i=r.n(a);let u=!1,n=async()=>{let e="mongodb+srv://purnima3590:purnima@cluster1.0ytx8.mongodb.net/bmiNextjs?retryWrites=true&w=majority";if(!e)throw Error("Database URL not Defined");if(u){console.log("Alread Connected");return}try{await i().connect(e),console.log("Connected to DB"),u=!0}catch(e){console.log(e)}}},3570:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(1185),i=r.n(a);let u=new a.Schema({Name:{type:String,default:""},Email:{type:String,required:!1,default:""},Pass:{type:String,required:!1,default:""},bmi:[{Weight:{type:Number,required:!1,default:0},Height:{type:Number,required:!1,default:0},Age:{type:Number,required:!1,default:0},Gender:{type:String,required:!1,default:""},date:{type:Date},bmiValue:{type:Number,default:0}}],friend:[{Fname:{type:String,required:!1,default:""},Femail:{type:String,required:!1,default:""},Fbmi:[{Fheight:{type:Number,required:!1,default:0},Fage:{type:Number,required:!1,default:0},Fweight:{type:Number,required:!1,default:0},Fgender:{type:String,required:!1,default:""},date:{type:Date},FbmiValue:{type:Number,default:0}}]}]},{timestamps:!0}),n=i().models.bmiTable||i().model("bmiTable",u)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[948,972,482],()=>r(4015));module.exports=a})();