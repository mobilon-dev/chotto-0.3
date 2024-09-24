import{o as a,b as r,d as x,t as _,f as I,q as h,w as F,F as j,m as v,s as b,p as M,v as k,u as D}from"./vue.esm-bundler-Bwy3zgsv.js";import{_ as d}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{I as E}from"./ImageMessage2-B43KjRKJ.js";import{T as q}from"./TextMessage-sYwwnDg8.js";import{D as w}from"./DateMessage-B0GdQPbJ.js";import{A as B}from"./AudioMessage-C5h06fLg.js";const N={class:"file-message"},T=["href"],l={__name:"FileMessage",props:{message:{type:Object,required:!0}},setup(e){return(o,i)=>(a(),r("div",N,[x("a",{href:e.message.url,download:""},_(e.message.filename),9,T)]))}},P=d(l,[["__scopeId","data-v-18efd407"]]);l.__docgenInfo={exportName:"default",displayName:"FileMessage",description:"",tags:{},props:[{name:"message",type:{name:"object"},required:!0}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/messages/FileMessage.vue"]};const u={__name:"Feed",props:{objects:{type:Array,required:!0}},setup(e){const o=I(null),i=e,f=s=>({"message.text":q,"message.image":E,"message.file":P,"message.audio":B,"system.date":w})[s];function n(){b(function(){const s=D(o);s.scrollTop=s.scrollHeight})}return h(()=>n),F(()=>i.objects,n),(s,y)=>(a(),r("div",{class:"message-feed",ref_key:"refFeed",ref:o},[(a(!0),r(j,null,v(e.objects,m=>(a(),M(k(f(m.type)),{key:m.messageId,message:m},null,8,["message"]))),128))],512))}},S=d(u,[["__scopeId","data-v-37208651"]]);u.__docgenInfo={exportName:"default",displayName:"Feed",description:"",tags:{},props:[{name:"objects",type:{name:"array"},required:!0}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/features/Feed.vue"]};const U={component:S},t={args:{objects:[{type:"system.date",messageId:"1",text:"text"},{type:"message.text",messageId:"2",text:"Привет!",position:"left",status:"read",time:"12:30"},{type:"message.text",messageId:"3",text:"Привет!",position:"right",time:"13:30"},{type:"message.image",messageId:"4",url:"https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",time:"14:30",alt:"Example Image",position:"left"},{type:"message.file",messageId:"5",url:"https://example.com/file.pdf",time:"15:30",filename:"Документ.pdf"},{type:"message.text",messageId:"6",text:"Привет!",direction:"incoming",time:"16:30",isRead:!0},{type:"message.image",messageId:"7",url:"https://example.com/image.jpg",time:"17:00",alt:"Example Image",direction:"outgoing"}]}};var p,g,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    objects: [{
      type: "system.date",
      messageId: '1',
      text: 'text'
    }, {
      type: "message.text",
      messageId: '2',
      text: "Привет!",
      position: 'left',
      status: 'read',
      time: '12:30'
    }, {
      type: "message.text",
      messageId: '3',
      text: "Привет!",
      position: 'right',
      time: '13:30'
    }, {
      type: "message.image",
      messageId: '4',
      url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",
      time: '14:30',
      alt: "Example Image",
      position: 'left'
    }, {
      type: "message.file",
      messageId: '5',
      url: "https://example.com/file.pdf",
      time: '15:30',
      filename: "Документ.pdf"
    }, {
      type: "message.text",
      messageId: '6',
      text: "Привет!",
      direction: 'incoming',
      time: '16:30',
      isRead: true
    }, {
      type: "message.image",
      messageId: '7',
      url: "https://example.com/image.jpg",
      time: '17:00',
      alt: "Example Image",
      direction: 'outgoing'
    }]
  }
}`,...(c=(g=t.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};const V=["Primary"];export{t as Primary,V as __namedExportsOrder,U as default};
