(()=>{var e={};e.id=11,e.ids=[11],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1017:e=>{"use strict";e.exports=require("path")},7310:e=>{"use strict";e.exports=require("url")},4502:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>c,originalPathname:()=>p,pages:()=>u,routeModule:()=>m,tree:()=>d}),r(7203),r(1506),r(5866);var s=r(3191),a=r(8716),i=r(7922),n=r.n(i),o=r(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["register",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,7203)),"C:\\Users\\Admin\\Downloads\\BMI\\app\\register\\page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1506)),"C:\\Users\\Admin\\Downloads\\BMI\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["C:\\Users\\Admin\\Downloads\\BMI\\app\\register\\page.tsx"],p="/register/page",c={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/register/page",pathname:"/register",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},6086:(e,t,r)=>{Promise.resolve().then(r.bind(r,1472))},8721:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},5556:()=>{},1472:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var s=r(326),a=r(7577),i=r(5047),n=r(434),o=r(6226),l=r(2006),d=r.n(l),u=r(3848);function p(){let[e,t]=(0,a.useState)(""),[r,l]=(0,a.useState)(""),[p,c]=(0,a.useState)(""),[m,g]=(0,a.useState)(!1),x=(0,i.useRouter)(),h=async t=>{t.preventDefault(),console.log(r,p,e),r&&p&&e||(0,u.yv)("All fields are required",{variant:"warning"});let s=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({Email:r.trim(),Pass:p.trim(),Name:e.trim().toUpperCase()})}),a=await s.json();console.log(a),s.ok?((0,u.yv)(a.message,{variant:"success"}),g(!1),x.push("/")):((0,u.yv)(a.message,{variant:"error"}),g(!1))};return(0,s.jsxs)(s.Fragment,{children:[s.jsx(u.wT,{}),(0,s.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center",marginTop:"50px"},children:[(0,s.jsxs)("div",{className:d().flex,children:[s.jsx("h1",{className:d()["text-2xl"],children:"Register"}),(0,s.jsxs)("form",{onSubmit:h,className:d().form,children:[s.jsx("input",{type:"text",placeholder:"Name",value:e,onChange:e=>t(e.target.value),className:d().input,required:!0}),s.jsx("input",{type:"email",placeholder:"Email",value:r,onChange:e=>l(e.target.value),className:d().input,required:!0}),s.jsx("input",{type:"password",placeholder:"Password",value:p,onChange:e=>c(e.target.value),className:d().input,required:!0}),s.jsx("button",{type:"submit",className:`${d().button} ${m?d().disabled:""}`,disabled:m,children:m?"Registering....":"Register"})]}),(0,s.jsxs)("p",{className:d()["mt-4"],children:["Already have an account?"," ",s.jsx(n.default,{href:"/",className:"text-blue-500 hover:underline",children:"Login"})]})]}),s.jsx("div",{className:d().imgdiv,children:s.jsx(o.default,{src:"/login.webp",height:450,width:450,alt:"Logo"})})]})]})}},2006:e=>{e.exports={flex:"RegisterPage_flex__rHyfq","text-2xl":"RegisterPage_text-2xl__wiz9Z",form:"RegisterPage_form__HkReD",input:"RegisterPage_input__cMlbv",button:"RegisterPage_button__MTukK",disabled:"RegisterPage_disabled___XMgf",link:"RegisterPage_link__EaWy1","mt-4":"RegisterPage_mt-4__hpTAv",imgdiv:"RegisterPage_imgdiv__vaWdA"}},1506:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o,metadata:()=>n});var s=r(9510),a=r(7366),i=r.n(a);r(7272);let n={title:"BMI CALCULATOR",description:" A bmi app where you can kep a track your bmi's"};function o({children:e}){return s.jsx("html",{lang:"en",children:s.jsx("body",{className:i().className,children:s.jsx("div",{className:"LayoutMain",children:e})})})}},7203:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>i,default:()=>o});var s=r(8570);let a=(0,s.createProxy)(String.raw`C:\Users\Admin\Downloads\BMI\app\register\page.tsx`),{__esModule:i,$$typeof:n}=a;a.default;let o=(0,s.createProxy)(String.raw`C:\Users\Admin\Downloads\BMI\app\register\page.tsx#default`)},7481:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(6621);let a=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},7272:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[948,82,822],()=>r(4502));module.exports=s})();