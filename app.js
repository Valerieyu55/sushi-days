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
const famIfSushi = ms => (Array.isArray(ms) && ms.includes("sushi")) ? ALL3.slice() : ms;
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
  {id:"hale",title:"哈樂",weekday:0,allDay:false,start:"11:30",end:"12:30",repeat:"weekly",members:ALL3},
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
function famOn(k){ return famEvents.filter(e=>onDay(e,k) && visible(e)).sort(byTime); }
function mineOn(k){
  if(!filter.includes("g")) return [];
  const fam=famOn(k).map(e=>norm(cleanTitle(e.title)));
  return mineEvents.filter(e=>onDay(e,k) && !isBirthdayOther(e) && !fam.some(t=>t && (norm(cleanTitle(e.title)).includes(t)||t.includes(norm(cleanTitle(e.title)))))).sort(byTime);
}
function setPeople(list){ filter = list.concat(filter.includes("g")?["g"]:[]); applyFilter(); }
function applyFilter(){ store.set("sc.filter2",filter); const pp=people(); renderMe(pp.length===1?pp[0]:null); renderFilters(); renderMonth(); renderAgenda(); applySolo(); }

/* ---------------- render ---------------- */
function applySolo(){
  const pp=people(), k=pp.length===1?pp[0]:(pp.length===3?"all":null);
  if(k) document.body.dataset.solo=k; else delete document.body.dataset.solo;
  $("solobar").hidden=!k;
  const ic=$("solo-ic"); ic.textContent=""; ic.classList.toggle("trio",k==="all");
  if(k==="all"){ ["mom","sushi","dad"].forEach(m=>ic.append(svgEl(m,38))); $("solo-name").textContent="全家的行事曆"; $("solo-sub").textContent="霖霖、豪豪和 Sushi 的行程都在這裡"; $("solo-back").hidden=true; }
  else if(k){ ic.append(svgEl(k,56)); $("solo-name").textContent=M[k].name+"的行事曆"; $("solo-sub").textContent="只顯示有"+M[k].name+"的行程"; $("solo-back").hidden=false; }
  if(k && filter.includes("g")){ const gb=document.createElement("span"); gb.className="gbadge"; gb.textContent="G"; ic.append(gb);
    $("solo-name").textContent=(k==="all"?"全家":M[k].name)+" ＋ 我的 Google"; $("solo-sub").textContent=(k==="all"?"全家的行程":"有"+M[k].name+"的行程")+"，加上你自己的 Google 行程"; }
  const meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.content=getComputedStyle(document.body).backgroundColor;
}
function renderFilters(){
  const f=$("filters"); f.textContent="";
  const allBtn=document.createElement("button"); allBtn.type="button"; allBtn.className="chip"; allBtn.id="flt-all"; allBtn.dataset.m="all";
  allBtn.setAttribute("aria-pressed", people().length===3); allBtn.textContent="全家"; allBtn.style.paddingLeft="14px";
  allBtn.onclick=()=>setPeople(ALL3.slice()); f.append(allBtn);
  Object.entries(M).concat([["g",{name:"我的 Google"}]]).forEach(([k,v])=>{
    const b=document.createElement("button"); b.type="button"; b.className="chip"; b.dataset.m=k; b.id="flt-"+k;
    b.setAttribute("aria-pressed", k==="g" ? filter.includes("g") : isSolo(k));
    const i=document.createElement("span"); i.className="ic"+(k==="g"?" g":""); if(k==="g") i.textContent="G"; else i.append(svgEl(k,26));
    const s=document.createElement("span"); s.textContent=v.name; b.append(i,s);
    b.onclick=()=>{ if(k==="g"){ filter = filter.includes("g") ? filter.filter(x=>x!=="g") : filter.concat("g"); applyFilter(); } else setPeople(isSolo(k) ? ALL3.slice() : [k]); };
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
async function findFamilyCal(){
  try{
    const r=await api("/users/me/calendarList?maxResults=250");
    const items=(r&&r.items)||[];
    const prim=items.find(c=>c.primary); if(prim) store.set("sc.email",prim.id);
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
      if(k==="sushi" && !draftWho.includes("sushi")){ draftWho=ALL3.slice(); renderWho(); toast("有 Sushi 的行程會自動變成全家"); return; }
      if(k!=="sushi" && draftWho.includes("sushi") && draftWho.includes(k)){ toast("有 Sushi 的行程是全家行程"); return; }
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
  $("f-gnote").textContent = ev && ev.base ? "這是重複行程：修改會套用到每一次（日期不能改）；刪除時可以選只刪這一天。" : (moveFrom ? "會從你的個人 Google 日曆移到「家庭」日曆，不會變成兩筆。" : "儲存後會出現在 Google「家庭」日曆，提醒由 Google 日曆發出。");
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
    const wasEdit=!!editing; closeSheet(); toast(wasEdit?"已更新":"已新增「"+d.title+"」"); load();
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
$("solo-back").onclick=()=>setPeople(ALL3.slice());
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
})();
