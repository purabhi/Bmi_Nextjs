"use strict";(()=>{var e={};e.id=133,e.ids=[133],e.modules={1185:e=>{e.exports=require("mongoose")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2781:e=>{e.exports=require("stream")},3837:e=>{e.exports=require("util")},4953:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>b,patchFetch:()=>h,requestAsyncStorage:()=>f,routeModule:()=>g,serverHooks:()=>y,staticGenerationAsyncStorage:()=>c});var i={};r.r(i),r.d(i,{GET:()=>m});var n=r(9303),a=r(8716),d=r(670),u=r(3222),o=r(3570),s=r(7070),l=r(1482),p=r.n(l);async function m(e){let t=e.headers.get("authorization");if(!t)return s.NextResponse.json({message:"Unauthorized"},{status:401});try{let e=p().verify(t,"your-secret-key");await (0,u.Z)();let r=await o.Z.findOne({_id:e.userId});if(!r)return s.NextResponse.json({message:"User not found"},{status:404});return s.NextResponse.json({friends:r.friend})}catch(e){return console.log(e),s.NextResponse.json({message:"Error fetching friends"},{status:500})}}let g=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/AddFriend/getAllFriend/route",pathname:"/api/AddFriend/getAllFriend",filename:"route",bundlePath:"app/api/AddFriend/getAllFriend/route"},resolvedPagePath:"C:\\Users\\Admin\\Downloads\\BMI\\app\\api\\AddFriend\\getAllFriend\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:f,staticGenerationAsyncStorage:c,serverHooks:y}=g,b="/api/AddFriend/getAllFriend/route";function h(){return(0,d.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:c})}},3222:(e,t,r)=>{r.d(t,{Z:()=>d});var i=r(1185),n=r.n(i);let a=!1,d=async()=>{let e="mongodb+srv://purnima3590:purnima@cluster1.0ytx8.mongodb.net/bmiNextjs?retryWrites=true&w=majority";if(!e)throw Error("Database URL not Defined");if(a){console.log("Alread Connected");return}try{await n().connect(e),console.log("Connected to DB"),a=!0}catch(e){console.log(e)}}},3570:(e,t,r)=>{r.d(t,{Z:()=>d});var i=r(1185),n=r.n(i);let a=new i.Schema({Name:{type:String,default:""},Email:{type:String,required:!1,default:""},Pass:{type:String,required:!1,default:""},bmi:[{Weight:{type:Number,required:!1,default:0},Height:{type:Number,required:!1,default:0},Age:{type:Number,required:!1,default:0},Gender:{type:String,required:!1,default:""},date:{type:Date},bmiValue:{type:Number,default:0}}],friend:[{Fname:{type:String,required:!1,default:""},Femail:{type:String,required:!1,default:""},Fbmi:[{Fheight:{type:Number,required:!1,default:0},Fage:{type:Number,required:!1,default:0},Fweight:{type:Number,required:!1,default:0},Fgender:{type:String,required:!1,default:""},date:{type:Date},FbmiValue:{type:Number,default:0}}]}]},{timestamps:!0}),d=n().models.bmiTable||n().model("bmiTable",a)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[948,972,482],()=>r(4953));module.exports=i})();