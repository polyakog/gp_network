"use strict";(self.webpackChunkgp_project=self.webpackChunkgp_project||[]).push([[173],{8774:function(s,t,e){e.r(t),e.d(t,{default:function(){return Y}});var n=e(1413),o=e(5671),i=e(3144),r=e(136),a=e(2882),l=e(2791),c={main_pic_wrapper:"Profile_main_pic_wrapper__r6QXr",main_pic:"Profile_main_pic__S6tqL"},u=e(8286),p="ProfileInfo_avatar_description__vaEEx",d="ProfileInfo_avatar__XTTMY",f="ProfileInfo_UserStatus__MWXgf",h="ProfileInfo_active__mjtOh",_="ProfileInfo_description__8vX66",j="ProfileInfo_contacts__+o08u",x="ProfileInfo_user_name__cba2P",m="ProfileInfo_lookingForAJob__xX3MT",g="ProfileInfo_false__tXCww",v="ProfileInfo_status__FiiOA",b=e.p+"static/media/jobLooker.5222b7e3bc2bd1032175.webp",P=e(5896),N=e(885),k=e(184),w=function(s){var t=(0,l.useState)(!1),e=(0,N.Z)(t,2),n=e[0],o=e[1],i=(0,l.useState)(s.status),r=(0,N.Z)(i,2),a=r[0],c=r[1];(0,l.useEffect)((function(){c(s.status)}),[s.status]);return(0,k.jsxs)("div",{children:[!n&&(0,k.jsx)("div",{className:f+" "+h,children:(0,k.jsx)("span",{onDoubleClick:function(){o(!0)},children:s.status||"No status"})}),n&&(0,k.jsxs)("div",{children:[(0,k.jsx)("textarea",{className:f,onChange:function(s){c(s.currentTarget.value)},autoFocus:!0,value:a}),(0,k.jsxs)("div",{className:v,children:[(0,k.jsxs)("button",{onClick:function(){o(!1)},children:["Cancel ",(0,k.jsx)("i",{children:"\u293a"})]}),(0,k.jsxs)("button",{onClick:function(){o(!1),s.updateUserStatus(a)},children:["Save ",(0,k.jsx)("i",{children:"\u27bd"})]})]})]})]})},Z=function(s){var t=s.profile,e=s.status,n=s.updateUserStatus;return t?(0,k.jsx)("div",{children:(0,k.jsxs)("div",{className:p,children:[(0,k.jsxs)("div",{className:d,children:[(0,k.jsx)("img",{src:t.photos.large?t.photos.large:P,alt:"avatar"}),(0,k.jsxs)("div",{children:["My status:",(0,k.jsx)(w,{status:e,updateUserStatus:n})]})]}),(0,k.jsxs)("div",{className:_,children:[(0,k.jsx)("p",{className:x,children:t.fullName}),(0,k.jsxs)("p",{children:["About me: ",t.aboutMe]}),(0,k.jsxs)("p",{children:["ID: ",t.userId]}),(0,k.jsx)("img",{src:b,alt:"looking for a job",className:t.lookingForAJob?m:m+" "+g}),(0,k.jsxs)("p",{children:[" ",t.lookingForAJob?"Looking for a job: "+t.lookingForAJobDescription:null]}),(0,k.jsx)("br",{}),(0,k.jsxs)("div",{className:j,children:["Contacts:",(0,k.jsxs)("ul",{children:[null!==t.contacts.facebook?(0,k.jsxs)("li",{children:[" ","Facebook: "+t.contacts.facebook,"   "]}):null,null!==t.contacts.website?(0,k.jsxs)("li",{children:[" ","Website: "+t.contacts.website,"      "]}):null,null!==t.contacts.vk?(0,k.jsxs)("li",{children:["VK: "+t.contacts.vk,"                "]}):null,null!==t.contacts.github?(0,k.jsxs)("li",{children:["Github: "+t.contacts.github,"        "]}):null,null!==t.contacts.youtube?(0,k.jsxs)("li",{children:["youtube: "+t.contacts.youtube,"        "]}):null,null!==t.contacts.twitter?(0,k.jsxs)("li",{children:["twitter: "+t.contacts.twitter,"        "]}):null]})]})]})]})}):(0,k.jsx)(u.Z,{})},S=e(6070),y=e(2982),I=e(6139),C=e(1232),F=e(8610),U=e(2031),A={postsBlock:"MyPosts_postsBlock__1TFap",NewPost:"MyPosts_NewPost__bphVH",addPostButton:"MyPosts_addPostButton__PXNot"},M="Post_post__Mdw4E",D="Post_user__Rc7pi",T="Post_Item__RNmys",X="Post_underPost__53WJt",B="Post_like__ig3wh",E=function(s){return(0,k.jsxs)("div",{className:M,children:[(0,k.jsxs)("div",{className:D,children:[(0,k.jsx)("img",{src:"https://cdn1.flamp.ru/1ade70d2f2f936f3ced673e84d129204.jpg",alt:""}),(0,k.jsxs)("span",{children:[s.Name,": "]})]}),(0,k.jsx)("div",{className:T,children:s.message}),(0,k.jsxs)("div",{className:X,children:["likes: ",s.likeCount,(0,k.jsx)("div",{className:B,children:(0,k.jsx)("img",{src:"https://pngicon.ru/file/uploads/like.png",alt:"",srcset:""})})]})]})},J=(0,F.DT)(100),L=(0,F.oQ)(2),W=(0,C.Z)({form:"ProfileAddNewPostForm"})((function(s){return(0,k.jsxs)("form",{onSubmit:s.handleSubmit,className:A.NewPost,children:[(0,k.jsx)(I.Z,{name:"newPostText",type:"text",component:U.gx,label:"Add your post here:",placeholder:"Enter your post",rows:"4",validate:[F.C1,J,L]}),(0,k.jsx)("button",{className:A.addPostButton,children:"Add post"})]})})),q=l.memo((function(s){var t=(0,y.Z)(s.postData).reverse().map((function(s,t){return(0,k.jsx)(E,{message:s.message,likeCount:s.likeCount,Name:s.Name},t)}));return(0,k.jsxs)("div",{className:A.postsBlock,children:[(0,k.jsx)("h3",{children:"My posts"}),(0,k.jsx)(W,{onSubmit:function(t){return s.addPost(t.newPostText)}}),(0,k.jsx)("div",{className:A.posts,children:t})]})})),O=e(8687),$=(0,O.$j)((function(s){return{postData:s.profilePage.postData}}),(function(s){return{addPost:function(t){s((0,S.Wl)(t))}}}))(q),Q=function(s){return(0,k.jsxs)("div",{className:c.profile,children:[(0,k.jsx)("div",{className:c.main_pic_wrapper,children:(0,k.jsx)("img",{className:c.main_pic,src:"https://i.pinimg.com/originals/74/e2/1b/74e21bec1bf0b8b2272cf1ee3e11677c.png",alt:""})}),(0,k.jsx)(Z,{profile:s.profile,status:s.status,updateUserStatus:s.updateUserStatus})," ",(0,k.jsx)($,{})]})},R=e(1548),V=e(7781),G=e(5628),H=e(6871),K=function(s){(0,r.Z)(e,s);var t=(0,a.Z)(e);function e(){return(0,o.Z)(this,e),t.apply(this,arguments)}return(0,i.Z)(e,[{key:"componentDidMount",value:function(){var s=this.props.params.userId;s||(s=this.props.userId),s||this.props.navigate("/login"),this.props.getUserProfile(s),this.props.getUserStatus(s)}},{key:"render",value:function(){return this.props.isFetching?(0,k.jsx)(u.Z,{message:"profile loading"}):(0,k.jsx)(Q,(0,n.Z)((0,n.Z)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateUserStatus:this.props.updateUserStatus}))}}]),e}(l.Component),Y=(0,V.qC)((0,O.$j)((function(s){return{profile:s.profilePage.profile,isFetching:s.profilePage.isFetching,status:s.profilePage.status,userId:s.auth.userId}}),{getUserProfile:S.et,getUserStatus:S.Tq,updateUserStatus:S.OL}),G.E,(function(s){return function(t){return(0,k.jsx)(s,(0,n.Z)((0,n.Z)({},t),{},{navigate:(0,H.s0)()}))}}),R.D)(K)},1548:function(s,t,e){e.d(t,{D:function(){return f}});var n=e(1413),o=e(5671),i=e(3144),r=e(136),a=e(2882),l=e(2791),c=e(8687),u=e(6871),p=e(184),d=function(s){return{isAuth:s.auth.isAuth}},f=function(s){var t=function(t){(0,r.Z)(l,t);var e=(0,a.Z)(l);function l(){return(0,o.Z)(this,l),e.apply(this,arguments)}return(0,i.Z)(l,[{key:"render",value:function(){return this.props.isAuth?(0,p.jsx)(s,(0,n.Z)({},this.props)):(0,p.jsx)(u.Fg,{to:"/login"})}}]),l}(l.Component);return(0,c.$j)(d)(t)}}}]);
//# sourceMappingURL=173.b25d37f7.chunk.js.map