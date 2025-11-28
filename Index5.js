// Bunker Mode: Room Integrity + Narrative Briefing integration
(function(){
  // Utilities reused
  const normalizeTitle = (t="")=> String(t||"").trim();
  const startOfWeek = (date)=>{ const d=new Date(date); const day=d.getDay(); const diff=day===0?6:day-1; d.setDate(d.getDate()-diff); d.setHours(0,0,0,0); return d; };
  const el = (tag, attrs, ...children)=>{ const n=document.createElement(tag); if(attrs&&typeof attrs==="object"&&!Array.isArray(attrs)){ Object.entries(attrs).forEach(([k,v])=>{ if(k==="class") n.className=v; else if(k==="onclick") n.addEventListener("click",v); else n.setAttribute(k,v); }); children.forEach(c=>appendChild(n,c)); } else { [attrs,...children].forEach(c=>appendChild(n,c)); } return n; };
  const appendChild = (parent, child)=>{ if(child==null||child===false) return; if(Array.isArray(child)) return child.forEach(c=>appendChild(parent,c)); if(child instanceof Node) return parent.appendChild(child); parent.appendChild(document.createTextNode(String(child))); };

  // Derive Danger Zone items
  function getDangerItems(){
    return Array.from(document.querySelectorAll(".danger-item")).map(row=>{
      const titleEl = row.querySelector(".danger-title");
      const statusEl = row.querySelector(".danger-status");
      const btn = row.querySelector(".danger-done-btn");
      return {
        el: row,
        title: titleEl?.textContent?.trim() || "",
        status: statusEl?.textContent?.trim() || "",
        done: btn && /defeated/i.test(btn.textContent||""),
      };
    }).filter(r=>r.title);
  }

  // Room integrity calculations
  function computeRooms(){
    const items = getDangerItems();
    const roomHealth = new Map();
    const roomItems = new Map();
    const bump = (room, delta)=> roomHealth.set(room, Math.max(0, Math.min(100, (roomHealth.get(room)||100)+delta)));
    const extractRoom = (title="")=>{
      const m = /\[(.+?)\]/.exec(title);
      if(m && m[1]) return m[1].trim();
      return "Ops Center";
    };
    items.forEach(it=>{
      if(it.done) return;
      const room = extractRoom(it.title);
      if(!roomItems.has(room)) roomItems.set(room, []);
      roomItems.get(room).push(it);
      const status = it.status.toLowerCase();
      if(status.includes("final form") || status.includes("overdue")) bump(room, -30);
      else if(status.includes("1 day") || status.includes("today")) bump(room, -20);
      else if(status.includes("2 day")) bump(room, -15);
      else if(status.includes("3 day")) bump(room, -10);
      else bump(room, -5);
    });
    return Array.from(roomHealth.entries()).map(([name,integrity])=>({
      name,
      integrity,
      items: roomItems.get(name)||[]
    }));
  }

  function renderRoomsCard(){
    const cardHost = document.getElementById("rooms-card");
    const rooms = computeRooms().sort((a,b)=> a.integrity - b.integrity);
    if(!cardHost) return;
    cardHost.innerHTML = "";
    if(!rooms.length){
      cardHost.classList.add("hidden");
      return;
    }
    cardHost.classList.remove("hidden");
    const list = el("div",{class:"rooms-list"},
      ...rooms.slice(0,5).map(room=>{
        const cls = room.integrity<40 ? "low" : room.integrity<70 ? "mid" : "ok";
        return el("div",{class:`room-row ${cls}`},
          el("div",{class:"room-name"}, room.name),
          el("div",{class:"room-bar"}, el("span",{style:`width:${room.integrity}%`})),
          el("div",{class:"room-meta"}, `${room.integrity}%`),
          el("button",{class:"btn room-repair",type:"button",onclick:()=>repairRoom(room)},"Repair")
        );
      })
    );
    cardHost.append(
      el("div",{class:"rooms-head"},"Room Integrity"),
      list
    );
  }

  // Briefing generation (simple wrapper)
  function renderBriefingStrip(){
    const strip = document.getElementById("daily-briefing");
    if(!strip) return;
    strip.classList.remove("hidden");
  }

  function repairRoom(room){
    // Filter Danger Zone to that room's tasks (by [Room] tag)
    const dz = document.getElementById("danger-zone");
    if(dz){
      const rows = Array.from(dz.querySelectorAll(".danger-item"));
      rows.forEach(r=>{
        const title = r.querySelector(".danger-title")?.textContent || "";
        r.style.display = title.includes(`[${room.name}]`) ? "" : "none";
      });
    }
    // Start Pomodoro on next mission for that room if available (integrates with existing controls)
    const next = (room.items||[]).find(it=> !it.done);
    if(next){
      try{
        const startBtn = document.getElementById("pomo-start");
        const modeLabel = document.getElementById("pomo-mode");
        if(startBtn && modeLabel){
          modeLabel.textContent = "Focus";
          startBtn.click();
        }
      }catch(e){}
    }
  }

  function initDangerEnhancements(){
    // insert card shell if missing
    const dz = document.querySelector("#danger-zone");
    if(dz && !document.getElementById("rooms-card")){
      const card = document.createElement("div");
      card.id = "rooms-card";
      card.className = "rooms-card hidden";
      dz.parentElement?.insertBefore(card, dz);
    }
    renderRoomsCard();
    renderBriefingStrip();
    // re-render when strikes happen
    document.addEventListener("click", (e)=>{
      const btn = e.target.closest(".danger-done-btn");
      if(btn) setTimeout(renderRoomsCard, 50);
    });
  }

  document.addEventListener("DOMContentLoaded", initDangerEnhancements);
})();
