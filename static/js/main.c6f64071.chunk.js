(this["webpackJsonpbook-cricket"]=this["webpackJsonpbook-cricket"]||[]).push([[0],{64:function(e,t,a){},70:function(e,t,a){"use strict";a.r(t);var r=a(4),c=a(0),n=a.n(c),o=a(10),i=a.n(o),s=(a(64),a(18)),l=a(115),b=a(116),j=a(117),m=a(16),d=function(e,t){return function(a){a({type:"PICK_TEAMS",payload:{team1:e,team2:t}})}},O=a(112),u=a(113),f=a(2),h=function(e,t){return function(e,a){e({type:"SCORE",payload:{pitchType:t}})}},S=function(e){return{type:"COMPLETE",payload:e}},k=function(){return{type:"RESET_STATE"}},x=a(105),p=a(111),y=a(110),I=a(109);var v=function(e){var t=[-1,0,1,2,3,4,5,6,7,8,9,10];return Object(r.jsxs)("div",{children:[Object(r.jsx)(x.a,{style:{maxWidth:500,maxHeight:100,float:"left"},"aria-label":"customized table",children:Object(r.jsx)(I.a,{children:t.map((function(t){var a;return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(y.a,{children:[Object(r.jsx)(p.a,{style:{color:e.track.team1.player_1===t||e.track.team1.player_2===t?"#72ff72":t>Math.min(e.track.team1.player_1,e.track.team1.player_2)&&t<Math.max(e.track.team1.player_1,e.track.team1.player_2)||t<Math.min(e.track.team1.player_1,e.track.team1.player_2)?"red":"gray"},children:e.teamData[e.team1][t]}),Object(r.jsx)(p.a,{style:{color:"whitesmoke"},children:null!==(a=e.team1Stats[t])&&void 0!==a?a:0})]})})}))})},Date.now()+1),Object(r.jsx)(x.a,{style:{maxWidth:500,maxHeight:100,float:"right"},"aria-label":"customized table",children:Object(r.jsx)(I.a,{children:t.map((function(t){var a;return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(y.a,{children:[Object(r.jsx)(p.a,{style:{color:e.track.team2.player_1===t||e.track.team2.player_2===t?"#72ff72":t>Math.min(e.track.team2.player_1,e.track.team2.player_2)&&t<Math.max(e.track.team2.player_1,e.track.team2.player_2)||t<Math.min(e.track.team2.player_1,e.track.team2.player_2)?"red":"gray"},children:e.teamData[e.team2][t]}),Object(r.jsx)(p.a,{style:{color:"whitesmoke"},children:null!==(a=e.team2Stats[t])&&void 0!==a?a:0})]})})}))})},Date.now())]})},D=function(e,t){var a;return"SET_TEAM"===e&&(a=t),function(t){t({type:e,payload:a})}},T=a(43),g=a.n(T),M=a(51),B=function(){var e=Object(M.a)(g.a.mark((function e(t){var a,r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t);case 3:return r=e.sent,e.next=6,r.json();case 6:return a=e.sent,e.abrupt("return",[200,a]);case 10:return e.prev=10,e.t0=e.catch(0),e.abrupt("return",[401,"Something Went Wrong!"]);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),F=function(e){return function(t){t({type:e})}};var A=Object(m.b)((function(e){return{scoreData:e.manageScores,teamData:e.getTeams}}),(function(e){return{scoreDispatch:function(t){return e(h(null,t))},completeInningsDispatch:function(t){return e(S(t))},resetDispatch:function(){return e(k())},teamsDispatch:function(t,a){return e(D(t,a))}}}))((function(e){var t,a,n,o,i,l,b=Object(c.useState)(""),j=Object(s.a)(b,2),d=j[0],u=j[1],h=Object(c.useRef)({}),S=Object(m.d)((function(e){return e.dynamicSquads})),k=Object(m.c)();return Object(c.useEffect)((function(){S&&(B("https://raw.githubusercontent.com/Ad1tyaV/pyTestFiles/master/cric-v1.json").then((function(t){200!==t[0]?e.teamsDispatch("GET_TEAM",t[1]):e.teamsDispatch("SET_TEAM",t[1])})),k(F("DISABLE")))}),[]),Object(c.useEffect)((function(){e.scoreData.gameover||10!==e.scoreData.team1Wickets&&300!==e.scoreData.team1BallsFaced||(0===Object.keys(h.current).length&&(h.current={},h.current=Object(f.a)(Object(f.a)({},h.current),{},{team1:Object(f.a)(Object(f.a)({},h.current.team1),{},{player_1:e.scoreData.onStrike.batterIndex,player_2:e.scoreData.offStrike.batterIndex})})),e.completeInningsDispatch("team1")),10!==e.scoreData.team1Wickets&&300!==e.scoreData.team1BallsFaced||(e.scoreData.team2Total>e.scoreData.team1Total?(h.current=Object(f.a)(Object(f.a)({},h.current),{},{team2:Object(f.a)(Object(f.a)({},h.current.team1),{},{player_1:e.scoreData.onStrike.batterIndex,player_2:e.scoreData.offStrike.batterIndex})}),u("".concat(e.scoreData.team2," won by ").concat(10-e.scoreData.team2Wickets," wickets"))):e.scoreData.team2Total!==e.scoreData.team1Total||10!==e.scoreData.team2Wickets&&300!==e.scoreData.team2BallsFaced?e.scoreData.team2Total<e.scoreData.team1Total&&(10===e.scoreData.team2Wickets||300===e.scoreData.team2BallsFaced)&&(h.current=Object(f.a)(Object(f.a)({},h.current),{},{team2:Object(f.a)(Object(f.a)({},h.current.team1),{},{player_1:e.scoreData.onStrike.batterIndex,player_2:e.scoreData.offStrike.batterIndex})}),u("".concat(e.scoreData.team1," beat ").concat(e.scoreData.team2," by ").concat(e.scoreData.team1Total-e.scoreData.team2Total," runs"))):(h.current=Object(f.a)(Object(f.a)({},h.current),{},{team2:Object(f.a)(Object(f.a)({},h.current.team1),{},{player_1:e.scoreData.onStrike.batterIndex,player_2:e.scoreData.offStrike.batterIndex})}),u("Match Tied")))}),[e.scoreData]),Object(r.jsxs)("div",{style:{color:"whitesmoke"},children:[Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("span",{className:"score_data",style:{display:"flex",justifyContent:"center"},children:[Object(r.jsx)("h3",{children:e.scoreData.team1}),"\xa0\xa0",Object(r.jsxs)("h3",{children:[e.scoreData.team1Total,"/",e.scoreData.team1Wickets," Overs:",Math.floor(e.scoreData.team1BallsFaced/6),".",e.scoreData.team1BallsFaced%6," RR:",null!==(t=(e.scoreData.team1Total/((e.scoreData.team1BallsFaced||1)/6)).toPrecision(3))&&void 0!==t?t:0]})]}),Object(r.jsxs)("span",{className:"score_data",style:{display:"flex",justifyContent:"center"},children:[Object(r.jsx)("h3",{children:e.scoreData.team2}),"\xa0\xa0",Object(r.jsxs)("h3",{children:[e.scoreData.team2Total,"/",e.scoreData.team2Wickets," Overs:",Math.floor(e.scoreData.team2BallsFaced/6),".",e.scoreData.team2BallsFaced%6," RR:",null!==(a=(e.scoreData.team2Total/((e.scoreData.team2BallsFaced||1)/6)).toPrecision(3))&&void 0!==a?a:0]})]})]}),Object(r.jsx)("br",{}),e.scoreData.currentTeamBatting===e.scoreData.team1?Object(r.jsxs)("div",{children:[Object(r.jsxs)("span",{style:{display:"flex",justifyContent:"center"},children:[e.teamData[e.scoreData.team1][e.scoreData.onStrike.batterIndex],"\ud83d\udc49\ud83c\udffe",null!==(n=e.scoreData.team1Stats[e.scoreData.onStrike.batterIndex])&&void 0!==n?n:0]}),Object(r.jsx)("br",{}),Object(r.jsxs)("span",{style:{display:"flex",justifyContent:"center"},children:[e.teamData[e.scoreData.team1][e.scoreData.offStrike.batterIndex],"\ud83d\udc49\ud83c\udffe",null!==(o=e.scoreData.team1Stats[e.scoreData.offStrike.batterIndex])&&void 0!==o?o:0]})]}):Object(r.jsxs)("div",{children:[Object(r.jsxs)("span",{style:{display:"flex",justifyContent:"center"},children:[e.teamData[e.scoreData.team2][e.scoreData.onStrike.batterIndex],"\ud83d\udc49\ud83c\udffe",null!==(i=e.scoreData.team2Stats[e.scoreData.onStrike.batterIndex])&&void 0!==i?i:0]}),Object(r.jsx)("br",{}),Object(r.jsxs)("span",{style:{display:"flex",justifyContent:"center"},children:[e.teamData[e.scoreData.team2][e.scoreData.offStrike.batterIndex],"\ud83d\udc49\ud83c\udffe",null!==(l=e.scoreData.team2Stats[e.scoreData.offStrike.batterIndex])&&void 0!==l?l:0]})]}),Object(r.jsx)("hr",{}),e.scoreData.gameover?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("span",{style:{display:"flex",justifyContent:"center",fontWeight:"600"},children:d}),Object(r.jsx)("br",{}),Object(r.jsx)("span",{style:{display:"flex",justifyContent:"center"},children:Object(r.jsx)(O.a,{variant:"contained",color:"primary",onClick:function(){h.current={},e.resetDispatch()},children:"Play Again"})})]}):Object(r.jsx)("span",{style:{display:"flex",justifyContent:"center"},children:Object(r.jsx)(O.a,{color:"primary",variant:"contained",onClick:function(){for(var t=0;t<6;t++)e.scoreDispatch(e.pitchType)},children:"PLAY"})}),e.scoreData.gameover?Object(r.jsx)(v,{track:h.current,team1:e.scoreData.team1,team2:e.scoreData.team2,teamData:e.teamData,team1Stats:e.scoreData.team1Stats,team2Stats:e.scoreData.team2Stats}):Object(r.jsx)(r.Fragment,{})]})}));var C,w,E,_,R,W,L,P=Object(m.b)((function(e){return{scoreData:e.manageScores}}),(function(e){return{pickTeamDispatch:function(t,a){return e(d(t,a))}}}))((function(e){var t=Object(c.useState)(!1),a=Object(s.a)(t,2),n=a[0],o=a[1],i=Object(c.useState)(!1),m=Object(s.a)(i,2),d=m[0],f=m[1],h=Object(c.useState)(!1),S=Object(s.a)(h,2),k=S[0],x=S[1],p=Object(c.useState)("India"),y=Object(s.a)(p,2),I=y[0],v=y[1],D=Object(c.useState)("NewZealand"),T=Object(s.a)(D,2),g=T[0],M=T[1],B=Object(c.useState)("Normal"),F=Object(s.a)(B,2),C=F[0],w=F[1],E=Object(c.useRef)(["India","Pakistan","Australia","England","SouthAfrica","NewZealand","WestIndies"]);return Object(r.jsx)("div",{children:""===e.scoreData.team1?Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("div",{style:{marginLeft:"47.5%",marginTop:"1%"},children:[Object(r.jsx)(j.a,{shrink:!0,id:"firstTeam",style:{color:"whitesmoke"},children:"First Team"}),Object(r.jsx)(l.a,{label:"First Team",labelId:"demo-controlled-open-select-label",id:"firstTeam",open:n,onClose:function(){o(!1)},onOpen:function(){o(!0)},value:I,onChange:function(e){v(e.target.value)},style:{color:"whitesmoke"},children:E.current.map((function(e){return e!==g?Object(r.jsx)(b.a,{value:e,children:e},e):[]}))},I),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("span",{style:{color:"white",fontSize:"0.70rem"},children:"Switch"}),Object(r.jsx)(u.a,{htmlColor:"white",onClick:function(){v(g),M(I)}}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)(j.a,{shrink:!0,id:"secondTeam",style:{color:"whitesmoke"},children:"Second Team"}),Object(r.jsx)(l.a,{labelId:"demo-controlled-open-select-label",id:"secondTeam",open:d,onClose:function(){f(!1)},onOpen:function(){f(!0)},value:g,onChange:function(e){M(e.target.value)},style:{color:"whitesmoke"},children:E.current.map((function(e){return e!==I?Object(r.jsx)(b.a,{value:e,children:e},e):[]}))},g),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)(j.a,{shrink:!0,id:"pitchType",style:{color:"whitesmoke"},children:"Pitch Type"}),Object(r.jsx)(l.a,{label:"Pitch Type",labelId:"demo-controlled-open-select-label",id:"pitchType",open:k,onClose:function(){x(!1)},onOpen:function(){x(!0)},value:C,onChange:function(e){w(e.target.value)},style:{color:"whitesmoke"},children:["Normal","Hard","Wet","Green"].map((function(e){return Object(r.jsx)(b.a,{value:e,children:e},e)}))},C),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)(O.a,{variant:"contained",color:"primary",onClick:function(){e.pickTeamDispatch(I,g)},children:"PLAY"})]})}):Object(r.jsx)(A,{pitchType:C})})})),N=a(52),H=a(26),J=a(3),K=function(e,t){for(var a=-2,r=0;r<e.length;){if(!(t>=e[r])){a=r;break}r++}return-2===a?e.length-1:a},z=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;switch(t){case"Green":e[0]+=2,e[2]+=2,e[1]+=5,e[6]-=1,e[5]-=1;break;case"Hard":e[0]-=1,e[2]+=2,e[1]-=4,e[6]+=3,e[5]+=2;break;case"Wet":e[0]+=1,e[2]+=6,e[1]+=4,e[6]+=3,e[5]-=6,e[4]+=5;break;default:return e}return e},G=function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=(t=0,function(e){return t+=e}),c=[-1,0,1,2,3,4,6],n=[],o=[];switch(e){case-1:n=[3,80,50,10,1,15,5],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var i=Math.floor(Math.random()*o[o.length-1]),s=K(o,i);return c[s];case 0:n=[3,70,45,14,0,12,2],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var l=Math.floor(Math.random()*o[o.length-1]),b=K(o,l);return c[b];case 1:n=[3,91,50,16,1,17,2],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var j=Math.floor(Math.random()*o[o.length-1]),m=K(o,j);return c[m];case 2:n=[4,80,45,16,1,10,5],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var d=Math.floor(Math.random()*o[o.length-1]),O=K(o,d);return c[O];case 3:n=[5,91,45,7,1,18,6],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var u=Math.floor(Math.random()*o[o.length-1]),f=K(o,u);return c[f];case 4:n=[5,91,40,5,1,12,7],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var h=Math.floor(Math.random()*o[o.length-1]),S=K(o,h);return c[S];case 5:n=[6,80,38,5,1,15,8],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var k=Math.floor(Math.random()*o[o.length-1]),x=K(o,k);return c[x];case 6:n=[6,80,45,16,1,18,4],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var p=Math.floor(Math.random()*o[o.length-1]),y=K(o,p);return c[y];case 8:n=[9,100,15,8,1,18,6],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var I=Math.floor(Math.random()*o[o.length-1]),v=K(o,I);return c[v];case 7:n=[9,100,25,15,1,18,2],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var D=Math.floor(Math.random()*o[o.length-1]),T=K(o,D);return c[T];case 9:n=[9,100,25,5,1,18,2],o=(n=null==a||"NORMAL"===a?n:z(n,a)).map(r);var g=Math.floor(Math.random()*o[o.length-1]),M=K(o,g);return c[M];default:return 1}},q={team1:"",team2:"",currentTeamBatting:"",onStrike:{batterIndex:-1},offStrike:{batterIndex:0},team1Stats:{},team2Stats:{},innings:0,team1Total:0,team2Total:0,team1Wickets:0,team2Wickets:0,gameover:!1,team1BallsFaced:0,team2BallsFaced:0},Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SCORE":var a=t.payload.pitchType;if(e.gameover)return e;var r=G(e.onStrike.batterIndex,a);if(-1===r){if(e.currentTeamBatting===e.team1&&10!==e.team1Wickets){var c=Object(f.a)(Object(f.a)({},e),{},{offStrike:Object(f.a)(Object(f.a)({},e.offStrike),{},{batterIndex:e.offStrike.batterIndex}),onStrike:Object(f.a)(Object(f.a)({},e.onStrike),{},{batterIndex:e.onStrike.batterIndex>e.offStrike.batterIndex?e.onStrike.batterIndex+1:e.offStrike.batterIndex+1}),team1Wickets:e.onStrike.batterIndex>e.offStrike.batterIndex?e.onStrike.batterIndex+1:e.offStrike.batterIndex+1,team1BallsFaced:e.team1BallsFaced+1});return c.team1BallsFaced%6===0?Object(f.a)(Object(f.a)({},c),{},{onStrike:Object(f.a)(Object(f.a)({},c.onStrike),{},{batterIndex:c.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},c.offStrike),{},{batterIndex:c.onStrike.batterIndex})}):c}if(e.currentTeamBatting===e.team2&&10!==e.team2Wickets){var n=Object(f.a)(Object(f.a)({},e),{},{offStrike:Object(f.a)(Object(f.a)({},e.offStrike),{},{batterIndex:e.offStrike.batterIndex}),onStrike:Object(f.a)(Object(f.a)({},e.onStrike),{},{batterIndex:e.onStrike.batterIndex>e.offStrike.batterIndex?e.onStrike.batterIndex+1:e.offStrike.batterIndex+1}),team2Wickets:e.onStrike.batterIndex>e.offStrike.batterIndex?e.onStrike.batterIndex+1:e.offStrike.batterIndex+1,team2BallsFaced:e.team2BallsFaced+1});return n.team2BallsFaced%6===0?Object(f.a)(Object(f.a)({},n),{},{onStrike:Object(f.a)(Object(f.a)({},n.onStrike),{},{batterIndex:n.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},n.offStrike),{},{batterIndex:n.onStrike.batterIndex})}):n}return e}if(0===r){if(e.currentTeamBatting===e.team1){var o=Object(f.a)(Object(f.a)({},e),{},{team1BallsFaced:e.team1BallsFaced+1});return o.team1BallsFaced%6===0?Object(f.a)(Object(f.a)({},o),{},{onStrike:Object(f.a)(Object(f.a)({},o.onStrike),{},{batterIndex:o.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},o.offStrike),{},{batterIndex:o.onStrike.batterIndex})}):o}var i=Object(f.a)(Object(f.a)({},e),{},{team2BallsFaced:e.team2BallsFaced+1});return i.team1BallsFaced%6===0?Object(f.a)(Object(f.a)({},i),{},{onStrike:Object(f.a)(Object(f.a)({},i.onStrike),{},{batterIndex:i.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},i.offStrike),{},{batterIndex:i.onStrike.batterIndex})}):i}if(r%2){if(e.currentTeamBatting===e.team1&&10!==e.team1Wickets){var s,l=Object(f.a)(Object(f.a)({},e),{},{team1Total:e.team1Total+r,team1Stats:Object(f.a)(Object(f.a)({},e.team1Stats),{},Object(J.a)({},e.onStrike.batterIndex,(null!==(s=e.team1Stats[e.onStrike.batterIndex])&&void 0!==s?s:0)+r)),team1BallsFaced:e.team1BallsFaced+1,onStrike:Object(f.a)(Object(f.a)({},e.onStrike),{},{batterIndex:e.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},e.offStrike),{},{batterIndex:e.onStrike.batterIndex})});return l.team1BallsFaced%6===0?Object(f.a)(Object(f.a)({},l),{},{onStrike:Object(f.a)(Object(f.a)({},l.onStrike),{},{batterIndex:l.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},l.offStrike),{},{batterIndex:l.onStrike.batterIndex})}):l}if(e.currentTeamBatting===e.team2&&10!==e.team2Wickets&&e.team2Total<=e.team1Total){var b,j=Object(f.a)(Object(f.a)({},e),{},{team2Total:e.team2Total+r,team2Stats:Object(f.a)(Object(f.a)({},e.team2Stats),{},Object(J.a)({},e.onStrike.batterIndex,(null!==(b=e.team2Stats[e.onStrike.batterIndex])&&void 0!==b?b:0)+r)),team2BallsFaced:e.team2BallsFaced+1,onStrike:Object(f.a)(Object(f.a)({},e.onStrike),{},{batterIndex:e.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},e.offStrike),{},{batterIndex:e.onStrike.batterIndex})});return j.team2BallsFaced%6===0?Object(f.a)(Object(f.a)({},j),{},{onStrike:Object(f.a)(Object(f.a)({},j.onStrike),{},{batterIndex:j.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},j.offStrike),{},{batterIndex:j.onStrike.batterIndex})}):j}return e}if(e.currentTeamBatting===e.team1&&10!==e.team1Wickets){var m,d=Object(f.a)(Object(f.a)({},e),{},{team1Total:e.team1Total+r,team1Stats:Object(f.a)(Object(f.a)({},e.team1Stats),{},Object(J.a)({},e.onStrike.batterIndex,(null!==(m=e.team1Stats[e.onStrike.batterIndex])&&void 0!==m?m:0)+r)),team1BallsFaced:e.team1BallsFaced+1});return d.team1BallsFaced%6===0?Object(f.a)(Object(f.a)({},d),{},{onStrike:Object(f.a)(Object(f.a)({},d.onStrike),{},{batterIndex:d.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},d.offStrike),{},{batterIndex:d.onStrike.batterIndex})}):d}if(e.currentTeamBatting===e.team2&&10!==e.team2Wickets&&e.team2Total<=e.team1Total){var O,u=Object(f.a)(Object(f.a)({},e),{},{team2Total:e.team2Total+r,team2Stats:Object(f.a)(Object(f.a)({},e.team2Stats),{},Object(J.a)({},e.onStrike.batterIndex,(null!==(O=e.team2Stats[e.onStrike.batterIndex])&&void 0!==O?O:0)+r)),team2BallsFaced:e.team2BallsFaced+1});return u.team2BallsFaced%6===0?Object(f.a)(Object(f.a)({},u),{},{onStrike:Object(f.a)(Object(f.a)({},u.onStrike),{},{batterIndex:u.offStrike.batterIndex}),offStrike:Object(f.a)(Object(f.a)({},u.offStrike),{},{batterIndex:u.onStrike.batterIndex})}):u}return e;case"COMPLETE":return e.currentTeamBatting===e.team1?Object(f.a)(Object(f.a)({},e),{},{currentTeamBatting:e.team2,onStrike:{batterIndex:-1},offStrike:{batterIndex:0}}):e.currentTeamBatting!==e.team2||10!==e.team2Wickets&&300!==e.team2BallsFaced?e.currentTeamBatting===e.team2&&e.team2Total>e.team1Total?Object(f.a)(Object(f.a)({},e),{},{gameover:!0}):e:Object(f.a)(Object(f.a)({},e),{},{gameover:!0});case"RESET_STATE":return{team1:"",team2:"",currentTeamBatting:"",onStrike:{batterIndex:-1},offStrike:{batterIndex:0},team1Stats:{},team2Stats:{},innings:0,team1Total:0,team2Total:0,team1Wickets:0,team2Wickets:0,gameover:!1};case"PICK_TEAMS":return Object(f.a)(Object(f.a)({},e),{},{team1:t.payload.team1,team2:t.payload.team2,gameover:!1,currentTeamBatting:t.payload.team1,team1BallsFaced:0,team2BallsFaced:0});default:return e}},Y={},V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"PICK_TEAMS":return Object(f.a)(Object(f.a)({},Y),{},{team1:t.payload.team1Name,team2:t.payload.team2Name,team1Stats:t.payload.team1Squad,team2Stats:t.payload.team2Squad});default:return e}},Q={},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_FIRST":return e.team1!==t.payload.TEAM1?Object(f.a)(Object(f.a)({},Q),{},{team1:e.team2,team2:e.team1,currentTeamBatting:e.team2,team1Stats:e.team2Stats,team2Stats:e.team1Stats,innings:1}):e;default:return e}},X={India:(C={},Object(J.a)(C,-1,"Rohit Sharma"),Object(J.a)(C,0,"Shikhar Dhawan"),Object(J.a)(C,1,"Virat Kohli"),Object(J.a)(C,2,"Shreyas Iyer"),Object(J.a)(C,3,"Rishabh Pant"),Object(J.a)(C,4,"KL Rahul"),Object(J.a)(C,5,"Hardik Pandya"),Object(J.a)(C,6,"Ravindra Jadeja"),Object(J.a)(C,7,"Bhuvneshwar Kumar"),Object(J.a)(C,8,"Shardul Thakur"),Object(J.a)(C,9,"Jasprit Bumrah"),Object(J.a)(C,10,"Yuzi Chahal"),C),Pakistan:(w={},Object(J.a)(w,-1,"Imam-ul-Haq"),Object(J.a)(w,0,"Fakhar Zaman"),Object(J.a)(w,1,"Babar Azam"),Object(J.a)(w,2,"Haider Ali"),Object(J.a)(w,3,"Mohammed Rizwan"),Object(J.a)(w,4,"Iftikhar Ahmed"),Object(J.a)(w,5,"Khushdil Shah"),Object(J.a)(w,6,"Wahab Riaz"),Object(J.a)(w,7,"Shaheen Afrid"),Object(J.a)(w,8,"Musa Khan"),Object(J.a)(w,9,"Muhammad Hasnain"),Object(J.a)(w,10,"Yasir Shah"),w),Australia:(E={},Object(J.a)(E,-1,"Aaron Finch"),Object(J.a)(E,0,"David Warner"),Object(J.a)(E,1,"Steve Smith"),Object(J.a)(E,2,"Marnus Labuschagne"),Object(J.a)(E,3,"Marcus Stoinis"),Object(J.a)(E,4,"Glenn Maxwell"),Object(J.a)(E,5,"Alex Carey"),Object(J.a)(E,6,"Pat Cummins"),Object(J.a)(E,7,"Mitchell Starc"),Object(J.a)(E,8,"Adam Zampa"),Object(J.a)(E,9,"Josh Hazelwood"),Object(J.a)(E,10,"Daniel Sams"),E),England:(_={},Object(J.a)(_,-1,"Jason Roy"),Object(J.a)(_,0,"Jonny Bairstow"),Object(J.a)(_,1,"Joe Root"),Object(J.a)(_,2,"Eoin Morgan"),Object(J.a)(_,3,"Ben Stokes"),Object(J.a)(_,4,"Jos Buttler"),Object(J.a)(_,5,"Chris Woakes"),Object(J.a)(_,6,"Liam Plunkett"),Object(J.a)(_,7,"Jofra Archer"),Object(J.a)(_,8,"Adil Rashid"),Object(J.a)(_,9,"Mark Wood"),Object(J.a)(_,10,"Sam Curran"),_),SouthAfrica:(R={},Object(J.a)(R,-1,"Quinton De Kock"),Object(J.a)(R,0,"Aiden Markram"),Object(J.a)(R,1,"Faf Du Plessis"),Object(J.a)(R,2,"R Van Der Dussen"),Object(J.a)(R,3,"David Miller"),Object(J.a)(R,4,"JP Duminy"),Object(J.a)(R,5,"Temba Bavuma"),Object(J.a)(R,6,"Andile Phehlukwayo"),Object(J.a)(R,7,"Chris Morris"),Object(J.a)(R,8,"Kagiso Rabada"),Object(J.a)(R,9,"Imran Tahir"),Object(J.a)(R,10,"Tabraiz Shamsi"),R),NewZealand:(W={},Object(J.a)(W,-1,"Martin Guptill"),Object(J.a)(W,0,"Henry Nicholls"),Object(J.a)(W,1,"Kane Williamson"),Object(J.a)(W,2,"Ross Taylor"),Object(J.a)(W,3,"Tom Latham"),Object(J.a)(W,4,"James Neesham"),Object(J.a)(W,5,"Colin de Grandhomme"),Object(J.a)(W,6,"Mitchell Santner"),Object(J.a)(W,7,"Matt Henry"),Object(J.a)(W,8,"Trent Boult"),Object(J.a)(W,9,"Lockie Ferguson"),Object(J.a)(W,10,"Tim Southee"),W),WestIndies:(L={},Object(J.a)(L,-1,"Evin Lewis"),Object(J.a)(L,0,"Shai Hope"),Object(J.a)(L,1,"Darren Bravo"),Object(J.a)(L,2,"Nicholas Pooran"),Object(J.a)(L,3,"Kieron Pollard"),Object(J.a)(L,4,"Andre Russell"),Object(J.a)(L,5,"Jason Holder"),Object(J.a)(L,6,"Alzarri Joseph"),Object(J.a)(L,7,"Sunil Narine"),Object(J.a)(L,8,"Sheldon Cotrell"),Object(J.a)(L,9,"Hayden Walsh Jr"),Object(J.a)(L,10,"Akeal Hosein"),L)},$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TEAM":return e=t.payload;case"GET_TEAM":default:return e}},ee=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"DISABLE":return!e;default:return e}},te=Object(H.b)({manageScores:Z,initPickTeams:V,setFirstTeams:U,getTeams:$,dynamicSquads:ee}),ae=Object(H.c)(te,Object(H.a)(N.a)),re=a(114);var ce=function(){return Object(c.useEffect)((function(){document.title="Cricket 2021"}),[]),Object(r.jsx)(m.a,{store:ae,children:Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(re.a,{position:"static",children:Object(r.jsx)("h2",{style:{alignSelf:"center"},children:"Cricket 2021"})}),Object(r.jsx)(P,{})]})})},ne=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,119)).then((function(t){var a=t.getCLS,r=t.getFID,c=t.getFCP,n=t.getLCP,o=t.getTTFB;a(e),r(e),c(e),n(e),o(e)}))};i.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(ce,{})}),document.getElementById("root")),ne()}},[[70,1,2]]]);
//# sourceMappingURL=main.c6f64071.chunk.js.map