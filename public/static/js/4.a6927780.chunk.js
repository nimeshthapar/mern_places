(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[4],{43:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(50);t.a=function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},44:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(46);function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},46:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))},47:function(e,t,a){"use strict";var n=a(18);a.d(t,"c",(function(){return r})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c})),a.d(t,"d",(function(){return o}));var r=function(){return{type:"REQUIRE"}},i=function(e){return{type:"MINLENGTH",val:e}},c=function(){return{type:"EMAIL"}},o=function(e,t){var a,r=!0,i=function(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=Object(n.a)(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i,c=!0,o=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return c=e.done,e},e:function(e){o=!0,i=e},f:function(){try{c||null==r.return||r.return()}finally{if(o)throw i}}}}(t);try{for(i.s();!(a=i.n()).done;){var c=a.value;"REQUIRE"===c.type&&(r=r&&e.trim().length>0),"MINLENGTH"===c.type&&(r=r&&e.trim().length>=c.val),"MAXLENGTH"===c.type&&(r=r&&e.trim().length<=c.val),"MIN"===c.type&&(r=r&&+e>=c.val),"MAX"===c.type&&(r=r&&+e<=c.val),"EMAIL"===c.type&&(r=r&&/^\S+@\S+\.\S+$/.test(e))}}catch(o){i.e(o)}finally{i.f()}return r}},50:function(e,t,a){},53:function(e,t,a){"use strict";var n=a(11),r=a(44),i=a(0),c=a.n(i),o=a(54),l=a.n(o),u=a(47),s=function(e,t){return"CHANGE"===t.type?Object(r.a)(Object(r.a)({},e),{},{entered:t.val,isValid:Object(u.d)(t.val,t.validators)}):"TOUCH"===t.type?Object(r.a)(Object(r.a)({},e),{},{isTouched:!0}):e};t.a=function(e){var t=Object(i.useReducer)(s,{entered:e.value||"",isValid:e.valid||!1,isTouched:!1}),a=Object(n.a)(t,2),r=a[0],o=a[1],u=e.id,p=e.onInput,d=r.entered,m=r.isValid;Object(i.useEffect)((function(){p(u,d,m)}),[u,d,m,p]);var f=function(t){o({type:"CHANGE",val:t.target.value,validators:e.validators})},v=function(e){o({type:"TOUCH"})},b="input"===e.element?c.a.createElement("input",{type:e.type,placeholder:e.placeholder,id:e.id,onChange:f,onBlur:v,value:d}):c.a.createElement("textarea",{id:e.id,rows:e.rows||3,onChange:f,onBlur:v,value:d});return c.a.createElement("div",{className:"".concat(l.a["form-control"]," ").concat(!r.isValid&&r.isTouched&&l.a["form-control--invalid"])},c.a.createElement("label",{htmlFor:e.id},e.label),b,c.a.createElement("p",null,!r.isValid&&r.isTouched&&e.errorText))}},54:function(e,t,a){e.exports={"form-control":"Input_form-control__1c6-V","form-control--invalid":"Input_form-control--invalid__3oA4N"}},55:function(e,t,a){"use strict";var n=a(11),r=a(46),i=a(44),c=a(0),o=function(e,t){switch(t.type){case"INPUT_CHANGE":var a=!0;for(var n in e.inputs)e.inputs[n]&&(a=n===t.inputId?a&&t.isValid:a&&e.inputs[n].isValid);return Object(i.a)(Object(i.a)({},e),{},{inputs:Object(i.a)(Object(i.a)({},e.inputs),{},Object(r.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:a});case"SET_FORM_DATA":return{inputs:t.inputs,isValid:t.isValid};default:return e}};t.a=function(e,t){var a=Object(c.useReducer)(o,{inputs:e,isValid:t}),r=Object(n.a)(a,2),i=r[0],l=r[1];return{formState:i,inputHandler:Object(c.useCallback)((function(e,t,a){l({type:"INPUT_CHANGE",value:t,isValid:a,inputId:e})}),[]),setFormData:Object(c.useCallback)((function(e,t){l({type:"SET_FORM_DATA",inputs:e,isValid:t})}),[])}}},56:function(e,t,a){"use strict";var n=a(11),r=a(0),i=a.n(r),c=a(57),o=a.n(c),l=a(45);t.a=function(e){var t=Object(r.useRef)(),a=Object(r.useState)(),c=Object(n.a)(a,2),u=c[0],s=c[1],p=Object(r.useState)(),d=Object(n.a)(p,2),m=d[0],f=d[1],v=Object(r.useState)(!0),b=Object(n.a)(v,2),O=b[0],y=b[1];Object(r.useEffect)((function(){if(u){var e=new FileReader;e.onload=function(){f(e.result)},e.readAsDataURL(u)}}),[u]);return i.a.createElement("div",{className:o.a["form-control"]},i.a.createElement("input",{id:e.id,ref:t,type:"file",style:{display:"none"},accept:".jpg,.jpeg,.png",onChange:function(t){var a,n=O;t.target.fles||1===t.target.files.length?(a=t.target.files[0],s(a),y(!0),n=!0):(y(!1),n=!1),e.onInput(e.id,a,n)}}),i.a.createElement("div",{className:"".concat(o.a["image-upload"]," ").concat(e.center&&o.a.center)},i.a.createElement("div",{className:o.a["image-upload__preview"]},m&&i.a.createElement("img",{src:m,alt:"preveiw"}),!m&&i.a.createElement("p",null,"Please Pick an Image")),i.a.createElement(l.a,{type:"button",onClick:function(){t.current.click()}},"Pick Image")),!O&&i.a.createElement("p",null,e.errorText))}},57:function(e,t,a){e.exports={"image-upload":"ImageUpload_image-upload__S5CZ4",center:"ImageUpload_center__1xzdj","image-upload__preview":"ImageUpload_image-upload__preview__3LRCE","form-control":"ImageUpload_form-control__2r0kQ"}},68:function(e,t,a){e.exports={authentication__header:"Auth_authentication__header__35E5m",authentication:"Auth_authentication__6gJos"}},71:function(e,t,a){"use strict";a.r(t);var n=a(48),r=a.n(n),i=a(49),c=a(44),o=a(11),l=a(0),u=a.n(l),s=a(68),p=a.n(s),d=a(43),m=a(53),f=a(45),v=a(51),b=a(17),O=a(56),y=a(55),j=a(52),g=a(12),E=a(47);t.default=function(){var e=Object(l.useState)(!1),t=Object(o.a)(e,2),a=t[0],n=t[1],s=Object(l.useContext)(g.b),h=Object(j.a)(),_=h.isLoading,w=h.error,I=h.sendRequest,N=h.clearError,S=Object(y.a)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),T=S.formState,V=S.inputHandler,x=S.setFormData,A=function(){var e=Object(i.a)(r.a.mark((function e(t){var n,i,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!a){e.next=18;break}return e.prev=2,(n=new FormData).append("email",T.inputs.email.value),n.append("password",T.inputs.password.value),n.append("name",a?T.inputs.name.value:void 0),n.append("image",a?T.inputs.image.value:null),e.next=10,I("".concat("https://mern-locations-app.herokuapp.com/api","/users/signup"),"POST",n);case 10:i=e.sent,s.login(i.userId,i.token),e.next=16;break;case 14:e.prev=14,e.t0=e.catch(2);case 16:e.next=27;break;case 18:return e.prev=18,e.next=21,I("".concat("https://mern-locations-app.herokuapp.com/api","/users/login"),"POST",JSON.stringify({email:T.inputs.email.value,password:T.inputs.password.value}),{"Content-Type":"application/json"});case 21:c=e.sent,s.login(c.userId,c.token),e.next=27;break;case 25:e.prev=25,e.t1=e.catch(18);case 27:case"end":return e.stop()}}),e,null,[[2,14],[18,25]])})));return function(t){return e.apply(this,arguments)}}();return u.a.createElement(l.Fragment,null,w&&u.a.createElement(v.a,{error:w,onClear:N}),u.a.createElement("div",{className:"center"},u.a.createElement(d.a,{className:p.a.authentication},_&&u.a.createElement(b.a,{asOverlay:!0}),u.a.createElement("h2",null,a?"Signup":"Login"),u.a.createElement("hr",null),u.a.createElement("form",{onSubmit:A},a&&u.a.createElement(m.a,{element:"input",type:"text",id:"name",label:"Your Name",validators:[Object(E.c)()],onInput:V,errorText:"Please enter a Name"}),a&&u.a.createElement(O.a,{id:"image",center:!0,onInput:V,errorText:"Please Provide an Image"}),u.a.createElement(m.a,{element:"input",type:"email",id:"email",label:"E-mail",validators:[Object(E.a)()],onInput:V,errorText:"Email Must contains @ symbol"}),u.a.createElement(m.a,{element:"input",type:"password",id:"password",label:"Password",validators:[Object(E.b)(6)],onInput:V,errorText:"Password must be atleast of 6 characters"}),u.a.createElement(f.a,{type:"submit",disabled:!T.isValid},a?"SignUp":"Login"),u.a.createElement("hr",null),u.a.createElement("p",null,a?"Already Have Account?":"Not have Account?"),u.a.createElement(f.a,{type:"button",onClick:function(e){a?x(Object(c.a)(Object(c.a)({},T.inputs),{},{name:void 0,image:void 0}),T.inputs.email.isValid&&T.inputs.password.isValid):x(Object(c.a)(Object(c.a)({},T.inputs),{},{name:{value:"",isValid:!1},image:{value:null,isValid:!1}}),!1),n((function(e){return!e}))},inverse:!0},a?"Login":"SignUp")))))}}}]);
//# sourceMappingURL=4.a6927780.chunk.js.map