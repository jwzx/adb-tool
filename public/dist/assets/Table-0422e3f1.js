import{_ as e,k as a,C as t,E as l,q as n,s as o,u as d,v as s,x as i,r as c,o as u,b as r,a as m,w as p,e as y,y as k,d as f,g as v,c as b,F as C,t as h,n as g}from"./index-503d693c.js";const x=a({components:{CheckOutlined:t,EditOutlined:l},props:{commands:{type:Array,default:()=>[]}},emits:["updateCommands"],watch:{commands:{handler(e,a){this.dataSource=n(e),console.log("parentcommands----",e,a)},immediate:!0,deep:!0},dataSource:{handler(e,a){if(!o(e,a)){try{this.$emit("updateCommands",n(e)),this.count=e.length}catch(t){console.log(t)}console.log(e,this.count)}},immediate:!0,deep:!0,flush:"post"}},setup(e){let a=d(e.commands);const t=s((()=>a.value.length+1)),l=i({});return{columns:[{title:"name",dataIndex:"name",slots:{customRender:"name"}},{title:"keycode",dataIndex:"keycode",slots:{customRender:"keycode"}},{title:"operation",dataIndex:"operation",slots:{customRender:"operation"}}],onDelete:e=>{let t=n(a.value);t=t.filter((a=>a.key!==e)),a.value=t},handleAdd:()=>{const e={key:`${t.value}`,name:`${t.value}`,keycode:`${t.value}`};let l=n(a.value);l.push(e),a.value=l},dataSource:a,editableData:l,count:t,cancel:e=>{delete l[e]},edit:e=>{l[e]=n(a.value.filter((a=>e===a.key))[0])},save:e=>{let t=n(a.value);Object.assign(t.filter((a=>e===a.key))[0],l[e]),delete l[e],a.value=t}}}}),D={class:"editable-cell"},S=v("a",null,"Delete",-1),_={class:"editable-row-operations"},A={key:0},O={key:1},$=["onClick"];const w=e(x,[["render",function(e,a,t,l,n,o){const d=c("PlusCircleOutlined"),s=c("a-button"),i=c("a-input"),x=c("a-popconfirm"),w=c("a-table");return u(),r(C,null,[m(s,{type:"primary",class:"editable-add-btn",onClick:e.handleAdd,style:{"margin-bottom":"8px"}},{icon:p((()=>[m(d)])),default:p((()=>[y("Add")])),_:1},8,["onClick"]),m(w,{bordered:"","data-source":e.dataSource,columns:e.columns,pagination:!1},k({operation:p((({record:a})=>[e.dataSource.length?(u(),b(x,{key:0,title:"Sure to delete?",onConfirm:t=>e.onDelete(a.key)},{default:p((()=>[S])),_:2},1032,["onConfirm"])):g("",!0),v("div",_,[e.editableData[a.key]?(u(),r("span",A,[m(s,{type:"primary",onClick:t=>e.save(a.key)},{default:p((()=>[y("Save")])),_:2},1032,["onClick"]),m(x,{title:"Sure to cancel?",onConfirm:t=>e.cancel(a.key)},{default:p((()=>[m(s,null,{default:p((()=>[y("Cancel")])),_:1})])),_:2},1032,["onConfirm"])])):(u(),r("span",O,[v("a",{onClick:t=>e.edit(a.key)},"Edit",8,$)]))])])),_:2},[f(["key","name","keycode"],(a=>({name:a,fn:p((({text:t,record:l})=>[v("div",D,[e.editableData[l.key]?(u(),b(i,{key:0,value:e.editableData[l.key][a],"onUpdate:value":t=>e.editableData[l.key][a]=t,style:{margin:"-5px 0"}},null,8,["value","onUpdate:value"])):(u(),r(C,{key:1},[y(h(t),1)],64))])]))})))]),1032,["data-source","columns"]),m(s,{type:"primary",class:"editable-add-btn",onClick:e.handleAdd,style:{"margin-bottom":"8px"}},{icon:p((()=>[m(d)])),default:p((()=>[y("Add")])),_:1},8,["onClick"])],64)}]]);export{w as default};
