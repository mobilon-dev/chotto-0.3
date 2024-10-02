import{o as m,b as n,d as a,x as _,t as I,f as h,O as F,w as j,F as b,z as v,P as M,m as k,Q as D,C as E}from"./vue.esm-bundler-C2J-SQPN.js";import{_ as l}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{I as N}from"./ImageMessage2-CHS65cQA.js";import{T}from"./TextMessage-CXitO4q_.js";import{D as w}from"./DateMessage-BzAEJgYY.js";import{A as B}from"./AudioMessage-kLXlLzrm.js";const P={class:"file-message"},q={class:"file-message__container"},S=["href"],u={__name:"FileMessage",props:{message:{type:Object,required:!0}},setup(s){return(r,e)=>(m(),n("div",P,[a("div",q,[a("a",{class:"file-message__link",href:s.message.url,download:""},[e[0]||(e[0]=a("span",{class:"pi pi-file"},null,-1)),_(" "+I(s.message.filename),1)],8,S),e[1]||(e[1]=a("span",{class:"file-message__time"},"22:02",-1))])]))}},A=l(u,[["__scopeId","data-v-d65084f4"]]);u.__docgenInfo={exportName:"default",displayName:"FileMessage",description:"",tags:{},props:[{name:"message",type:{name:"object"},required:!0}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/messages/FileMessage.vue"]};const O={class:"message-feed__container"},f={__name:"Feed",props:{objects:{type:Array,required:!0}},setup(s){const r=h(null),e=s,x=t=>({"message.text":T,"message.image":N,"message.file":A,"message.audio":B,"system.date":w})[t];function p(){M(function(){const t=E(r);t.scrollTop=t.scrollHeight})}return F(()=>p),j(()=>e.objects,p),(t,y)=>(m(),n("div",{class:"message-feed",ref_key:"refFeed",ref:r},[a("div",O,[(m(!0),n(b,null,v(s.objects,i=>(m(),k(D(x(i.type)),{key:i.messageId,message:i},null,8,["message"]))),128))])],512))}},C=l(f,[["__scopeId","data-v-bab826c9"]]);f.__docgenInfo={exportName:"default",displayName:"Feed",description:"",tags:{},props:[{name:"objects",type:{name:"array"},required:!0}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/features/Feed.vue"]};const Q={component:C},o={args:{objects:[{type:"system.date",messageId:"1",text:"text"},{type:"message.text",messageId:"2",text:"Привет!",position:"left",status:"read",time:"12:30"},{type:"message.text",messageId:"3",text:"Привет!",position:"right",time:"13:30"},{type:"message.image",messageId:"4",url:"https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",time:"14:30",alt:"Example Image",position:"left"},{type:"message.file",messageId:"5",url:"https://example.com/file.pdf",time:"15:30",filename:"Документ.pdf"},{type:"message.text",messageId:"6",text:"Привет!",direction:"incoming",time:"16:30",isRead:!0},{type:"message.image",messageId:"7",url:"https://example.com/image.jpg",time:"17:00",alt:"Example Image",direction:"outgoing"}]}};var g,c,d;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const U=["Primary"];export{o as Primary,U as __namedExportsOrder,Q as default};
