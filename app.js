(function(){
"use strict";
const BLUSH = (y,dx=8.8) => `<ellipse cx="${20-dx}" cy="${y}" rx="2.3" ry="1.4" fill="var(--blush)" opacity=".85"/><ellipse cx="${20+dx}" cy="${y}" rx="2.3" ry="1.4" fill="var(--blush)" opacity=".85"/>`;
const RICE = `<rect x="5" y="13" width="30" height="17.5" rx="8" fill="var(--rice)" stroke="var(--face,#2f2a36)" stroke-width="1.6"/>`;
const SALMON = `<path d="M3.5 12c0-4 3-6.5 8-6.5h17c5 0 8 2.5 8 6.5 0 2-1.5 3-3.5 3h-26C5 15 3.5 14 3.5 12z" fill="#f6896b" stroke="var(--face,#2f2a36)" stroke-width="1.6"/>`;
const SUSHI = {
  // 霖霖：炙燒鮭魚握壽司，瞇眼開心笑
  mom: RICE + SALMON + `<path d="M8.5 9.8c3-2 6.3-2.3 9.2-1.8s6.3.8 9.2-.1 4.6-.3 5.6.7" stroke="#8a3d1c" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".45"/><circle cx="12" cy="8.2" r="1" fill="#6e2f14" opacity=".55"/><circle cx="26" cy="7.6" r="1.1" fill="#6e2f14" opacity=".55"/><path d="M7.5 11l2.7-2.2 2.7 2.2 2.7-2.2 2.7 2.2 2.7-2.2 2.7 2.2 2.7-2.2 2.7 2.2 2.7-2.2" stroke="#fff6dc" stroke-width="1.3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`
     + `<path d="M12.6 21.6q2.2-2.6 4.4 0M23 21.6q2.2-2.6 4.4 0" stroke="var(--face,#2f2a36)" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17.3 23.8h5.4q-.3 3.4-2.7 3.4t-2.7-3.4z" fill="#d9536a" stroke="var(--face,#2f2a36)" stroke-width="1.1" stroke-linejoin="round"/>` + BLUSH(25),
  // 豪豪：鮭魚半熟蛋軍艦，戴眼鏡大笑
  dad: `<rect x="5" y="12.5" width="30" height="18" rx="5.5" fill="var(--nori)" stroke="var(--face,#2f2a36)" stroke-width="1.6"/><ellipse cx="20" cy="13.1" rx="14" ry="3" fill="var(--rice)" stroke="var(--face,#2f2a36)" stroke-width="1.2"/><rect x="6.5" y="7.5" width="9.5" height="6.5" rx="2.5" fill="#f6896b" stroke="var(--face,#2f2a36)" stroke-width="1.3" transform="rotate(-14 11.2 10.7)"/><rect x="24" y="7.5" width="9.5" height="6.5" rx="2.5" fill="#f6896b" stroke="var(--face,#2f2a36)" stroke-width="1.3" transform="rotate(12 28.7 10.7)"/><ellipse cx="20" cy="8.6" rx="7" ry="5.4" fill="#fffdf6" stroke="var(--face,#2f2a36)" stroke-width="1.4"/><circle cx="20" cy="9.1" r="3.3" fill="#f7a823"/><circle cx="19" cy="8.1" r="1" fill="#ffd27a"/>`
     + `<circle cx="14.6" cy="20.6" r="3" fill="none" stroke="var(--rice)" stroke-width="1.3"/><circle cx="25.4" cy="20.6" r="3" fill="none" stroke="var(--rice)" stroke-width="1.3"/><path d="M17.6 20.4q2.4-1 4.8 0" stroke="var(--rice)" stroke-width="1.2" fill="none"/><path d="M13.4 21q1.2-1.4 2.4 0M24.2 21q1.2-1.4 2.4 0" stroke="var(--rice)" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M16.4 24.2h7.2q-.2 4-3.6 4t-3.6-4z" fill="#d9536a" stroke="var(--rice)" stroke-width="1.1" stroke-linejoin="round"/><path d="M17.6 24.3h4.8v1.1h-4.8z" fill="#fff"/>` + BLUSH(25.2,10.5),
  // Sushi：鮭魚握壽司，亮晶晶大眼睛
  sushi: RICE + SALMON + `<path d="M10.5 7.5l3 6M18 6.5l3 7M25.5 6.5l3 7" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>`
     + `<circle cx="14.8" cy="21.6" r="2.2" fill="var(--face,#2f2a36)"/><circle cx="25.2" cy="21.6" r="2.2" fill="var(--face,#2f2a36)"/><circle cx="15.6" cy="20.8" r=".85" fill="#fff"/><circle cx="26" cy="20.8" r=".85" fill="#fff"/><circle cx="14.2" cy="22.5" r=".4" fill="#fff"/><circle cx="24.6" cy="22.5" r=".4" fill="#fff"/><path d="M18 24.4h4q-.2 2.6-2 2.6t-2-2.6z" fill="#d9536a" stroke="var(--face,#2f2a36)" stroke-width="1" stroke-linejoin="round"/>` + BLUSH(25)
};
const su = (k,w=40) => `<svg class="su" width="${w}" height="${Math.round(w*0.8)}" viewBox="0 0 40 32" aria-hidden="true">${SUSHI[k]||""}</svg>`;
function svgEl(k,w){ const t=document.createElement("template"); t.innerHTML=su(k,w); return t.content.firstChild; }

const CFG = Object.assign({CLIENT_ID:"",FAMILY_CAL:"",SUSHI_BORN:"2024-08-25",TIME_ZONE:"Asia/Taipei"}, window.SUSHI_CONFIG||{});
const API = "https://www.googleapis.com/calendar/v3";
const SCOPE = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly";
const M = { mom:{name:"霖霖"}, dad:{name:"豪豪"}, sushi:{name:"Sushi"} };
const NAME2KEY = {"霖霖":"mom","豪豪":"dad","Sushi":"sushi","媽媽":"mom","爸爸":"dad"};
const ALL3 = ["mom","dad","sushi"];
const famIfSushi = ms => ms; // Sushi 可以只跟霖霖或豪豪
const MEMBER_RULES=[[/美育|哈樂|蹦蹦跳|疫苗|預防針|出遊|旅遊|旅行|露營|民宿|野餐|動物園/, ALL3],[/籃球|🏀/, ["dad"]]];
function membersFor(title){ const t=String(title||""); for(const [re,ms] of MEMBER_RULES) if(re.test(t)) return ms.slice(); return null; }
const REP = {weekly:"每週",biweekly:"每兩週",every4w:"每四週",monthly:"每月",yearly:"每年"};
const RRULE = {weekly:"RRULE:FREQ=WEEKLY",biweekly:"RRULE:FREQ=WEEKLY;INTERVAL=2",every4w:"RRULE:FREQ=WEEKLY;INTERVAL=4",monthly:"RRULE:FREQ=MONTHLY",yearly:"RRULE:FREQ=YEARLY"};
const REMIND_TIMED = [[-1,"不提醒"],[0,"準時"],[10,"10 分鐘前"],[30,"30 分鐘前"],[60,"1 小時前"],[1440,"前一天"]];
const REMIND_ALLDAY = [[-1,"不提醒"],[240,"前一天晚上 8 點"],[720,"前一天中午 12 點"],[900,"前一天早上 9 點"]];
const remindLabel = (m,allDay) => { const l=(allDay?REMIND_ALLDAY:REMIND_TIMED).find(x=>x[0]===m); return l?l[1]:""; };
const COLORS=[["salmon","鮭魚橘","6"],["tuna","鮪魚紅","11"],["egg","玉子黃","5"],["cucumber","小黃瓜綠","2"],["nori","海苔綠","10"],["ebi","甜蝦粉","4"],["tako","章魚紫","3"],["sea","海水藍","7"],["soy","醬油棕","8"],["wasabi","芥末綠","2"]];
const CK=COLORS.map(c=>c[0]);
const DEFAULT_TPL=[
  {id:"meiyu",title:"美育",weekday:0,allDay:false,start:"09:00",end:"10:00",repeat:"weekly",members:ALL3},
  {id:"hale",title:"哈樂維",weekday:0,allDay:false,start:"11:30",end:"12:30",repeat:"weekly",members:ALL3},
  {id:"beng",title:"蹦蹦跳",weekday:6,allDay:false,start:"10:00",end:"11:00",repeat:"weekly",members:ALL3},
  {id:"tutor",title:"老公家教",weekday:3,allDay:true,start:"",end:"",repeat:"weekly",members:["dad"]},
  {id:"ball",title:"籃球 🏀",weekday:6,allDay:false,start:"20:00",end:"22:00",repeat:"weekly",members:["dad"]},
  {id:"chiro",title:"整脊",weekday:6,allDay:false,start:"09:00",end:"10:00",repeat:"every4w",members:["mom"]},
  {id:"pta",title:"媽教導會",weekday:4,allDay:true,start:"",end:"",repeat:"biweekly",members:["mom"]},
  {id:"tcm",title:"中醫",weekday:2,allDay:false,start:"18:00",end:"19:00",repeat:"none",members:["mom"]},
  {id:"vac",title:"打預防針",weekday:"",allDay:false,start:"10:00",end:"11:00",repeat:"none",members:ALL3}
];

const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2,"0");
const keyOf = d => d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const parse = k => { const [y,m,d]=k.split("-").map(Number); return new Date(y,m-1,d); };
const addDays = (k,n) => { const d=parse(k); d.setDate(d.getDate()+n); return keyOf(d); };
const WD = ["日","一","二","三","四","五","六"];
const store = { get(k,f){try{const v=localStorage.getItem(k);return v==null?f:JSON.parse(v)}catch(e){return f}}, set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}, del(k){try{localStorage.removeItem(k)}catch(e){}} };
const cleanTitle = t => String(t||"").replace(/^\s*\d{1,2}[:：]\d{2}\s*/,"").replace(/[\p{Extended_Pictographic}️‍]/gu,"").trim() || String(t||"");
const norm = s => String(s||"").replace(/\s/g,"").toLowerCase();

let me = store.get("sc.me","mom");
let filter = store.get("sc.filter2",["mom","dad","sushi"]);
const now = new Date();
let view = new Date(now.getFullYear(), now.getMonth(), 1);
let sel = keyOf(now);
let famEvents = [], mineEvents = [], famCal = CFG.FAMILY_CAL || null;
let templates = store.get("sc.tpl", null) || DEFAULT_TPL.slice();
templates.forEach(t=>{ if(t && t.title==="哈樂") t.title="哈樂維"; });
let titleColors = store.get("sc.titleColors",{});
let editing = null, draftWho = [], manageTpl = false, moveFrom = null, dupOK = false, saving = false, whoTouched = false;
let pickDates = new Set(), pickView = new Date(now.getFullYear(), now.getMonth(), 1);
let pickedColor=null, colorTouched=false;

/* ---------------- auth (redirect flow, works in home-screen apps) ---------------- */
const redirectUri = () => location.origin + location.pathname;
function tokenValid(){ const t=store.get("sc.token",null); return t && t.exp > Date.now()+60000 ? t.access : null; }
function login(silent){
  if(!CFG.CLIENT_ID){ showSetup(); return; }
  const state=Math.random().toString(36).slice(2); store.set("sc.state",state);
  const p=new URLSearchParams({client_id:CFG.CLIENT_ID, redirect_uri:redirectUri(), response_type:"token", scope:SCOPE, include_granted_scopes:"true", state});
  const hint=store.get("sc.email",null); if(hint) p.set("login_hint",hint);
  if(silent) p.set("prompt","none");
  location.href="https://accounts.google.com/o/oauth2/v2/auth?"+p.toString();
}
function readRedirect(){
  if(!location.hash || location.hash.length<2) return null;
  const h=new URLSearchParams(location.hash.slice(1));
  if(!h.get("access_token") && !h.get("error")) return null;
  history.replaceState(null,"",location.pathname+location.search);
  if(h.get("state")!==store.get("sc.state",null)) return {error:"state"};
  if(h.get("error")) return {error:h.get("error")};
  store.set("sc.token",{access:h.get("access_token"), exp: Date.now()+Number(h.get("expires_in")||3600)*1000});
  store.set("sc.loggedIn",true);
  return {ok:true};
}
async function api(path, opts={}){
  const tok=tokenValid();
  if(!tok){ needLogin(); throw {code:"auth"}; }
  const r=await fetch(API+path,{ method:opts.method||"GET", headers:Object.assign({Authorization:"Bearer "+tok},opts.body?{"Content-Type":"application/json"}:{}), body:opts.body?JSON.stringify(opts.body):undefined });
  if(r.status===401){ store.del("sc.token"); needLogin(); throw {code:"auth"}; }
  if(r.status===204) return null;
  const j=await r.json().catch(()=>null);
  if(!r.ok) throw {code:r.status, message:(j&&j.error&&j.error.message)||r.statusText};
  return j;
}
function needLogin(){
  if(store.get("sc.loggedIn",false) && !sessionStorage.getItem("sc.silentTried")){ sessionStorage.setItem("sc.silentTried","1"); login(true); return; }
  showLogin();
}

/* ---------------- screens ---------------- */
function showSetup(){ $("setup").hidden=false; $("login").hidden=true; $("main").hidden=true; $("fab").hidden=true; }
function showLogin(msg){ $("login").hidden=false; $("main").hidden=true; $("fab").hidden=true; $("setup").hidden=true;
  const lp=$("login-pic"); lp.textContent=""; ["mom","sushi","dad"].forEach(k=>lp.append(svgEl(k,52)));
  if(msg){ $("login-err").textContent=msg; $("login-err").hidden=false; } }
function showMain(){ $("login").hidden=true; $("setup").hidden=true; $("main").hidden=false; $("main").style.display="flex"; $("fab").hidden=false; }
$("login-btn").onclick=()=>{ sessionStorage.removeItem("sc.silentTried"); login(false); };
$("logout").onclick=()=>{ const t=tokenValid(); if(t) fetch("https://oauth2.googleapis.com/revoke?token="+encodeURIComponent(t),{method:"POST"}).catch(()=>{}); store.del("sc.token"); store.del("sc.loggedIn"); store.del("sc.cache"); famEvents=[]; mineEvents=[]; showLogin(); };

/* ---------------- Google event mapping ---------------- */
function parseMembers(e){
  const sh=e.extendedProperties&&e.extendedProperties.shared||{};
  if(sh.members) return sh.members.split(",").filter(m=>M[m]);
  const d=String(e.description||""); const m=d.match(/家人：([^\n（(]+)/);
  if(m){ const ks=m[1].split(/[、,，\s]+/).map(n=>NAME2KEY[n.trim()]).filter(Boolean); if(ks.length) return [...new Set(ks)]; }
  return membersFor(e.summary)||ALL3.slice();
}
function cleanNote(d){ return String(d||"").replace(/<[^>]+>/g,"").split("\n").filter(l=>!/^家人：/.test(l) && !/由 Sushi 家/.test(l)).join("\n").trim(); }
function mapEvent(e, src){
  if(!e || e.status==="cancelled") return null;
  const s=e.start||{}, en=e.end||{}, sh=(e.extendedProperties&&e.extendedProperties.shared)||{};
  const base={ id:e.id, base:e.recurringEventId||"", src, title:e.summary||"（無標題）", link:e.htmlLink, colorKey: CK.includes(sh.color)?sh.color:"", kind:sh.kind||"", born:sh.born||"",
    members: src==="fam"?famIfSushi(parseMembers(e)):[], note:cleanNote(e.description), remind: e.reminders&&e.reminders.overrides&&e.reminders.overrides.length ? e.reminders.overrides[0].minutes : (e.reminders&&e.reminders.useDefault===false?-1:null) };
  if(s.date){ const sk=String(s.date).slice(0,10), ek0=String(en.date||s.date).slice(0,10); return Object.assign(base,{allDay:true,startK:sk,endK: ek0>sk?addDays(ek0,-1):sk, start:"", end:""}); }
  const sd=String(s.dateTime||""), ed=String(en.dateTime||sd); if(!/^\d{4}-\d{2}-\d{2}/.test(sd)) return null;
  return Object.assign(base,{allDay:false,startK:sd.slice(0,10),endK:(ed.slice(0,10)<sd.slice(0,10)?sd:ed).slice(0,10),start:sd.slice(11,16),end:ed.slice(11,16)});
}
function monthsBetween(bornK,k){ const a=parse(bornK), b=parse(k); return (b.getFullYear()-a.getFullYear())*12 + (b.getMonth()-a.getMonth()); }
function isMonthsary(e){ return e.kind==="monthsary" || (/滿月/.test(e.title) && /sushi/i.test(e.title)); }
function isSushiBday(e){ return (e.kind==="birthday" && e.born) || (/sushi/i.test(e.title) && /生日/.test(e.title)); }
function titleOn(e,k){
  const born=e.born||CFG.SUSHI_BORN;
  if(isMonthsary(e)){ const n=monthsBetween(born,k); if(n<=0) return e.title; const y=Math.floor(n/12), m=n%12; return "Sushi "+(y ? y+" 歲"+(m?" "+m+" 個月":"") : "滿 "+m+" 個月"); }
  if(isSushiBday(e)){ const y=parse(k).getFullYear()-parse(born).getFullYear(); return y>0 ? cleanTitle(e.title)+"（"+y+" 歲）" : e.title; }
  return e.title;
}
const icon = e => isMonthsary(e)?"🎉 ":(/生日/.test(e.title)?"🎂 ":"");
const isBirthdayOther = e => /生日/.test(e.title) && !/^(霖霖|豪豪|sushi)/i.test(cleanTitle(e.title));

/* ---------------- colors ---------------- */
const colorKey = t => norm(cleanTitle(t));
function hashColor(t){ const k=colorKey(t); let h=0; for(const ch of k) h=(h*31+ch.codePointAt(0))>>>0; return CK[h%CK.length]; }
function colorOf(e){ if(e.colorKey && CK.includes(e.colorKey)) return e.colorKey; if(e.color && CK.includes(e.color)) return e.color; const tc=titleColors[colorKey(e.title)]; if(tc && CK.includes(tc)) return tc; return hashColor(e.title); }
function defaultColor(title){ const tc=titleColors[colorKey(title)]; return tc && CK.includes(tc) ? tc : hashColor(title); }

/* ---------------- filtering ---------------- */
const people = () => filter.filter(x=>M[x]);
const isSolo = k => { const p=people(); return p.length===1 && p[0]===k; };
function visible(e){ const w=e.members&&e.members.length?e.members:ALL3; return w.some(m=>filter.includes(m)); }
const byTime = (x,y)=> (x.allDay===y.allDay ? (x.start||"").localeCompare(y.start||"") : (x.allDay?-1:1));
const onDay = (e,k) => k>=e.startK && k<=e.endK;
function famOn(k){
  if(people().length===0 && filter.includes("g")) return famEvents.filter(e=>onDay(e,k) && (e.members||[]).includes(me)).sort(byTime); // 「Google」畫面：也顯示有我的家庭行程
  return famEvents.filter(e=>onDay(e,k) && visible(e)).sort(byTime); }
function mineOn(k){
  if(!filter.includes("g")) return [];
  const fam=famOn(k).map(e=>norm(cleanTitle(e.title)));
  return mineEvents.filter(e=>onDay(e,k) && !isBirthdayOther(e) && !fam.some(t=>t && (norm(cleanTitle(e.title)).includes(t)||t.includes(norm(cleanTitle(e.title)))))).sort(byTime);
}
function setPeople(list){ filter = list.slice(); applyFilter(); }
function applyFilter(){ store.set("sc.filter2",filter); const pp=people(); renderMe(pp.length===1?pp[0]:null); renderFilters(); renderMonth(); renderAgenda(); applySolo(); }

/* ---------------- render ---------------- */
function applySolo(){
  const A=["mom","dad","sushi"], pp=people(), g=filter.includes("g");
  const k=pp.length===1?pp[0]:(pp.length===3?"all":(pp.length===0&&g?"g":null));
  if(k) document.body.dataset.solo=k; else delete document.body.dataset.solo;
  $("solobar").hidden=!k;
  const ic=$("solo-ic"); ic.textContent=""; ic.classList.toggle("trio",k==="all");
  const back=$("solo-back"), nm=$("solo-name"), sb=$("solo-sub"); back.hidden=false;
  const go=list=>{ filter=list; applyFilter(); };
  if(k==="g"){ const gb=document.createElement("span"); gb.className="gbig"; gb.textContent="G"; ic.append(gb);
    nm.textContent="我的 Google 行事曆"; sb.textContent="你自己的 Google 日曆，加上有你的家庭行程"; back.textContent="加上全家"; back.onclick=()=>go(A.concat("g")); }
  else if(k==="all"){ ["mom","sushi","dad"].forEach(m=>ic.append(svgEl(m,38)));
    if(g){ nm.textContent="全家 ＋ 我的 Google"; sb.textContent="全家的行程，加上你自己的 Google 行程"; back.textContent="只看全家"; back.onclick=()=>go(A.slice()); }
    else { nm.textContent="全家的行事曆"; sb.textContent="霖霖、豪豪和 Sushi 的行程都在這裡"; back.hidden=true; } }
  else if(k){ ic.append(svgEl(k,56)); const n=M[k].name;
    nm.textContent=g? n+" ＋ 我的 Google" : n+"的行事曆"; sb.textContent=g? "有"+n+"的行程，加上你自己的 Google 行程" : "只顯示有"+n+"的行程";
    back.textContent="回到全家"; back.onclick=()=>go(A.slice()); }
  if(k && k!=="g" && g){ const gb=document.createElement("span"); gb.className="gbadge"; gb.textContent="G"; ic.append(gb); }
  const meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.content=getComputedStyle(document.body).backgroundColor;
}
function renderFilters(){
  const f=$("filters"); f.textContent="";
  const allBtn=document.createElement("button"); allBtn.type="button"; allBtn.className="chip"; allBtn.id="flt-all"; allBtn.dataset.m="all";
  allBtn.setAttribute("aria-pressed", people().length===3); allBtn.textContent="全家"; allBtn.style.paddingLeft="14px";
  allBtn.onclick=()=>setPeople(ALL3.slice()); f.append(allBtn);
  Object.entries(M).concat([["g",{name:"我的 Google"}]]).forEach(([k,v])=>{
    const b=document.createElement("button"); b.type="button"; b.className="chip"; b.dataset.m=k; b.id="flt-"+k;
    b.setAttribute("aria-pressed", k==="g" ? filter.includes("g") : (isSolo(k) && !filter.includes("g")));
    const i=document.createElement("span"); i.className="ic"+(k==="g"?" g":""); if(k==="g") i.textContent="G"; else i.append(svgEl(k,26));
    const s=document.createElement("span"); s.textContent=v.name; b.append(i,s);
    b.onclick=()=>{ if(k==="g"){ filter = (people().length===0 && filter.includes("g")) ? ["mom","dad","sushi"] : ["g"]; applyFilter(); } else setPeople(isSolo(k) ? ALL3.slice() : [k]); };
    f.append(b);
  });
}
function renderMe(hop){
  document.querySelectorAll("[data-me]").forEach(b=>b.setAttribute("aria-pressed", b.dataset.me===me));
  const c=$("crew"); c.textContent=""; c.classList.toggle("solo", people().length===1);
  if(!renderMe.done){ c.classList.add("intro"); renderMe.done=true; setTimeout(()=>c.classList.remove("intro"),900); }
  Object.entries(M).forEach(([k,v])=>{ const d=document.createElement("button"); d.type="button"; d.className="mate"+(hop===k?" hop":""); d.id="mate-"+k;
    d.setAttribute("aria-pressed", isSolo(k)); d.setAttribute("aria-label", isSolo(k) ? "回到看全家的行程" : "只看"+v.name+"的行程");
    d.append(svgEl(k,48)); const s=document.createElement("span"); s.textContent=v.name; d.append(s);
    d.onclick=()=>setPeople(isSolo(k) ? ALL3.slice() : [k]); c.append(d); });
}
function gridRange(){
  const y=view.getFullYear(), m=view.getMonth(), first=new Date(y,m,1);
  const start=new Date(y,m,1-first.getDay());
  const weeks=Math.ceil((first.getDay()+new Date(y,m+1,0).getDate())/7);
  return {start:keyOf(start), days:weeks*7, end:addDays(keyOf(start),weeks*7)};
}
function renderMonth(){
  const y=view.getFullYear(), m=view.getMonth(), pp=people();
  const who = pp.length===1 ? "<em class=\"whoname\">"+M[pp[0]].name+"的</em>" : "";
  $("mtitle").innerHTML=who+(m+1)+"<em>月</em><small>"+y+"</small>";
  const g=$("grid"); g.textContent="";
  const r=gridRange(), todayK=keyOf(new Date());
  for(let i=0;i<r.days;i++){
    const k=addDays(r.start,i), d=parse(k);
    const b=document.createElement("button"); b.type="button"; b.className="day";
    if(d.getMonth()!==m) b.classList.add("other");
    if(d.getDay()===0||d.getDay()===6) b.classList.add("wkend");
    if(k===todayK) b.classList.add("today");
    if(k===sel) b.classList.add("sel");
    b.setAttribute("aria-label",(d.getMonth()+1)+"月"+d.getDate()+"日");
    const n=document.createElement("span"); n.className="n"; n.textContent=d.getDate(); b.append(n);
    const list=famOn(k).map(e=>({t:titleOn(e,k),c:"c-"+colorOf(e)})).concat(mineOn(k).map(e=>({t:e.title,c:"g"})));
    if(list.length){
      const bars=document.createElement("span"); bars.className="bars";
      list.slice(0,3).forEach(e=>{ const t=document.createElement("b"); t.className=e.c; t.textContent=e.t; bars.append(t); });
      b.append(bars);
      if(list.length>3){ const mo=document.createElement("span"); mo.className="more"; mo.textContent="+"+(list.length-3); b.append(mo); }
    }
    b.onclick=()=>{ sel=k; if(d.getMonth()!==m){ view=new Date(d.getFullYear(),d.getMonth(),1); load(); } renderMonth(); renderAgenda(); };
    g.append(b);
  }
}
function timeCell(ev){
  const t=document.createElement("div"); t.className="time"; const s=document.createElement("strong");
  if(ev.allDay){ s.textContent="整天"; t.append(s); } else { s.textContent=ev.start||""; t.append(s, document.createTextNode(ev.end||"")); }
  return t;
}
function whoIcons(e,w=34){ const box=document.createElement("div"); box.className="who-ic"; const ms=(e.members||[]).filter(m=>M[m]); (ms.length?ms:ALL3).slice(0,3).forEach(m=>box.append(svgEl(m,w))); return box; }
function renderAgenda(){
  const a=$("agenda"); a.textContent="";
  const d=parse(sel);
  const h=document.createElement("h2"); h.textContent=(d.getMonth()+1)+" 月 "+d.getDate()+" 日";
  const sm=document.createElement("small"); sm.textContent="星期"+WD[d.getDay()]+(sel===keyOf(new Date())?"・今天":""); h.append(sm); a.append(h);
  const pp=people(); if(pp.length===1){ const hn=document.createElement("p"); hn.className="solohint"; hn.textContent="只顯示有"+M[pp[0]].name+"的行程（包含全家一起的）"; a.append(hn); }
  const list=famOn(sel), ml=mineOn(sel);
  if(!list.length){
    const e=document.createElement("div"); e.className="empty";
    const s=document.createElement("strong"); s.textContent="這天沒有家庭行程";
    const pic=document.createElement("div"); pic.style.display="flex"; pic.style.gap="6px"; ["mom","sushi","dad"].forEach(m=>pic.append(svgEl(m,38)));
    e.append(pic, s, document.createTextNode(ml.length ? "下面「我的 Google」的行程按「加入家庭」就能放進來。" : "按右下角的 + 新增。"));
    a.append(e);
  }
  list.forEach(ev=>{
    const b=document.createElement("button"); b.type="button"; b.className="ev famcard cl-"+colorOf(ev);
    const body=document.createElement("div"); body.className="body";
    const ti=document.createElement("div"); ti.className="title"; ti.textContent=icon(ev)+titleOn(ev,sel); body.append(ti);
    const meta=document.createElement("div"); meta.className="meta";
    (ev.members||[]).forEach(mm=>{ if(!M[mm]) return; const tg=document.createElement("span"); tg.className="tag "+mm; tg.textContent=M[mm].name; meta.append(tg); });
    if(ev.base){ const r=document.createElement("span"); r.textContent="↻ 重複"; meta.append(r); }
    if(ev.remind!=null && ev.remind>=0){ const r=document.createElement("span"); r.textContent="⏰ "+(remindLabel(ev.remind,ev.allDay)||ev.remind+" 分鐘前"); meta.append(r); }
    body.append(meta);
    if(ev.note){ const no=document.createElement("div"); no.className="meta"; no.textContent=ev.note; body.append(no); }
    b.append(whoIcons(ev),timeCell(ev),body);
    a.append(swipeRow(b, ev));
  });
  if(ml.length){ const h4=document.createElement("h4"); h4.textContent="我的 Google（只有你看得到）"; a.append(h4); ml.forEach(ev=>a.append(gCard(ev))); }
}
function gCard(ev){
  const wrap=document.createElement("div"); wrap.className="evwrap";
  const el=document.createElement(ev.link?"a":"div"); el.className="ev g";
  if(ev.link){ el.href=ev.link; el.target="_blank"; el.rel="noopener"; }
  const st=document.createElement("span"); st.className="gdot";
  const body=document.createElement("div"); body.className="body";
  const ti=document.createElement("div"); ti.className="title"; ti.textContent=ev.title;
  const meta=document.createElement("div"); meta.className="meta";
  const tg=document.createElement("span"); tg.className="tag g"; tg.textContent="我的 Google"; meta.append(tg);
  if(ev.base){ const r=document.createElement("span"); r.textContent="↻ 重複"; meta.append(r); }
  body.append(ti,meta); el.append(st,timeCell(ev),body);
  const add=document.createElement("button"); add.type="button"; add.className="addbtn"; add.textContent="加入家庭";
  add.setAttribute("aria-label","把我的「"+ev.title+"」移到家庭行事曆");
  add.onclick=()=>{ moveFrom=ev; openSheet(null,{ title:cleanTitle(ev.title), date:ev.startK, endDate: ev.endK>ev.startK?ev.endK:"", allDay:ev.allDay, start:ev.start, end:ev.end, members:membersFor(ev.title)||[me], repeat:"none", remind:ev.remind }); };
  wrap.append(el,add); return wrap;
}
function renderAll(){ applySolo(); renderMe(); renderFilters(); renderMonth(); renderAgenda(); }

/* ---------------- swipe to delete ---------------- */
let openSwipe=null;
function closeSwipe(){ if(openSwipe){ openSwipe.querySelector(".ev").style.transform=""; openSwipe.classList.remove("open"); openSwipe=null; } }
function swipeRow(card, ev){
  const w=document.createElement("div"); w.className="swipe";
  const del=document.createElement("button"); del.type="button"; del.className="swdel"; del.textContent="刪除"; del.tabIndex=-1;
  del.setAttribute("aria-label","刪除「"+ev.title+"」");
  del.onclick=()=>{ openSheet(ev); askDelete(); };
  w.append(del,card);
  let x0=null,y0=null,dx=0,base=0,horiz=null,moved=false;
  card.addEventListener("pointerdown",e=>{ if(e.pointerType==="mouse" && e.button!==0) return; x0=e.clientX; y0=e.clientY; dx=0; horiz=null; moved=false; base=(openSwipe===w)?-92:0; if(openSwipe && openSwipe!==w) closeSwipe(); });
  card.addEventListener("pointermove",e=>{
    if(x0==null) return; const mx=e.clientX-x0, my=e.clientY-y0;
    if(horiz===null && (Math.abs(mx)>8||Math.abs(my)>8)) horiz=Math.abs(mx)>Math.abs(my);
    if(!horiz) return; moved=true; w.classList.add("dragging"); try{ card.setPointerCapture(e.pointerId); }catch(_){}
    dx=Math.max(-110,Math.min(0,base+mx)); card.style.transform="translateX("+dx+"px)";
  });
  const end=()=>{ if(x0==null) return; x0=null; w.classList.remove("dragging"); if(!moved) return;
    if(dx<-46){ card.style.transform="translateX(-92px)"; w.classList.add("open"); openSwipe=w; del.tabIndex=0; }
    else { card.style.transform=""; w.classList.remove("open"); if(openSwipe===w) openSwipe=null; del.tabIndex=-1; } };
  card.addEventListener("pointerup",end); card.addEventListener("pointercancel",end);
  card.addEventListener("click",e=>{ if(moved){ e.preventDefault(); moved=false; return; } if(openSwipe===w){ closeSwipe(); return; } openSheet(ev); });
  return w;
}
document.addEventListener("pointerdown",e=>{ if(openSwipe && !openSwipe.contains(e.target)) closeSwipe(); });

/* ---------------- data loading ---------------- */
let loadSeq=0;
/* 用哪個 Google 帳號登入，就自動切換成誰（只存 email 的雜湊，不把 email 放在程式碼裡） */
const WHO_BY_HASH = {
  "2476e569711a1e900184509141dc05dc52d6b7c648f475803a78605ac357a4b5":"mom",
  "02af08ae84ffa39fa1ee6e257d4b1e4527c03572e763bafffd7f0abdd0561e5b":"dad"
};
async function autoMe(email){
  try{
    const buf=await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(email).trim().toLowerCase()));
    const h=[...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
    const who=WHO_BY_HASH[h]; if(!who) return;
    const changed = who!==me || store.get("sc.meAuto","")!==h;
    me=who; store.set("sc.me",me); store.set("sc.meAuto",h);
    const pp=people(); renderMe(pp.length===1?pp[0]:null);
    if(changed) toast("嗨 "+M[me].name+"！已經幫你切換好了");
  }catch(e){}
}
async function findFamilyCal(){
  try{
    const r=await api("/users/me/calendarList?maxResults=250");
    const items=(r&&r.items)||[];
    const prim=items.find(c=>c.primary); if(prim){ store.set("sc.email",prim.id); autoMe(prim.id); }
    const byId=items.find(c=>c.id===CFG.FAMILY_CAL);
    const byName=items.find(c=>c.summary==="家庭") || items.find(c=>/^family\d+@group/.test(c.id));
    famCal=(byId||byName||{}).id || CFG.FAMILY_CAL || null;
  }catch(e){ if(e.code==="auth") throw e; famCal=CFG.FAMILY_CAL||null; }
}
async function listAll(cal, tmin, tmax){
  let out=[], token="";
  for(let i=0;i<5;i++){
    const q=new URLSearchParams({singleEvents:"true",orderBy:"startTime",timeMin:tmin,timeMax:tmax,maxResults:"2500",timeZone:CFG.TIME_ZONE});
    if(token) q.set("pageToken",token);
    const r=await api("/calendars/"+encodeURIComponent(cal)+"/events?"+q.toString());
    out=out.concat((r&&r.items)||[]); token=r&&r.nextPageToken; if(!token) break;
  }
  return out;
}
function isoAt(k){ return k+"T00:00:00+08:00"; }
async function load(){
  const seq=++loadSeq, r=gridRange();
  document.body.classList.add("loading");
  try{
    if(!autoMe.done){ autoMe.done=true; api("/calendars/primary").then(c=>{ if(c&&c.id){ store.set("sc.email",c.id); autoMe(c.id); } }).catch(()=>{ autoMe.done=false; }); }
    if(!famCal) await findFamilyCal();
    const [fam, mine] = await Promise.all([
      famCal ? listAll(famCal, isoAt(r.start), isoAt(r.end)) : Promise.resolve([]),
      listAll("primary", isoAt(r.start), isoAt(r.end)).catch(()=>[])
    ]);
    if(seq!==loadSeq) return;
    famEvents=fam.map(e=>mapEvent(e,"fam")).filter(Boolean);
    mineEvents=mine.map(e=>mapEvent(e,"mine")).filter(Boolean);
    store.set("sc.cache",{key:r.start,fam:famEvents,mine:mineEvents,at:Date.now()});
    const t=new Date(); $("synced").textContent="已同步 "+pad(t.getHours())+":"+pad(t.getMinutes());
    $("gstate").hidden=true;
    showMain(); renderMonth(); renderAgenda();
  }catch(e){
    if(e.code==="auth") return;
    const el=$("gstate"); el.textContent= e.code===404 ? "找不到 Google「家庭」日曆。請確認這個 Google 帳號在你們的家庭群組裡。" : "暫時連不上 Google，先顯示上次的資料。"; el.hidden=false;
  }finally{ if(seq===loadSeq) document.body.classList.remove("loading"); }
}

/* ---------------- Google write ---------------- */
function plus1h(t){ const [h,m]=t.split(":").map(Number); return h>=23 ? "23:59" : pad(h+1)+":"+pad(m); }
function bodyFor(d){
  const multi = d.repeat==="none" && d.endDate && d.endDate>d.date;
  let start,end;
  if(d.allDay){ start={date:d.date}; end={date:addDays(multi?d.endDate:d.date,1)}; }
  else { const ed=multi?d.endDate:d.date; let et=d.end||plus1h(d.start); if(ed===d.date && et<=d.start) et=plus1h(d.start);
    start={dateTime:d.date+"T"+d.start+":00",timeZone:CFG.TIME_ZONE}; end={dateTime:ed+"T"+et+":00",timeZone:CFG.TIME_ZONE}; }
  const names=d.members.filter(m=>M[m]).map(m=>M[m].name).join("、");
  const b={ summary:d.title, start, end, description:"家人："+names+(d.note?"\n"+d.note:"")+"\n（由 Sushi 家 app 新增）",
    colorId:(COLORS.find(c=>c[0]===(d.color||defaultColor(d.title)))||[0,0,"10"])[2],
    reminders: d.remind>=0 ? {useDefault:false, overrides:[{method:"popup",minutes:d.remind}]} : {useDefault:false, overrides:[]},
    extendedProperties:{shared:{members:d.members.join(","), color:d.color||"", app:"sushi"}} };
  b.recurrence = RRULE[d.repeat] ? [RRULE[d.repeat]] : [];
  return b;
}
const calPath = (cal,id) => "/calendars/"+encodeURIComponent(cal)+"/events"+(id?"/"+encodeURIComponent(id):"");
function why(e){
  if(e && e.code===403) return "這個 Google 帳號沒有「家庭」日曆的編輯權限";
  if(e && e.code===404) return "Google 找不到這個行程，可能已經被刪除";
  if(e && e.code==="auth") return "需要重新登入 Google";
  return "連不上 Google，請檢查網路後再試一次";
}

/* ---------------- sheet ---------------- */
function renderWho(){
  const w=$("f-who"); w.textContent="";
  Object.entries(M).forEach(([k,v])=>{
    const b=document.createElement("button"); b.type="button"; b.dataset.m=k; b.id="who-"+k; b.append(svgEl(k,30), document.createTextNode(v.name));
    b.setAttribute("aria-pressed", draftWho.includes(k));
    b.onclick=()=>{ whoTouched=true;
      draftWho = draftWho.includes(k)? draftWho.filter(x=>x!==k) : draftWho.concat(k); b.setAttribute("aria-pressed", draftWho.includes(k)); };
    w.append(b);
  });
}
const isAllDay = () => $("f-allday").getAttribute("aria-checked")==="true";
function setAllDay(on, remind){
  $("f-allday").setAttribute("aria-checked",on); $("timerow").hidden=on;
  const opts=on?REMIND_ALLDAY:REMIND_TIMED, s=$("f-remind"), cur = remind!=null ? Number(remind) : Number(s.value);
  s.textContent=""; opts.forEach(([v,l])=>{ const o=document.createElement("option"); o.value=v; o.textContent=l; s.append(o); });
  s.value = opts.some(o=>o[0]===cur) ? cur : (on?240:30);
}
function renderColors(){
  const box=$("f-colors"); box.textContent="";
  const cur = pickedColor || defaultColor($("f-title").value);
  COLORS.forEach(([k,name])=>{ const b=document.createElement("button"); b.type="button"; b.className="sw c-"+k; b.id="col-"+k;
    b.setAttribute("role","radio"); b.setAttribute("aria-checked",k===cur); b.setAttribute("aria-label",name); if(k===cur) b.textContent="✓";
    b.onclick=()=>{ pickedColor=k; colorTouched=true; renderColors(); }; box.append(b); });
  const t=$("f-title").value.trim();
  $("f-colorall-row").hidden = !colorTouched || !t;
  $("f-colorall-txt").textContent = "以後新的「"+cleanTitle(t)+"」都用這個顏色";
}
function openSheet(ev, prefill){
  editing = ev || null;
  const p = ev ? {title:ev.title,date:ev.startK,endDate:ev.endK>ev.startK?ev.endK:"",allDay:ev.allDay,start:ev.start,end:ev.end,members:ev.members,remind:ev.remind,note:ev.note,repeat:"none"} : (prefill||{});
  $("sheet-title").textContent = ev ? "編輯行程" : (moveFrom ? "加入家庭行事曆" : "新增行程");
  $("tplbox").hidden = !!ev || !!moveFrom;
  manageTpl=false; renderTpls();
  $("f-title").value = p.title || "";
  $("f-date").value = p.date || sel; $("f-end").value = p.endDate || "";
  $("f-start").value = p.start || "09:00"; $("f-stop").value = p.end || "10:00";
  $("f-repeat").value = REP[p.repeat] ? p.repeat : "none";
  $("f-repeat").disabled = !!(ev && ev.base);
  $("f-repeat").querySelector('option[value="pick"]').disabled = !!ev;
  pickDates=new Set(); syncPickUI();
  pickedColor = ev ? (ev.colorKey||null) : null; colorTouched=false; $("f-colorall").checked=true;
  $("f-note").value = p.note || "";
  setAllDay(!!p.allDay, p.remind!=null ? p.remind : (p.allDay?240:30));
  draftWho = (p.members && p.members.length ? p.members : (membersFor(p.title)||[me])).slice(); whoTouched=false;
  renderWho(); renderColors();
  $("f-gnote").textContent = ev && ev.base ? "這是重複行程：修改會套用到每一次（日期不能改）；刪除時可以選只刪這一天。" : (moveFrom ? "會搬到「家庭」日曆，豪豪看得到；你手機的 Google 日曆裡只會留一筆，不會重複。在 app 的「Google」畫面也看得到它。" : "儲存後會出現在 Google「家庭」日曆，提醒由 Google 日曆發出。");
  $("del").hidden = !ev; $("confirm").hidden = true; $("f-err").hidden = true; dupOK=false; $("save").textContent="儲存";
  $("scrim").hidden=false; $("sheet").hidden=false;
  if(!prefill && !ev) setTimeout(()=>$("f-title").focus(),50);
}
function closeSheet(){ $("sheet").hidden=true; if($("psheet").hidden) $("scrim").hidden=true; editing=null; moveFrom=null; }
function toast(msg){ const t=$("toast"); t.textContent=msg; t.hidden=false; clearTimeout(toast._t); toast._t=setTimeout(()=>t.hidden=true,3200); }
function showErr(msg){ const e=$("f-err"); e.textContent=msg; e.hidden=false; }

$("f-allday").onclick=()=>setAllDay(!isAllDay());
$("cancel").onclick=closeSheet;
$("scrim").addEventListener("click",()=>{ if(!$("sheet").hidden) closeSheet(); if(!$("psheet").hidden) closePhoto(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ if(!$("sheet").hidden) closeSheet(); if(!$("psheet").hidden) closePhoto(); } });
$("f-title").addEventListener("input",()=>{ if(!colorTouched) pickedColor=null; renderColors(); if(isPick()) renderPick();
  if(!whoTouched && !editing){ const ms=membersFor($("f-title").value); if(ms){ draftWho=ms; renderWho(); } } });
["f-title","f-date","f-start"].forEach(id=>$(id).addEventListener("input",()=>{ if(dupOK){ dupOK=false; $("save").textContent="儲存"; $("f-err").hidden=true; } }));

function askDelete(){
  const ev=editing; if(!ev) return;
  $("confirm-text").textContent = ev.base ? "這是重複行程，要刪哪些？" : "確定刪除「"+ev.title+"」？";
  $("confirm-one").textContent = ev.base ? "只刪這一天" : "刪除";
  $("confirm-all").hidden = !ev.base; $("confirm").hidden=false;
}
$("del").onclick=askDelete;
$("confirm-no").onclick=()=>{ $("confirm").hidden=true; };
async function doDelete(all){
  const ev=editing; if(!ev) return;
  ["confirm-one","confirm-all"].forEach(i=>$(i).disabled=true);
  try{ await api(calPath(famCal, all?ev.base:ev.id),{method:"DELETE"}); closeSheet(); toast("已刪除「"+ev.title+"」"+(all?"（整個重複）":"")); load(); }
  catch(e){ if(e.code===410||e.code===404){ closeSheet(); load(); } else showErr("刪除失敗："+why(e)); }
  finally{ ["confirm-one","confirm-all"].forEach(i=>$(i).disabled=false); }
}
$("confirm-one").onclick=()=>doDelete(false);
$("confirm-all").onclick=()=>doDelete(true);

function formData(){
  const allDay=isAllDay();
  return { title:$("f-title").value.trim(), date:$("f-date").value, endDate:$("f-end").value, allDay,
    start:allDay?"":$("f-start").value, end:allDay?"":$("f-stop").value, repeat:$("f-repeat").value,
    remind:Number($("f-remind").value), members:famIfSushi(draftWho.slice()), note:$("f-note").value.trim(),
    color: colorTouched && pickedColor ? pickedColor : (editing && editing.colorKey) || "" };
}
function rememberColor(d){ if(colorTouched && pickedColor && $("f-colorall").checked){ titleColors=Object.assign({},titleColors,{[colorKey(d.title)]:pickedColor}); store.set("sc.titleColors",titleColors); } }
$("form").addEventListener("submit", async e=>{
  e.preventDefault(); if(saving) return;
  const d=formData();
  if(!d.title) return showErr("請輸入行程名稱。");
  if(!d.members.length) return showErr("請至少選一位家人。");
  if(!famCal) return showErr("還沒找到 Google「家庭」日曆，請先按下方「重新整理」。");
  if(isPick()){
    if(!pickDates.size) return showErr("請在月曆上點選至少一天。");
    const dates=[...pickDates].sort().filter(k=>!famEvents.some(x=>norm(x.title)===norm(d.title) && onDay(x,k) && (d.allDay?x.allDay:x.start===d.start)));
    saving=true; $("save").disabled=true;
    let ok=0, err=null;
    for(const k of dates){ try{ await api(calPath(famCal),{method:"POST",body:bodyFor(Object.assign({},d,{date:k,endDate:"",repeat:"none"}))}); ok++; $("save").textContent="儲存中… "+ok+"/"+dates.length; }catch(x){ err=x; break; } }
    saving=false; $("save").disabled=false; $("save").textContent="儲存";
    if(err && !ok) return showErr("新增失敗："+why(err));
    rememberColor(d); sel=dates[0]||sel; const dd=parse(sel); view=new Date(dd.getFullYear(),dd.getMonth(),1);
    closeSheet(); toast("已新增 "+ok+" 天的「"+d.title+"」"+(pickDates.size>dates.length?"，已存在的日子略過":"")+(err?"（有幾天沒成功："+why(err)+"）":"")); load(); return;
  }
  if(!d.date) return showErr("請選日期。");
  if(d.endDate && d.endDate<d.date) return showErr("結束日期不能早於開始日期。");
  const same=famEvents.find(x=>(!editing||x.id!==editing.id) && norm(x.title)===norm(d.title) && onDay(x,d.date) && (d.allDay?x.allDay:(!x.allDay&&x.start===d.start)));
  if(same && !dupOK){ dupOK=true; $("save").textContent="還是要新增"; return showErr("這天已經有「"+same.title+"」"+(same.allDay?"（整天）":same.start)+"了。確定要再加一筆，請再按一次。"); }
  saving=true; dupOK=false; $("save").disabled=true; $("save").textContent="儲存中…";
  try{
    if(editing && editing.base){
      const master=await api(calPath(famCal,editing.base));
      const b=bodyFor(Object.assign({},d,{date:(master.start.date||String(master.start.dateTime).slice(0,10)), endDate:"", repeat:"none"}));
      delete b.recurrence;
      await api(calPath(famCal,editing.base),{method:"PATCH",body:b});
    } else if(editing){
      await api(calPath(famCal,editing.id),{method:"PATCH",body:bodyFor(d)});
    } else if(moveFrom){
      // 搬到「家庭」日曆：手機 Google 日曆只會有一筆
      const src=moveFrom;
      if(!src.base){
        const moved=await api(calPath("primary",src.id)+"/move?destination="+encodeURIComponent(famCal),{method:"POST"});
        await api(calPath(famCal,moved.id),{method:"PATCH",body:bodyFor(d)});
      } else {
        await api(calPath(famCal),{method:"POST",body:bodyFor(d)});
        try{ await api(calPath("primary",src.id),{method:"DELETE"}); }catch(_){ toast("已加入家庭，但個人日曆那筆沒刪到"); }
      }
    } else {
      await api(calPath(famCal),{method:"POST",body:bodyFor(d)});
    }
    rememberColor(d);
    sel=d.date; const dd=parse(d.date); view=new Date(dd.getFullYear(),dd.getMonth(),1);
    const wasEdit=!!editing, wasCopy=!!moveFrom; closeSheet(); toast(wasEdit?"已更新":wasCopy?"已加入家庭（手機上只會有一筆）":"已新增「"+d.title+"」"); load();
  }catch(err){ showErr("儲存失敗："+why(err)); }
  finally{ saving=false; $("save").disabled=false; if($("save").textContent==="儲存中…") $("save").textContent="儲存"; }
});

/* ---------------- templates (stored on this phone) ---------------- */
function nextOn(weekday, fromK){ if(weekday==null||weekday==="") return fromK; let k=fromK; for(let i=0;i<7;i++){ if(parse(k).getDay()===Number(weekday)) return k; k=addDays(k,1);} return fromK; }
function tplSub(t){ const parts=[]; if(t.weekday!=null && t.weekday!=="") parts.push("週"+WD[t.weekday]); parts.push(t.allDay?"整天":(t.start||"")); if(REP[t.repeat]) parts.push(REP[t.repeat]); return parts.filter(Boolean).join(" "); }
function renderTpls(){
  const box=$("tpls"); box.textContent="";
  $("tpl-manage").hidden = !templates.length; $("tpl-manage").textContent = manageTpl ? "完成" : "管理";
  if(!templates.length){ const e=document.createElement("div"); e.className="tplempty"; e.textContent="還沒有常用行程。填好表單後按「存成常用」。"; box.append(e); return; }
  templates.forEach(t=>{
    const b=document.createElement("button"); b.type="button"; b.className="tpl"; b.id="tpl-"+t.id;
    const s=document.createElement("strong"); s.textContent=t.title; const sm=document.createElement("small"); sm.textContent=tplSub(t);
    const tx=document.createElement("span"); tx.className="tx"; tx.append(s,sm);
    const ic=whoIcons(t,28); ic.style.display="flex"; ic.querySelectorAll("svg+svg").forEach(x=>x.style.marginLeft="-10px");
    b.append(ic,tx);
    if(manageTpl){ const x=document.createElement("span"); x.className="x"; x.textContent="×"; b.append(x); b.setAttribute("aria-label","刪除常用："+t.title);
      b.onclick=()=>{ templates=templates.filter(y=>y.id!==t.id); store.set("sc.tpl",templates); renderTpls(); toast("已移除「"+t.title+"」"); }; }
    else b.onclick=()=>applyTpl(t);
    box.append(b);
  });
}
function applyTpl(t){
  $("f-title").value=t.title; $("f-date").value=nextOn(t.weekday, $("f-date").value||sel); $("f-end").value="";
  setAllDay(!!t.allDay, t.remind); if(t.start) $("f-start").value=t.start; if(t.end) $("f-stop").value=t.end;
  $("f-repeat").value=t.repeat||"none"; pickDates=new Set(); syncPickUI();
  if(!colorTouched) pickedColor=null; renderColors();
  draftWho=(t.members&&t.members.length?t.members:[me]).slice(); renderWho(); $("f-err").hidden=true;
}
$("tpl-manage").onclick=()=>{ manageTpl=!manageTpl; renderTpls(); };
$("save-tpl").onclick=()=>{
  const d=formData(); if(!d.title) return showErr("先填好行程名稱，再存成常用。");
  const rep=isPick()?"none":d.repeat;
  templates=templates.concat([{id:"t"+Date.now(), title:d.title, members:d.members, allDay:d.allDay, start:d.start, end:d.end, repeat:rep, remind:d.remind,
    weekday: d.date && ["weekly","biweekly","every4w"].includes(rep) ? parse(d.date).getDay() : ""}]);
  store.set("sc.tpl",templates); renderTpls(); toast("已存成常用：「"+d.title+"」");
};

/* ---------------- pick many dates ---------------- */
const isPick = () => $("f-repeat").value==="pick";
function renderPick(){
  const y=pickView.getFullYear(), m=pickView.getMonth();
  $("pk-title").textContent=y+" 年 "+(m+1)+" 月";
  const g=$("pk-grid"); g.textContent="";
  WD.forEach((w,i)=>{ const d=document.createElement("button"); d.type="button"; d.className="dw"; d.textContent=w; d.setAttribute("aria-label","選這個月所有星期"+w); d.onclick=()=>toggleWeekday([i]); g.append(d); });
  const first=new Date(y,m,1).getDay(), n=new Date(y,m+1,0).getDate(), todayK=keyOf(new Date()), title=norm($("f-title").value.trim());
  for(let i=0;i<first;i++){ const b=document.createElement("button"); b.type="button"; b.className="out"; b.tabIndex=-1; b.setAttribute("aria-hidden","true"); g.append(b); }
  for(let d=1; d<=n; d++){
    const k=y+"-"+pad(m+1)+"-"+pad(d), b=document.createElement("button"); b.type="button"; b.textContent=d; b.dataset.k=k;
    const has = title && famEvents.some(x=>norm(x.title)===title && onDay(x,k));
    b.className=[pickDates.has(k)?"on":"", k<todayK?"past":"", k===todayK?"today":"", has?"has":""].join(" ").trim();
    b.setAttribute("aria-pressed",pickDates.has(k));
    b.onclick=e=>{ if(e.detail===0){ pickDates.has(k)?pickDates.delete(k):pickDates.add(k); renderPick(); } };
    g.append(b);
  }
  const L=$("pk-list"); L.textContent=""; const arr=[...pickDates].sort();
  if(!arr.length){ L.textContent="還沒選日期。選好後按儲存一次新增。"; return; }
  const c=document.createElement("span"); c.textContent="已選 "+arr.length+" 天："; L.append(c);
  arr.forEach(k=>{ const d=parse(k), b=document.createElement("button"); b.type="button"; b.textContent=(d.getMonth()+1)+"/"+d.getDate()+"（"+WD[d.getDay()]+"）×"; b.onclick=()=>{ pickDates.delete(k); renderPick(); }; L.append(b); });
}
function syncPickUI(){ const on=isPick(); $("pickbox").hidden=!on; $("daterow").hidden=on;
  if(on){ if(!pickDates.size && $("f-date").value){ pickDates.add($("f-date").value); const d=parse($("f-date").value); pickView=new Date(d.getFullYear(),d.getMonth(),1); } renderPick(); } }
$("f-repeat").addEventListener("change",syncPickUI);
function monthDays(){ const y=pickView.getFullYear(), m=pickView.getMonth(), n=new Date(y,m+1,0).getDate(), t=keyOf(new Date()); const a=[]; for(let d=1;d<=n;d++){ const k=y+"-"+pad(m+1)+"-"+pad(d); if(k>=t) a.push(k);} return a; }
function toggleWeekday(wds){ const ks=monthDays().filter(k=>wds.includes(parse(k).getDay())); if(!ks.length) return toast("這個月剩下的日子沒有這幾天"); const all=ks.every(k=>pickDates.has(k)); ks.forEach(k=> all?pickDates.delete(k):pickDates.add(k)); renderPick(); }
$("pk-wkend").onclick=()=>toggleWeekday([0,6]); $("pk-wkday").onclick=()=>toggleWeekday([1,2,3,4,5]);
$("pk-clear").onclick=()=>{ pickDates=new Set(); renderPick(); };
$("pk-prev").onclick=()=>{ pickView=new Date(pickView.getFullYear(),pickView.getMonth()-1,1); renderPick(); };
$("pk-next").onclick=()=>{ pickView=new Date(pickView.getFullYear(),pickView.getMonth()+1,1); renderPick(); };
(function(){
  let paint=null; const g=$("pk-grid");
  const mark=b=>{ const on=pickDates.has(b.dataset.k); b.classList.toggle("on",on); b.setAttribute("aria-pressed",on); };
  g.addEventListener("pointerdown",e=>{ const b=e.target.closest("button[data-k]"); if(!b) return; e.preventDefault(); const k=b.dataset.k; paint={add:!pickDates.has(k),seen:new Set([k])}; paint.add?pickDates.add(k):pickDates.delete(k); mark(b); try{ g.setPointerCapture(e.pointerId); }catch(_){} });
  g.addEventListener("pointermove",e=>{ if(!paint) return; const el=document.elementFromPoint(e.clientX,e.clientY); const b=el&&el.closest&&el.closest("#pk-grid button[data-k]"); if(!b) return; const k=b.dataset.k; if(paint.seen.has(k)) return; paint.seen.add(k); paint.add?pickDates.add(k):pickDates.delete(k); mark(b); });
  const end=()=>{ if(paint){ paint=null; renderPick(); } }; g.addEventListener("pointerup",end); g.addEventListener("pointercancel",end);
})();

/* ---------------- family photo (kept on this phone) ---------------- */
let pe=null;
function applyPhoto(img, ph){ img.src=ph.src; img.style.objectPosition=ph.x+"% "+ph.y+"%"; img.style.transformOrigin=ph.x+"% "+ph.y+"%"; img.style.transform=ph.z>1?"scale("+ph.z+")":""; }
function renderPhoto(){
  const ph=store.get("sc.photo",null);
  $("photo-box").hidden=!ph; if(ph) applyPhoto($("family-photo"),ph);
  let add=$("photo-add");
  if(!ph && !add){ add=document.createElement("button"); add.type="button"; add.className="addphoto"; add.id="photo-add"; add.textContent="＋ 加入全家福"; add.onclick=openPhoto; document.querySelector(".belt").insertBefore(add, document.querySelector(".belt-top")); }
  if(ph && add) add.remove();
}
function openPhoto(){ const ph=store.get("sc.photo",null); pe=Object.assign({src:"",x:50,y:30,z:1},ph||{}); $("pe-zoom").value=pe.z; if(pe.src) applyPhoto($("pe-img"),pe); else $("pe-img").removeAttribute("src"); $("p-err").hidden=true; $("scrim").hidden=false; $("psheet").hidden=false; }
function closePhoto(){ $("psheet").hidden=true; if($("sheet").hidden) $("scrim").hidden=true; pe=null; }
$("photo-edit").onclick=openPhoto; $("pe-cancel").onclick=closePhoto;
$("pe-remove").onclick=()=>{ store.del("sc.photo"); closePhoto(); renderPhoto(); toast("已移除全家福"); };
$("pe-zoom").addEventListener("input",()=>{ if(!pe||!pe.src) return; pe.z=Number($("pe-zoom").value); applyPhoto($("pe-img"),pe); });
(function(){ const fr=$("pe-frame"); let st=null;
  fr.addEventListener("pointerdown",e=>{ if(!pe||!pe.src) return; e.preventDefault(); st={x:e.clientX,y:e.clientY,px:pe.x,py:pe.y}; try{ fr.setPointerCapture(e.pointerId); }catch(_){} });
  fr.addEventListener("pointermove",e=>{ if(!st||!pe) return; const r=fr.getBoundingClientRect(), k=1.6/pe.z;
    pe.x=Math.max(0,Math.min(100, st.px-(e.clientX-st.x)/r.width*100*k)); pe.y=Math.max(0,Math.min(100, st.py-(e.clientY-st.y)/r.height*100*k)); applyPhoto($("pe-img"),pe); });
  const end=()=>{ st=null; }; fr.addEventListener("pointerup",end); fr.addEventListener("pointercancel",end); })();
$("pe-file").addEventListener("change",async e=>{
  const f=e.target.files&&e.target.files[0]; e.target.value=""; if(!f||!pe) return;
  try{ const bmp=await createImageBitmap(f,{imageOrientation:"from-image"}).catch(()=>createImageBitmap(f));
    const sc=Math.min(1,1200/Math.max(bmp.width,bmp.height)), c=document.createElement("canvas"); c.width=Math.round(bmp.width*sc); c.height=Math.round(bmp.height*sc);
    c.getContext("2d").drawImage(bmp,0,0,c.width,c.height); pe.src=c.toDataURL("image/jpeg",0.82); pe.x=50; pe.y=35; pe.z=1; $("pe-zoom").value=1; applyPhoto($("pe-img"),pe); }
  catch(_){ $("p-err").textContent="這張照片打不開，請換一張 JPG 或 PNG。"; $("p-err").hidden=false; }
});
$("pe-save").onclick=()=>{ if(!pe||!pe.src){ $("p-err").textContent="請先選一張照片。"; $("p-err").hidden=false; return; }
  try{ localStorage.setItem("sc.photo",JSON.stringify({src:pe.src,x:Math.round(pe.x),y:Math.round(pe.y),z:Math.round(pe.z*100)/100})); }
  catch(_){ $("p-err").textContent="照片太大存不下，請換一張小一點的。"; $("p-err").hidden=false; return; }
  closePhoto(); renderPhoto(); toast("全家福已更新"); };

/* ---------------- top controls ---------------- */
document.querySelectorAll("[data-me]").forEach(b=>b.onclick=()=>{ me=b.dataset.me; store.set("sc.me",me); renderMe(me); toast("切換為"+M[me].name); });
function moveMonth(n){ view=new Date(view.getFullYear(),view.getMonth()+n,1); renderMonth(); load(); }
$("prev").onclick=()=>moveMonth(-1); $("next").onclick=()=>moveMonth(1);
$("go-today").onclick=()=>{ const t=new Date(); view=new Date(t.getFullYear(),t.getMonth(),1); sel=keyOf(t); renderMonth(); renderAgenda(); load(); };
$("fab").onclick=()=>openSheet(null);
$("refresh").onclick=()=>{ famCal=null; load(); };
let sx=null; $("grid").addEventListener("touchstart",e=>{sx=e.touches[0].clientX},{passive:true});
$("grid").addEventListener("touchend",e=>{ if(sx==null) return; const dx=e.changedTouches[0].clientX-sx; sx=null; if(Math.abs(dx)>60) moveMonth(dx<0?1:-1); });
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible" && tokenValid()) load(); });
setInterval(()=>{ if(document.visibilityState==="visible" && tokenValid()) load(); }, 120000);

/* ---------------- start ---------------- */
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
renderPhoto();
(function start(){
  if(!CFG.CLIENT_ID){ renderAll(); showSetup(); return; }
  const back=readRedirect();
  if(back && back.error){ if(back.error==="interaction_required"||back.error==="login_required"||back.error==="consent_required"){ showLogin(); } else showLogin("登入沒有完成，請再試一次。"); renderAll(); return; }
  const cache=store.get("sc.cache",null);
  if(cache && cache.key===gridRange().start){ famEvents=cache.fam||[]; mineEvents=cache.mine||[]; }
  renderAll();
  if(tokenValid()){ sessionStorage.removeItem("sc.silentTried"); showMain(); load(); }
  else if(store.get("sc.loggedIn",false)){ if(cache) showMain(); needLogin(); }
  else showLogin();
})();

/* ================= 國定假日・連假 & 倒數 ================= */
// 行政院人事行政總處辦公日曆表（115、116 年）。每年 6 月左右公布隔年的，記得補上。
const HOLIDAYS = [
  ["教師節", "2026-09-28", "2026-09-28", {"2026-09-28":"教師節"}],
  ["國慶連假", "2026-10-09", "2026-10-11", {"2026-10-10":"國慶日"}],
  ["光復節連假", "2026-10-24", "2026-10-26", {"2026-10-25":"光復節"}],
  ["行憲紀念日連假", "2026-12-25", "2026-12-27", {"2026-12-25":"行憲紀念日"}],
  ["元旦連假", "2027-01-01", "2027-01-03", {"2027-01-01":"元旦"}],
  ["春節連假", "2027-02-04", "2027-02-10", {"2027-02-04":"小年夜","2027-02-05":"除夕","2027-02-06":"初一","2027-02-07":"初二","2027-02-08":"初三"}],
  ["228 連假", "2027-02-27", "2027-03-01", {"2027-02-28":"和平紀念日"}],
  ["兒童節清明連假", "2027-04-03", "2027-04-06", {"2027-04-04":"兒童節","2027-04-05":"清明節"}],
  ["勞動節連假", "2027-04-30", "2027-05-02", {"2027-05-01":"勞動節"}],
  ["端午節", "2027-06-09", "2027-06-09", {"2027-06-09":"端午節"}],
  ["中秋節", "2027-09-15", "2027-09-15", {"2027-09-15":"中秋節"}],
  ["教師節", "2027-09-28", "2027-09-28", {"2027-09-28":"教師節"}],
  ["國慶連假", "2027-10-09", "2027-10-11", {"2027-10-10":"國慶日"}],
  ["光復節連假", "2027-10-23", "2027-10-25", {"2027-10-25":"光復節"}],
  ["行憲紀念日連假", "2027-12-24", "2027-12-26", {"2027-12-25":"行憲紀念日"}],
  ["元旦連假", "2027-12-31", "2028-01-02", {"2028-01-01":"元旦"}]
];
// 學校的寒暑假（過了就自動不顯示；新學期再改日期）
const SCHOOL_BREAKS = [["寒假", "2027-01-21", "snow"], ["暑假", "2027-07-01", "sun"]];
const SUSHI_BORN_K = (typeof CFG!=="undefined" && CFG.SUSHI_BORN) || "2024-08-25";


/* 小圖示（自己畫的，不用 emoji） */
const IC_O='stroke="#2f2a36" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
const IC_FACE='#2f2a36';
function cakeSvg(c){ return '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.6c1.7 1.9 1.9 3.6 0 4.9-1.9-1.3-1.7-3 0-4.9z" fill="#f4b860" '+IC_O+'/><rect x="14.8" y="9" width="2.4" height="7" rx="1" fill="#fff" '+IC_O+'/><rect x="5.5" y="16" width="21" height="11" rx="3.2" fill="#fff7ee" '+IC_O+'/><path d="M5.5 19.2c0-1.8 1.4-3.2 3.2-3.2h14.6c1.8 0 3.2 1.4 3.2 3.2v.6c-1.1 1.7-2.4 1.7-3.5 0-1.1 1.7-2.4 1.7-3.5 0-1.1 1.7-2.4 1.7-3.5 0-1.1 1.7-2.4 1.7-3.5 0-1.1 1.7-2.4 1.7-3.5 0-1.1 1.7-2.4 1.7-3.5 0z" fill="'+c+'" '+IC_O+'/><circle cx="10" cy="24" r=".9" fill="'+c+'"/><circle cx="16" cy="24.6" r=".9" fill="#f4b860"/><circle cx="22" cy="24" r=".9" fill="'+c+'"/><path d="M3.5 27.5h25" '+IC_O+'/></svg>'; }
const ICONS = {
  ring: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="20.5" r="8" fill="none" stroke="#e7c07a" stroke-width="3.6"/><circle cx="16" cy="20.5" r="9.8" fill="none" '+IC_O+'/><circle cx="16" cy="20.5" r="6.2" fill="none" '+IC_O+'/><path d="M11.8 8.6 16 3.6l4.2 5-4.2 4.6z" fill="#f6c6d8" '+IC_O+'/><path d="M11.8 8.6h8.4" '+IC_O+'/><path d="M25.5 4.5v3.4M23.8 6.2h3.4" stroke="#e7c07a" stroke-width="1.6" stroke-linecap="round"/></svg>',
  heart: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 27.5S5 21.2 5 13.6a5.6 5.6 0 0 1 11-2.1 5.6 5.6 0 0 1 11 2.1c0 7.6-11 13.9-11 13.9z" fill="#f2a0b7" '+IC_O+'/><path d="M8.6 12.4a3.2 3.2 0 0 1 3-2.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none"/><circle cx="12.8" cy="15.6" r="1.1" fill="'+IC_FACE+'"/><circle cx="19.2" cy="15.6" r="1.1" fill="'+IC_FACE+'"/><path d="M14.6 18.4q1.4 1.3 2.8 0" fill="none" '+IC_O+'/><ellipse cx="10.6" cy="18" rx="1.5" ry="1" fill="#fff" opacity=".55"/><ellipse cx="21.4" cy="18" rx="1.5" ry="1" fill="#fff" opacity=".55"/></svg>',
  flower: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 17v12" stroke="#7fa48c" stroke-width="2.2" stroke-linecap="round"/><path d="M16 24.5c-3.4 0-5.6-2.2-5.6-4.6 3.4 0 5.6 2.2 5.6 4.6z" fill="#a9c7b2" '+IC_O+'/><circle cx="11" cy="11.5" r="4" fill="#f6c3d3" '+IC_O+'/><circle cx="21" cy="11.5" r="4" fill="#f6c3d3" '+IC_O+'/><circle cx="16" cy="7.2" r="4" fill="#f6c3d3" '+IC_O+'/><circle cx="16" cy="14" r="5" fill="#ee9fb8" '+IC_O+'/><circle cx="16" cy="13.6" r="1.8" fill="#d9779a"/></svg>',
  tie: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 4.5 16 7l7-2.5" fill="none" '+IC_O+'/><path d="M13 6.2h6l-1 3.6h-4z" fill="#6f8fb0" '+IC_O+'/><path d="M14 9.8h4l3.2 13.2L16 28.4 10.8 23z" fill="#8fa9c6" '+IC_O+'/><path d="M14.6 13.6l3.8 2.6M13.4 18l5.8 4" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/></svg>',
  snow: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="22" r="7.4" fill="#fff" '+IC_O+'/><circle cx="16" cy="10.6" r="5.4" fill="#fff" '+IC_O+'/><circle cx="14.2" cy="10" r=".95" fill="'+IC_FACE+'"/><circle cx="17.8" cy="10" r=".95" fill="'+IC_FACE+'"/><path d="M16 11.6l3.2.9-3.2.8z" fill="#f0a35e" stroke="#f0a35e" stroke-width=".6" stroke-linejoin="round"/><rect x="10.6" y="14.6" width="10.8" height="2.8" rx="1.4" fill="#c49ac4" '+IC_O+'/><path d="M18.6 16.6l.9 4.2" stroke="#c49ac4" stroke-width="2.6" stroke-linecap="round"/><circle cx="16" cy="21" r=".9" fill="'+IC_FACE+'"/><circle cx="16" cy="24.4" r=".9" fill="'+IC_FACE+'"/></svg>',
  sun: '<svg viewBox="0 0 32 32" aria-hidden="true"><g stroke="#f2b45a" stroke-width="2.2" stroke-linecap="round"><path d="M16 2.8v3M16 26.2v3M2.8 16h3M26.2 16h3M6.7 6.7l2.1 2.1M23.2 23.2l2.1 2.1M6.7 25.3l2.1-2.1M23.2 8.8l2.1-2.1"/></g><circle cx="16" cy="16" r="7.8" fill="#ffd47e" '+IC_O+'/><rect x="10.2" y="13" width="5" height="3.6" rx="1.5" fill="'+IC_FACE+'"/><rect x="16.8" y="13" width="5" height="3.6" rx="1.5" fill="'+IC_FACE+'"/><path d="M15.2 14.4h1.6" '+IC_O+'/><path d="M13.4 19.4q2.6 2 5.2 0" fill="none" '+IC_O+'/></svg>',
  lantern: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 1.8v2.4" '+IC_O+'/><rect x="11.5" y="4.2" width="9" height="2.8" rx="1.1" fill="#d9b06c" '+IC_O+'/><ellipse cx="16" cy="15.6" rx="9.4" ry="8.8" fill="#ea8f8f" '+IC_O+'/><path d="M16 7v17.2M11.3 7.9c-2.8 4.8-2.8 10.6 0 15.4M20.7 7.9c2.8 4.8 2.8 10.6 0 15.4" fill="none" stroke="#c96878" stroke-width="1.2"/><rect x="11.5" y="23.4" width="9" height="2.8" rx="1.1" fill="#d9b06c" '+IC_O+'/><path d="M16 26.2v4" stroke="#d9b06c" stroke-width="2" stroke-linecap="round"/></svg>'
};
const MEMBER_TINT = {mom:"#c9a2d0", dad:"#9fbfac", sushi:"#f1a8bb"};
function iconEl(key, w){
  w=w||30;
  if(key==="sushi"){ const e=svgEl("sushi",w); return e; }
  const t=document.createElement("template");
  t.innerHTML = key.startsWith("cake:") ? cakeSvg(MEMBER_TINT[key.slice(5)]||"#f1a8bb") : (ICONS[key]||ICONS.heart);
  const el=t.content.firstChild; el.setAttribute("width",w); el.setAttribute("height",w); el.classList.add("mini-ic"); return el;
}

const dayDiff = (a,b) => Math.round((parse(b)-parse(a))/86400000);
const spanDays = h => dayDiff(h[1],h[2])+1;
function holidayOn(k){
  for(const h of HOLIDAYS){ if(k>=h[1] && k<=h[2]) return {span:h, label:h[3][k]||"放假"}; }
  return null;
}
function nextYearly(todayK, mmdd){
  const y=Number(todayK.slice(0,4)); let k=y+"-"+mmdd; if(k<todayK) k=(y+1)+"-"+mmdd; return k;
}
function nthSunday(y, month, n){ const d=new Date(y,month-1,1); const first=(7-d.getDay())%7+1; return keyOf(new Date(y,month-1,first+7*(n-1))); }
function nextMothersDay(todayK){ const y=Number(todayK.slice(0,4)); let k=nthSunday(y,5,2); if(k<todayK) k=nthSunday(y+1,5,2); return k; }
function nextMonthsary(todayK){
  const born=parse(SUSHI_BORN_K), t=parse(todayK);
  let d=new Date(t.getFullYear(), t.getMonth(), born.getDate());
  if(keyOf(d)<todayK) d=new Date(t.getFullYear(), t.getMonth()+1, born.getDate());
  if(d.getMonth()===born.getMonth()) d=new Date(d.getFullYear(), d.getMonth()+1, born.getDate()); // 生日那個月改算生日
  const n=(d.getFullYear()-born.getFullYear())*12+(d.getMonth()-born.getMonth());
  const y=Math.floor(n/12), m=n%12;
  return {k:keyOf(d), label:"Sushi "+(y?y+" 歲"+(m?" "+m+" 個月":""):"滿 "+m+" 個月")};
}
/* 行事曆上本來沒有、但要標出來的日子 */
function specialsOn(k){
  const out=[], y=Number(k.slice(0,4)), md=k.slice(5);
  if(md==="02-14") out.push({ic:"heart",name:"情人節"});
  if(k===nthSunday(y,5,2)) out.push({ic:"flower",name:"母親節"});
  if(md==="08-08") out.push({ic:"tie",name:"父親節"});
  SCHOOL_BREAKS.forEach(([nm,d,ic])=>{ if(d===k) out.push({ic,name:nm+"開始"}); });
  return out;
}
function countdownItems(){
  const t=keyOf(new Date()), items=[];
  const add=(ic,name,k)=>{ const n=dayDiff(t,k); if(n>=0) items.push({ic,name,k,n}); };
  add("ring","結婚紀念日",nextYearly(t,"08-18"));
  const ms=nextMonthsary(t); add("sushi",ms.label,ms.k);
  add("cake:mom","霖霖生日",nextYearly(t,"05-05"));
  add("cake:dad","豪豪生日",nextYearly(t,"09-04"));
  const sb=nextYearly(t,SUSHI_BORN_K.slice(5)); add("cake:sushi","Sushi "+(Number(sb.slice(0,4))-Number(SUSHI_BORN_K.slice(0,4)))+" 歲生日",sb);
  add("heart","情人節",nextYearly(t,"02-14"));
  add("flower","母親節",nextMothersDay(t));
  add("tie","父親節",nextYearly(t,"08-08"));
  SCHOOL_BREAKS.forEach(([nm,k,ic])=>add(ic,nm,k));
  const on=holidayOn(t);
  if(on && spanDays(on.span)>=3) items.push({ic:"lantern",name:on.span[0]+"中",k:on.span[2],n:0,live:true});
  else { const nx=HOLIDAYS.find(h=>h[1]>t && spanDays(h)>=3); if(nx) add("lantern",nx[0],nx[1]); }
  return items.sort((a,b)=>a.n-b.n);
}
function goDay(k){ const d=parse(k); sel=k; const nv=new Date(d.getFullYear(),d.getMonth(),1); const moved=nv.getTime()!==view.getTime(); view=nv; if(moved && typeof load==="function") load(); renderMonth(); renderAgenda(); }
function renderCountdown(){
  const main=$("solobar"); if(!main || !main.parentNode) return;
  let box=$("cdbox");
  if(!box){ box=document.createElement("section"); box.id="cdbox"; box.className="cdbox"; box.setAttribute("aria-label","倒數"); main.parentNode.insertBefore(box, main); }
  box.textContent="";
  const row=document.createElement("div"); row.className="cdrow";
  countdownItems().forEach(it=>{
    const c=document.createElement("button"); c.type="button"; c.className="cd"+(it.n===0?" now":"");
    const d=parse(it.k);
    c.innerHTML='<span class="e"></span><span class="nm"></span><span class="num"></span><span class="dt"></span>';
    c.children[0].append(iconEl(it.ic,30)); c.children[1].textContent=it.name;
    if(it.n===0){ c.children[2].textContent=it.live?"放假中":"就是今天"; }
    else { c.children[2].textContent=it.n; const s=document.createElement("small"); s.textContent="天"; c.children[2].append(s); }
    c.children[3].textContent=it.live?"到 "+(d.getMonth()+1)+"/"+d.getDate():(d.getMonth()+1)+"/"+d.getDate()+"（"+"日一二三四五六"[d.getDay()]+"）";
    c.setAttribute("aria-label",it.name+"，"+(it.n===0?"今天":"還有 "+it.n+" 天"));
    c.onclick=()=>goDay(it.live?keyOf(new Date()):it.k);
    row.append(c);
  });
  box.append(row);
}
function decorateHolidays(){
  const g=$("grid"); if(!g || typeof gridRange!=="function") return;
  const r=gridRange();
  [...g.children].forEach((b,i)=>{
    const k=addDays(r.start,i), h=holidayOn(k);
    b.classList.toggle("hol",!!h);
    b.querySelectorAll(".hname,.sp").forEach(x=>x.remove());
    if(h){ const s=document.createElement("span"); s.className="hname"; s.textContent=h.label; const n=b.querySelector(".n"); if(n) n.after(s); else b.prepend(s); }
    const sp=specialsOn(k);
    if(sp.length){
      let bars=b.querySelector(".bars");
      if(!bars){ bars=document.createElement("span"); bars.className="bars"; const ref=b.querySelector(".more"); ref?b.insertBefore(bars,ref):b.append(bars); }
      sp.slice().reverse().forEach(x=>{ const t=document.createElement("b"); t.className="sp"; t.textContent=x.name; bars.prepend(t); });
    }
  });
}
function holidayNote(){
  const a=$("agenda"); if(!a) return;
  const h2=a.querySelector("h2"); let after=h2;
  const put=el=>{ if(after) after.after(el); else a.prepend(el); after=el; };
  const h=holidayOn(sel);
  if(h){
    const p=document.createElement("div"); p.className="holnote";
    const s=h.span, n=spanDays(s), d1=parse(s[1]), d2=parse(s[2]);
    const tx=document.createElement("span");
    tx.textContent=(h.label!=="放假"?h.label+"・":"")+s[0]+(n>1?"（"+(d1.getMonth()+1)+"/"+d1.getDate()+"–"+(d2.getMonth()+1)+"/"+d2.getDate()+"，放 "+n+" 天）":"（放假）");
    p.append(iconEl("lantern",22),tx); put(p);
  }
  const today=keyOf(new Date());
  specialsOn(sel).forEach(x=>{
    const p=document.createElement("div"); p.className="spnote";
    const tx=document.createElement("span"); const n=dayDiff(today,sel);
    tx.innerHTML="<strong></strong><small></small>"; tx.firstChild.textContent=x.name;
    tx.lastChild.textContent= n===0?"就是今天！": n>0?"還有 "+n+" 天":"";
    p.append(iconEl(x.ic,30),tx); put(p);
  });
}
function styleNavButtons(){
  const chev=d=>'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+d+'"/></svg>';
  const p=$("prev"), n=$("next"), t=$("go-today");
  if(p){ p.innerHTML=chev("M15 5l-7 7 7 7"); p.classList.add("navbtn"); }
  if(n){ n.innerHTML=chev("M9 5l7 7-7 7"); n.classList.add("navbtn"); }
  if(t){ t.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none"/></svg><span>今天</span>'; t.classList.add("todaybtn"); }
}
{
  const _rm=renderMonth, _ra=renderAgenda;
  renderMonth=function(){ _rm.apply(this,arguments); decorateHolidays(); };
  renderAgenda=function(){ _ra.apply(this,arguments); holidayNote(); };
  styleNavButtons(); renderCountdown(); decorateHolidays(); holidayNote();
  let lastDay=keyOf(new Date());
  document.addEventListener("visibilitychange",()=>{ if(!document.hidden && keyOf(new Date())!==lastDay){ lastDay=keyOf(new Date()); renderCountdown(); } });
}

/* ================= 打開時的提醒 & 倒數到了的大畫面 ================= */
function dayItems(k){
  let fam=[], g=[];
  if(typeof eventsOn==="function"){ fam=eventsOn(k); try{ g=gOn(gFam,k).concat(gOn(gMine,k)); }catch(e){} }
  else { fam=famOn(k); g=mineOn(k); }
  const mk=(e,isG)=>({allDay:!!e.allDay, start:e.start||"", end:e.end||"", title:isG?e.title:titleOn(e,k), members:isG?[]:(e.members||[]), g:isG});
  return fam.map(e=>mk(e,false)).concat(g.map(e=>mk(e,true))).sort((a,b)=>a.allDay===b.allDay?a.start.localeCompare(b.start):(a.allDay?-1:1));
}
const hhmm = d => String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
function mdLabel(k){ const d=parse(k); return (d.getMonth()+1)+"/"+d.getDate()+"（"+"日一二三四五六"[d.getDay()]+"）"; }
function briefRow(it, now){
  const r=document.createElement("div"); r.className="brow"+(it.g?" g":"");
  const t=document.createElement("span"); t.className="bt";
  const live=!it.allDay && now && it.start<=now && (it.end||it.start)>now;
  t.textContent= it.allDay?"整天":(live?"進行中":it.start);
  if(live) t.classList.add("live");
  const tx=document.createElement("span"); tx.className="btx"; tx.textContent=it.title;
  const who=document.createElement("span"); who.className="bwho";
  if(it.g){ const s=document.createElement("span"); s.className="bg"; s.textContent="G"; who.append(s); }
  else (it.members.length?it.members:["mom","dad","sushi"]).filter(m=>M[m]).slice(0,3).forEach(m=>who.append(svgEl(m,22)));
  r.append(t,tx,who); return r;
}
let briefEl=null;
function fillBrief(){
  if(!briefEl) return;
  const box=briefEl.querySelector(".bbody"); box.textContent="";
  const today=keyOf(new Date()), tmr=addDays(today,1), now=hhmm(new Date());
  const sec=(title, sub, rows, empty, extra)=>{
    const s=document.createElement("section"); s.className="bsec";
    const h=document.createElement("h3"); h.textContent=title; if(sub){ const sm=document.createElement("small"); sm.textContent=sub; h.append(sm); } s.append(h);
    (extra||[]).forEach(x=>s.append(x));
    if(rows.length) rows.forEach(r=>s.append(r));
    else if(!(extra||[]).length){ const p=document.createElement("p"); p.className="bempty"; p.textContent=empty; s.append(p); }
    box.append(s);
  };
  const tag=k=>{ const out=[]; const h=holidayOn(k); if(h){ const p=document.createElement("div"); p.className="btag"; p.append(iconEl("lantern",20), document.createTextNode(h.label!=="放假"?h.label+"・"+h.span[0]:h.span[0])); out.push(p); }
    specialsOn(k).forEach(x=>{ const p=document.createElement("div"); p.className="btag"; p.append(iconEl(x.ic,20), document.createTextNode(x.name)); out.push(p); }); return out; };
  const upcoming=dayItems(today).filter(it=>it.allDay || (it.end||it.start)>now);
  sec("今天接下來", mdLabel(today), upcoming.map(it=>briefRow(it,now)), "今天接下來沒有行程，好好休息一下", tag(today));
  sec("明天", mdLabel(tmr), dayItems(tmr).map(it=>briefRow(it,null)), "明天還沒有行程", tag(tmr));
}
function showBrief(){
  if(briefEl) { fillBrief(); return; }
  const ov=document.createElement("div"); ov.className="ov"; ov.setAttribute("role","dialog"); ov.setAttribute("aria-modal","true"); ov.setAttribute("aria-label","今天和明天的行程");
  const card=document.createElement("div"); card.className="brief";
  const hd=document.createElement("div"); hd.className="bhead";
  const hi=document.createElement("div"); hi.className="bhi";
  const hr=new Date().getHours(), greet= hr<11?"早安":hr<14?"午安":hr<18?"午安":"晚安";
  hi.innerHTML="<strong></strong><small>這是接下來的行程</small>"; hi.firstChild.textContent=greet+"，"+((M[me]&&M[me].name)||"")+"！";
  hd.append(svgEl(M[me]?me:"sushi",48), hi);
  const body=document.createElement("div"); body.className="bbody";
  const ok=document.createElement("button"); ok.type="button"; ok.className="bok"; ok.textContent="知道了";
  card.append(hd, body, ok); ov.append(card); document.body.append(ov);
  briefEl=ov; fillBrief();
  const close=()=>{ ov.classList.add("out"); setTimeout(()=>{ ov.remove(); },220); briefEl=null; };
  ok.onclick=close; ov.addEventListener("click",e=>{ if(e.target===ov) close(); });
  document.addEventListener("keydown",function esc(e){ if(e.key==="Escape"){ close(); document.removeEventListener("keydown",esc); } });
  setTimeout(()=>ok.focus({preventScroll:true}),60);
}
function celebrationsToday(){
  const t=keyOf(new Date());
  return countdownItems().filter(it=>it.n===0 && (!it.live || (holidayOn(t)&&holidayOn(t).span[1]===t)));
}
function celebrateText(it){
  if(it.ic==="ring") return ["結婚紀念日快樂！","霖霖和豪豪，又一起走過一年"];
  if(it.ic==="sushi") return [it.name+"啦！","Sushi 又長大一個月了"];
  if(it.ic.startsWith("cake:")) return [it.name.replace("生日","")+"生日快樂！","今天是特別的日子"];
  if(it.ic==="heart") return ["情人節快樂！","今天要甜甜的"];
  if(it.ic==="flower") return ["母親節快樂！","霖霖辛苦了"];
  if(it.ic==="tie") return ["父親節快樂！","豪豪辛苦了"];
  if(it.ic==="snow"||it.ic==="sun") return [it.name+"開始囉！","好好放假"];
  if(it.ic==="lantern") return [(it.name.replace(/中$/,""))+"開始囉！","連假愉快"];
  return ["今天是"+it.name+"！",""];
}
function showCelebrate(list, done){
  const it=list[0];
  const ov=document.createElement("div"); ov.className="celebrate"; ov.setAttribute("role","dialog"); ov.setAttribute("aria-modal","true");
  const conf=document.createElement("div"); conf.className="confetti"; conf.setAttribute("aria-hidden","true");
  const cols=["#f2a0b7","#c9a2d0","#9fbfac","#ffd47e","#b59680","#8fa9c6"];
  for(let i=0;i<46;i++){ const s=document.createElement("i"); s.style.left=(Math.random()*100)+"%"; s.style.background=cols[i%cols.length];
    s.style.animationDuration=(3.2+Math.random()*3)+"s"; s.style.animationDelay=(-Math.random()*5)+"s"; s.style.transform="rotate("+(Math.random()*360)+"deg)";
    if(i%3===0){ s.style.borderRadius="50%"; s.style.height="9px"; } conf.append(s); }
  const big=document.createElement("div"); big.className="cbig"; big.append(iconEl(it.ic,150));
  const [title,sub]=celebrateText(it);
  const h=document.createElement("h2"); h.textContent=title;
  const p=document.createElement("p"); p.textContent=sub;
  const more=document.createElement("p"); more.className="cmore"; if(list.length>1) more.textContent="今天還有："+list.slice(1).map(x=>x.name).join("、");
  const ok=document.createElement("button"); ok.type="button"; ok.className="bok"; ok.textContent="好開心！";
  ov.append(conf,big,h,p,more,ok); document.body.append(ov);
  if(navigator.vibrate) try{ navigator.vibrate([60,40,60]); }catch(e){}
  ok.onclick=()=>{ ov.classList.add("out"); setTimeout(()=>{ ov.remove(); done&&done(); },260); };
  setTimeout(()=>ok.focus({preventScroll:true}),60);
}
function openGreeting(){
  const g=$("grid");
  if(!g || g.offsetParent===null){ if((openGreeting.tries=(openGreeting.tries||0)+1)<40) setTimeout(openGreeting,1000); return; }
  openGreeting.tries=0;
  const t=keyOf(new Date());
  let seen={}; try{ seen=JSON.parse(localStorage.getItem("cd.celebrated")||"{}"); }catch(e){}
  if(seen.d!==t) seen={d:t,k:[]};
  const due=celebrationsToday().filter(it=>!seen.k.includes(it.ic+"|"+it.name));
  const brief=()=>setTimeout(showBrief,150);
  if(due.length){
    seen.k=seen.k.concat(due.map(it=>it.ic+"|"+it.name)); try{ localStorage.setItem("cd.celebrated",JSON.stringify(seen)); }catch(e){}
    showCelebrate(due, brief);
  } else brief();
}
{
  const _ra2=renderAgenda;
  renderAgenda=function(){ _ra2.apply(this,arguments); if(briefEl) fillBrief(); };
  setTimeout(openGreeting, 1200);
  let hiddenAt=0;
  document.addEventListener("visibilitychange",()=>{
    if(document.hidden){ hiddenAt=Date.now(); return; }
    if(hiddenAt && Date.now()-hiddenAt>20*60*1000 && !briefEl && !document.querySelector(".celebrate")) setTimeout(openGreeting,800);
  });
}

/* ================= 深色主題、整合選人列、連假打氣 ================= */
document.documentElement.dataset.theme="light";
function gAvailable(){ try{ return typeof gOK==="undefined" ? true : !!gOK; }catch(e){ return true; } }
{
  const _rme=renderMe;
  renderMe=function(hop){
    _rme.apply(this,arguments);
    const c=$("crew"); if(!c) return;
    const pp=people(), g=filter.includes("g"), A=["mom","dad","sushi"];
    const allOn = pp.length===3, gOnly = pp.length===0 && g;
    c.classList.add("crew5");
    c.classList.toggle("solo", !(allOn && !g));
    c.querySelectorAll(".mate").forEach(b=>{ const k=b.id.replace("mate-",""); if(M[k]) b.setAttribute("aria-pressed", String(isSolo(k))); });
    const fam=document.createElement("button"); fam.type="button"; fam.className="mate fam"+(hop==="all"?" hop":""); fam.id="mate-all";
    fam.setAttribute("aria-pressed", String(allOn)); fam.setAttribute("aria-label","看全家的行程");
    const trio=document.createElement("span"); trio.className="trio"; ["mom","sushi","dad"].forEach(m=>trio.append(svgEl(m,30)));
    const fs=document.createElement("span"); fs.textContent="全家"; fam.append(trio,fs);
    fam.onclick=()=>{ filter=A.slice(); applyFilter(); };
    c.prepend(fam);
    if(gAvailable()){
      const gb=document.createElement("button"); gb.type="button"; gb.className="mate gm"; gb.id="mate-g";
      gb.setAttribute("aria-pressed", String(g)); gb.setAttribute("aria-label", gOnly?"回到看全家的行程":"只看我的 Google 行程");
      const gi=document.createElement("span"); gi.className="gico"; gi.textContent="G";
      const gs=document.createElement("span"); gs.textContent="Google"; gb.append(gi,gs);
      gb.onclick=()=>{ filter = gOnly ? A.slice() : ["g"]; applyFilter(); };
      c.append(gb);
    }
  };
  const pp=people(); renderMe(pp.length===1?pp[0]:null);
}
/* 這週有連假 → 打氣的話 */
function weekStartK(k){ const d=parse(k); const wd=(d.getDay()+6)%7; d.setDate(d.getDate()-wd); return keyOf(d); }
function holidayCheer(){
  const t=keyOf(new Date());
  const on=holidayOn(t);
  if(on && spanDays(on.span)>=3){
    const i=dayDiff(on.span[1],t)+1, n=spanDays(on.span), left=n-i;
    return {title:on.span[0]+"・第 "+i+" 天", text: left>0 ? "還有 "+left+" 天假期，好好休息、陪陪家人！" : "連假最後一天，好好享受，明天再一起加油！"};
  }
  const nx=HOLIDAYS.find(h=>h[1]>t && spanDays(h)>=3); if(!nx) return null;
  const n=dayDiff(t,nx[1]); if(n>7) return null;
  const d=parse(nx[1]), wd="日一二三四五六"[d.getDay()];
  const when = weekStartK(nx[1])===weekStartK(t) ? "這週"+wd : "下週"+wd;
  const len=spanDays(nx);
  if(n===1) return {title:"明天開始放"+nx[0]+"！", text:"連休 "+len+" 天，今天把事情做完就輕鬆囉，最後衝刺加油！"};
  let work=0; for(let k=t;k<nx[1];k=addDays(k,1)){ const w=parse(k).getDay(); if(w!==0 && w!==6 && !holidayOn(k)) work++; }
  return {title:when+"開始放"+nx[0], text:"連休 "+len+" 天！"+(work>0?"再撐 "+work+" 個上班日就放假了，":"")+"加油，你們最棒了！"};
}
{
  const _fb=fillBrief;
  fillBrief=function(){
    _fb.apply(this,arguments);
    if(!briefEl) return; const box=briefEl.querySelector(".bbody"); const c=holidayCheer(); if(!c||!box) return;
    const el=document.createElement("div"); el.className="cheer";
    const tx=document.createElement("div"); tx.innerHTML="<strong></strong><span></span>"; tx.firstChild.textContent=c.title; tx.lastChild.textContent=c.text;
    el.append(iconEl("lantern",34), tx); box.prepend(el);
  };
}

/* 選人卡片搬到原本「全家的行事曆」橫幅的位置 */
function dockCrew(){
  const crew=$("crew"), bar=$("solobar"); if(!crew || !bar || !bar.parentNode) return;
  let dock=$("crewdock");
  if(!dock){
    dock=document.createElement("section"); dock.id="crewdock"; dock.className="crewdock"; dock.setAttribute("aria-label","看誰的行程");
    const cap=document.createElement("div"); cap.className="dockcap"; cap.id="dockcap";
    cap.innerHTML='<span class="dc-tx"><strong></strong><small></small></span><button type="button" class="dc-btn" hidden></button>';
    cap.querySelector(".dc-btn").onclick=()=>{ const b=$("solo-back"); if(b) b.click(); };
    dock.append(cap);
    bar.parentNode.insertBefore(dock, bar);
  }
  if(crew.parentNode!==dock) dock.prepend(crew);
}
function updateDockCap(){
  const cap=$("dockcap"); if(!cap) return;
  const nm=$("solo-name"), sb=$("solo-sub"), back=$("solo-back"), bar=$("solobar");
  const show=bar && !bar.hidden;
  cap.hidden=!show;
  cap.querySelector("strong").textContent=nm?nm.textContent:"";
  cap.querySelector("small").textContent=sb?sb.textContent:"";
  const b=cap.querySelector(".dc-btn"); b.hidden=!back || back.hidden; b.textContent=back?back.textContent:"";
}
{
  const _rme2=renderMe;
  renderMe=function(){ _rme2.apply(this,arguments); dockCrew(); };
  const _as=applySolo;
  applySolo=function(){ _as.apply(this,arguments); updateDockCap(); };
  dockCrew(); updateDockCap();
}

/* 提醒框：今日不再顯示 */
const BRIEF_HIDE_KEY="brief.hideDay";
function briefHiddenToday(){ try{ return localStorage.getItem(BRIEF_HIDE_KEY)===keyOf(new Date()); }catch(e){ return false; } }
{
  const _sb=showBrief;
  showBrief=function(){
    if(!briefEl && briefHiddenToday()) return;
    const had=!!briefEl;
    _sb.apply(this,arguments);
    if(had || !briefEl) return;
    const card=briefEl.querySelector(".brief"), ok=briefEl.querySelector(".bok");
    if(!card || !ok || card.querySelector(".bskip")) return;
    const row=document.createElement("label"); row.className="bskip";
    const cb=document.createElement("input"); cb.type="checkbox"; cb.id="brief-skip";
    const tx=document.createElement("span"); tx.textContent="今日不再顯示";
    row.append(cb,tx); card.insertBefore(row, ok);
    ok.addEventListener("click",()=>{ try{ if(cb.checked) localStorage.setItem(BRIEF_HIDE_KEY,keyOf(new Date())); else localStorage.removeItem(BRIEF_HIDE_KEY); }catch(e){} });
    briefEl.addEventListener("click",e=>{ if(e.target===briefEl && cb.checked){ try{ localStorage.setItem(BRIEF_HIDE_KEY,keyOf(new Date())); }catch(err){} } });
  };
}

/* ================= 行程小圖 & 便利貼 ================= */
const STK = [
  ["bento","領便當",'<rect x="4" y="11" width="24" height="15" rx="4" fill="#f6d9b8" '+IC_O+'/><path d="M4 15h24" '+IC_O+'/><rect x="6.5" y="17" width="9" height="7" rx="2" fill="#fff" '+IC_O+'/><circle cx="20.5" cy="20.5" r="3" fill="#ffd47e" '+IC_O+'/><circle cx="20.5" cy="20.5" r="1.2" fill="#f2a24a"/><path d="M8 8.5h16l2 2.5H6z" fill="#e9a0ad" '+IC_O+'/>'],
  ["tooth","牙醫",'<path d="M9 6c3-1.2 4.8.6 7 .6S20 4.8 23 6c3.6 1.4 3 6.8 1.6 10.6-1 2.8-1.2 6-2 8.6-.6 2-2.4 2-3-.2l-1.4-4.8c-.4-1.2-2-1.2-2.4 0l-1.4 4.8c-.6 2.2-2.4 2.2-3 .2-.8-2.6-1-5.8-2-8.6C6 12.8 5.4 7.4 9 6z" fill="#fff" '+IC_O+'/><circle cx="13" cy="12.5" r="1" fill="'+IC_FACE+'"/><circle cx="19" cy="12.5" r="1" fill="'+IC_FACE+'"/><path d="M14.6 15q1.4 1.2 2.8 0" fill="none" '+IC_O+'/>'],
  ["doctor","看醫生",'<rect x="5" y="5" width="22" height="22" rx="7" fill="#fff" '+IC_O+'/><path d="M13.5 9.5h5v4h4v5h-4v4h-5v-4h-4v-5h4z" fill="#ef8f9c" '+IC_O+'/>'],
  ["car","車子",'<path d="M5 20v-3.5c0-1 .6-1.8 1.5-2.1L9 13.5l2.6-4c.5-.7 1.2-1 2-1h5.2c.8 0 1.5.4 1.9 1l2.6 4 2.5.9c.9.3 1.5 1.1 1.5 2.1V20c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2z" fill="#9fb8d6" '+IC_O+'/><path d="M11.4 13.5l2-3h5.2l2 3z" fill="#fff" '+IC_O+'/><circle cx="10" cy="22" r="2.8" fill="#fff" '+IC_O+'/><circle cx="22" cy="22" r="2.8" fill="#fff" '+IC_O+'/>'],
  ["cart","購物",'<path d="M3.5 6h3.2l3 13.2h13.2l3-9.6H8" fill="none" '+IC_O+'/><path d="M8.6 9.6h17.3l-3 9.6H10.8z" fill="#cfe0d4" '+IC_O+'/><circle cx="11.5" cy="24.5" r="2" fill="#fff" '+IC_O+'/><circle cx="21.5" cy="24.5" r="2" fill="#fff" '+IC_O+'/>'],
  ["money","繳費",'<circle cx="16" cy="16" r="11" fill="#ffd47e" '+IC_O+'/><circle cx="16" cy="16" r="7.6" fill="none" stroke="#e7a93f" stroke-width="1.4"/><path d="M18.6 12.4c-.6-.9-1.6-1.3-2.6-1.3-1.6 0-2.8.8-2.8 2.1 0 2.9 5.8 1.5 5.8 4.6 0 1.4-1.3 2.2-3 2.2-1.2 0-2.3-.5-2.9-1.4M16 9.6v1.5M16 20v1.6" fill="none" stroke="#9a6418" stroke-width="1.6" stroke-linecap="round"/>'],
  ["ball","運動",'<circle cx="16" cy="16" r="11" fill="#f4a261" '+IC_O+'/><path d="M5 16h22M16 5v22M8.2 8.2c3.4 3.6 3.4 12 0 15.6M23.8 8.2c-3.4 3.6-3.4 12 0 15.6" fill="none" stroke="#7a3e14" stroke-width="1.3"/>'],
  ["book","上課",'<path d="M4 8.5c4-1.6 8-1.6 12 .8 4-2.4 8-2.4 12-.8V25c-4-1.6-8-1.6-12 .8-4-2.4-8-2.4-12-.8z" fill="#fff" '+IC_O+'/><path d="M16 9.3v16.5" '+IC_O+'/><path d="M7 12.5c2.4-.6 4.6-.4 6.4.4M7 16.5c2.4-.6 4.6-.4 6.4.4M19 12.9c1.8-.8 4-1 6.4-.4M19 16.9c1.8-.8 4-1 6.4-.4" stroke="#b48bb8" stroke-width="1.3" stroke-linecap="round" fill="none"/>'],
  ["plane","出遊",'<path d="M27.5 6.5c-1.2-1.2-3-1-4.2.2L19 11 8.2 8.2 6 10.4l8.6 5.2-3.8 4-3.4-.6L6 20.4l4.2 2 2 4.2 1.4-1.4-.6-3.4 4-3.8 5.2 8.6 2.2-2.2L21.6 13l4.3-4.3c1.2-1.2 1.4-3 .2-4.2z" fill="#a9c7e0" '+IC_O+'/>'],
  ["party","慶祝",'<path d="M6 27 11 11l10 10z" fill="#ffd47e" '+IC_O+'/><path d="M9.4 16.5l6.2 6.2M7.6 22l3.6 3.6" stroke="#e9a0ad" stroke-width="1.6" stroke-linecap="round"/><path d="M18 6.5c.8 1.6.4 3-1.2 4M24 9c-1.8.2-3 1.2-3.2 3M25.5 15.5c-1.6-.6-3-.2-4 1.2" fill="none" stroke="#c49ac4" stroke-width="1.6" stroke-linecap="round"/><circle cx="22" cy="5" r="1.3" fill="#9fbfac"/><circle cx="27" cy="12" r="1.3" fill="#ef8f9c"/>'],
  ["phone","打電話",'<path d="M10.5 4.5l3 6.3-2.6 2.2c1.6 3.4 4 5.8 7.4 7.4l2.2-2.6 6.3 3-1 3.8c-.3 1.1-1.3 1.9-2.5 1.8C13.6 25.5 6.5 18.4 5.6 8.7c-.1-1.2.7-2.2 1.8-2.5z" fill="#cfe0d4" '+IC_O+'/>'],
  ["star","重要",'<path d="M16 4.2l3.5 7.2 7.9 1.1-5.7 5.6 1.4 7.8L16 22.2l-7.1 3.7 1.4-7.8-5.7-5.6 7.9-1.1z" fill="#ffd47e" '+IC_O+'/><circle cx="13.6" cy="15" r=".95" fill="'+IC_FACE+'"/><circle cx="18.4" cy="15" r=".95" fill="'+IC_FACE+'"/><path d="M14.8 17.4q1.2 1 2.4 0" fill="none" '+IC_O+'/>']
];
const STK_MAP = Object.fromEntries(STK.map(s=>[s[0],s]));
function stickerEl(key,w){
  const s=STK_MAP[key]; if(!s) return null;
  const t=document.createElement("template");
  t.innerHTML='<svg viewBox="0 0 32 32" width="'+w+'" height="'+w+'" class="stk" aria-hidden="true">'+s[2]+'</svg>';
  return t.content.firstChild;
}
/* 讀寫：小圖存在 Google 行程的共用欄位，豪豪也看得到 */
let curSticker="";
{
  const _me=mapEvent;
  mapEvent=function(e,src){
    const sh=(e&&e.extendedProperties&&e.extendedProperties.shared)||{};
    if(sh.kind==="memo") return null;
    const r=_me.apply(this,arguments); if(r) r.sticker=STK_MAP[sh.sticker]?sh.sticker:""; return r;
  };
  const _bf=bodyFor;
  bodyFor=function(d){ const b=_bf.apply(this,arguments); b.extendedProperties.shared.sticker=curSticker||""; return b; };
}
function renderStickerPicker(){
  let box=$("f-stk");
  if(!box){
    const field=document.createElement("div"); field.className="field";
    field.innerHTML='<span class="lbl">小圖（豪豪和霖霖都看得到；只選小圖不打字也可以）</span><div class="stkpick" id="f-stk" role="radiogroup" aria-label="小圖"></div>';
    const t=$("f-title"); const tf=t && t.closest(".field"); if(tf) tf.after(field); else $("form").prepend(field);
    box=$("f-stk");
  }
  box.textContent="";
  STK.forEach(([k,name])=>{
    const b=document.createElement("button"); b.type="button"; b.className="stkb"; b.setAttribute("role","radio");
    b.setAttribute("aria-checked", String(curSticker===k)); b.setAttribute("aria-label",name); b.title=name;
    b.append(stickerEl(k,28)); const s=document.createElement("span"); s.textContent=name; b.append(s);
    b.onclick=()=>{ curSticker = curSticker===k ? "" : k; renderStickerPicker(); };
    box.append(b);
  });
}
{
  const _os=openSheet;
  openSheet=function(ev,prefill){ curSticker = ev&&ev.sticker ? ev.sticker : (prefill&&prefill.sticker)||""; _os.apply(this,arguments); renderStickerPicker(); };
  const _fd=formData;
  formData=function(){ const t=$("f-title"); if(t && !t.value.trim() && curSticker) t.value=STK_MAP[curSticker][1]; return _fd.apply(this,arguments); };
}
/* 顯示：月曆格子、當天卡片、打開提醒 */
function decorateStickers(){
  const g=$("grid"); if(g && typeof gridRange==="function"){
    const r=gridRange();
    [...g.children].forEach((b,i)=>{
      const k=addDays(r.start,i); const list=famOn(k).slice(0,3);
      const bars=[...b.querySelectorAll(".bars b:not(.sp)")];
      list.forEach((ev,j)=>{ const bar=bars[j]; if(!bar || !ev.sticker || bar.querySelector(".stk")) return; const ic=stickerEl(ev.sticker,13); bar.prepend(ic); bar.classList.add("hasstk"); });
    });
  }
}
function decorateAgendaStickers(){
  const a=$("agenda"); if(!a) return;
  const list=famOn(sel), cards=[...a.querySelectorAll(".ev.famcard")];
  list.forEach((ev,j)=>{ const c=cards[j]; if(!c || !ev.sticker || c.querySelector(".stkbig")) return;
    const w=document.createElement("span"); w.className="stkbig"; w.append(stickerEl(ev.sticker,24)); const ti=c.querySelector(".title"); if(ti) ti.prepend(w); });
}
{
  const _rm3=renderMonth, _ra3=renderAgenda;
  renderMonth=function(){ _rm3.apply(this,arguments); decorateStickers(); };
  renderAgenda=function(){ _ra3.apply(this,arguments); decorateAgendaStickers(); };
  dayItems=function(k){
    const fam=famOn(k), g=mineOn(k);
    const mk=(e,isG)=>({allDay:!!e.allDay, start:e.start||"", end:e.end||"", title:isG?e.title:titleOn(e,k), members:isG?[]:(e.members||[]), g:isG, sticker:isG?"":(e.sticker||"")});
    return fam.map(e=>mk(e,false)).concat(g.map(e=>mk(e,true))).sort((a,b)=>a.allDay===b.allDay?a.start.localeCompare(b.start):(a.allDay?-1:1));
  };
  const _br=briefRow;
  briefRow=function(it,now){ const r=_br.apply(this,arguments); if(it.sticker){ const ic=stickerEl(it.sticker,22); ic.classList.add("bstk"); const tx=r.querySelector(".btx"); if(tx) tx.before(ic); } return r; };
}

/* ---------- 便利貼（存在 Google「家庭」日曆，兩個人都看得到） ---------- */
let memos=[], memoOpen=false;
function memoBody(text){
  const k=keyOf(new Date());
  return { summary:"便利貼："+text, start:{date:k}, end:{date:addDays(k,1)}, transparency:"transparent",
    description:(M[me]?M[me].name:"")+" 留的便利貼（Sushi 家 app）", reminders:{useDefault:false,overrides:[]},
    extendedProperties:{shared:{kind:"memo", by:me, text:text, at:String(Date.now()), app:"sushi"}} };
}
async function loadMemos(){
  if(!famCal) return;
  try{
    const since=new Date(Date.now()-400*86400000).toISOString();
    const q=new URLSearchParams({sharedExtendedProperty:"kind=memo", timeMin:since, maxResults:"200", singleEvents:"true"});
    const r=await api(calPath(famCal)+"?"+q.toString());
    memos=((r&&r.items)||[]).filter(e=>e.status!=="cancelled").map(e=>{ const sh=(e.extendedProperties&&e.extendedProperties.shared)||{};
      return {id:e.id, text:sh.text||String(e.summary||"").replace(/^便利貼：/,""), by:M[sh.by]?sh.by:"", at:Number(sh.at)||Date.parse(e.created)||0}; })
      .sort((a,b)=>b.at-a.at);
    try{ store.set("sc.memos",memos); }catch(e){}
    renderMemos(); if(briefEl) fillBrief();
  }catch(e){ if(e&&e.code==="auth") return; }
}
function memoTime(at){ const d=new Date(at), t=keyOf(new Date()), k=keyOf(d);
  const hm=String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
  return k===t ? "今天 "+hm : k===addDays(t,-1) ? "昨天 "+hm : (d.getMonth()+1)+"/"+d.getDate(); }
function memoCard(m, compact){
  const c=document.createElement("div"); c.className="memo m-"+(m.by||"x");
  if(m.by) c.append(svgEl(m.by,compact?22:26));
  const tx=document.createElement("div"); tx.className="mtx";
  const p=document.createElement("p"); p.textContent=m.text;
  const s=document.createElement("small"); s.textContent=(m.by?M[m.by].name+"・":"")+memoTime(m.at);
  tx.append(p,s); c.append(tx);
  if(!compact){
    const done=document.createElement("button"); done.type="button"; done.className="mdone"; done.setAttribute("aria-label","完成，撕掉這張便利貼"); done.title="完成";
    done.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    done.onclick=async()=>{ c.classList.add("bye"); try{ await api(calPath(famCal,m.id),{method:"DELETE"}); }catch(e){} memos=memos.filter(x=>x.id!==m.id); setTimeout(renderMemos,200); toast("撕掉了：「"+m.text+"」"); };
    c.append(done);
  }
  return c;
}
function renderMemos(){
  const anchor=$("cdbox")||$("crewdock")||$("solobar"); if(!anchor||!anchor.parentNode) return;
  let box=$("memobox");
  if(!box){
    box=document.createElement("section"); box.id="memobox"; box.className="memobox"; box.setAttribute("aria-label","便利貼");
    box.innerHTML='<div class="mhead"><strong>便利貼</strong><small id="memo-count"></small></div>'+
      '<form class="madd" id="memo-form"><input type="text" id="memo-in" maxlength="80" autocomplete="off" enterkeyhint="send"><button type="submit">貼上</button></form><div class="mlist" id="memo-list"></div>';
    anchor.parentNode.insertBefore(box, anchor);
    $("memo-form").addEventListener("submit",async e=>{
      e.preventDefault(); const inp=$("memo-in"), text=inp.value.trim(); if(!text) return;
      if(!famCal){ toast("還沒連上 Google「家庭」日曆"); return; }
      inp.value=""; const tmp={id:"tmp"+Date.now(), text, by:me, at:Date.now()}; memos.unshift(tmp); renderMemos();
      try{ const r=await api(calPath(famCal),{method:"POST",body:memoBody(text)}); tmp.id=r.id; toast("貼好了，"+(me==="dad"?"霖霖":"豪豪")+"打開就看得到"); }
      catch(err){ memos=memos.filter(x=>x!==tmp); renderMemos(); inp.value=text; toast("沒貼上，請再試一次"); }
    });
  }
  const other = me==="dad" ? "霖霖" : "豪豪";
  $("memo-in").placeholder="寫給"+other+"…（例：記得領便當）";
  $("memo-count").textContent = memos.length ? memos.length+" 張" : "";
  const list=$("memo-list"); list.textContent="";
  const show = memoOpen ? memos : memos.slice(0,3);
  show.forEach(m=>list.append(memoCard(m,false)));
  if(memos.length>3){ const more=document.createElement("button"); more.type="button"; more.className="mmore"; more.textContent= memoOpen ? "收起來" : "還有 "+(memos.length-3)+" 張"; more.onclick=()=>{ memoOpen=!memoOpen; renderMemos(); }; list.append(more); }
  if(!memos.length){ const p=document.createElement("p"); p.className="mempty"; p.textContent="還沒有便利貼，寫一句話提醒對方吧"; list.append(p); }
}
{
  const _ld=load;
  load=async function(){ const r=await _ld.apply(this,arguments); loadMemos(); return r; };
  const _fb2=fillBrief;
  fillBrief=function(){
    _fb2.apply(this,arguments);
    if(!briefEl || !memos.length) return; const box=briefEl.querySelector(".bbody"); if(!box) return;
    const s=document.createElement("section"); s.className="bsec bmemo";
    const h=document.createElement("h3"); h.textContent="便利貼"; const sm=document.createElement("small"); sm.textContent=memos.length+" 張"; h.append(sm); s.append(h);
    memos.slice(0,4).forEach(m=>s.append(memoCard(m,true)));
    const cheer=box.querySelector(".cheer"); if(cheer) cheer.after(s); else box.prepend(s);
  };
  try{ memos=store.get("sc.memos",[])||[]; }catch(e){ memos=[]; }
  renderMemos();
  if(famCal && tokenValid()) loadMemos();
}

/* 左滑刪除：小小的確認框 */
function miniConfirm(title, buttons){
  const ov=document.createElement("div"); ov.className="ov mini-ov"; ov.setAttribute("role","alertdialog"); ov.setAttribute("aria-modal","true");
  const box=document.createElement("div"); box.className="minibox";
  const p=document.createElement("p"); p.textContent=title; box.append(p);
  const row=document.createElement("div"); row.className="minirow"+(buttons.length>2?" col":"");
  const close=()=>{ ov.classList.add("out"); setTimeout(()=>ov.remove(),180); document.removeEventListener("keydown",esc); };
  const esc=e=>{ if(e.key==="Escape") close(); };
  buttons.forEach(b=>{ const btn=document.createElement("button"); btn.type="button"; btn.textContent=b.label; btn.className=b.danger?"mdanger":"mcancel";
    btn.onclick=async()=>{ if(!b.act){ close(); return; } row.querySelectorAll("button").forEach(x=>x.disabled=true); btn.textContent="刪除中…"; try{ await b.act(); } finally{ close(); } };
    row.append(btn); });
  box.append(row); ov.append(box); document.body.append(ov);
  ov.addEventListener("click",e=>{ if(e.target===ov) close(); }); document.addEventListener("keydown",esc);
  setTimeout(()=>{ const c=row.querySelector(".mcancel"); if(c) c.focus({preventScroll:true}); },40);
}
{
  const _sr=swipeRow;
  swipeRow=function(card,ev){
    const w=_sr.apply(this,arguments); const del=w.querySelector(".swdel"); if(!del) return w;
    const cancel={label:"取消"};
    del.onclick=()=>{
      if(typeof deleteEvent==="function"){
        miniConfirm("刪除「"+ev.title+"」？",[cancel,{label:"刪除",danger:true,act:()=>deleteEvent(ev)}]);
        return;
      }
      const go=async(id,all)=>{ try{ await api(calPath(famCal,id),{method:"DELETE"}); toast("已刪除「"+ev.title+"」"+(all?"（整個重複）":"")); }
        catch(e){ if(!(e&&(e.code===410||e.code===404))) toast("刪除失敗："+why(e)); } try{ closeSwipe(); }catch(_){} load(); };
      if(ev.base) miniConfirm("「"+ev.title+"」是重複行程，要刪哪些？",[{label:"只刪這一天",danger:true,act:()=>go(ev.id,false)},{label:"整個重複都刪",danger:true,act:()=>go(ev.base,true)},cancel]);
      else miniConfirm("刪除「"+ev.title+"」？",[cancel,{label:"刪除",danger:true,act:()=>go(ev.id,false)}]);
    };
    return w;
  };
}
})();
