import{o as g,b as _,d as C,t as r}from"./vue.esm-bundler-zsQ1d38l.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={__name:"Chat",props:{chat:{type:Object,required:!0}},emits:["select"],setup(a,{emit:d}){const i=a,u=d,l=()=>{u("select",i.chat)};return(f,v)=>(g(),_("div",{class:"chat",onClick:l},[C("p",null,r(a.chat.name)+" "+r(a.chat.countUnread),1)]))}},b=y(h,[["__scopeId","data-v-77b8ac34"]]);h.__docgenInfo={exportName:"default",displayName:"Chat",description:"",tags:{},props:[{name:"chat",type:{name:"object"},required:!0}],events:[{name:"select"}],sourceFiles:["/home/sergey/Projects/@mobilon-dev/chotto/src/components/base/Chat.vue"]};const U={component:b},t={args:{chat:{name:"test chat",countUnread:1}}},e={args:{chat:{name:"test chat test chat test chat test chat",countUnread:1}}};var s,c,o;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  /*
  render: (args) => ({
    components: { Chat },
    setup() {
      return { args };
    },
    template: '<Chat v-bind="args" />',
  }),
  */
  args: {
    chat: {
      name: 'test chat',
      countUnread: 1
    }
  }
}`,...(o=(c=t.parameters)==null?void 0:c.docs)==null?void 0:o.source}}};var n,m,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  /*
  render: (args) => ({
    components: { Chat },
    setup() {
      return { args };
    },
    template: '<Chat v-bind="args" />',
  }),
  */
  args: {
    chat: {
      name: 'test chat test chat test chat test chat',
      countUnread: 1
    }
  }
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const j=["Primary","PrimaryLongTitle"];export{t as Primary,e as PrimaryLongTitle,j as __namedExportsOrder,U as default};
