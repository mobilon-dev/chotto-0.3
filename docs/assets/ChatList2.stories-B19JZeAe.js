import{g as U,o as n,b as d,d as b,u as E,q as h,e as x,F as D,p as J}from"./vue.esm-bundler-BzM51Bjv.js";import{C as M}from"./Chat2-Dp5kkbHP.js";import{_ as S}from"./_plugin-vue_export-helper-DlAUqK2U.js";const C={__name:"ChatFilter",emits:["update"],setup(l,{emit:p}){const r=U(""),s=p,m=()=>{const o=E(r);s("update",o.value)};return(o,u)=>(n(),d("div",null,[b("input",{type:"text",ref_key:"refInput",ref:r,onInput:m,placeholder:"Поиск..."},null,544)]))}};C.__docgenInfo={exportName:"default",displayName:"ChatFilter",description:"",tags:{},events:[{name:"update"}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/base/ChatFilter.vue"]};const k={class:"chat-list"},F={__name:"ChatList2",props:{chats:{type:Array,required:!0},filterEnabled:{type:Boolean,required:!0}},emits:["select"],setup(l,{emit:p}){const r=U(""),s=l,m=p,o=e=>{m("select",e),s.chats.forEach(a=>a.isSelected=!1);const t=s.chats.find(a=>a.chatId===e.chatId);t.isSelected=!0},u=()=>s.chats.sort((e,t)=>{if(e.countUnread>t.countUnread)return-1;if(e.countUnread<t.countUnread)return 1;if(e.countUnread==t.countUnread)return 0}).filter(e=>e.name.includes(r.value)),A=e=>{r.value=e};return(e,t)=>(n(),d("div",null,[l.filterEnabled?(n(),h(C,{key:0,onUpdate:A})):x("",!0),b("div",k,[(n(!0),d(D,null,J(u(),a=>(n(),h(M,{key:a.chatId,chat:a,onSelect:o},null,8,["chat"]))),128))])]))}},N=S(F,[["__scopeId","data-v-1fd0e46c"]]);F.__docgenInfo={exportName:"default",displayName:"ChatList2",description:"",tags:{},props:[{name:"chats",type:{name:"array"},required:!0},{name:"filterEnabled",type:{name:"boolean"},required:!0}],events:[{name:"select"}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/features/ChatList2.vue"]};const w={component:N},c={args:{chats:[{chatId:"1",avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",name:"John Doe",lastMessage:"Привет!",countUnread:"21","lastActivity.time":"12:34",isSelected:!0},{chatId:"2",name:"John Doe 2",lastMessage:"Привет 2!",countUnread:"677","lastActivity.time":"12:11"}]}},i={args:{chats:[{chatId:"1",avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",name:"John Doe",lastMessage:"Привет!",countUnread:"21","lastActivity.time":"12:34"},{chatId:"2",name:"John Doe 2",lastMessage:"Привет 2!",countUnread:"677","lastActivity.time":"12:11"}],filterEnabled:!0}};var g,v,f;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(f=(v=c.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var _,y,I;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(I=(y=i.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};const P=["Primary","WithEnabledFilter"];export{c as Primary,i as WithEnabledFilter,P as __namedExportsOrder,w as default};
