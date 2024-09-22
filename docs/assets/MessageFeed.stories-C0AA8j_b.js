import{o as t,b as o,d,t as I,g as h,w as F,F as M,p as v,q as T,s as b,v as j,u as q}from"./vue.esm-bundler-BzM51Bjv.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{T as D}from"./TextMessage-_2esV6Ub.js";import{D as N}from"./DateMessage-BeR-5yz2.js";const k={class:"file-message"},C=["href"],l={__name:"FileMessage",props:{message:{type:Object,required:!0}},setup(e){return(a,r)=>(t(),o("div",k,[d("a",{href:e.message.url,download:""},I(e.message.filename),9,C)]))}},E=g(l,[["__scopeId","data-v-9fef0716"]]);l.__docgenInfo={exportName:"default",displayName:"FileMessage",description:"",tags:{},props:[{name:"message",type:{name:"object"},required:!0}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/base/FileMessage.vue"]};const B={class:"image-message"},P=["src","alt"],u={__name:"ImageMessage",props:{message:{type:Object,required:!0}},setup(e){return(a,r)=>(t(),o("div",B,[d("img",{src:e.message.url,alt:e.message.alt},null,8,P)]))}},U=g(u,[["__scopeId","data-v-1c1327d6"]]);u.__docgenInfo={exportName:"default",displayName:"ImageMessage",description:"",tags:{},props:[{name:"message",type:{name:"object"},required:!0}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/base/ImageMessage.vue"]};const f={__name:"MessageFeed",props:{messages:{type:Array,required:!0}},setup(e){const a=h(null),r=e,y=s=>({"message.text":D,"message.image":U,"message.file":E,"system.date":N})[s];function _(){j(function(){const s=q(a);s.scrollTop=s.scrollHeight})}return F(()=>r.messages,_),(s,x)=>(t(),o("div",{class:"message-feed",ref_key:"refFeed",ref:a},[(t(!0),o(M,null,v(e.messages,i=>(t(),T(b(y(i.type)),{key:i.messageId,message:i},null,8,["message"]))),128))],512))}},w=g(f,[["__scopeId","data-v-914dcfb8"]]);f.__docgenInfo={exportName:"default",displayName:"MessageFeed",description:"",tags:{},props:[{name:"messages",type:{name:"array"},required:!0}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/features/MessageFeed.vue"]};const H={component:w},$=new Date().toUTCString(),m={args:{messages:[{type:"system.date",messageId:"1",datetimeUTC:$},{type:"message.text",messageId:"2",text:"Привет!",position:"left",status:"read",time:"12:30"},{type:"message.text",messageId:"3",text:"Привет!",position:"right",time:"13:30"},{type:"message.image",messageId:"4",url:"https://example.com/image.jpg",time:"14:30",alt:"Example Image",position:"left"},{type:"message.file",messageId:"5",url:"https://example.com/file.pdf",time:"15:30",filename:"Документ.pdf"},{type:"message.text",messageId:"6",text:"Привет!",direction:"incoming",time:"16:30",isRead:!0},{type:"message.image",messageId:"7",url:"https://example.com/image.jpg",time:"17:00",alt:"Example Image",direction:"outgoing"}]}};var n,c,p;m.parameters={...m.parameters,docs:{...(n=m.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    messages: [{
      type: "system.date",
      messageId: '1',
      datetimeUTC: currentDateTimeUTC
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
      url: "https://example.com/image.jpg",
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
}`,...(p=(c=m.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const L=["Primary"];export{m as Primary,L as __namedExportsOrder,H as default};
