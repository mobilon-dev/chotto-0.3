import{o as p,b as u,d as t,t as I,n as h}from"./vue.esm-bundler-C2J-SQPN.js";import{_ as f}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y=["messageId"],_=["src","alt"],M={class:"message-time"},d={__name:"ImageMessage",props:{message:{type:Object,required:!0}},setup(e){const i=e;function l(){return i.message.position==="left"?"image-message-left":"image-message-right"}return(j,S)=>(p(),u("div",{class:h(l()),messageId:e.message.messageId},[t("img",{src:e.message.url,alt:e.message.alt,class:"image-message"},null,8,_),t("div",M,I(e.message.time),1)],10,y))}},x=f(d,[["__scopeId","data-v-9abe971c"]]);d.__docgenInfo={exportName:"default",displayName:"ImageMessage",description:"",tags:{},props:[{name:"message",type:{name:"object"},required:!0}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/messages/ImageMessage.vue"]};const D={component:x},s={args:{message:{url:"https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",alt:"left",messageId:"testMessageId",time:"12:00",status:"read"}}},a={args:{message:{url:"https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg",alt:"right",messageId:"testMessageId",time:"12:00",status:"read"}}};var o,n,r;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    message: {
      url: 'https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg',
      alt: 'left',
      messageId: 'testMessageId',
      time: '12:00',
      status: 'read'
    }
  }
}`,...(r=(n=s.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};var m,g,c;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    message: {
      url: 'https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg',
      alt: 'right',
      messageId: 'testMessageId',
      time: '12:00',
      status: 'read'
    }
  }
}`,...(c=(g=a.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};const w=["LeftImageMessage","RightImageMessage"];export{s as LeftImageMessage,a as RightImageMessage,w as __namedExportsOrder,D as default};
