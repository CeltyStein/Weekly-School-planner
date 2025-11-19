(function(){
  const dayOrder = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  function getUpcomingSunday(){
    const d = new Date();
    const day = d.getDay();
    const offset = day === 0 ? 0 : 7 - day;
    d.setDate(d.getDate() + offset);
    d.setHours(23,59,0,0);
    return d;
  }
  function getStoredCalendarEvents(){
    try{
      const raw = localStorage.getItem("planner-calendar-events");
      return raw ? JSON.parse(raw) : [];
    }catch(e){
      return [];
    }
  }
  const moodOptions = [
    { emoji: "😊", label: "Grateful" },
    { emoji: "😌", label: "Calm" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😵", label: "Overwhelmed" },
    { emoji: "💪", label: "Confident" },
    { emoji: "🧘", label: "Centered" },
    { emoji: "🤪", label: "Playful" }
  ];
  const buttonSelector = "button, .tab";
  let dragPayload = null;
  let audioCtx = null;
  const confettiWrapper = document.getElementById("confetti-wrapper");
  const confettiColors = ["#a855f7","#f59e0b","#10b981","#3b82f6","#ec4899"];
  const fallbackClassEvents = [
    { title:"Knowledge Check: CompTIA Linux+ and LPIC-1 Pre-Assessment Quiz [25/FA CSC-121-OL01]", start:"2025-10-19T00:00:00.000Z", end:"2025-10-19T23:59:00.000Z", allDay:true, description:"Pre-assessment quiz for Linux+ and LPIC-1." },
    { title:"Lab 9-1: Digital Forensics Analysis and Validation [25/FA CIS-602-OL01]", start:"2025-10-19T00:00:00.000Z", end:"2025-10-19T23:59:00.000Z", allDay:true, description:"Digital forensics lab." },
    { title:"Linux Chapter One Discussion Post [25/FA CSC-121-OL01]", start:"2025-10-19T00:00:00.000Z", end:"2025-10-19T23:59:00.000Z", allDay:true, description:"Initial post Friday, replies Sunday." },
    { title:"Module 9 Discussion [25/FA CIS-602-OL01]", start:"2025-10-19T00:00:00.000Z", end:"2025-10-19T23:59:00.000Z", allDay:true, description:"Data-hiding techniques discussion." },
    { title:"Module 9 Quiz [25/FA CIS-602-OL01]", start:"2025-10-19T00:00:00.000Z", end:"2025-10-19T23:59:00.000Z", allDay:true, description:"Weekly module quiz." },
    { title:"Quiz: Chapter 01 Introduction to Linux [25/FA CSC-121-OL01]", start:"2025-10-19T00:00:00.000Z", end:"2025-10-19T23:59:00.000Z", allDay:true, description:"Linux chapter 1 quiz." },
    { title:"Simulation 1-1: Overview of Linux [25/FA CSC-121-OL01]", start:"2025-10-19T00:00:00.000Z", end:"2025-10-19T23:59:00.000Z", allDay:true, description:"Hands-on Linux simulation." }
  ];
  function ensureAudio(){
    if(audioCtx) return audioCtx;
    try{
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }catch(e){
      audioCtx = null;
    }
    return audioCtx;
  }
  function playClickTone(){
    const ctx = ensureAudio();
    if(!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }
  function launchConfetti(){
    if(!confettiWrapper) return;
    const pieces = 24;
    for(let i=0;i<pieces;i++){
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      const delay = Math.random() * 0.4;
      const left = Math.random() * 100;
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      piece.style.left = `${left}%`;
      piece.style.background = color;
      piece.style.animationDuration = `${1.4 + Math.random()}s`;
      piece.style.animationDelay = `${delay}s`;
      confettiWrapper.append(piece);
      piece.addEventListener("animationend", ()=> piece.remove());
    }
  }
  function animateButton(el){
    if(!el) return;
    el.classList.add("btn-press");
    setTimeout(()=>el.classList.remove("btn-press"),180);
  }
  document.addEventListener("click", evt=>{
    const btn = evt.target.closest(buttonSelector);
    if(!btn) return;
    animateButton(btn);
    playClickTone();
  });

  const sample = {
    Monday: [
      "1-4 AM: Discussion Posts (Pomodoro)",
      "1:00-1:25 Focus, 1:25-1:30 Jumping Jacks",
      "1:30-1:55 Focus, 1:55-2:00 Jumping Jacks",
      "2:00-2:25 Focus, 2:25-2:30 Jumping Jacks",
      "2:30-2:55 Focus, 2:55-3:25 BIG BREAK Walk/Stretch",
      "5-6 AM: Easier Essays",
      "6 AM: Wake, shower, breakfast",
      "7-9 AM: Finish Essays (Pomodoro cycles)",
      "9-12 PM: Polish Essays (Pomodoro cycles)",
      "12 PM: Lunch + Coursera",
      "1-5 PM: Quizzes/Labs/Assignments (Pomodoro w/ breaks)",
      "5-6 PM: Dinner",
      "6-7 PM: Labs/Simulations",
      "8-9:30 PM: Emails (7:30-9)",
      "9:30-11 PM: Essay writing",
      "11 PM: Sleep"
    ],
    Tuesday: [
      "6 AM: Wake, shower, breakfast",
      "7-9 AM: Chill Skills",
      "9-12 PM: Chill Skills",
      "12 PM: Lunch",
      "1-5 PM: Relax (Manga, Anime)",
      "5-6 PM: Dinner",
      "6-7 PM: Free",
      "7-8:30 PM: Emails (7:30-8)",
      "8:30-9 PM: Night Routine",
      "9-11 PM: Sleep"
    ],
    Wednesday: [
      "6 AM: Wake, shower, breakfast",
      "7-9 AM: Relax",
      "9-12 PM: Work",
      "12 PM: Lunch (Spanish/Japanese)",
      "1-5 PM: Work",
      "5-6 PM: Dinner + rehab stretch",
      "6-7 PM: Martial Arts",
      "7-8:30 PM: Gym (weights/conditioning)",
      "8:30-9 PM: Night Routine",
      "9-11 PM: Sleep"
    ],
    Thursday: [
      "6 AM: Wake, shower, breakfast",
      "7-9 AM: Polish Essays (Pomodoro)",
      "9-12 PM: Check assignments, finish",
      "12 PM: Lunch",
      "1-5 PM: Study Notes (Pomodoro cycles)",
      "5-6 PM: Dinner",
      "6-7 PM: Martial Arts",
      "7-8:30 PM: Gym (weights/conditioning)",
      "8:30-9 PM: Shower + Night Routine + Sleep",
      "9-11 PM: Sleep"
    ],
    Friday: [
      "6 AM: Wake, shower, breakfast",
      "7-9 AM: Reply to Posts (Pomodoro)",
      "9-12 PM: PC Support Labs & Quizzes (Pomodoro)",
      "12 PM: Lunch",
      "1-5 PM: Textbook Study (Pomodoro cycles)",
      "5-6 PM: Dinner",
      "6-7 PM: Gym (weights)",
      "7-8:30 PM: Jiu-Jitsu",
      "8:30-9 PM: Night Routine",
      "9-11 PM: Sleep"
    ],
    Saturday: [
      "6 AM: Wake, shower, breakfast",
      "7-9 AM: Me Time Skills",
      "9-12 PM: Textbook Studies (Pomodoro)",
      "12 PM: Lunch",
      "1-5 PM: Textbook Studies (Pomodoro cycles)",
      "5-6 PM: Dinner",
      "6-7 PM: Textbook Studies",
      "7-8:30 PM: Textbook Studies",
      "8:30-9 PM: Night Routine",
      "9-11 PM: Sleep"
    ],
    Sunday: [
      "6 AM: Wake, shower, breakfast",
      "7-9 AM: PC Textbook Studies (Pomodoro)",
      "12 PM: Lunch",
      "1-5 PM: PC Studies 1–2 + Rest",
      "5-6 PM: Dinner",
      "6-7 PM: Free",
      "7-8:30 PM: Plan next week",
      "8:30-9 PM: Night Routine",
      "9-11 PM: Sleep"
    ]
  };
  const HABIT_CATEGORIES = [
    { id: "study", label: "📚 Study/Work", emoji: "📚" },
    { id: "exercise", label: "🏋️ Exercise", emoji: "🏋️" },
    { id: "meals", label: "🍽 Meals", emoji: "🍽" },
    { id: "admin", label: "🌅 Morning/Admin", emoji: "🌅" },
    { id: "free", label: "🎉 Free/Breaks", emoji: "🎉" },
    { id: "night", label: "🌙 Night", emoji: "🌙" },
    { id: "none", label: "🔖 None", emoji: "🔖" },
  ];
  const defaultHabits = [
    { name: "Spanish/French", cat: "study" },
    { name: "Stretch", cat: "exercise" },
    { name: "Guitar/Violin", cat: "study" },
    { name: "Calligraphy/Shorthand", cat: "study" },
    { name: "Japanese", cat: "study" },
    { name: "Technique", cat: "study" },
    { name: "Sewing", cat: "study" },
    { name: "Coding", cat: "study" },
    { name: "Night routine", cat: "night" },
  ];
  const blankWeek = () => [false,false,false,false,false,false,false];
  const habitCatById = (id) => HABIT_CATEGORIES.find(c => c.id === id) || HABIT_CATEGORIES[HABIT_CATEGORIES.length-1];
  const habitCatFromLabel = (label="")=>{
    const lc = label.trim().toLowerCase();
    return HABIT_CATEGORIES.find(c=>c.id===lc || c.label.toLowerCase()===lc || c.emoji===label.trim()) || HABIT_CATEGORIES[HABIT_CATEGORIES.length-1];
  };
  const createHabitId = (name="habit")=>{
    const safe = String(name||"habit").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "habit";
    return `habit-${safe}-${Date.now().toString(36)}-${Math.floor(Math.random()*9000)+1000}`;
  };
  const normalizeHabit = (h={}) => ({
    id: h.id || createHabitId(h.name),
    name: h.name || "New habit",
    cat: habitCatById(h.cat || "none").id,
    days: Array.from({length:7}, (_,i)=> !!(h.days && h.days[i]))
  });
  const defaultRoadmap = [
    { id:"phase-goals", title:"Big Picture Calisthenics Goals", range:"Skill checklist", focus:["Front lever & back lever progressions","Full planche or strong straddle planche","90° hold + handstand pushups","One-arm pullup progressions","Maltese / Iron Cross basics","Human flag and static holds","Backflip and freestyle flow"], checkpoints:[] },
    { id:"phase-1", title:"Phase 1 - Foundation & Habit", range:"0-8 weeks", focus:["Everyday Warmup + Night Stretch most days","Strength 3x/week (chest/back, legs/abs/traps, arms/shoulder/wrist)","Skill practice 4-6x/week with low volume quality reps","Fix wrist/shoulder issues before pushing difficulty"], checkpoints:["30-60s comfortable wall handstand","8-10 clean dips and pullups","Controlled dragon flag negatives to halfway","No persistent wrist/shoulder pain for 2-3 weeks"] },
    { id:"phase-2", title:"Phase 2 - Skill Families", range:"2-6 months", focus:["Pull skills on Mon + Fri","Push skills on Tue + Fri","Inversions/handstands on Wed + Thu","Protect technique by keeping fatigue low"], checkpoints:["5-10s tuck front/back lever holds","5-10s freestanding handstand","Controlled jump to backbend or flip progression"] },
    { id:"phase-3", title:"Phase 3 - Peak Skills & Freestyle", range:"6-18+ months", focus:["Test lever/planche holds weekly and film form","Build handstand pushups + one-arm pullups","Lock in safe backflip on proper surface","Keep heavy Saturday strength high"], checkpoints:["3-5s straddle front/back lever","3-5s straddle planche or strong pseudo planche pushups","Consistent backflip","Weighted pullups trending toward one-arm pullup","Visible recovery plan and film-ready form"] }
  ];
  const defaultSkills = [
    { id:"planche", title:"Planche", stages:["Tuck","Advanced Tuck","Straddle","Full"], level:0 },
    { id:"lever", title:"Front Lever", stages:["Tuck","Advanced Tuck","One-leg","Straddle","Full"], level:0 },
    { id:"handstand", title:"Handstand", stages:["Wall hold","Wall away","Freestanding 5s","Freestanding 20s"], level:0 },
    { id:"pistol", title:"Pistol Squat", stages:["Assisted","Box","Full bodyweight","Weighted"], level:0 }
  ];

  // storage detection
  const hasStorage = (()=>{ try { const k="__t"; localStorage.setItem(k,"1"); localStorage.removeItem(k); return true; } catch(e){ return false; } })();
  const S_KEY="planner_v3_data"; const M_KEY="planner_v3_mood"; const E_KEY="planner_v3_edit";
  const J_KEY="planner_v3_journal"; const NOTES_KEY="planner_v3_notes";
  const WORKOUT_KEY="planner_v3_workout"; const ROADMAP_KEY="planner_v3_roadmap"; const SKILL_KEY="planner_v3_skills"; const COACH_KEY="planner_v3_coach";
  const HABIT_HISTORY_KEY="planner_v3_habit_history"; const HABIT_HISTORY_RETENTION_DAYS=180;
  const CAL_KEY="planner-calendar-events";
  let plannerViewMode = "week";
  let classTermFilter = "all";
  let classCourses = [];
  let selectedCourseId = null;
  const RPG_KEY="planner_v3_rpg";
  const MOOD_STATE_KEY="planner_v3_mood_energy";
  const DEFAULT_ASSIGNMENT_WINDOW_DAYS = 10;
  const rpgTitles = [
    { level:1, title:"Notebook Novice" },
    { level:3, title:"Hash Function Wizard" },
    { level:5, title:"Forensics Gremlin" },
    { level:7, title:"Pomodoro Demon" },
    { level:10, title:"Week 10 Scholar" },
    { level:12, title:"Kernel Conjurer" },
    { level:15, title:"Systems Sage" }
  ];
  function xpForLevel(level){
    return 100 + (level-1)*80;
  }

  function loadEvents(){
    try{
      const raw = localStorage.getItem(CAL_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){
      return [];
    }
  }

  function saveEvents(evts){
    try{
      localStorage.setItem(CAL_KEY, JSON.stringify(evts||[]));
    }catch(e){}
    buildClassData();
    if(plannerViewMode==="class") render();
  }
  function loadRPG(){
    const raw = hasStorage ? localStorage.getItem(RPG_KEY) : null;
    if(!raw) return { level:1, xp:0 };
    try{
      const parsed = JSON.parse(raw);
      if(parsed && typeof parsed.level==="number" && typeof parsed.xp==="number"){
        return parsed;
      }
    }catch(e){}
    return { level:1, xp:0 };
  }
  function loadMoodEnergy(){
    if(!hasStorage) return { mood:"neutral", energy:"medium" };
    try{
      const raw = localStorage.getItem(MOOD_STATE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if(parsed && parsed.mood && parsed.energy) return parsed;
    }catch(e){}
    return { mood:"neutral", energy:"medium" };
  }
  function saveMoodEnergy(state){
    if(hasStorage) localStorage.setItem(MOOD_STATE_KEY, JSON.stringify(state));
  }
  function saveRPG(state){
    if(hasStorage) localStorage.setItem(RPG_KEY, JSON.stringify(state));
  }
  function addXP(amount){
    rpgState.xp = Math.max(0, rpgState.xp + amount);
    let needed = xpForLevel(rpgState.level);
    while(rpgState.xp >= needed){
      rpgState.xp -= needed;
      rpgState.level += 1;
      needed = xpForLevel(rpgState.level);
      showToast(`Level up! Now level ${rpgState.level} — ${getRpgTitle(rpgState.level)}.`, "success");
    }
    saveRPG(rpgState);
    renderRpgHUD();
  }
  function getRpgTitle(level){
    let title = "Learner";
    rpgTitles.forEach(t=>{ if(level>=t.level) title = t.title; });
    return title;
  }

  function deepCopy(x){ return JSON.parse(JSON.stringify(x)); }
  function loadData(){ if(!hasStorage) return deepCopy(sample); try{ const s = JSON.parse(localStorage.getItem(S_KEY)); if(s && typeof s==="object") return s; }catch{} return deepCopy(sample); }
  function saveData(d){ if(hasStorage) localStorage.setItem(S_KEY, JSON.stringify(d)); }
  function loadMood(){ if(!hasStorage) return {}; try{ const m = JSON.parse(localStorage.getItem(M_KEY)); if(m && typeof m==="object") return m; }catch{} return {}; }
  function saveMood(m){ if(hasStorage) localStorage.setItem(M_KEY, JSON.stringify(m)); }
  function loadJournal(){ if(!hasStorage) return []; try{ const j = JSON.parse(localStorage.getItem(J_KEY)); return Array.isArray(j)?j:[]; }catch(e){ return []; } }
  function saveJournal(list){ if(hasStorage) localStorage.setItem(J_KEY, JSON.stringify(list)); }
  function loadNotes(){ if(!hasStorage) return []; try{ const n = JSON.parse(localStorage.getItem(NOTES_KEY)); return Array.isArray(n)?n:[]; }catch(e){ return []; } }
  function saveNotes(list){ if(hasStorage) localStorage.setItem(NOTES_KEY, JSON.stringify(list)); }
  function loadHabits(){ if(!hasStorage) return null; try{ const h = JSON.parse(localStorage.getItem("habits-data")); return Array.isArray(h)?h:null; }catch(e){ return null; } }
  function saveHabits(list){ if(hasStorage) localStorage.setItem("habits-data", JSON.stringify(list)); }
    // Detect non-ASCII/garbled chars so we can ignore corrupted entries
 // function isGarbled(str=""){ return /[^\x00-\x7F]/.test(str); }
  function sanitizePlannerData(d){
    const cleaned = deepCopy(sample);
    let garbled = false;
    dayOrder.forEach(day=>{
      const arr = Array.isArray(d?.[day]) ? d[day] : [];
      cleaned[day] = arr.map(entry=>{
       // if(isGarbled(entry)) { garbled = true; return "X, "; }
        return typeof entry === "string" ? entry : String(entry||"");
      });
    });
    return { cleaned, garbled };
  }
  function loadHabitHistory(){
    if(!hasStorage) return {};
    try{
      const raw = JSON.parse(localStorage.getItem(HABIT_HISTORY_KEY));
      if(raw && typeof raw === "object"){
        const normalized = {};
        Object.keys(raw).forEach(k=>{
          if(Array.isArray(raw[k])){
            normalized[k] = raw[k].filter(v=>typeof v==="string");
          }
        });
        return normalized;
      }
    }catch(e){}
    return {};
  }
  function saveHabitHistory(){
    if(!hasStorage) return;
    localStorage.setItem(HABIT_HISTORY_KEY, JSON.stringify(habitHistory));
  }
  function formatHabitDate(date){
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth()+1).padStart(2,"0");
    const day = String(d.getDate()).padStart(2,"0");
    return `${year}-${month}-${day}`;
  }
  function getHabitWeekStart(date=new Date()){
    const d = new Date(date);
    const raw = d.getDay();
    const offset = raw === 0 ? -6 : 1 - raw;
    d.setDate(d.getDate() + offset);
    d.setHours(0,0,0,0);
    return d;
  }
  function getHabitDateForDay(dayIdx){
    const weekStart = getHabitWeekStart();
    const d = new Date(weekStart);
    d.setDate(d.getDate() + dayIdx);
    return d;
  }
  function getHabitHistorySet(habitId){
    const list = habitHistory[habitId] || [];
    return new Set(list);
  }
  function trimHabitHistory(habitId){
    const list = habitHistory[habitId] || [];
    if(!list.length) return;
    const cutoff = new Date();
    cutoff.setHours(0,0,0,0);
    cutoff.setDate(cutoff.getDate() - HABIT_HISTORY_RETENTION_DAYS);
    habitHistory[habitId] = list.filter(entry => {
      const entryDate = new Date(entry);
      return entryDate >= cutoff;
    }).sort();
  }
  function recordHabitCompletion(habitId, dayDate, completed){
    if(!habitId || !dayDate) return;
    const key = formatHabitDate(dayDate);
    const set = getHabitHistorySet(habitId);
    if(completed){
      set.add(key);
    } else {
      set.delete(key);
    }
    habitHistory[habitId] = Array.from(set).sort();
    trimHabitHistory(habitId);
    if(!habitHistory[habitId].length){
      delete habitHistory[habitId];
    }
    if(completed){
      launchConfetti();
    }
    saveHabitHistory();
  }
  function calculateConsecutiveDays(set, anchor=new Date()){
    let count = 0;
    const cursor = new Date(anchor);
    cursor.setHours(0,0,0,0);
    while(true){
      const key = formatHabitDate(cursor);
      if(!set.has(key)) break;
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }
  function calculateBestStreak(set){
    if(!set.size) return 0;
    const dates = Array.from(set).map(v => new Date(v));
    dates.sort((a,b)=>a-b);
    let best = 1;
    let current = 1;
    for(let i=1;i<dates.length;i++){
      const diff = Math.round((dates[i] - dates[i-1]) / 86400000);
      if(diff === 1){
        current += 1;
      } else if(diff === 0){
        continue;
      } else {
        current = 1;
      }
      best = Math.max(best, current);
    }
    return best;
  }
  function getSundayStart(date=new Date()){
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    d.setHours(0,0,0,0);
    return d;
  }
  function calculatePerfectWeekStreak(completions){
    const set = new Set(completions);
    let streak = 0;
    let reference = getSundayStart();
    while(true){
      let weekPerfect = true;
      for(let i=0;i<7;i++){
        const day = new Date(reference);
        day.setDate(reference.getDate() + i);
        if(!set.has(formatHabitDate(day))){
          weekPerfect = false;
          break;
        }
      }
      if(!weekPerfect) break;
      streak++;
      reference.setDate(reference.getDate() - 7);
    }
    return streak;
  }
  function updateHabitStreakPanel(){
    if(!habitStreakPanel) return;
    const completions = new Set();
    Object.values(habitHistory).forEach(list=>{ list.forEach(entry=>completions.add(entry)); });
    const sunday = getSundayStart();
    const dayLabels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    habitStreakPanel.innerHTML = "";
    const dayRow = document.createElement("div");
    dayRow.className = "habit-streak-days";
    dayLabels.forEach((label, idx)=>{
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + idx);
      const done = completions.has(formatHabitDate(day));
      const dayEl = document.createElement("div");
      dayEl.className = `habit-streak-day${done ? " on" : ""}`;
      dayEl.innerHTML = `<span class="day-label">${label}</span><span class="fire-icon">${done ? "🔥" : "🔥"}</span>`;
      dayRow.append(dayEl);
    });
    const perfect = calculatePerfectWeekStreak(completions);
    const info = document.createElement("div");
    info.className = "habit-streak-info";
    info.textContent = `Perfect streak: ${perfect} week${perfect === 1 ? "" : "s"}`;
    habitStreakPanel.append(dayRow, info);
  }
  function getHabitStreakInfo(habitId){
    const set = getHabitHistorySet(habitId);
    return {
      current: calculateConsecutiveDays(set),
      best: calculateBestStreak(set)
    };
  }
  function renderHabitHistoryDots(habitId){
    const container = document.createElement("div");
    container.className = "habit-history";
    const set = getHabitHistorySet(habitId);
    const today = new Date();
    today.setHours(0,0,0,0);
    for(let offset=6; offset>=0; offset--){
      const day = new Date(today);
      day.setDate(day.getDate() - offset);
      const key = formatHabitDate(day);
      const span = document.createElement("span");
      span.className = `habit-history-day${set.has(key) ? " on" : ""}`;
      span.title = `${key}`;
      container.append(span);
    }
    return container;
  }
  function importScheduleFrom(payload){
    if(!payload || typeof payload !== "object") return false;
    const source = (payload.schedule && typeof payload.schedule === "object") ? payload.schedule : payload;
    let changed = false;
    const next = deepCopy(sample);
    dayOrder.forEach(day=>{
      if(Array.isArray(source[day])){
        next[day] = source[day].map(entry => typeof entry === "string" ? entry : String(entry ?? ""));
        changed = true;
      }
    });
    if(!changed) return false;
    data = next;
    saveData(data);
    render();
    return true;
  }

  let data = loadData();
  const { cleaned, garbled } = sanitizePlannerData(data);
  if(garbled){
    data = cleaned;
    saveData(data);
  }
  let mood = loadMood();
  let editMode = hasStorage ? (localStorage.getItem(E_KEY) === "1") : true;
  let moodEntries = loadJournal();
  let notesData = loadNotes();
  let habitsState = loadHabits();
  let roadmapState = loadRoadmap();
  let skillProgressState = loadSkillProgress();
  let coachState = loadCoachState();
  let habitHistory = loadHabitHistory();
  let rpgState = loadRPG();
  let moodEnergyState = loadMoodEnergy();
  try{
    buildClassData();
  }catch(e){
    console.error("buildClassData failed", e);
    classCourses = [];
  }
  if(!Array.isArray(habitsState)){
    habitsState = defaultHabits.map(normalizeHabit);
  } else {
    habitsState = habitsState.map(normalizeHabit);
    let hadGarbled = false;
    habitsState.forEach((h, idx)=>{
      if(isGarbled(h.name)){
        habitsState[idx].name = "Habit";
        hadGarbled = true;
      }
    });
    if(hadGarbled) saveHabits(habitsState);
  }
  if(moodEntries.length){
    let synced = false;
    moodEntries.forEach(entry=>{
      if(!notesData.some(n=>n && n.linkedId===entry.id)){
        notesData.unshift({
          id: entry.id,
          linkedId: entry.id,
          title: entry.title || entry.mood || "Mood entry",
          body: entry.text || "",
          tag: "Mood journal",
          created: entry.created || new Date().toISOString()
        });
        synced = true;
      }
    });
    if(synced) saveNotes(notesData);
  }

  const storageNote = document.getElementById("storage-note");
  storageNote.textContent = hasStorage ? "" : "Browser storage is blocked - changes last until you close this tab.";
  const toast = document.getElementById("toast");
  function showToast(msg, cls){ toast.textContent = msg; toast.className = "toast " + (cls||""); requestAnimationFrame(()=>{ toast.classList.add("show"); }); setTimeout(()=>{ toast.classList.remove("show"); }, 1200); }
  function downloadBlob(content, filename, type){
    const blob = new Blob([content],{type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const chk = document.getElementById("chk-edit");
  chk.checked = !!editMode;
  chk.addEventListener("change",()=>{ editMode = chk.checked; if(hasStorage) localStorage.setItem(E_KEY, editMode ? "1":"0"); render(); });

  const btnSave = document.getElementById("btn-save");
  btnSave.addEventListener("click",()=>{ if(!hasStorage){ showToast("Storage blocked — not saved", "warn"); return; } saveData(data); saveMood(mood); localStorage.setItem(E_KEY, editMode ? "1":"0"); showToast("Saved to browser"); });
  const plannerImportInput = document.getElementById("planner-import-file");
  const plannerImportCSV = document.getElementById("planner-import-csv");
  const plannerExportJSON = document.getElementById("planner-export-json");
  const plannerExportCSV = document.getElementById("planner-export-csv");
  const habitStreakPanel = document.getElementById("habit-streak-hub");
  if(plannerImportInput){
    plannerImportInput.addEventListener("change",e=>{
      const file = e.target.files && e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = ()=>{
        try{
          const parsed = JSON.parse(String(reader.result || ""));
          if(importScheduleFrom(parsed)){
            showToast("Planner JSON imported!");
          }else{
            showToast("That file did not contain planner data.", "warn");
          }
        }catch(err){
          showToast("Invalid JSON file.", "warn");
        }
        plannerImportInput.value = "";
      };
      reader.readAsText(file);
    });
  }

  const panel = document.getElementById("panel-planner");
  const focusTodayBtn = document.getElementById("focus-today");
  const toggleDaysBtn = document.getElementById("toggle-days");
  const assignmentsBtn = document.getElementById("btn-assignments");
  const weekViewToggle = document.getElementById("planner-week-view");
  const classViewToggle = document.getElementById("planner-class-view");
  const rpgHud = document.getElementById("rpg-hud");
  const moodSelect = document.getElementById("mood-select");
  const energySelect = document.getElementById("energy-select");
  updateHabitStreakPanel();
  if(moodSelect) moodSelect.value = moodEnergyState.mood || "neutral";
  if(energySelect) energySelect.value = moodEnergyState.energy || "medium";

  const getPlannerDayCards = () => Array.from(panel ? panel.querySelectorAll(".card[data-day]") : []);
  const collapseAllDayCards = () => { getPlannerDayCards().forEach(card=>{ card.classList.add("collapsed"); }); };
  const expandAllDayCards = () => { getPlannerDayCards().forEach(card=>{ card.classList.remove("collapsed"); }); };
  const updateDayToggleButton = () => {
    if(!toggleDaysBtn) return;
    const cards = getPlannerDayCards();
    const allCollapsed = cards.length ? cards.every(card=>card.classList.contains("collapsed")) : false;
    toggleDaysBtn.textContent = allCollapsed ? "Expand all" : "Collapse all";
    toggleDaysBtn.setAttribute("aria-pressed", allCollapsed ? "true" : "false");
  };
  const toggleAllDayCards = () => {
    const cards = getPlannerDayCards();
    const allCollapsed = cards.length ? cards.every(card=>card.classList.contains("collapsed")) : false;
    if(allCollapsed){
      expandAllDayCards();
    }else{
      collapseAllDayCards();
    }
    updateDayToggleButton();
  };
  const focusTodayCard = () => {
    const today = new Date();
    const index = (today.getDay() + 6) % 7;
    const dayName = dayOrder[index] || dayOrder[0];
    collapseAllDayCards();
    const target = panel?.querySelector(`.card[data-day="${dayName}"]`);
    if(target){
      target.classList.remove("collapsed");
      target.scrollIntoView({behavior:"smooth", block:"center"});
    }
  };
  const addWeeklyAssignmentDeadlines = () => {
    const sundayDate = getUpcomingSunday();
    const dueDay = dayOrder[6];
    if(!dueDay) return;
    const dueLabel = `${sundayDate.toLocaleDateString()} 11:59 PM`;
    const targets = data[dueDay] || (data[dueDay]=[]);
   const templates = [
  { icon: "[P]", label: "Paper",           count: 3 },
  { icon: "[D]", label: "Discussion post", count: 4 },
  { icon: "[Q]", label: "Quiz",            count: 4 }
    ];
    let added = 0;
    templates.forEach(item=>{
      for(let i=0;i<item.count;i++){
        const entry = `${item.icon} ${item.label} ${i+1} — due ${dueLabel}`;
        if(!targets.includes(entry)){
          targets.push(entry);
          added++;
        }
      }
    });
    const labs = getStoredCalendarEvents().filter(ev=>/lab/i.test(ev.title || ""));
    labs.forEach(ev=>{
    const entry = `Ã°Å¸Â§Âª Lab: ${ev.title || "Lab"} - due ${dueLabel}`;
      if(!targets.includes(entry)){
        targets.push(entry);
        added++;
      }
    });
    if(added){
      saveData(data);
      render();
      showToast(`Added ${added} deadlines for Sunday ${sundayDate.toLocaleDateString()}.`);
    } else {
      showToast("Weekly assignment deadlines already exist.", "warn");
    }
  };

  function renderClassDashboard(){
    const wrapper = el("div",{class:"class-dashboard"});
    const filterRow = el("div",{class:"class-filter"});
    const filters = [
      {id:"all", label:"All terms"},
      {id:"fall", label:"Fall (Aug‚Dec)"},
      {id:"spring", label:"Spring (Jan‚May)"},
      {id:"summer", label:"Summer (Jun‚Aug)"}
    ];
    filters.forEach(f=>{
      const btn = el("button",{class:`btn${classTermFilter===f.id?" tab":""}`, type:"button", "aria-pressed":String(classTermFilter===f.id)}, f.label);
      btn.addEventListener("click",()=>{
        classTermFilter = f.id;
        render();
      });
      filterRow.append(btn);
    });
    wrapper.append(filterRow);

    const availableCourses = classCourses.filter(c=> classTermFilter==="all" || c.term===classTermFilter);
    if(selectedCourseId && !availableCourses.some(c=>c.id===selectedCourseId)){
      selectedCourseId = availableCourses[0]?.id || null;
    }

    if(!availableCourses.length){
      wrapper.append(el("div",{class:"note"},"No class data yet. Import your .ics file in the Calendar tab or reset after importing."));
      return wrapper;
    }

    const tabs = el("div",{class:"class-tabs"});
    availableCourses.forEach(course=>{
      const tabBtn = el("button",{
        class:`class-tab${course.id===selectedCourseId?" on":""}`,
        type:"button",
        "aria-pressed":String(course.id===selectedCourseId)
      }, course.id);
      tabBtn.addEventListener("click",()=>{
        selectedCourseId = course.id;
        render();
      });
      tabs.append(tabBtn);
    });
    wrapper.append(tabs);

    const selected = availableCourses.find(c=>c.id===selectedCourseId) || availableCourses[0];
    selectedCourseId = selected?.id || selectedCourseId;
    if(selected){
      const card = el("div",{class:"class-card"});
      const termLabel = selected.term ? selected.term.toUpperCase() : "TERM";
      card.append(
        el("div",{class:"class-card-head"},
          el("div",null,
            el("h3",null, selected.id),
            el("p",{class:"note"}, selected.code || "")
          ),
          el("div",{class:"class-term-pill"}, termLabel)
        )
      );
      const list = el("div",{class:"class-assignments"});
      const now = Date.now() - 86400000;
      const upcoming = (selected.entries||[]).filter(item=> new Date(item.due || Date.now()).getTime() >= now);
      const rows = (upcoming.length ? upcoming : selected.entries).slice(0,12);
      rows.forEach(item=>{
        const row = el("div",{class:"class-assignment"});
        const due = new Date(item.due || Date.now());
        row.append(
  el("div",{class:"class-assignment-title"}, item.title || item.rawTitle || "Assignment"),
  el(
    "div",
    {class:"class-assignment-meta"},
    `${due.toLocaleDateString()}${item.description ? " • " + item.description : ""}`
  )
);
        list.append(row);
      });
      if(!rows.length){
        list.append(el("div",{class:"note"},"No assignments found for this class."));
      }
      card.append(list);
      wrapper.append(card);
    }
    return wrapper;
  }

  function updatePlannerViewButtons(){
    if(plannerViewMode==="week"){
      weekViewToggle?.setAttribute("aria-pressed","true");
      classViewToggle?.setAttribute("aria-pressed","false");
    } else {
      classViewToggle?.setAttribute("aria-pressed","true");
      weekViewToggle?.setAttribute("aria-pressed","false");
    }
  }
  function renderRpgHUD(){
    if(!rpgHud) return;
    const needed = xpForLevel(rpgState.level);
    const pct = Math.min(100, Math.round((rpgState.xp/needed)*100));
    rpgHud.innerHTML = "";
    rpgHud.append(
      el("div",{class:"rpg-title"}, getRpgTitle(rpgState.level)),
      el("div",{class:"rpg-level"}, `Level ${rpgState.level}`),
      el("div",{class:"rpg-progress"},
        el("div",{class:"rpg-bar"}, el("span",{style:`width:${pct}%`})),
        el("div",{class:"rpg-xp"}, `${rpgState.xp} XP / ${needed} XP`)
      )
    );
  }

  function renderDangerZone(){
    const zone = document.getElementById("danger-zone");
    if(!zone) return;
    zone.innerHTML = "";
    const items = getUpcomingAssignments(5);
    if(!items.length){
      zone.append(el("div",{class:"danger-empty"},"No looming deadlines detected. Keep grinding!"));
      return;
    }
    const list = el("div",{class:"danger-list"});
    items.forEach(item=>{
      const days = item.daysLeft;
      const totalWindow = DEFAULT_ASSIGNMENT_WINDOW_DAYS;
      const pct = Math.max(0, Math.min(100, Math.round((days/totalWindow)*100)));
      const bar = el("div",{class:"danger-bar"}, el("span",{style:`width:${pct}%`}));
      const status = days > 0
        ? `${days} day${days===1?"":"s"} left`
        : "FINAL FORM: TURN IT IN TODAY.";
      const row = el("div",{class:`danger-item${days<=0?" boss":""}`},
        el("div",{class:"danger-head"},
          el("div",{class:"danger-title"}, item.title),
          el("div",{class:"danger-status"}, status)
        ),
        bar
      );
      list.append(row);
    });
    zone.append(
      el("div",{class:"danger-label"},"Danger Zone"),
      list
    );
  }

  render();
  weekViewToggle?.addEventListener("click",()=>{
    plannerViewMode = "week";
    updatePlannerViewButtons();
    render();
  });
  classViewToggle?.addEventListener("click",()=>{
    plannerViewMode = "class";
    updatePlannerViewButtons();
    render();
  });
  moodSelect?.addEventListener("change",e=>{
    moodEnergyState.mood = e.target.value;
    saveMoodEnergy(moodEnergyState);
    render();
  });
  energySelect?.addEventListener("change",e=>{
    moodEnergyState.energy = e.target.value;
    saveMoodEnergy(moodEnergyState);
    render();
  });

  const habitListEl = document.getElementById("habits-list");
  const habitProgressEl = document.getElementById("habits-progress");
  const habitAddBtn = document.getElementById("habit-add");
  const habitResetWeekBtn = document.getElementById("habit-reset-week");
  const habitSaveBtn = document.getElementById("habit-save");
  const habitExportBtn = document.getElementById("habit-export");
  const habitExportCsvBtn = document.getElementById("habit-export-csv");
  const habitImportInput = document.getElementById("habit-import");
  const habitImportCsvInput = document.getElementById("habit-import-csv");
  function calcHabitProgress(){
    const total = habitsState.length * 7;
    const done = habitsState.reduce((acc,h)=>acc + h.days.filter(Boolean).length, 0);
    return total ? Math.round(done * 100 / total) : 0;
  }
  function renderHabits(){
    if(!habitListEl) return;
    habitListEl.innerHTML = "";
    const pct = calcHabitProgress();
    if(habitProgressEl) habitProgressEl.textContent = `Week progress: ${pct}%`;
    if(!habitsState.length){
      habitListEl.append(el("div",{class:"habit-empty"},"No habits yet. Click \"Add habit\" to begin."));
      return;
    }
    habitsState.forEach((habit, idx)=>{
      const cat = habitCatById(habit.cat);
      const row = el("div",{class:"habit-row"});
      const info = el("div",{class:"habit-info"});
      const chip = el("span",{class:"chip"},cat.emoji || "Ã¢â‚¬Â¢");
      const nameInput = el("input",{type:"text",value:habit.name});
      nameInput.addEventListener("input",e=>{ habitsState[idx].name = e.target.value; });
      const select = el("select");
      HABIT_CATEGORIES.forEach(c=>{
        const opt = el("option",{value:c.id},c.label);
        if(c.id===habit.cat) opt.selected = true;
        select.append(opt);
      });
      select.addEventListener("change",e=>{ habitsState[idx].cat = e.target.value; renderHabits(); });
      info.append(chip,nameInput,select);
      row.append(info);
      const daysWrap = el("div",{class:"habit-days"});
      dayOrder.forEach((dayLabel, dayIdx)=>{

        const btn = el("button",{type:"button",class:`habit-day ${habit.days[dayIdx]?"on":""}`,title:dayLabel}, dayLabel[0]);

        btn.addEventListener("click",()=>{
          const next = !habit.days[dayIdx];
          habitsState[idx].days[dayIdx] = next;
          recordHabitCompletion(habit.id, getHabitDateForDay(dayIdx), next);
          if(next) addXP(3);
          renderHabits();
        });

        daysWrap.append(btn);

      });

      row.append(daysWrap);

      const historyPreview = renderHabitHistoryDots(habit.id);

      row.append(historyPreview);

      const actions = el("div",{style:"display:flex;gap:8px;flex-wrap:wrap;align-items:center;"});

      const streakInfo = getHabitStreakInfo(habit.id);

      const streakBadge = el("div",{class:"habit-streak"});

      streakBadge.textContent = `Streak: ${streakInfo.current}d`;

      if(streakInfo.best > streakInfo.current){

        const best = el("small",{class:"habit-streak-best"},`Best ${streakInfo.best}d`);

        streakBadge.append(best);

      }

      const removeBtn = el("button",{class:"btn",type:"button"},"Day` Remove");

      removeBtn.addEventListener("click",()=>{

        habitsState.splice(idx,1);

        delete habitHistory[habit.id];

        saveHabitHistory();

        renderHabits();

      });

      actions.append(streakBadge, removeBtn);

      row.append(actions);

      habitListEl.append(row);

    });
  }
  function saveHabitsNow(message=true){
    saveHabits(habitsState);
    if(message) showToast("Habits saved!");
  }
  habitAddBtn?.addEventListener("click",()=>{
    habitsState.push(normalizeHabit({name:"New habit", cat:"none"}));
    renderHabits();
  });
  habitResetWeekBtn?.addEventListener("click",()=>{
    habitsState = habitsState.map(h=>({...h, days: blankWeek()}));
    renderHabits();
  });
  habitSaveBtn?.addEventListener("click",()=>saveHabitsNow());
  habitExportBtn?.addEventListener("click",()=>{
    const blob = new Blob([JSON.stringify({habits:habitsState},null,2)],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "habits.json";
    a.click();
    URL.revokeObjectURL(url);
  });
  habitExportCsvBtn?.addEventListener("click",()=>{
    const header = ["Habit","Category",...dayOrder];
    const lines = [header.join(",")];
    habitsState.forEach(h=>{
      const row = [h.name.replace(/"/g,'""'), habitCatById(h.cat).label, ...h.days.map(v=>v?"1":"0")];
      lines.push(row.map(cell=>`"${cell}"`).join(","));
    });
    downloadBlob(lines.join("\n"),"habits.csv","text/csv");
    showToast("Habit CSV exported");
  });
  habitImportInput?.addEventListener("change",e=>{
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const data = JSON.parse(String(reader.result));
        const list = Array.isArray(data?.habits) ? data.habits : (Array.isArray(data) ? data : null);
        if(list){
          habitsState = list.map(normalizeHabit);
          renderHabits();
          saveHabitsNow(false);
          showToast("Habits imported!");
        }else{
          showToast("Invalid habits file","warn");
        }
      }catch(err){
        showToast("Invalid habits file","warn");
      }
      habitImportInput.value = "";
    };
    reader.readAsText(file);
  });
  renderHabits();
  function normalizePhase(phase={}){
    return {
      id: phase.id || `phase-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      title: phase.title || "New phase",
      range: phase.range || "",
      focus: Array.isArray(phase.focus) ? phase.focus.filter(Boolean) : [],
      checkpoints: Array.isArray(phase.checkpoints) ? phase.checkpoints.filter(Boolean) : []
    };
  }
  function loadRoadmap(){
    if(hasStorage){
      try{
        const raw = JSON.parse(localStorage.getItem(ROADMAP_KEY));
        if(Array.isArray(raw)) return raw.map(normalizePhase);
      }catch(e){}
    }
    return deepCopy(defaultRoadmap);
  }
  function saveRoadmap(){
    if(hasStorage) localStorage.setItem(ROADMAP_KEY, JSON.stringify(roadmapState));
  }
    function renderRoadmapEditor(){
    const container = document.getElementById("roadmap-editor");
    if(!container) return;
    container.innerHTML = "";
    roadmapState.forEach((phase, idx)=>{
      const card = document.createElement("div");
      card.className = "roadmap-card";
      const title = document.createElement("input");
      title.value = phase.title;
      title.placeholder = "Phase title";
      title.addEventListener("input",e=>{ roadmapState[idx].title = e.target.value; saveRoadmap(); });
      const range = document.createElement("input");
      range.value = phase.range;
      range.placeholder = "Timeline";
      range.addEventListener("input",e=>{ roadmapState[idx].range = e.target.value; saveRoadmap(); });
      const focus = document.createElement("textarea");
      focus.value = (phase.focus||[]).join("\n");
      focus.placeholder = "Focus (one per line)";
      focus.addEventListener("input",e=>{
        roadmapState[idx].focus = e.target.value.split(/\n+/).map(line=>line.trim()).filter(Boolean);
        saveRoadmap();
      });
      const checkpoints = document.createElement("textarea");
      checkpoints.value = (phase.checkpoints||[]).join("\n");
      checkpoints.placeholder = "Checkpoints (one per line)";
      checkpoints.addEventListener("input",e=>{
        roadmapState[idx].checkpoints = e.target.value.split(/\n+/).map(line=>line.trim()).filter(Boolean);
        saveRoadmap();
      });
      const actions = document.createElement("div");
      actions.className = "roadmap-actions";
      const remove = document.createElement("button");
      remove.className = "btn";
      remove.type = "button";
      remove.textContent = "Remove phase";
      remove.addEventListener("click",()=>{
        roadmapState.splice(idx,1);
        saveRoadmap();
        renderRoadmapEditor();
      });
      actions.append(remove);
      card.append(title, range, focus, checkpoints, actions);
      container.append(card);
    });
    const addBtn = document.createElement("button");
    addBtn.className = "btn";
    addBtn.type = "button";
    addBtn.textContent = "Add phase";
    addBtn.addEventListener("click",()=>{
      roadmapState.push(normalizePhase());
      saveRoadmap();
      renderRoadmapEditor();
    });
    container.append(addBtn);
  }

  function normalizeSkillProgress(skill={}){
    const template = defaultSkills.find(s=>s.id===skill.id);
    const stages = Array.isArray(skill.stages) && skill.stages.length ? skill.stages : (template ? template.stages.slice() : ["Stage"]);
    const id = skill.id || template?.id || `skill-${Date.now()}`;
    const title = skill.title || template?.title || "Skill";
    const level = Math.max(0, Math.min(skill.level || 0, stages.length-1));
    return { id, title, stages, level };
  }
  function loadSkillProgress(){
    if(hasStorage){
      try{
        const raw = JSON.parse(localStorage.getItem(SKILL_KEY));
        if(Array.isArray(raw)) return raw.map(normalizeSkillProgress);
      }catch(e){}
    }
    return deepCopy(defaultSkills);
  }
  function saveSkillProgress(){
    if(hasStorage) localStorage.setItem(SKILL_KEY, JSON.stringify(skillProgressState));
  }
  function updateSkillLevel(id, level){
    const skill = skillProgressState.find(s=>s.id===id);
    if(!skill) return;
    skill.level = Math.max(0, Math.min(level, skill.stages.length-1));
    saveSkillProgress();
    renderSkillVisualizer();
  }
  function renderSkillVisualizer(){
    const container = document.getElementById("skill-visualizer");
    if(!container) return;
    container.innerHTML = "";
    skillProgressState.forEach(skill=>{
      const card = document.createElement("div");
      card.className = "skill-card";
      const title = document.createElement("h4");
      title.textContent = skill.title;
      card.append(title);
      const steps = document.createElement("div");
      steps.className = "skill-steps";
      skill.stages.forEach((stage, idx)=>{
        const row = document.createElement("div");
        row.className = "skill-step" + (idx<=skill.level ? " done":"");
        const label = document.createElement("span");
        label.textContent = stage;
        row.append(label);
        if(idx !== skill.level){
          const btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = "Set here";
          btn.addEventListener("click",()=>updateSkillLevel(skill.id, idx));
          row.append(btn);
        }else{
          const badge = document.createElement("span");
          badge.style.marginLeft = "auto";
          badge.style.fontSize = "12px";
          badge.textContent = "Current";
          row.append(badge);
        }
        steps.append(row);
      });
      card.append(steps);
      container.append(card);
    });
  }
  (function initBreakChecks(){
    const updatePill = (pill)=>{
      const checkboxes = Array.from(pill.querySelectorAll("input[type='checkbox']"));
      const weekdays = Array.from(pill.querySelectorAll(".pomo-weekday"));
      if(checkboxes.length){
        pill.classList.toggle("done", checkboxes.every(cb=>cb.checked));
      } else if(weekdays.length){
        pill.classList.toggle("done", weekdays.every(btn=>btn.classList.contains("on")));
      }
    };
    document.querySelectorAll(".pomo-pill input[type='checkbox']").forEach(box=>{
      const pill = box.closest(".pomo-pill");
      if(!pill) return;
      updatePill(pill);
      box.addEventListener("change",()=>updatePill(pill));
    });
    document.querySelectorAll(".pomo-weekday").forEach(btn=>{
      const pill = btn.closest(".pomo-pill");
      btn.addEventListener("click",()=>{
        btn.classList.toggle("on");
        updatePill(pill);
      });
    });
  })();

  (function initPomodoro(){
  const durationLabel = document.getElementById("pomo-durations");
  const timeEl = document.getElementById("pomo-time");
  if(!durationLabel || !timeEl) return;

  let FOCUS_MIN = 52;
  let SHORT_BREAK_MIN = 17;
  let LONG_BREAK_MIN = 30;
  const TOTAL_CYCLES = 4;
  const tasks = [
    "30-minute ab workout - hollow holds, leg raises, bicycle crunches, planks",
    "100 Push Plan - break it into four rounds of 25 with strict form",
    "Front split stretches - lunge pulses, quad openers",
    "Recovery walk - light stroll and deep breathing between rounds"
  ];
  const autoStartEnabled = true;
  let cycle = 1;
  let cyclesCompleted = 0;
  let mode = "focus";
  let secondsLeft = FOCUS_MIN * 60;
  let running = false;
  let timerId = null;
  let breakChimeTimer = null;
  let startedAt = null;
  let beepCtx = null;

  const circleEl = document.getElementById("pomo-circle");
  const modeLabel = document.getElementById("pomo-mode");
  const modeHint = document.getElementById("pomo-mode-hint");
  const cycleEl = document.getElementById("pomo-cycle");
  const completedEl = document.getElementById("pomo-complete");
  const startBtn = document.getElementById("pomo-start");
  const skipBtn = document.getElementById("pomo-skip");
  const resetBtn = document.getElementById("pomo-reset");
  const dots = [1,2,3,4].map(n=>document.getElementById("pomo-dot"+n));
  const taskText = document.getElementById("pomo-task");
  const shuffleBtn = document.getElementById("pomo-shuffle");
  const focusInput = document.getElementById("pomo-focus-input");
  const shortInput = document.getElementById("pomo-short-input");
  const longInput = document.getElementById("pomo-long-input");
  const isTypingTarget = el => el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);

  function updateDurationLabel(){
    durationLabel.textContent = `${FOCUS_MIN}-min focus • ${SHORT_BREAK_MIN}-min short breaks • ${LONG_BREAK_MIN}-min final break`;
  }

  function playBeep(){
    try{
      if(!beepCtx){
        beepCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = beepCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, beepCtx.currentTime);
      osc.connect(beepCtx.destination);
      osc.start();
      osc.stop(beepCtx.currentTime + 0.35);
    }catch(e){
      console.warn("Audio beep failed", e);
    }
  }

  function notifyStage(){
    playBeep();
    if(!("Notification" in window)) return;
    const title = "Pomodoro Timer";
    const body = mode === "focus"
      ? `Focus session started for ${FOCUS_MIN} minutes.`
      : mode === "short"
        ? `Short break for ${SHORT_BREAK_MIN} minutes.`
        : `Long break for ${LONG_BREAK_MIN} minutes.`;
    const fire = ()=>{ try{ new Notification(title,{body}); }catch(e){ console.warn("Notification failed", e); } };
    if(Notification.permission === "granted"){
      fire();
    } else if(Notification.permission !== "denied"){
      Notification.requestPermission().then(p=>{ if(p==="granted") fire(); });
    }
  }

  function pad(n){ return String(n).padStart(2,"0"); }
  function fmt(sec){ const m = Math.floor(sec/60); const s = sec%60; return `${pad(m)}:${pad(s)}`; }
  function totalFor(which){
    if(which==="focus") return FOCUS_MIN*60;
    if(which==="short") return SHORT_BREAK_MIN*60;
    if(which==="long") return LONG_BREAK_MIN*60;
    return 0;
  }

  function updateRender(){
    const total = totalFor(mode);
    const pct = total ? ((total - secondsLeft) / total) * 100 : 0;
    const limited = Math.min(100, Math.max(0, pct));
    if(circleEl){
      const degrees = (limited / 100) * 360;
      circleEl.style.setProperty("--deg", `${degrees}deg`);
    }
    timeEl.textContent = fmt(secondsLeft);
    document.title = `${timeEl.textContent} • ${modeLabel.textContent} — Pomodoro`;
  }

  function updateCycleUI(){
    cycleEl.textContent = cycle;
    completedEl.textContent = cyclesCompleted;
    dots.forEach((dot, idx)=>{ if(dot) dot.classList.toggle("on", idx < cycle); });
  }

  function stopBreakChime(){
    if(breakChimeTimer){
      clearInterval(breakChimeTimer);
      breakChimeTimer = null;
    }
  }

  function setMode(newMode){
    stopBreakChime();
    mode = newMode;
    secondsLeft = totalFor(mode);
    startedAt = null;
    modeLabel.textContent = mode === "focus" ? "Focus" : (mode === "short" ? "Short break" : "Long break");
    modeHint.textContent = mode === "focus"
      ? `Focus for ${FOCUS_MIN} minutes.`
      : mode === "short"
        ? `Short break for ${SHORT_BREAK_MIN} minutes.`
        : `Long break for ${LONG_BREAK_MIN} minutes.`;
    updateRender();
  }

  function tick(){
    if(!running) return;
    const now = Date.now();
    if(!startedAt) startedAt = now;
    const elapsed = Math.floor((now - startedAt)/1000);
    const total = totalFor(mode);
    secondsLeft = Math.max(0, total - elapsed);
    updateRender();
    if(secondsLeft <= 0){
      nextStage();
    }
  }

  function start(){
    if(running) return;
    startedAt = Date.now() - (totalFor(mode) - secondsLeft) * 1000;
    running = true;
    timerId = setInterval(tick, 1000);
    startBtn.textContent = "Pause";
  }

  function pause(){
    running = false;
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = "Start";
  }

  function nextStage(){
    pause();
    if(mode === "focus"){
      cyclesCompleted += 1;
      cycle = cyclesCompleted + 1;
      if(cyclesCompleted % TOTAL_CYCLES === 0){
        setMode("long");
      } else {
        setMode("short");
      }
    } else {
      setMode("focus");
      if(cycle > TOTAL_CYCLES) cycle = 1;
    }
    updateCycleUI();
    notifyStage();
    if(autoStartEnabled) start();
  }

  function resetAll(){
    pause();
    stopBreakChime();
    cycle = 1;
    cyclesCompleted = 0;
    setMode("focus");
    updateCycleUI();
    addXP(5);
  }

  function skip(){
    pause();
    nextStage();
  }

  function suggestTask(force){
    if(!taskText) return;
    if(!force && mode === "focus") return;
    const pick = tasks[Math.floor(Math.random() * tasks.length)];
    const [title, detail=""] = pick.split(" - ");
    taskText.innerHTML = `<strong>${title}</strong> - ${detail}`;
  }

  startBtn.addEventListener("click", ()=>{ running ? pause() : start(); });
  skipBtn.addEventListener("click", skip);
  resetBtn.addEventListener("click", resetAll);
  shuffleBtn.addEventListener("click", ()=>suggestTask(true));
  const clampMinutes = (val)=> Math.max(1, Math.min(80, val||0));
  focusInput?.addEventListener("input", e=>{
    const val = clampMinutes(parseInt(e.target.value, 10));
    FOCUS_MIN = val;
    focusInput.value = val;
    updateDurationLabel();
    if(mode === "focus"){
      secondsLeft = FOCUS_MIN * 60;
      startedAt = null;
      updateRender();
      modeHint.textContent = `Focus for ${FOCUS_MIN} minutes.`;
    }
  });
  shortInput?.addEventListener("input", e=>{
    const val = clampMinutes(parseInt(e.target.value, 10));
    SHORT_BREAK_MIN = val;
    shortInput.value = val;
    updateDurationLabel();
    if(mode === "short"){
      secondsLeft = SHORT_BREAK_MIN * 60;
      startedAt = null;
      updateRender();
      modeHint.textContent = `Short break for ${SHORT_BREAK_MIN} minutes.`;
    }
  });
  longInput?.addEventListener("input", e=>{
    const val = clampMinutes(parseInt(e.target.value, 10));
    LONG_BREAK_MIN = val;
    longInput.value = val;
    updateDurationLabel();
    if(mode === "long"){
      secondsLeft = LONG_BREAK_MIN * 60;
      startedAt = null;
      updateRender();
      modeHint.textContent = `Long break for ${LONG_BREAK_MIN} minutes.`;
    }
  });

  document.addEventListener("keydown", e=>{
    if(isTypingTarget(e.target)) return;
    if(e.code === "Space"){
      e.preventDefault();
      running ? pause() : start();
    }
    if(e.key && e.key.toLowerCase() === "r") resetAll();
    if(e.key && e.key.toLowerCase() === "n") skip();
    if(e.key && e.key.toLowerCase() === "s") suggestTask(true);
  });

  updateDurationLabel();
  updateCycleUI();
  setMode("focus");
  suggestTask(true);
  if(autoStartEnabled){
    start();
  } else {
    updateRender();
  }
})();

  let renderCalendarPanel = ()=>{};
  (function initCalendar(){
    const rangeEl = document.getElementById("cal-range");
    const gridEl = document.getElementById("cal-grid");
    const allRow = document.getElementById("cal-all-row");
    const prevBtn = document.getElementById("cal-prev");
    const nextBtn = document.getElementById("cal-next");
    const dateInput = document.getElementById("cal-date");
    const showAllChk = document.getElementById("cal-show-all");
    const compactChk = document.getElementById("cal-compact");
    const importInput = document.getElementById("cal-import");
    const clearBtn = document.getElementById("cal-clear");
    const exportBtn = document.getElementById("cal-export-ics");
    const icsStatus = document.getElementById("cal-ics-status");
    const dayOffsets = { Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6 };
    if(!rangeEl || !gridEl) return;

    let week = startOfWeek(new Date());
    const pad = n => String(n).padStart(2,"0");
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    function startOfWeek(date){
      const d = new Date(date);
      d.setDate(d.getDate() - d.getDay());
      d.setHours(0,0,0,0);
      return d;
    }

    function parseICS(text){
      function unfold(str){ return str.replace(/\r\n[ \t]/g,"").replace(/\n[ \t]/g,""); }
      function parseDate(val){
        const s = String(val).trim();
        const y = parseInt(s.slice(0,4),10);
        const m = parseInt(s.slice(4,6),10) - 1;
        const d = parseInt(s.slice(6,8),10);
        if(s.length <= 8){
          return { date: new Date(y,m,d,0,0,0), allDay: true };
        }
        const hh = parseInt(s.slice(9,11)||"0",10);
        const mm = parseInt(s.slice(11,13)||"0",10);
        const ss = parseInt(s.slice(13,15)||"0",10);
        return { date: new Date(y,m,d,hh,mm,ss), allDay: false };
      }
      const clean = unfold(text);
      const blocks = clean.split(/BEGIN:VEVENT/).slice(1).map(b=>"BEGIN:VEVENT"+b.split(/END:VEVENT/)[0]+"END:VEVENT");
      const events = [];
      blocks.forEach(block=>{
        const lines = block.split(/\r?\n/);
        let dtstart = null;
        let dtend = null;
        let allDay = false;
        let summary = "";
        let description = "";
        let url = "";
        lines.forEach(line=>{
          if(!line) return;
          if(line.startsWith("DTSTART")){
            const val = line.split(":").slice(1).join(":").trim();
            const parsed = parseDate(val);
            dtstart = parsed.date;
            if(parsed.allDay) allDay = true;
          } else if(line.startsWith("DTEND")){
            const val = line.split(":").slice(1).join(":").trim();
            const parsed = parseDate(val);
            dtend = parsed.date;
          } else if(line.startsWith("SUMMARY")){
            summary = line.split(":").slice(1).join(":").trim().replace(/[<>]/g,"");
          } else if(line.startsWith("DESCRIPTION")){
            description = line.split(":").slice(1).join(":").trim().replace(/[<>]/g,"");
          } else if(line.startsWith("URL")){
            url = line.split(":").slice(1).join(":").trim();
          }
        });
        if(dtstart){
          events.push({
            start: dtstart.toISOString(),
            end: (dtend || dtstart).toISOString(),
            allDay,
            title: summary || "(No title)",
            description: description || "",
            url
          });
        }
      });
      return events;
    }

    function overlapsDay(ev, day){
      const start = new Date(ev.start);
      const end = new Date(ev.end);
      const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0,0,0,0);
      const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23,59,59,999);
      return start <= dayEnd && end >= dayStart;
    }

    function escapeICSValue(value){
      return (value || "").replace(/\r?\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;");
    }

    function formatDateForICS(date){
      return `${date.getFullYear()}${pad(date.getMonth()+1)}${pad(date.getDate())}`;
    }

    function formatTimestampForICS(date){
      return date.toISOString().replace(/[-:]/g,"").replace(/\.\d+Z$/,"Z");
    }

    function buildPlannerICS(){
      const weekStart = new Date(week);
      weekStart.setHours(0,0,0,0);
      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "CALSCALE:GREGORIAN",
        "PRODID:-//Failsafe Planner//EN"
      ];
      let count = 0;
      dayOrder.forEach(dayName=>{
        const entries = data[dayName] || [];
        if(!entries.length) return;
        const offset = dayOffsets[dayName] ?? 0;
        const dayDate = new Date(weekStart);
        dayDate.setDate(weekStart.getDate() + offset);
        const nextDay = new Date(dayDate);
        nextDay.setDate(dayDate.getDate() + 1);
        entries.forEach((entry, idx)=>{
          const trimmed = (entry || "").trim();
          if(!trimmed) return;
          const summary = escapeICSValue(trimmed);
          lines.push(
            "BEGIN:VEVENT",
            `UID:planner-${dayName}-${offset}-${idx}-${Date.now()}`,
            `DTSTAMP:${formatTimestampForICS(new Date())}`,
            `SUMMARY:${summary}`,
            `DESCRIPTION:${summary}`,
            `DTSTART;VALUE=DATE:${formatDateForICS(dayDate)}`,
            `DTEND;VALUE=DATE:${formatDateForICS(nextDay)}`,
            "END:VEVENT"
          );
          count += 1;
        });
      });
      lines.push("END:VCALENDAR");
      return { content: lines.join("\r\n"), count };
    }

    function updateICSStatus(message, tone){
      if(!icsStatus) return;
      icsStatus.textContent = message;
      icsStatus.classList.toggle("warn", tone === "warn");
      icsStatus.classList.toggle("success", tone === "success");
    }

    renderCalendarPanel = function(){
      const events = loadEvents();
      if(dateInput){
        dateInput.value = `${week.getFullYear()}-${pad(week.getMonth()+1)}-${pad(week.getDate())}`;
      }
      const end = new Date(week);
      end.setDate(week.getDate()+6);
rangeEl.textContent = `${week.toLocaleDateString(undefined,{month:"short",day:"numeric"})} - ${end.toLocaleDateString(undefined,{month:"short",day:"numeric"})}`;
      const showAll = showAllChk ? showAllChk.checked : true;
      const compact = compactChk ? compactChk.checked : false;
      if(allRow){
        allRow.innerHTML = "";
        const showRow = showAll && !compact;
        allRow.classList.toggle("hidden", !showRow);
        if(showRow){
          const label = document.createElement("div");
          label.textContent = "All-day";
          allRow.append(label);
          for(let i=0;i<7;i++){
            const day = new Date(week);
            day.setDate(week.getDate()+i);
            const cell = document.createElement("div");
            const allDayItems = events.filter(ev => ev.allDay && overlapsDay(ev, day));
            if(!allDayItems.length){
              cell.textContent = "";
            } else {
              allDayItems.forEach(ev=>{
                const tag = document.createElement("span");
                tag.className = "cal-tag";
                tag.textContent = ev.title;
                cell.append(tag);
              });
            }
            allRow.append(cell);
          }
        }
      }
      gridEl.innerHTML = "";
      const headTime = document.createElement("div");
      headTime.className = "cal-h";
      headTime.textContent = "Time";
      gridEl.append(headTime);
      for(let i=0;i<7;i++){
        const day = new Date(week);
        day.setDate(week.getDate()+i);
        const header = document.createElement("div");
        header.className = "cal-h";
        header.textContent = `${days[day.getDay()]} ${day.getMonth()+1}/${day.getDate()}`;
        gridEl.append(header);
      }
      for(let i=0;i<7;i++){
        const col = document.createElement("div");
        col.className = "cal-col";
        for(let h=0; h<=24; h++){
          const hour = document.createElement("div");
          hour.className = "cal-hour";
          col.append(hour);
        }
        const day = new Date(week);
        day.setDate(week.getDate()+i);
        const timedEvents = events.filter(ev => !ev.allDay && overlapsDay(ev, day));
        timedEvents.forEach(ev=>{
          const s = new Date(ev.start);
          const e = new Date(ev.end);
          const top = s.getHours()*60 + s.getMinutes();
          const bottom = e.getHours()*60 + e.getMinutes();
          const eventEl = document.createElement("div");
          eventEl.className = "event";
          eventEl.style.top = `${top}px`;
          eventEl.style.height = `${Math.max(20, bottom - top)}px`;
          eventEl.textContent = ev.title;
          if(ev.description) eventEl.title = ev.description;
          col.append(eventEl);
        });
        gridEl.append(col);
      }
    };

    prevBtn && prevBtn.addEventListener("click", ()=>{ week.setDate(week.getDate()-7); renderCalendarPanel(); });
    nextBtn && nextBtn.addEventListener("click", ()=>{ week.setDate(week.getDate()+7); renderCalendarPanel(); });
    dateInput && dateInput.addEventListener("change", e=>{
      const val = e.target.value;
      if(!val) return;
      const next = new Date(val);
      if(!isNaN(next)) week = startOfWeek(next);
      renderCalendarPanel();
    });
    showAllChk && showAllChk.addEventListener("change", renderCalendarPanel);
    compactChk && compactChk.addEventListener("change", renderCalendarPanel);
    clearBtn && clearBtn.addEventListener("click", ()=>{
      if(confirm("Clear all imported events?")){
        localStorage.removeItem(CAL_KEY);
        renderCalendarPanel();
        updateICSStatus("Imported events cleared.", "success");
      }
    });
    importInput && importInput.addEventListener("change", e=>{
      const file = e.target.files && e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try{
          const imported = parseICS(String(reader.result));
          if(imported.length){
            const existing = loadEvents();
            saveEvents(existing.concat(imported));
            updateICSStatus(`Imported ${imported.length} events from ${file.name}.`, "success");
            renderCalendarPanel();
          } else {
            updateICSStatus("No events found in that file.", "warn");
          }
        }catch(err){
          updateICSStatus("Could not read calendar file.", "warn");
        }
        importInput.value = "";
      };
      reader.readAsText(file);
    });

    exportBtn && exportBtn.addEventListener("click", ()=>{
      const { content, count } = buildPlannerICS();
      if(!count){
        updateICSStatus("No planner entries found for this week.", "warn");
        return;
      }
      const startLabel = `${week.getFullYear()}-${pad(week.getMonth()+1)}-${pad(week.getDate())}`;
      const endDate = new Date(week);
      endDate.setDate(week.getDate()+6);
      const endLabel = `${endDate.getFullYear()}-${pad(endDate.getMonth()+1)}-${pad(endDate.getDate())}`;
      const fileName = `planner-${startLabel}-${endLabel}.ics`;
      downloadBlob(content, fileName, "text/calendar;charset=utf-8");
      const rangeLabel = rangeEl ? rangeEl.textContent : `${startLabel} Ã¢â‚¬â€œ ${endLabel}`;
      updateICSStatus(`Exported ${count} planner entries for ${rangeLabel}.`, "success");
    });

    renderCalendarPanel();
      updateICSStatus("Import or export .ics files in this tab.");
    })();

  function parseCourseMeta(title){
    const match = /\[(.+?)\]/.exec(title || "");
    const code = match ? match[1].trim() : "General";
    const courseTitle = (title || "").replace(match ? match[0] : "", "").trim() || title || "";
    const parts = code.split(/\s+/);
    const termKey = (parts[0] || "").toUpperCase();
    let term = "";
    if(termKey.includes("FA")) term = "fall";
    else if(termKey.includes("SP")) term = "spring";
    else if(termKey.includes("SU")) term = "summer";
    const courseId = parts.slice(1).join(" ").trim() || code;
    return { code, courseId, courseTitle, term };
  }

  function buildClassCoursesFromEvents(events){
    const list = [];
    const map = new Map();
    events.forEach(ev=>{
      if(!ev || !ev.title) return;
      const meta = parseCourseMeta(ev.title);
      if(!map.has(meta.courseId)){
        map.set(meta.courseId,{
          id: meta.courseId,
          code: meta.code,
          term: meta.term || "all",
          entries: []
        });
      }
      map.get(meta.courseId).entries.push({
        title: meta.courseTitle || ev.title,
        rawTitle: ev.title,
        due: ev.start,
        description: ev.description || "",
        url: ev.url || ""
      });
    });
    map.forEach(course=>{
      course.entries.sort((a,b)=> new Date(a.due).getTime() - new Date(b.due).getTime());
      list.push(course);
    });
    list.sort((a,b)=> a.id.localeCompare(b.id));
    return list;
  }

  function buildClassData(){
    try{
      let events = loadEvents();
      if(!Array.isArray(events) || !events.length){
        events = fallbackClassEvents;
      }
      classCourses = buildClassCoursesFromEvents(events);
      if(!selectedCourseId && classCourses.length){
        selectedCourseId = classCourses[0].id;
      }
    }catch(err){
      console.error("buildClassData error", err);
      classCourses = [];
    }
  }

  function getUpcomingAssignments(limit=4){
    let events = loadEvents();
    if(!events || !events.length){
      events = fallbackClassEvents;
    }
    const now = Date.now();
    const upcoming = [];
    const seen = new Set();
    events.forEach(ev=>{
      if(!ev || !ev.title || !ev.start) return;
      const due = new Date(ev.start).getTime();
      if(isNaN(due)) return;
      const daysLeft = Math.ceil((due - now)/86400000);
      if(daysLeft < -7) return; // skip far past
      const key = ev.title.toLowerCase();
      if(seen.has(key)) return;
      seen.add(key);
      upcoming.push({
        title: ev.title,
        due,
        description: ev.description || "",
        daysLeft,
      });
    });
    upcoming.sort((a,b)=> a.due - b.due);
    return upcoming.slice(0, limit);
  }

  function render(){
    panel.innerHTML = "";
    updatePlannerViewButtons();
    renderDangerZone();
    renderRpgHUD();
    if(plannerViewMode === "class"){
      panel.append(renderClassDashboard());
      return;
    }
    const grid = el("div",{class:"grid"});
    dayOrder.forEach(day=>{
      const card = el("div",{class:"card","data-day":day});
      const dayBadge = el("div",{class:"day"},day);
      const toggleBtn = el("button",{class:"day-toggle",type:"button","aria-label":`Toggle ${day}`},"Ã¢â€¡â€¦");
      const toggle = (evt)=>{
        if(evt) evt.stopPropagation();
        card.classList.toggle("collapsed");
      };
      toggleBtn.addEventListener("click", toggle);
      dayBadge.addEventListener("click", toggle);
      card.append(
        dayBadge,
        toggleBtn,
        buildDay(day)
      );
      grid.append(card);
    });
    panel.append(grid, buildJournalCard());
    updateDayToggleButton();
  }

  focusTodayBtn?.addEventListener("click", focusTodayCard);
  toggleDaysBtn?.addEventListener("click", toggleAllDayCards);
  assignmentsBtn?.addEventListener("click", addWeeklyAssignmentDeadlines);
  weekViewToggle?.addEventListener("click",()=>{
    plannerViewMode = "week";
    updatePlannerViewButtons();
    render();
  });
  classViewToggle?.addEventListener("click",()=>{
    plannerViewMode = "class";
    updatePlannerViewButtons();
    render();
  });

  function handleDropEvent(e, targetDay){
    if(!editMode) return;
    e.preventDefault();
    const payload = dragPayload || safeParse(e.dataTransfer.getData("text/plain"));
    if(!payload || payload.day==null || payload.idx==null) return;
    const rows = Array.from(e.currentTarget.querySelectorAll(".row"));
    let targetIdx = rows.length;
    const hover = e.target.closest(".row");
    if(hover){
      targetIdx = parseInt(hover.getAttribute("data-idx") || "0",10);
      const rect = hover.getBoundingClientRect();
      const after = e.clientY > rect.top + rect.height/2;
      if(after) targetIdx += 1;
    }
    moveEntry(payload.day, payload.idx, targetDay, targetIdx);
    dragPayload = null;
  }

  function moveEntry(fromDay, fromIdx, toDay, toIdx){
    if(!Array.isArray(data[fromDay])) data[fromDay] = [];
    if(!Array.isArray(data[toDay])) data[toDay] = [];
    if(fromIdx < 0 || fromIdx >= data[fromDay].length) return;
    if(toIdx == null || isNaN(toIdx)) toIdx = data[toDay].length;
    const [item] = data[fromDay].splice(fromIdx,1);
    if(item===undefined) return;
    if(fromDay === toDay && fromIdx < toIdx) toIdx -= 1;
    toIdx = Math.max(0, Math.min(toIdx, data[toDay].length));
    data[toDay].splice(toIdx,0,item);
    saveData(data);
    render();
  }

  function buildDay(day){ const wrap = el("div",{class:"content"}); wrap.append(el("div",{class:"title"},"Activities")); const listWrap = el("div",{class:"planner-day","data-day":day}); listWrap.addEventListener("dragover",e=>{ if(!editMode) return; e.preventDefault(); }); listWrap.addEventListener("drop",e=>handleDropEvent(e, day)); (data[day]||[]).forEach((line,idx)=>{ listWrap.append(row(day, idx, line)); }); const add = el("button",{ class:"addrow", disabled: !editMode, onclick:()=>{ (data[day]=data[day]||[]).push("Ã¢â‚¬Â¢ Add a new itemÃ¢â‚¬Â¦"); saveData(data); render(); } },"➕ Add item"); wrap.append(listWrap, add);     wrap.append(el("div",{style:"margin-top:12px;font-weight:600;color:#6b21a8"},"Today's Mood"));
    const m = el("div",{class:"mood","aria-label":"Today's mood selector","role":"group"});
    moodOptions.forEach((option,i)=>{
      const selected = mood[day]===i;
      const s = el("span",{ role:"button", tabindex:"0", "aria-pressed": selected ? "true" : "false", "aria-label": `${option.label} mood`, class: selected ? "sel" : "" },option.emoji);
      s.addEventListener("click",()=>{
        mood[day]=i;
        saveMood(mood);
        render();
      });
      s.addEventListener("keydown",e=>{
        if(e.key==="Enter" || e.key===" "){
          e.preventDefault();
          s.click();
        }
      });
      m.append(s);
    });
    wrap.append(m);
 return wrap; }

  function buildJournalCard(){
    const card = el("div",{class:"journal-card"});
    card.append(el("h3",null,"Mood journal"), el("p",{class:"help"},"Capture how you're feeling and we'll keep it synced with the Notes tab."));
    const form = el("form",{class:"journal-form"});
    const rowWrap = el("div",{class:"journal-row"});
    const moodSelect = el("select",{id:"journal-mood"});
    ["Grateful","Motivated","Calm","Tired","Overwhelmed","Focused"].forEach(m=>{ moodSelect.append(el("option",{value:m},m)); });
    const titleInput = el("input",{type:"text",id:"journal-title",placeholder:"Optional title or tag"});
    rowWrap.append(moodSelect,titleInput);
    const textArea = el("textarea",{id:"journal-text",rows:"4",placeholder:"Write a few sentences about your mood..."});
    const submit = el("button",{type:"submit"},"Save entry");
    form.append(rowWrap,textArea,submit);
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const moodValue = moodSelect.value;
      const titleValue = titleInput.value.trim() || moodValue;
      const textValue = textArea.value.trim();
      if(!textValue){
        showToast("Please write a short entry first.","warn");
        return;
      }
      const entry = { id: Date.now(), mood: moodValue, title: titleValue, text: textValue, created: new Date().toISOString() };
      moodEntries.unshift(entry);
      saveJournal(moodEntries);
      addNoteFromMood(entry);
      titleInput.value = "";
      textArea.value = "";
      showToast("Mood saved!");
      render();
    });
    card.append(form);
    const feed = el("div",{class:"journal-feed"});
    if(!moodEntries.length){
      feed.append(el("div",{class:"journal-empty"},"No entries yet. Write your first reflection above."));
    } else {
      moodEntries.slice(0,5).forEach(entry=>{
        const item = el("div",{class:"journal-entry"});
        item.append(
          el("h4",null,entry.title || entry.mood),
          el("div",{class:"meta"}, `${new Date(entry.created || Date.now()).toLocaleString()} - ${entry.mood}`),
          el("p",null,entry.text)
        );
        feed.append(item);
      });
      if(moodEntries.length>5){
        feed.append(el("div",{class:"journal-empty"},`Showing latest 5 of ${moodEntries.length} entries.`));
      }
    }
    card.append(feed);
    return card;
  }

  function getSuggestionTag(){
    if(moodEnergyState.energy==="low" || moodEnergyState.mood==="tired") return "read";
    if(moodEnergyState.energy==="high" || moodEnergyState.mood==="energized") return "push";
    return "neutral";
  }

  function row(day, idx, text){
    const tag = tagFrom(text);
    const attrs = {class:"row","data-tag":tag,"data-idx":idx};
    if(editMode) attrs.draggable = "true";
    const r = el("div",attrs);
    if(editMode){
      r.addEventListener("dragstart",e=>{ dragPayload = {day, idx}; r.classList.add("dragging"); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", JSON.stringify(dragPayload)); });
      r.addEventListener("dragend",()=>{ dragPayload = null; r.classList.remove("dragging"); });
      const ta = el("textarea",{value:text});
      ta.addEventListener("input",e=>{ data[day][idx]=ta.value; saveData(data); r.setAttribute("data-tag",tagFrom(ta.value)); });
      const rm = el("button",{class:"remove",title:"Remove",onclick:()=>{ data[day].splice(idx,1); saveData(data); addXP(5); render(); }},"✖");
      r.append(ta,rm);
    } else {
      const suggestion = getSuggestionTag();
      const read = el("div",{class:`read ${suggestion}`},text);
      const rm = el("button",{class:"remove",title:"Remove",disabled:true},"✖");
      r.append(read,rm);
    }
    return r;
  }

  function tagFrom(t){
  // Emoji-based tags
  if (t.includes("📚")) return "blue";      // Study/Work
  if (t.includes("🏋️")) return "green";    // Exercise
  if (t.includes("🍽")) return "red";      // Meals
  if (t.includes("🎉")) return "amber";    // Free/Break
  if (t.includes("🌅") || t.includes("🌙")) return "violet"; // Morning/Night

  // Text-based fallback based on your energy
  if (moodEnergyState.energy === "low" &&
      /read|review|organize|notes/i.test(t)) return "read";

  if (moodEnergyState.energy === "high" &&
      /essay|lab|study|exam|quiz|project/i.test(t)) return "push";

  return "";
}



  function addNoteFromMood(entry){
    if(notesData.some(n=>n && n.linkedId===entry.id)) return;
    notesData.unshift({
      id: entry.id,
      linkedId: entry.id,
      title: entry.title || entry.mood || "Mood entry",
      body: entry.text || "",
      tag: "Mood journal",
      created: entry.created || new Date().toISOString()
    });
    saveNotes(notesData);
    renderNotesFeed();
  }

  function renderNotesFeed(){
    const feed = document.getElementById("notes-feed");
    if(!feed) return;
    feed.innerHTML = "";
    if(!notesData.length){
      feed.append(el("div",{class:"notes-empty"},"No notes yet. Mood entries and ChatGPT imports will appear here."));
      return;
    }
    notesData.forEach(note=>{
      const card = el("div",{class:"note-entry"});
      card.append(
        el("h4",null,note.title || "Untitled"),
        el("div",{class:"note-meta"}, `${new Date(note.created || Date.now()).toLocaleString()}${note.tag ? "•" + note.tag : "•"}`),
        el("p",null,note.body || "")
      );
      feed.append(card);
    });
  }

  // Tiny helper to create elements with optional children (strings or nodes)
  function el(tag, attrs, ...children){
    const n = document.createElement(tag);
    if(attrs){
      for(const k in attrs){
        if(k==="class") n.className = attrs[k];
        else if(k==="value") n.value = attrs[k];
        else if(k==="disabled"){ if(attrs[k]) n.setAttribute("disabled",""); }
        else if(k==="onclick") n.addEventListener("click", attrs[k]);
        else n.setAttribute(k, attrs[k]);
      }
    }
    children.flat().forEach(ch=>{
      if(ch==null) return;
      if(typeof ch === "string" || typeof ch === "number") n.append(document.createTextNode(ch));
      else n.append(ch);
    });
    return n;
  }
  function safeParse(raw){ try{ return raw ? JSON.parse(raw) : null; }catch(e){ return null; } }
  function splitCSVLine(line){
    const result = [];
    let current = "";
    let inQuotes = false;
    for(let i=0;i<line.length;i++){
      const ch = line[i];
      if(ch === '"' && line[i+1] === '"'){ current += '"'; i++; continue; }
      if(ch === '"'){ inQuotes = !inQuotes; continue; }
      if(ch === "," && !inQuotes){ result.push(current); current = ""; continue; }
      current += ch;
    }
    result.push(current);
    return result;
  }

  function parseChatGPTJSON(text){
    try{
      const parsed = JSON.parse(text);
      return normalizeChatGPTPayload(parsed);
    }catch(e){
      return [];
    }
  }

  function normalizeChatGPTPayload(payload){
    let raw = [];
    if(Array.isArray(payload)) raw = payload;
    else if(Array.isArray(payload.messages)) raw = payload.messages;
    else if(Array.isArray(payload.items)) raw = payload.items;
    else if(payload.data && Array.isArray(payload.data)) raw = payload.data;
    else if(payload.mapping && typeof payload.mapping === "object"){
      raw = Object.values(payload.mapping).map(node=>node && node.message).filter(Boolean);
    }
    const cleaned = [];
    raw.forEach(item=>{
      const msg = item.message || item;
      if(!msg) return;
      const role = msg.role || msg.author?.role || msg.sender || "assistant";
      let content = "";
      if(typeof msg.content === "string") content = msg.content;
      else if(Array.isArray(msg.content)) content = msg.content.map(part=>typeof part==="string"?part:(part.text||part.value||"")).join("\n");
      else if(msg.content && Array.isArray(msg.content.parts)) content = msg.content.parts.map(part=>typeof part==="string"?part:(part.text||part.value||"")).join("\n");
      else if(msg.body) content = msg.body;
      if(content){
        cleaned.push({role, content});
      }
    });
    return cleaned;
  }

  function addChatGPTMessages(messages){
    if(!messages.length) return false;
    const stamp = Date.now();
    messages.forEach((msg,idx)=>{
      const body = (msg.content || "").trim();
      if(!body) return;
      notesData.unshift({
        id: `chatgpt-${stamp}-${idx}`,
        title: `ChatGPT (${msg.role})`,
        body,
        tag: "ChatGPT import",
        created: new Date().toISOString()
      });
    });
    saveNotes(notesData);
    renderNotesFeed();
    return true;
  }

  const map = { "tab-planner":"panel-planner", "tab-pomodoro":"panel-pomodoro", "tab-habits":"panel-habits", "tab-notes":"panel-notes", "tab-workout":"panel-workout", "tab-settings":"panel-settings", "tab-calendar":"panel-calendar" };
  Object.keys(map).forEach(id=>{ const btn = document.getElementById(id); btn.addEventListener("click",()=>{ Object.keys(map).forEach(k=>{ document.getElementById(k).setAttribute("aria-selected", k===id ? "true":"false"); const pid = map[k]; const pn = document.getElementById(pid); pn.classList.toggle("hidden", k!==id); }); if(id==="tab-calendar") renderCalendarPanel(); if(id==="tab-notes") renderNotesFeed(); if(id==="tab-habits") renderHabits(); }); });

  renderNotesFeed();
  renderRoadmapEditor();
  renderSkillVisualizer();
  const notesExportBtn = document.getElementById("notes-export");
  if(notesExportBtn) notesExportBtn.addEventListener("click",()=>{
    if(!notesData.length){ showToast("No notes to export.","warn"); return; }
    const blob = new Blob([JSON.stringify(notesData,null,2)],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.json";
    a.click();
    URL.revokeObjectURL(url);
  });
  const notesClearBtn = document.getElementById("notes-clear");
  if(notesClearBtn) notesClearBtn.addEventListener("click",()=>{
    if(!notesData.length) return;
    if(confirm("Clear all saved notes?")){
      notesData = [];
      saveNotes(notesData);
      renderNotesFeed();
    }
  });
  const notesImportFile = document.getElementById("notes-import-file");
  if(notesImportFile) notesImportFile.addEventListener("change",e=>{
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      const messages = parseChatGPTJSON(String(reader.result||""));
      if(messages.length){
        addChatGPTMessages(messages);
        showToast(`Imported ${messages.length} messages.`);
      } else {
        showToast("No ChatGPT messages found.","warn");
      }
      notesImportFile.value = "";
    };
    reader.readAsText(file);
  });
  const notesChatBtn = document.getElementById("notes-chatgpt-btn");
  if(notesChatBtn) notesChatBtn.addEventListener("click",()=>{
    const input = document.getElementById("notes-chatgpt-text");
    if(!input) return;
    const raw = input.value.trim();
    if(!raw){ showToast("Paste ChatGPT JSON first.","warn"); return; }
    const messages = parseChatGPTJSON(raw);
    if(messages.length){
      addChatGPTMessages(messages);
      showToast(`Imported ${messages.length} messages.`);
      input.value = "";
    }else{
      showToast("No ChatGPT messages found.","warn");
    }
  });

  function initWorkoutTab(){
    const container = document.querySelector(".workout-tab");
    if(!container) return null;
    const cells = Array.from(document.querySelectorAll(".workout-editable"));
    if(!cells.length) return null;
    const defaults = cells.map(cell => cell.innerHTML);
    const toggle = document.getElementById("workout-edit-toggle");
    const saveBtn = document.getElementById("workout-save");
    const resetBtn = document.getElementById("workout-reset");
    const note = document.getElementById("workout-storage-note");
    if(note) note.textContent = hasStorage ? "" : "Browser storage is blocked - workout edits last until you close this tab.";
    const setEditMode = (on)=>{
      cells.forEach(cell => cell.setAttribute("contenteditable", on ? "true" : "false"));
      container.classList.toggle("workout-edit-on", !!on);
      if(toggle) toggle.checked = !!on;
    };
    const load = ()=>{
      if(!hasStorage) return;
      try{
        const raw = localStorage.getItem(WORKOUT_KEY);
        if(!raw) return;
        const data = JSON.parse(raw);
        if(Array.isArray(data) && data.length === cells.length){
          data.forEach((html, idx)=>{ cells[idx].innerHTML = html; });
        }
      }catch(e){}
    };
    const save = ()=>{
      if(!hasStorage){ showToast("Storage blocked — not saved","warn"); return; }
      const payload = cells.map(cell => cell.innerHTML);
      localStorage.setItem(WORKOUT_KEY, JSON.stringify(payload));
      showToast("Workout tab saved");
    };
    const reset = (silent)=>{
      if(hasStorage) localStorage.removeItem(WORKOUT_KEY);
      defaults.forEach((html, idx)=>{ cells[idx].innerHTML = html; });
      if(!silent) showToast("Workout tab reset");
    };
    toggle && toggle.addEventListener("change",e=>setEditMode(e.target.checked));
    saveBtn && saveBtn.addEventListener("click",save);
    resetBtn && resetBtn.addEventListener("click",()=>{
      if(confirm("Reset workout section to the default text?")){
        reset();
        setEditMode(false);
      }
    });
    load();
    setEditMode(false);
    return { resetToDefault: reset, setEditMode };
  }

const workoutController = initWorkoutTab();
  function initWorkoutDragAndDrop(){
    const cells = Array.from(document.querySelectorAll(".workout-editable"));
    if(!cells.length) return;
    let source = null;
    cells.forEach(cell=>{
      cell.setAttribute("draggable","true");
      cell.addEventListener("dragstart",e=>{
        source = cell;
        cell.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });
      cell.addEventListener("dragend",()=>{
        cell.classList.remove("dragging");
        source = null;
      });
      cell.addEventListener("dragover",e=>e.preventDefault());
      cell.addEventListener("drop",e=>{
        e.preventDefault();
        if(!source || source===cell) return;
        const temp = source.innerHTML;
        source.innerHTML = cell.innerHTML;
        cell.innerHTML = temp;
        if(hasStorage){
          const payload = Array.from(document.querySelectorAll(".workout-editable")).map(c=>c.innerHTML);
          localStorage.setItem(WORKOUT_KEY, JSON.stringify(payload));
        }
      });
    });
  }
  initWorkoutDragAndDrop();
  initChatbot();
  const persistBtn = document.getElementById("btn-persist");
  const persistStatus = document.getElementById("persist-status");
  const setPersistStatus = (msg)=>{ if(persistStatus) persistStatus.textContent = msg; };
  async function updatePersistStatus(){
    if(!persistStatus || !navigator.storage || !navigator.storage.persisted){
      setPersistStatus("Your browser may clear data if storage gets low.");
      return;
    }
    try{
      const granted = await navigator.storage.persisted();
      setPersistStatus(granted ? "Persistent storage is already enabled on this browser." : "Persistent storage hasn't been enabled yet.");
    }catch(e){
      setPersistStatus("Unable to check persistent storage status.");
    }
  }
  if(persistBtn){
    persistBtn.addEventListener("click",async ()=>{
      if(!navigator.storage || !navigator.storage.persist){
        setPersistStatus("Persistent storage is not supported in this browser.");
        showToast("Persistent storage isn't supported here.","warn");
        return;
      }
      try{
        const granted = await navigator.storage.persist();
        setPersistStatus(granted ? "Persistent storage granted. Your data is safer now." : "Request was denied by the browser.");
        showToast(granted ? "Persistent storage enabled!" : "Browser denied the request.", granted ? undefined : "warn");
      }catch(err){
        setPersistStatus("Could not enable persistent storage.");
        showToast("Persistent storage request failed.","warn");
      }
    });
  }
  plannerExportJSON?.addEventListener("click",()=>{
    downloadBlob(JSON.stringify(data,null,2),"planner.json","application/json");
    showToast("Planner exported");
  });
  plannerExportCSV?.addEventListener("click",()=>{
    const lines = ["Day,Entry"];
    dayOrder.forEach(day=>{
      (data[day]||[""]).forEach(entry=>{
        lines.push(`"${day.replace(/"/g,'""')}","${String(entry||"").replace(/"/g,'""')}"`);
      });
    });
    downloadBlob(lines.join("\n"),"planner.csv","text/csv");
    showToast("Planner CSV exported");
  });
  plannerImportCSV?.addEventListener("change",e=>{
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      const text = String(reader.result||"").trim();
      if(!text){ showToast("CSV file was empty","warn"); return; }
      const rows = text.split(/\r?\n/).slice(1);
      if(!rows.length){ showToast("CSV missing rows","warn"); return; }
      const next = deepCopy(sample);
      let imported = 0;
      rows.forEach(line=>{
        if(!line) return;
        const [dayCell="", entryCell=""] = splitCSVLine(line).map(s=>s.trim());
        if(dayOrder.includes(dayCell)){
          next[dayCell].push(entryCell);
          imported++;
        }
      });
      if(!imported){ showToast("No valid rows in CSV","warn"); return; }
      data = next;
      saveData(data);
      render();
      showToast(`Imported ${imported} entries`);
      plannerImportCSV.value = "";
    };
    reader.readAsText(file);
  });
 // Values that count as "true" / checked
const TRUE_VALUES = ["1","true","yes","y","x","v","✓","check","done"];

habitsState = dataRows.map(line => {
  const cells = splitCSVLine(line).map(cell =>
    cell.replace(/^"|"$/g,"").trim()
  );

  const [name = "New habit", catLabel = "", ...dayCells] = cells;
  const cat = habitCatFromLabel(catLabel).id;

  const days = dayOrder.map((_, idx) => {
    const val = (dayCells[idx] || "").trim().toLowerCase();
    return TRUE_VALUES.includes(val);
  });

  return normalizeHabit({ name, cat, days });
});

  updatePersistStatus();

  function initChatbot(){
    const toggle = document.getElementById("chatbot-toggle");
    const panel = document.getElementById("chatbot-panel");
    const form = document.getElementById("chatbot-form");
    const input = document.getElementById("chatbot-input");
    const log = document.getElementById("chatbot-messages");
    const suggestBtn = document.getElementById("chatbot-suggest");
    if(!toggle || !panel || !form || !input || !log || !suggestBtn) return;
    const replies = [
      { keywords:["plan","schedule","routine"], response:"Build your week around two anchor days and keep heavy strength away from the recovery day so energy stays high." },
      { keywords:["motivation","burnout","tired","lazy"], response:"Aim for five focused minutes. Once you move, momentum wakes up the motivation you were waiting for." },
      { keywords:["workout","training","exercise","lifting"], response:"Alternate push, pull, and skill practice. Leave a rep in reserve so tomorrow still feels inviting." },
      { keywords:["habit","streak","consistency"], response:"Stack the habit on top of an existing ritual and track it visibly. Checkmarks wire in the win." },
      { keywords:["focus","study","pomodoro","distraction"], response:"Try a 45/15 focus block, jot distractions instantly, and review them after each break so your brain trusts you." }
    ];
    appendMessage("bot","Hey! I'm your AI training buddy. Ask about workouts, focus, or staying consistent.");
    const dayTip = generateDailySuggestion();
    if(dayTip) appendMessage("bot", dayTip);
    toggle.addEventListener("click",()=>{
      panel.classList.toggle("hidden");
      if(!panel.classList.contains("hidden")) input.focus();
    });
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const message = input.value.trim();
      if(!message) return;
      appendMessage("user", message);
      input.value = "";
      setTimeout(()=>appendMessage("bot", buildReply(message)), 350);
    });
    function appendMessage(role, text){
      const bubble = document.createElement("div");
      bubble.className = `chatbot-message ${role}`;
      bubble.textContent = text;
      log.appendChild(bubble);
      log.scrollTop = log.scrollHeight;
    }
    function buildReply(message){
      const lower = message.toLowerCase();
      const rule = replies.find(entry => entry.keywords.some(key=>lower.includes(key)));
      if(rule) return rule.response;
      if(["hi","hello","hey"].some(greet=>lower.includes(greet))) return "Hey there! What's one win you can chase today?";
      return `Noted on "${message}". Breathe, hydrate, and keep logging the reps so future-you can see the arc.`;
    }
    suggestBtn.addEventListener("click",()=>{
      appendMessage("bot", generateDailySuggestion(true));
    });
  }

  function loadCoachState(){
    if(hasStorage){
      try{
        const raw = JSON.parse(localStorage.getItem(COACH_KEY));
        if(raw && typeof raw === "object") return raw;
      }catch(e){}
    }
    return { last:null,lastMsg:"" };
  }
  function generateDailySuggestion(forceFresh=false){
    const today = new Date().toDateString();
    if(!forceFresh && coachState.last === today && coachState.lastMsg) return coachState.lastMsg;
    let suggestion = "";
    const habitPct = calcHabitProgress();
    if(habitPct < 40){
      suggestion = `Habit completion is at ${habitPct}%. Pick one anchor habit and celebrate a single win today.`;
    } else {
      const laggingSkill = skillProgressState.find(skill => (skill.level||0) < skill.stages.length-1);
      if(laggingSkill){
        const currentStage = laggingSkill.stages[laggingSkill.level] || laggingSkill.stages[0];
        const nextStage = laggingSkill.stages[Math.min(laggingSkill.level+1, laggingSkill.stages.length-1)];
        suggestion = `For ${laggingSkill.title}, you're on ${currentStage}. Spend 10 minutes drilling toward ${nextStage} today.`;
      } else {
        const latestMood = moodEntries[0];
        if(latestMood){
          const days = Math.floor((Date.now() - new Date(latestMood.created || Date.now()).getTime())/86400000);
          if(days >= 2){
            suggestion = `It's been ${days} days since your last mood log. Drop a quick entry before you train.`;
          }
        }
        if(!suggestion){
          const phase = roadmapState[0];
          if(phase && phase.focus && phase.focus.length){
            suggestion = `Roadmap reminder: "${phase.focus[0]}". Lock that in before moving on.`;
          } else {
            suggestion = "Schedule looks balanced. Use one long break to film handstand form and review checkpoints.";
          }
        }
      }
    }
    coachState = { last: today, lastMsg: suggestion };
    if(hasStorage) localStorage.setItem(COACH_KEY, JSON.stringify(coachState));
    return suggestion;
  }

  document.getElementById("btn-reset").addEventListener("click",()=>{
    if(hasStorage){
      localStorage.removeItem(S_KEY);
      localStorage.removeItem(M_KEY);
      localStorage.removeItem(E_KEY);
      localStorage.removeItem(J_KEY);
      localStorage.removeItem(NOTES_KEY);
      localStorage.removeItem("habits-data");
      localStorage.removeItem(HABIT_HISTORY_KEY);
    }
    data = deepCopy(sample);
    mood = {};
    moodEntries = [];
    notesData = [];
    habitsState = defaultHabits.map(normalizeHabit);
    editMode = true;
    document.getElementById("chk-edit").checked = true;
    saveData(data);
    saveMood(mood);
    saveJournal(moodEntries);
    saveNotes(notesData);
    saveHabits(habitsState);
    if(workoutController){
      workoutController.resetToDefault(true);
      workoutController.setEditMode(false);
    }
    roadmapState = loadRoadmap();
    skillProgressState = loadSkillProgress();
    coachState = loadCoachState();
    habitHistory = {};
    renderRoadmapEditor();
    renderSkillVisualizer();
    render();
    renderNotesFeed();
    renderHabits();
    showToast("Reset complete");
  });
})();








