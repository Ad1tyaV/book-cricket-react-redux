(this["webpackJsonpbook-cricket"]=this["webpackJsonpbook-cricket"]||[]).push([[0],{61:function(t,e,a){},67:function(t,e,a){"use strict";a.r(e);var r=a(2),c=a(0),n=a.n(c),o=a(9),s=a.n(o),i=(a(61),a(24)),l=a(109),m=a(110),b=a(111),j=a(27),d=function(t,e){return function(a){a({type:"PICK_TEAMS",payload:{team1:t,team2:e}})}},O=a(107),u=a(4),h=function(t,e){return function(t,a){t({type:"SCORE",payload:{run:5===e?1:e}})}},f=function(t){return{type:"COMPLETE",payload:t}},S=function(){return{type:"RESET_STATE"}},x=a(100),k=a(106),p=a(105),D=a(104);var y=function(t){var e=[-1,0,1,2,3,4,5,6,7,8,9,10];return Object(r.jsxs)("div",{children:[Object(r.jsx)(x.a,{style:{maxWidth:500,maxHeight:100,float:"left"},"aria-label":"customized table",children:Object(r.jsx)(D.a,{children:e.map((function(e){var a;return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(p.a,{children:[Object(r.jsx)(k.a,{style:{color:t.track.team1.player_1===e||t.track.team1.player_2===e?"green":e>Math.min(t.track.team1.player_1,t.track.team1.player_2)&&e<Math.max(t.track.team1.player_1,t.track.team1.player_2)||e<Math.min(t.track.team1.player_1,t.track.team1.player_2)?"red":"gray"},children:t.teamData[t.team1][e]}),Object(r.jsx)(k.a,{children:null!==(a=t.team1Stats[e])&&void 0!==a?a:0})]})})}))})},Date.now()),Object(r.jsx)(x.a,{style:{maxWidth:500,maxHeight:100,float:"right"},"aria-label":"customized table",children:Object(r.jsx)(D.a,{children:e.map((function(e){var a;return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(p.a,{children:[Object(r.jsx)(k.a,{style:{color:t.track.team2.player_1===e||t.track.team2.player_2===e?"green":e>Math.min(t.track.team2.player_1,t.track.team2.player_2)&&e<Math.max(t.track.team2.player_1,t.track.team2.player_2)||e<Math.min(t.track.team2.player_1,t.track.team2.player_2)?"red":"gray"},children:t.teamData[t.team2][e]}),Object(r.jsx)(k.a,{children:null!==(a=t.team2Stats[e])&&void 0!==a?a:0})]})})}))})},Date.now())]})};var g=Object(j.b)((function(t){return{scoreData:t.manageScores,teamData:t.getTeams}}),(function(t){return{scoreDispatch:function(e){return t(h(null,e))},completeInningsDispatch:function(e){return t(f(e))},resetDispatch:function(){return t(S())}}}))((function(t){var e,a,n,o,s,l,m=Object(c.useState)(""),b=Object(i.a)(m,2),j=b[0],d=b[1],h=Object(c.useRef)({});return Object(c.useEffect)((function(){t.scoreData.gameover||10!==t.scoreData.team1Wickets&&300!==t.scoreData.team1BallsFaced||(0===Object.keys(h.current).length&&(h.current={},h.current=Object(u.a)(Object(u.a)({},h.current),{},{team1:Object(u.a)(Object(u.a)({},h.current.team1),{},{player_1:t.scoreData.onStrike.batterIndex,player_2:t.scoreData.offStrike.batterIndex})})),t.completeInningsDispatch("team1")),10!==t.scoreData.team1Wickets&&300!==t.scoreData.team1BallsFaced||(t.scoreData.team2Total>t.scoreData.team1Total?(h.current=Object(u.a)(Object(u.a)({},h.current),{},{team2:Object(u.a)(Object(u.a)({},h.current.team1),{},{player_1:t.scoreData.onStrike.batterIndex,player_2:t.scoreData.offStrike.batterIndex})}),d("".concat(t.scoreData.team2," won by ").concat(10-t.scoreData.team2Wickets," wickets"))):t.scoreData.team2Total!==t.scoreData.team1Total||10!==t.scoreData.team2Wickets&&300!==t.scoreData.team2BallsFaced?t.scoreData.team2Total<t.scoreData.team1Total&&(10===t.scoreData.team2Wickets||300===t.scoreData.team2BallsFaced)&&(h.current=Object(u.a)(Object(u.a)({},h.current),{},{team2:Object(u.a)(Object(u.a)({},h.current.team1),{},{player_1:t.scoreData.onStrike.batterIndex,player_2:t.scoreData.offStrike.batterIndex})}),d("".concat(t.scoreData.team1," beat ").concat(t.scoreData.team2," by ").concat(t.scoreData.team1Total-t.scoreData.team2Total," runs"))):(h.current=Object(u.a)(Object(u.a)({},h.current),{},{team2:Object(u.a)(Object(u.a)({},h.current.team1),{},{player_1:t.scoreData.onStrike.batterIndex,player_2:t.scoreData.offStrike.batterIndex})}),d("Match Tied")))}),[t.scoreData]),Object(r.jsxs)("div",{children:[Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("span",{className:"score_data",style:{display:"flex",justifyContent:"center"},children:[Object(r.jsx)("h3",{children:t.scoreData.team1}),"\xa0\xa0",Object(r.jsxs)("h3",{children:[t.scoreData.team1Total,"/",t.scoreData.team1Wickets," Overs:",t.scoreData.team1BallsFaced>=60?(t.scoreData.team1BallsFaced/6).toPrecision(2):(t.scoreData.team1BallsFaced/6).toPrecision(1),".",t.scoreData.team1BallsFaced%6," RR:",null!==(e=(t.scoreData.team1Total/((t.scoreData.team1BallsFaced||1)/6)).toPrecision(3))&&void 0!==e?e:0]})]}),Object(r.jsxs)("span",{className:"score_data",style:{display:"flex",justifyContent:"center"},children:[Object(r.jsx)("h3",{children:t.scoreData.team2}),"\xa0\xa0",Object(r.jsxs)("h3",{children:[t.scoreData.team2Total,"/",t.scoreData.team2Wickets," Overs:",t.scoreData.team2BallsFaced>=60?(t.scoreData.team2BallsFaced/6).toPrecision(2):(t.scoreData.team2BallsFaced/6).toPrecision(1),".",t.scoreData.team2BallsFaced%6," RR:",null!==(a=(t.scoreData.team2Total/((t.scoreData.team2BallsFaced||1)/6)).toPrecision(3))&&void 0!==a?a:0]})]})]}),Object(r.jsx)("br",{}),t.scoreData.currentTeamBatting===t.scoreData.team1?Object(r.jsxs)("div",{children:[Object(r.jsxs)("span",{style:{display:"flex",justifyContent:"center"},children:[t.teamData[t.scoreData.team1][t.scoreData.onStrike.batterIndex],"\ud83d\udc49\ud83c\udffe",null!==(n=t.scoreData.team1Stats[t.scoreData.onStrike.batterIndex])&&void 0!==n?n:0]}),Object(r.jsx)("br",{}),Object(r.jsxs)("span",{style:{display:"flex",justifyContent:"center"},children:[t.teamData[t.scoreData.team1][t.scoreData.offStrike.batterIndex],"\ud83d\udc49\ud83c\udffe",null!==(o=t.scoreData.team1Stats[t.scoreData.offStrike.batterIndex])&&void 0!==o?o:0]})]}):Object(r.jsxs)("div",{children:[Object(r.jsxs)("span",{style:{display:"flex",justifyContent:"center"},children:[t.teamData[t.scoreData.team2][t.scoreData.onStrike.batterIndex],"\ud83d\udc49\ud83c\udffe",null!==(s=t.scoreData.team2Stats[t.scoreData.onStrike.batterIndex])&&void 0!==s?s:0]}),Object(r.jsx)("br",{}),Object(r.jsxs)("span",{style:{display:"flex",justifyContent:"center"},children:[t.teamData[t.scoreData.team2][t.scoreData.offStrike.batterIndex],"\ud83d\udc49\ud83c\udffe",null!==(l=t.scoreData.team2Stats[t.scoreData.offStrike.batterIndex])&&void 0!==l?l:0]})]}),Object(r.jsx)("hr",{}),t.scoreData.gameover?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("span",{style:{display:"flex",justifyContent:"center",fontWeight:"600"},children:j}),Object(r.jsx)("br",{}),Object(r.jsx)("span",{style:{display:"flex",justifyContent:"center"},children:Object(r.jsx)(O.a,{variant:"contained",color:"primary",onClick:function(){h.current={},t.resetDispatch()},children:"Play Again"})})]}):Object(r.jsx)("span",{style:{display:"flex",justifyContent:"center"},children:Object(r.jsx)(O.a,{color:"primary",variant:"contained",onClick:function(){for(var e=0;e<6;e++)t.scoreDispatch(Math.floor(7*Math.random()))},children:"PLAY"})}),t.scoreData.gameover?Object(r.jsx)(y,{track:h.current,team1:t.scoreData.team1,team2:t.scoreData.team2,teamData:t.teamData,team1Stats:t.scoreData.team1Stats,team2Stats:t.scoreData.team2Stats}):Object(r.jsx)(r.Fragment,{})]})}));var v,I,T,B,M,F=Object(j.b)((function(t){return{scoreData:t.manageScores}}),(function(t){return{pickTeamDispatch:function(e,a){return t(d(e,a))}}}))((function(t){var e=n.a.useState(!1),a=Object(i.a)(e,2),o=a[0],s=a[1],j=n.a.useState(!1),d=Object(i.a)(j,2),u=d[0],h=d[1],f=Object(c.useState)("India"),S=Object(i.a)(f,2),x=S[0],k=S[1],p=Object(c.useState)("Pakistan"),D=Object(i.a)(p,2),y=D[0],v=D[1],I=Object(c.useRef)(["India","Pakistan","Australia","England","SouthAfrica"]);return Object(r.jsx)("div",{children:""===t.scoreData.team1?Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("div",{style:{marginLeft:"47.5%",marginTop:"1%"},children:[Object(r.jsx)(b.a,{shrink:!0,id:"firstTeam",children:"First Team"}),Object(r.jsx)(l.a,{label:"First Team",labelId:"demo-controlled-open-select-label",id:"firstTeam",open:o,onClose:function(){s(!1)},onOpen:function(){s(!0)},value:x,onChange:function(t){k(t.target.value)},children:I.current.map((function(t){return t!==y?Object(r.jsx)(m.a,{value:t,children:t}):[]}))}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)(b.a,{shrink:!0,id:"secondTeam",children:"Second Team"}),Object(r.jsx)(l.a,{labelId:"demo-controlled-open-select-label",id:"secondTeam",open:u,onClose:function(){h(!1)},onOpen:function(){h(!0)},value:y,onChange:function(t){v(t.target.value)},children:I.current.map((function(t){return t!==x?Object(r.jsx)(m.a,{value:t,children:t}):[]}))}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)(O.a,{variant:"contained",color:"primary",onClick:function(){t.pickTeamDispatch(x,y)},children:"PLAY"})]})}):Object(r.jsx)(g,{})})})),C=a(49),_=a(18),P=a(5),A=function(t,e){for(var a=-2,r=0;r<t.length;){if(!(e>=t[r])){a=r;break}r++}return-2===a?t.length-1:a},E=function(t){var e,a=(e=0,function(t){return e+=t}),r=[-1,0,1,2,3,4,6],c=[];switch(t){case-1:c=[3,80,50,10,1,15,5].map(a);var n=Math.floor(Math.random()*c[c.length-1]);return r[A(c,n)];case 1:c=[3,70,45,14,0,12,2].map(a);var o=Math.floor(Math.random()*c[c.length-1]);return r[A(c,o)];case 2:c=[3,91,50,16,1,17,2].map(a);var s=Math.floor(Math.random()*c[c.length-1]);return r[A(c,s)];case 3:c=[4,80,45,16,1,10,5].map(a);var i=Math.floor(Math.random()*c[c.length-1]);return r[A(c,i)];case 4:c=[5,91,45,7,1,18,6].map(a);var l=Math.floor(Math.random()*c[c.length-1]);return r[A(c,l)];case 5:c=[5,91,40,5,1,12,7].map(a);var m=Math.floor(Math.random()*c[c.length-1]);return r[A(c,m)];case 6:c=[6,80,38,5,1,15,8].map(a);var b=Math.floor(Math.random()*c[c.length-1]);return r[A(c,b)];case 7:c=[6,80,45,16,1,18,4].map(a);var j=Math.floor(Math.random()*c[c.length-1]);return r[A(c,j)];case 8:c=[9,100,15,8,1,18,6].map(a);var d=Math.floor(Math.random()*c[c.length-1]);return r[A(c,d)];case 9:c=[9,100,25,15,1,18,2].map(a);var O=Math.floor(Math.random()*c[c.length-1]);return r[A(c,O)];default:return 1}},R={team1:"",team2:"",currentTeamBatting:"",onStrike:{batterIndex:-1},offStrike:{batterIndex:0},team1Stats:{},team2Stats:{},innings:0,team1Total:0,team2Total:0,team1Wickets:0,team2Wickets:0,gameover:!1,team1BallsFaced:0,team2BallsFaced:0},W=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SCORE":if(t.gameover)return t;var a,r,c,n,o=E(t.onStrike.batterIndex);return-1===o?t.currentTeamBatting===t.team1?Object(u.a)(Object(u.a)({},t),{},{offStrike:Object(u.a)(Object(u.a)({},t.offStrike),{},{batterIndex:t.onStrike.batterIndex}),onStrike:Object(u.a)(Object(u.a)({},t.onStrike),{},{batterIndex:t.onStrike.batterIndex>t.offStrike.batterIndex?t.onStrike.batterIndex+1:t.offStrike.batterIndex+1}),team1Wickets:t.onStrike.batterIndex>t.offStrike.batterIndex?t.onStrike.batterIndex+1:t.offStrike.batterIndex+1,team1BallsFaced:t.team1BallsFaced+1}):Object(u.a)(Object(u.a)({},t),{},{offStrike:Object(u.a)(Object(u.a)({},t.offStrike),{},{batterIndex:t.onStrike.batterIndex}),onStrike:Object(u.a)(Object(u.a)({},t.onStrike),{},{batterIndex:t.onStrike.batterIndex>t.offStrike.batterIndex?t.onStrike.batterIndex+1:t.offStrike.batterIndex+1}),team2Wickets:t.onStrike.batterIndex>t.offStrike.batterIndex?t.onStrike.batterIndex+1:t.offStrike.batterIndex+1,team2BallsFaced:t.team2BallsFaced+1}):o%2?t.currentTeamBatting===t.team1?Object(u.a)(Object(u.a)({},t),{},{team1Total:t.team1Total+o,team1Stats:Object(u.a)(Object(u.a)({},t.team1Stats),{},Object(P.a)({},t.onStrike.batterIndex,(null!==(a=t.team1Stats[t.onStrike.batterIndex])&&void 0!==a?a:0)+o)),team1BallsFaced:t.team1BallsFaced+1,onStrike:Object(u.a)(Object(u.a)({},t.onStrike),{},{batterIndex:t.offStrike.batterIndex}),offStrike:Object(u.a)(Object(u.a)({},t.offStrike),{},{batterIndex:t.onStrike.batterIndex})}):Object(u.a)(Object(u.a)({},t),{},{team2Total:t.team2Total+o,team2Stats:Object(u.a)(Object(u.a)({},t.team2Stats),{},Object(P.a)({},t.onStrike.batterIndex,(null!==(r=t.team2Stats[t.onStrike.batterIndex])&&void 0!==r?r:0)+o)),team2BallsFaced:t.team2BallsFaced+1,onStrike:Object(u.a)(Object(u.a)({},t.onStrike),{},{batterIndex:t.offStrike.batterIndex}),offStrike:Object(u.a)(Object(u.a)({},t.offStrike),{},{batterIndex:t.onStrike.batterIndex})}):t.currentTeamBatting===t.team1?Object(u.a)(Object(u.a)({},t),{},{team1Total:t.team1Total+o,team1Stats:Object(u.a)(Object(u.a)({},t.team1Stats),{},Object(P.a)({},t.onStrike.batterIndex,(null!==(c=t.team1Stats[t.onStrike.batterIndex])&&void 0!==c?c:0)+o)),team1BallsFaced:t.team1BallsFaced+1}):Object(u.a)(Object(u.a)({},t),{},{team2Total:t.team2Total+o,team2Stats:Object(u.a)(Object(u.a)({},t.team2Stats),{},Object(P.a)({},t.onStrike.batterIndex,(null!==(n=t.team2Stats[t.onStrike.batterIndex])&&void 0!==n?n:0)+o)),team2BallsFaced:t.team2BallsFaced+1});case"COMPLETE":return t.currentTeamBatting===t.team1?Object(u.a)(Object(u.a)({},t),{},{currentTeamBatting:t.team2,onStrike:{batterIndex:-1},offStrike:{batterIndex:0}}):t.currentTeamBatting!==t.team2||10!==t.team2Wickets&&300!==t.team2BallsFaced?t.currentTeamBatting===t.team2&&t.team2Total>t.team1Total?Object(u.a)(Object(u.a)({},t),{},{gameover:!0}):t:Object(u.a)(Object(u.a)({},t),{},{gameover:!0});case"RESET_STATE":return{team1:"",team2:"",currentTeamBatting:"",onStrike:{batterIndex:-1},offStrike:{batterIndex:0},team1Stats:{},team2Stats:{},innings:0,team1Total:0,team2Total:0,team1Wickets:0,team2Wickets:0,gameover:!1};case"PICK_TEAMS":return Object(u.a)(Object(u.a)({},t),{},{team1:e.payload.team1,team2:e.payload.team2,gameover:!1,currentTeamBatting:e.payload.team1,team1BallsFaced:0,team2BallsFaced:0});default:return t}},w={},J=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"PICK_TEAMS":return Object(u.a)(Object(u.a)({},w),{},{team1:e.payload.team1Name,team2:e.payload.team2Name,team1Stats:e.payload.team1Squad,team2Stats:e.payload.team2Squad});default:return t}},K={},L=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_FIRST":return t.team1!==e.payload.TEAM1?Object(u.a)(Object(u.a)({},K),{},{team1:t.team2,team2:t.team1,currentTeamBatting:t.team2,team1Stats:t.team2Stats,team2Stats:t.team1Stats,innings:1}):t;default:return t}},z={India:(v={},Object(P.a)(v,-1,"Rohit Sharma"),Object(P.a)(v,0,"Shikhar Dhawan"),Object(P.a)(v,1,"Virat Kohli"),Object(P.a)(v,2,"Shreyas Iyer"),Object(P.a)(v,3,"Rishabh Pant"),Object(P.a)(v,4,"KL Rahul"),Object(P.a)(v,5,"Hardik Pandya"),Object(P.a)(v,6,"Ravindra Jadeja"),Object(P.a)(v,7,"Bhuvneshwar Kumar"),Object(P.a)(v,8,"Shardul Thakur"),Object(P.a)(v,9,"Jasprit Bumrah"),Object(P.a)(v,10,"Yuzi Chahal"),v),Pakistan:(I={},Object(P.a)(I,-1,"Imam-ul-Haq"),Object(P.a)(I,0,"Fakhar Zaman"),Object(P.a)(I,1,"Babar Azam"),Object(P.a)(I,2,"Haider Ali"),Object(P.a)(I,3,"Mohammed Rizwan"),Object(P.a)(I,4,"Iftikhar Ahmed"),Object(P.a)(I,5,"Khushdil Shah"),Object(P.a)(I,6,"Wahab Riaz"),Object(P.a)(I,7,"Shaheen Afrid"),Object(P.a)(I,8,"Musa Khan"),Object(P.a)(I,9,"Muhammad Hasnain"),Object(P.a)(I,10,"Yasir Shah"),I),Australia:(T={},Object(P.a)(T,-1,"Aaron Finch"),Object(P.a)(T,0,"David Warner"),Object(P.a)(T,1,"Steve Smith"),Object(P.a)(T,2,"Marnus Labuschagne"),Object(P.a)(T,3,"Marcus Stoinis"),Object(P.a)(T,4,"Glenn Maxwell"),Object(P.a)(T,5,"Alex Carey"),Object(P.a)(T,6,"Pat Cummins"),Object(P.a)(T,7,"Mitchell Starc"),Object(P.a)(T,8,"Adam Zampa"),Object(P.a)(T,9,"Josh Hazelwood"),Object(P.a)(T,10,"Daniel Sams"),T),England:(B={},Object(P.a)(B,-1,"Jason Roy"),Object(P.a)(B,0,"Jonny Bairstow"),Object(P.a)(B,1,"Joe Root"),Object(P.a)(B,2,"Eoin Morgan"),Object(P.a)(B,3,"Ben Stokes"),Object(P.a)(B,4,"Jos Buttler"),Object(P.a)(B,5,"Chris Woakes"),Object(P.a)(B,6,"Liam Plunkett"),Object(P.a)(B,7,"Jofra Archer"),Object(P.a)(B,8,"Adil Rashid"),Object(P.a)(B,9,"Mark Wood"),Object(P.a)(B,10,"Sam Curran"),B),SouthAfrica:(M={},Object(P.a)(M,-1,"Quinton De Kock"),Object(P.a)(M,0,"Aiden Markram"),Object(P.a)(M,1,"Faf Du Plessis"),Object(P.a)(M,2,"R Van Der Dussen"),Object(P.a)(M,3,"David Miller"),Object(P.a)(M,4,"JP Duminy"),Object(P.a)(M,5,"Temba Bavuma"),Object(P.a)(M,6,"Andile Phehlukwayo"),Object(P.a)(M,7,"Chris Morris"),Object(P.a)(M,8,"Kagiso Rabada"),Object(P.a)(M,9,"Imran Tahir"),Object(P.a)(M,10,"Tabraiz Shamsi"),M)},H=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"GET_TEAM":default:return t}},N=Object(_.c)({manageScores:W,initPickTeams:J,setFirstTeams:L,getTeams:H}),Y=Object(_.d)(N,Object(_.a)(C.a)),q=a(108);var G=function(){return Object(c.useEffect)((function(){document.title="Cricket 2021"}),[]),Object(r.jsx)(j.a,{store:Y,children:Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(q.a,{position:"static",children:Object(r.jsx)("h2",{style:{alignSelf:"center"},children:"Cricket 2021"})}),Object(r.jsx)(F,{})]})})},V=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,113)).then((function(e){var a=e.getCLS,r=e.getFID,c=e.getFCP,n=e.getLCP,o=e.getTTFB;a(t),r(t),c(t),n(t),o(t)}))};s.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(G,{})}),document.getElementById("root")),V()}},[[67,1,2]]]);
//# sourceMappingURL=main.a157fb82.chunk.js.map