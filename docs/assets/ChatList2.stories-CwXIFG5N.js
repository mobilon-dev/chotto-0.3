import{f as C,o,b as u,d as s,C as k,m as g,e as D,F as M,z as J}from"./vue.esm-bundler-C2J-SQPN.js";import{C as S}from"./Chat2-BRFefI9f.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";const L={class:"chat-filter"},N={class:"chat-filter__container"},F={__name:"ChatFilter",emits:["update"],setup(d,{emit:p}){const r=C(""),n=p,m=()=>{const c=k(r);n("update",c.value)};return(c,h)=>(o(),u("div",L,[s("div",N,[s("input",{class:"chat-filter__input",type:"text",ref_key:"refInput",ref:r,onInput:m,placeholder:"Поиск..."},null,544)])]))}},w=U(F,[["__scopeId","data-v-bacb0798"]]);F.__docgenInfo={exportName:"default",displayName:"ChatFilter",description:"",tags:{},events:[{name:"update"}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/base/ChatFilter.vue"]};const B={class:"chat-list"},q={class:"chat-list__container"},P={class:"chat-list__items"},x={__name:"ChatList2",props:{chats:{type:Array,required:!0},filterEnabled:{type:Boolean,required:!0}},emits:["select"],setup(d,{emit:p}){const r=C(""),n=d,m=()=>{document.documentElement.classList.toggle("dark")},c=p,h=e=>{c("select",e),n.chats.forEach(a=>a.isSelected=!1);const t=n.chats.find(a=>a.chatId===e.chatId);t.isSelected=!0},E=()=>n.chats.sort((e,t)=>{if(e.countUnread>t.countUnread)return-1;if(e.countUnread<t.countUnread)return 1;if(e.countUnread==t.countUnread)return 0}).filter(e=>e.name.includes(r.value)),A=e=>{r.value=e};return(e,t)=>(o(),u("div",B,[s("div",q,[t[0]||(t[0]=s("h2",{class:"chat-list__title"},"Чаты",-1)),d.filterEnabled?(o(),g(w,{key:0,class:"chat-list__filter",onUpdate:A})):D("",!0),s("div",P,[(o(!0),u(M,null,J(E(),a=>(o(),g(S,{key:a.chatId,chat:a,onSelect:h},null,8,["chat"]))),128))]),s("button",{onClick:m,style:{width:"150px",height:"20px","margin-top":"50px"}},"Смена темы")])]))}},$=U(x,[["__scopeId","data-v-69ebd00b"]]);x.__docgenInfo={exportName:"default",displayName:"ChatList2",description:"",tags:{},props:[{name:"chats",type:{name:"array"},required:!0},{name:"filterEnabled",type:{name:"boolean"},required:!0}],events:[{name:"select"}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/features/ChatList2.vue"]};const z={component:$},i={args:{chats:[{chatId:"1",avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",name:"John Doe",lastMessage:"Привет!",countUnread:"21","lastActivity.time":"12:34",isSelected:!0},{chatId:"2",name:"John Doe 2",lastMessage:"Привет 2!",countUnread:"677","lastActivity.time":"12:11"}]}},l={args:{chats:[{chatId:"1",avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",name:"John Doe",lastMessage:"Привет!",countUnread:"21","lastActivity.time":"12:34"},{chatId:"2",name:"John Doe 2",lastMessage:"Привет 2!",countUnread:"677","lastActivity.time":"12:11"}],filterEnabled:!0}};var _,f,v;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    chats: [{
      chatId: '1',
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      name: "John Doe",
      lastMessage: "Привет!",
      countUnread: "21",
      'lastActivity.time': "12:34",
      isSelected: true
    }, {
      chatId: '2',
      name: "John Doe 2",
      lastMessage: "Привет 2!",
      countUnread: "677",
      'lastActivity.time': "12:11"
    }]
  }
}`,...(v=(f=i.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var y,b,I;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    chats: [{
      chatId: '1',
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      name: "John Doe",
      lastMessage: "Привет!",
      countUnread: "21",
      'lastActivity.time': "12:34"
    }, {
      chatId: '2',
      name: "John Doe 2",
      lastMessage: "Привет 2!",
      countUnread: "677",
      'lastActivity.time': "12:11"
    }],
    filterEnabled: true
  }
}`,...(I=(b=l.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};const O=["Primary","WithEnabledFilter"];export{i as Primary,l as WithEnabledFilter,O as __namedExportsOrder,z as default};
