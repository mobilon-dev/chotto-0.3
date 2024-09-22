import{o as r,b as n,F as v,p as _,q as f}from"./vue.esm-bundler-BzM51Bjv.js";import{C as y}from"./Chat-CnqG9wLc.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";const C={class:"chat-list"},i={__name:"ChatList",props:{chats:{type:Array,required:!0}},emits:["select"],setup(m,{emit:l}){const u=m,g=l,d=e=>{g("select",e)},h=()=>u.chats.sort((e,t)=>{if(e.countUnread>t.countUnread)return-1;if(e.countUnread<t.countUnread)return 1;if(e.countUnread==t.countUnread)return 0});return(e,t)=>(r(),n("div",C,[(r(!0),n(v,null,_(h(),s=>(r(),f(y,{key:s.chatId,chat:s,onSelect:d},null,8,["chat"]))),128))]))}},x=U(i,[["__scopeId","data-v-fafd9097"]]);i.__docgenInfo={exportName:"default",displayName:"ChatList",description:"",tags:{},props:[{name:"chats",type:{name:"array"},required:!0}],events:[{name:"select"}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/features/ChatList.vue"]};const k={component:x},a={args:{chats:[{avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",name:"John Doe",lastMessage:"Привет!",countUnread:"21","lastActivity.time":"12:34"},{avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",name:"John Doe 2",lastMessage:"Привет 2!",countUnread:"677","lastActivity.time":"12:11"}]}};var o,c,p;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    chats: [{
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      name: "John Doe",
      lastMessage: "Привет!",
      countUnread: "21",
      'lastActivity.time': "12:34"
    }, {
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      name: "John Doe 2",
      lastMessage: "Привет 2!",
      countUnread: "677",
      'lastActivity.time': "12:11"
    }]
  }
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const w=["Primary"];export{a as Primary,w as __namedExportsOrder,k as default};
