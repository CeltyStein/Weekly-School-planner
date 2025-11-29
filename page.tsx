export default function HomePage() {
  return (
    <>
<div className="wrap">
<img id="phone-icon" className="decor" src="phone.png" alt="Decorative phone icon"/> 
<img id="pglasses-icon" className="decor" src="pglasses.png" alt="Decorative sunglasses"/> 




  <header>
    <h1>Your Productivity Hub</h1>
    <p>Planner • Pomodoro • Habits • Assignments • Notes</p>
                    <nav role="tablist" aria-label="Planner navigation">
      <button className="tab" id="tab-planner" role="tab" aria-selected="true" aria-controls="panel-planner">📅 Planner</button>
      <button className="tab" id="tab-pomodoro" role="tab" aria-selected="false" aria-controls="panel-pomodoro">🍅 Pomodoro</button>
      <button className="tab" id="tab-habits" role="tab" aria-selected="false" aria-controls="panel-habits">✅ Habits</button>
      <button className="tab" id="tab-notes" role="tab" aria-selected="false" aria-controls="panel-notes">📝 Notes</button>
      <button className="tab" id="tab-workout" role="tab" aria-selected="false" aria-controls="panel-workout">🏋️‍♀️ Weekly Workout</button>
      <button className="tab" id="tab-settings" role="tab" aria-selected="false" aria-controls="panel-settings">⚙️ Settings</button>
      <button className="tab" id="tab-calendar" role="tab" aria-selected="false" aria-controls="panel-calendar">📆 Calendar</button>
      <button className="tab" id="tab-danger" role="tab" aria-selected="false" aria-controls="panel-danger">⚠️ Danger View</button>
    </nav>
    <div className="controls">
      <label className="toggle">
        <input type="checkbox" id="chk-edit" />
        <span>✏️ Editing mode</span>
      </label>
      <button className="btn" id="btn-save">💾 Save to browser</button>
      <label className="btn file-label" htmlFor="planner-import-file">📥 Import JSON</label>
      <input type="file" id="planner-import-file" accept="application/json" className="file-input-hidden">
      <span id="storage-note" className="note"></span>
    </div>
    <div className="planner-exports">
      <button className="btn" id="planner-export-json">📤 Export JSON</button>
      <button className="btn" id="planner-export-csv">📤 Export CSV</button>
      <label className="btn file-label" htmlFor="planner-import-csv">📥 Import CSV</label>
      <input type="file" id="planner-import-csv" accept=".csv" className="file-input-hidden" />
    </div>
        <div className="view-controls">
      <button className="btn" id="focus-today">🔥 Focus Today</button>
      <button className="btn" id="toggle-days" aria-pressed="false">↕️ Collapse all</button>
      <button className="btn" id="btn-assignments">🗂️ Add weekly deadlines</button>
      <button className="btn" id="btn-assignments-modal" type="button">🧾 Assignments</button>
      <button className="btn" id="btn-workload">📊 What my Workload is</button>
      <label className="emoji-toggle">
        <input type="checkbox" id="emoji-mode-toggle" /> Emoji mode
      </label>
      <label className="emoji-toggle">
        <input type="checkbox" id="forbidden-toggle" /> Forbidden Knowledge
      </label>
      <button className="btn" id="btn-roulette" type="button">Retrieval Roulette</button>
      <button className="btn" id="btn-mistakes" type="button">Mistake Museum</button>
      <button className="btn" id="btn-shutdown" type="button">Shutdown (Reflect)</button>
      <button className="btn" id="btn-audit" type="button">📝 Submission Audit</button>
      <button className="btn" id="btn-pacer-mode" type="button">🏃‍♂️ PACER Mode</button>
      <button className="btn" id="btn-study-plan" type="button">🎓 Study Plan</button>
      <button className="btn" id="btn-rituals" type="button">🔮 Rituals</button>
      <div className="view-toggle">
        <button className="btn tab" id="planner-week-view" aria-pressed="true">Week view</button>
        <button className="btn tab" id="planner-class-view" aria-pressed="false">Class view</button>
      </div>
      <div id="rpg-hud" className="rpg-hud"></div>
      <div id="daily-streak" className="daily-streak-chip" aria-live="polite">
        <div className="daily-streak-icon">🔥</div>
        <div className="daily-streak-body">
          <div className="daily-streak-label">Daily check-in</div>
          <div className="daily-streak-count"><span id="daily-streak-count">0</span> day streak</div>
          <div className="daily-streak-meta">Best <span id="daily-streak-best">0</span> | <span id="daily-streak-note">Back tomorrow for +15 XP.</span></div>
        </div>
      </div>
      <div className="mood-energy">
        <label> Mood:
          <select id="mood-select" aria-label="Select mood">
            <option value="neutral">🙂 Neutral</option>
            <option value="tired">😴 Tired</option>
            <option value="energized">⚡ Energized</option>
          </select>
        </label>
        <label> Energy:
          <select id="energy-select" aria-label="Select energy">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
    </div>
    <div id="story-mode-card" className="story-mode-card card" aria-live="polite">
      <div className="story-mode-head">
        <div>
          <p className="story-chip">Story Mode</p>
          <h3>Cyber-Forensics Narrative</h3>
        </div>
        <div id="story-mode-stage" className="story-mode-stage">Boot Camp Operative</div>
      </div>
      <p id="story-mode-text">HQ is syncing your intel. Import your .ics feed to unlock the next briefing.</p>
      <ul id="story-mode-list" className="story-mode-list"></ul>
      <div id="story-mode-footer" className="story-mode-footer"></div>
    </div>
    <div id="reflection-card" className="reflection-card card">
      <div className="reflection-head">
        <div>
          <p className="story-chip">Reflect & Grow</p>
          <h3>Weekly review</h3>
        </div>
        <button className="btn ghost" type="button" id="reflection-new">New prompt</button>
      </div>
      <p id="reflection-prompt" className="reflection-prompt">This week, what felt easier than it did last week?</p>
      <textarea id="reflection-input" placeholder="Write a few sentences about the progress you felt, not just the numbers."></textarea>
      <div className="reflection-foot">
        <div className="reflection-meta" id="reflection-meta"></div>
        <button className="btn" type="button" id="reflection-save">Log reflection</button>
      </div>
    </div>
    <div id="workload-card" className="card workload-card hidden" aria-live="polite">
      <div className="workload-head">
        <h3>📊 What my Workload is</h3>
        <p className="note">Pulled from your imported calendar and shown for the current + next week.</p>
        <button className="btn ghost" id="workload-close" type="button">Close</button>
      </div>
      <div id="workload-list" className="workload-list"></div>
    </div>
  </header>

  <main className="section">
    <section id="panel-planner" role="tabpanel" aria-labelledby="tab-planner"></section>
    <section id="panel-pomodoro" role="tabpanel" aria-labelledby="tab-pomodoro" className="hidden">
      <div className="pomo-card">
        <div className="pomo-header">
          <div>
            <h2>⏳ Deep Focus Pomodoro</h2>
            <p className="pomo-durations" id="pomo-durations">52-min focus • 17-min short breaks • 30-min final break</p>
          </div>
          <div className="pomo-focus-inputs">
            <label className="pomo-focus-input">
              Focus (min):
              <input id="pomo-focus-input" type="number" min="1" max="80" value="52" />
            </label>
            <label className="pomo-focus-input">
              Short break (min):
              <input id="pomo-short-input" type="number" min="1" max="80" value="17" />
            </label>
            <label className="pomo-focus-input">
              Long break (min):
              <input id="pomo-long-input" type="number" min="1" max="80" value="30" />
            </label>
          </div>
        </div>
        <div className="pomo-layout">
          <div className="pomo-panel">
            <div className="pomo-status">
              <span>Mode: <strong id="pomo-mode">Focus</strong></span>
              <span>Cycle <strong id="pomo-cycle">1</strong> / 4</span>
            </div>
            <div className="pomo-circle" id="pomo-circle">
              <div className="pomo-time" id="pomo-time">52:00</div>
            </div>
            <div className="pomo-mode" id="pomo-mode-hint">Focus for 52 minutes.</div>
            <div className="pomo-dots">
              <span className="pomo-dot on" id="pomo-dot1"></span>
              <span className="pomo-dot" id="pomo-dot2"></span>
              <span className="pomo-dot" id="pomo-dot3"></span>
              <span className="pomo-dot" id="pomo-dot4"></span>
            </div>
            <div className="pomo-mode">Completed <strong id="pomo-complete">0</strong> / 4 focus sessions</div>
            <div className="pomo-controls-row">
              <button className="pomo-btn primary" id="pomo-start">Start</button>
              <button className="pomo-btn ghost" id="pomo-skip" title="Skip to next stage (N)">Skip ⏭</button>
              <button className="pomo-btn danger" id="pomo-reset" title="Reset all (R)">Reset</button>
            </div>
          </div>
          <aside className="pomo-side">
            <div className="pomo-side-card">
              <h3>🧠 Break ideas</h3>
              <div className="pomo-task-suggest">
                <span id="pomo-task"><strong>30-minute ab workout</strong> — hollow holds, bicycle crunches, planks</span>
                <button className="pomo-btn ghost" id="pomo-shuffle">Shuffle 🔀</button>
              </div>
              <div className="pomo-pill">
                <div><strong>30-minute ab workout</strong> <span>hollow holds • leg raises • bicycle crunches • planks</span></div>
                <label className="pomo-check"><input type="checkbox" data-break="abs" /> Done</label>
              </div>
              <div className="pomo-pill">
                <div><strong>100 Push Plan</strong> <span>break into 4 rounds with pauses and perfect form</span></div>
                <label className="pomo-check"><input type="checkbox" data-break="push" /> Done</label>
              </div>
              <div className="pomo-pill">
                <div><strong>Front split stretches</strong> <span>lunge pulses • hamstring fold • quad opener</span></div>
                <div className="pomo-weekdays" data-break="split-week">
                  <button type="button" className="pomo-weekday" data-day="Mon">M</button>
                  <button type="button" className="pomo-weekday" data-day="Tue">T</button>
                  <button type="button" className="pomo-weekday" data-day="Wed">W</button>
                  <button type="button" className="pomo-weekday" data-day="Thu">T</button>
                  <button type="button" className="pomo-weekday" data-day="Fri">F</button>
                  <button type="button" className="pomo-weekday" data-day="Sat">S</button>
                  <button type="button" className="pomo-weekday" data-day="Sun">S</button>
                </div>
              </div>
            </div>
            <div className="pomo-side-card">
              <h3>⚙️ Shortcuts & Tips</h3>
              <div className="pomo-shortcuts">
                <div>⏭ Skip stage <span className="kbd">N</span></div>
                <div>▶/⏸ Start/Pause <span className="kbd">Space</span></div>
                <div>🔁 Reset <span className="kbd">R</span></div>
                <div>🔀 New break idea <span className="kbd">S</span></div>
              </div>
              <p className="note">Sound is minimal (tab alert). Keep this tab active for best accuracy.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section id="panel-habits" role="tabpanel" aria-labelledby="tab-habits" className="hidden">
      <div className="card habit-card">
        <div className="flex habit-header">
          <div>
            <h2 className="habit-title">Habit Tracker</h2>
            <p className="note">Tap the dots to mark days complete. Everything saves in your browser.</p>
          </div>
          <div className="chip" id="habits-progress">Week progress: 0%</div>
        </div>
        <div id="habit-streak-hub" className="habit-streak-hub" aria-live="polite"></div>
        <div id="streak-freeze-bar" className="streak-freeze-bar">
          <div className="freeze-left">
            <div className="freeze-title">🧊 Streak Freeze</div>
            <div className="freeze-note" id="freeze-note">Buy a freeze to protect one missed day.</div>
          </div>
          <div className="freeze-actions">
            <div className="freeze-count" id="freeze-count">0 stocked</div>
            <button className="btn" type="button" id="freeze-buy">💎 Buy (50 XP)</button>
            <button className="btn" type="button" id="freeze-use">🛡️ Use on yesterday</button>
          </div>
        </div>
        <div id="habits-list" className="space-y-3 habit-list"></div>
        <div className="flex flex-wrap gap-2 habit-actions">
          <button className="btn" id="habit-add">🧾 Add habit</button>
          <button className="btn" id="habit-reset-week">🔁 Reset week</button>
          <button className="btn" id="habit-save">💾 Save</button>
          <button className="btn" id="habit-export">⬇️ Export JSON</button>
          <button className="btn" id="habit-export-csv">⬇️ Export CSV</button>
          <label className="btn file-label" htmlFor="habit-import">⬆️ Import JSON</label>
          <input type="file" id="habit-import" accept="application/json" className="file-input-hidden">
          <label className="btn file-label" htmlFor="habit-import-csv">⬆️ Import CSV</label>
          <input type="file" id="habit-import-csv" accept=".csv" className="file-input-hidden" />
        </div>
      </div>
      <div className="card" id="weekly-chores-card" style="margin-top:16px;">
        <div className="flex" style="justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h3 style="margin:0;">Weekly chores / To‑do</h3>
          <span className="note">Keep these rotating so they stay off your mind.</span>
        </div>
        <div className="chores-grid" style="display:grid;gap:10px;">
          <div className="chores-block">
            <strong>Weekly rhythm (do at least once):</strong>
            <ul>
              <li>Bathroom reset</li>
              <li>Laundry run</li>
              <li>Grocery/Walmart necessities (with a list)</li>
              <li>Social time with friends</li>
              <li>Full-body shave</li>
              <li>Credit freeze/SSN lock check (3 bureaus)</li>
              <li>Creative reps: video editing or pyrography</li>
            </ul>
          </div>
          <div className="chores-block">
            <strong>Biweekly:</strong>
            <ul>
              <li>Fridge clear + wipe</li>
            </ul>
          </div>
          <div className="chores-block">
            <strong>One-time:</strong>
            <ul>
              <li>Dye hair</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="panel-notes" role="tabpanel" aria-labelledby="tab-notes" className="hidden">
      <div className="notes-card">
        <div className="notes-head">
          <div>
            <h3>Notes & ChatGPT imports</h3>
            <p className="note">Mood journal entries and ChatGPT messages are saved here for quick review.</p>
          </div>
          <div className="notes-controls">
            <button className="btn" id="notes-export">⬇️ Export JSON</button>
            <label className="btn file-label" htmlFor="notes-import-file">⬆️ Import ChatGPT JSON</label>
            <input type="file" id="notes-import-file" accept=".json" className="file-input-hidden" />
            <button className="btn" id="notes-clear">🗑 Clear</button>
          </div>
        </div>
        <div className="notes-importer">
          <textarea id="notes-chatgpt-text" placeholder="Paste ChatGPT message JSON here and click Import."></textarea>
          <button className="btn" id="notes-chatgpt-btn">Import pasted JSON</button>
        </div>
        <div id="notes-feed" className="notes-feed"></div>
      </div>
    </section>
    <section id="panel-workout" role="tabpanel" aria-labelledby="tab-workout" className="hidden">
      <div className="workout-tab">
        <div className="workout-hero">
          <p className="workout-suptitle">Calisthenics HQ</p>
          <h3>Weekly Skill + Strength Stack</h3>
          <p>Planner built from my 2022-2023 notebooks. Skill work runs six days with one intentional recovery day. Strength split runs Chest & Back -> Legs/Abs/Traps -> Arms/Shoulder/Wrist -> Smith Machine heavy day.</p>
          <div className="workout-pill-row">
            <span className="workout-pill accent">Skill work 6 days</span>
            <span className="workout-pill accent">Night stretch focus</span>
            <span className="workout-pill accent">Heavy Smith Saturday</span>
          </div>
        </div>

        <div className="workout-controls">
          <label className="workout-toggle">
            <input type="checkbox" id="workout-edit-toggle" />
            <span>Edit workout text</span>
          </label>
          <button className="btn" id="workout-save">Save workout plan</button>
          <button className="btn" id="workout-reset">Reset workout plan</button>
          <div className="note" id="workout-storage-note"></div>
        </div>

        <div className="workout-section">
          <div className="workout-section-head">
            <div className="workout-section-label">Section 01</div>
            <div>
              <h4>Weekly Workout Planner</h4>
              <p>Split stays consistent: Chest & Back, Legs/Abs/Traps, Arms/Shoulder/Wrist, and a full-body Smith Machine anchor. Technique practice happens six days a week with a single recovery day.</p>
            </div>
          </div>
          <div className="workout-table-card">
            <div className="workout-table-scroll">
              <table className="workout-table">
                <thead>
                  <tr>
                    <th>Block</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Warm-up / Prep</th>
                    <td className="workout-editable">Everyday warmup plus shoulder rolls and wrist prep.</td>
                    <td className="workout-editable">Everyday warmup plus light wrist and hip work.</td>
                    <td className="workout-editable">Everyday warmup with leg and hip mobility focus.</td>
                    <td className="workout-editable">Everyday warmup and general full-body activation.</td>
                    <td className="workout-editable">Everyday warmup plus wrist and shoulder focus.</td>
                    <td className="workout-editable">Bike or treadmill 5-10 min plus dynamic full-body stretches.</td>
                    <td className="workout-editable">Optional: 5-10 min gentle mobility only.</td>
                  </tr>
                  <tr>
                    <th scope="row">Skill / Technique</th>
                    <td className="workout-editable">
                      <span className="workout-pill">Pull</span><br />Front lever and back lever progressions (tuck and advanced tuck).
                    </td>
                    <td className="workout-editable">
                      <span className="workout-pill">Push</span><br />Planche progressions, pseudo planche work, wall walks.
                    </td>
                    <td className="workout-editable">Handstand entries, negatives, press attempts, handstand pushup technique.</td>
                    <td className="workout-editable">Technique focus day: pick one or two skills (lever, planche, handstand) and drill clean reps.</td>
                    <td className="workout-editable">Static skills: human flag prep, front/back lever, planche holds.</td>
                    <td className="workout-editable">Freestyle calisthenics: short combos, flows, and "fun work" after lifting if energy allows.</td>
                    <td className="workout-editable">Rest from hard skills; at most light balance play if you feel fresh.</td>
                  </tr>
                  <tr>
                    <th scope="row">Strength Work</th>
                    <td className="workout-editable">
                      <span className="workout-pill">Chest & Back</span><br />Incline bench presses, Jefferson rolls, pull-up warmup, pull-ups workout (archers, behind-the-back, etc.).
                    </td>
                    <td className="workout-editable">Technique-only session. Keep it bodyweight or accessories only.</td>
                    <td className="workout-editable">
                      <span className="workout-pill">Legs / Abs / Traps</span><br />Squats or lunges, hip thrusts, calf raises, dragon flag work, Russian twists, leg raises, trap shrugs.
                    </td>
                    <td className="workout-editable">Technique-only day with optional easy accessories (no heavy barbell or Smith work).</td>
                    <td className="workout-editable">
                      <span className="workout-pill">Arms / Shoulder / Wrist</span><br />Tricep extensions, curls, overhead press, lateral raises, active hangs, wrist curls and presses.
                    </td>
                    <td className="workout-editable">
                      <span className="workout-pill">Full-Body Smith</span><br />Smith squats, RDL or hip hinge, Smith bench, Smith row, overhead press. Three or four controlled sets each.
                    </td>
                    <td className="workout-editable">No strength work. Take a full recovery day.</td>
                  </tr>
                  <tr>
                    <th scope="row">Conditioning / Cardio</th>
                    <td className="workout-editable">3 min jump rope + 2 min rest + 3 min mountain climbers.</td>
                    <td className="workout-editable">Light rope or walk only if you feel fresh.</td>
                    <td className="workout-editable">Short intervals (rope or bike) after legs for 5-10 min max.</td>
                    <td className="workout-editable">EMOM or small circuit (core plus easy rope or step-ups).</td>
                    <td className="workout-editable">Rope rule from notebook: every trip equals 10 pushups. Keep the session 10-15 min.</td>
                    <td className="workout-editable">10-20 min conditioning after Smith work (incline walk, bike, sled, etc.).</td>
                    <td className="workout-editable">Recovery walk only; no hard conditioning.</td>
                  </tr>
                  <tr>
                    <th scope="row">Mobility / Rehab</th>
                    <td className="workout-editable">Night Stretch focus: back plus shoulders.</td>
                    <td className="workout-editable">Wrist workout and hamstrings (pancake, etc.).</td>
                    <td className="workout-editable">Hip flexor, glute, and low-back mobility after legs.</td>
                    <td className="workout-editable">Bridges or backbends only if safe; otherwise hips and hamstrings.</td>
                    <td className="workout-editable">Scap work, lower trap raises, wrist care.</td>
                    <td className="workout-editable">Long full-body stretch. Focus on areas hit by Smith work (hips, quads, chest, shoulders).</td>
                    <td className="workout-editable">Rehab and recovery only: gentle stretching or nothing.</td>
                  </tr>
                  <tr>
                    <th scope="row">Today's Mood / Notes</th>
                    <td className="workout-editable"><div className="workout-note">Energy score, chest and back performance, any joint pain.</div></td>
                    <td className="workout-editable"><div className="workout-note">Planche progress, wrist status, one win.</div></td>
                    <td className="workout-editable"><div className="workout-note">Leg fatigue, knee or hip check-in, core difficulty.</div></td>
                    <td className="workout-editable"><div className="workout-note">Which skill felt best today? What needs more practice?</div></td>
                    <td className="workout-editable"><div className="workout-note">Arm pump level, shoulder health, grip strength.</div></td>
                    <td className="workout-editable"><div className="workout-note">How did heavy lifting feel? Any form notes or PRs?</div></td>
                    <td className="workout-editable"><div className="workout-note">Weekly reflection: biggest win and focus for next week.</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="workout-section">
          <div className="workout-section-head">
            <div className="workout-section-label">Section 02</div>
            <div>
              <h4>Routines Library</h4>
              <p>Clean versions of your 2022-2023 lists. Where you see ellipses, drop in the remaining items from your original notes.</p>
            </div>
          </div>
          <div className="workout-card-grid">
            <article className="workout-card">
              <h3>Morning Routine</h3>
              <p>Dynamic stretches and light mobility before the day starts.</p>
              <div className="workout-badges">
                <span className="workout-badge">daily</span>
                <span className="workout-badge">warmup</span>
              </div>
              <ul>
                <li>Deep breathing in and out.</li>
                <li>Neck, spine, and trunk rotations.</li>
                <li>Hip circles and leg swings.</li>
                <li>Ankle, knee, and calf mobility drills.</li>
                <li className="placeholder">Add the rest of your morning-routine stretches.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>Everyday Warmup</h3>
              <p>Quick sequence you can plug in before any session.</p>
              <div className="workout-badges">
                <span className="workout-badge">foundation</span>
              </div>
              <ul>
                <li>Neck around-the-worlds, hip twists, elbow twists.</li>
                <li>Shoulder rolls, hip circles, elbow circles.</li>
                <li>Knee swings, butt kicks.</li>
                <li>Wrist rolls and forearm stretches.</li>
                <li className="placeholder">Fill in the remaining items from your "Every day warmup" note.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>100 Pushups Session</h3>
              <p>Planche-oriented push progression.</p>
              <div className="workout-badges">
                <span className="workout-badge">push</span>
              </div>
              <ul>
                <li>Planche warmup (leans, scap work).</li>
                <li>Elevated pike holds or pushups.</li>
                <li>Wall walks.</li>
                <li>Typewriter pushups and pseudo planche pushups.</li>
                <li className="placeholder">Finish the list with items from your "100 pushups" entry.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>100 Dips Session</h3>
              <p>Heavy dip variations for push strength.</p>
              <div className="workout-badges">
                <span className="workout-badge">push</span>
              </div>
              <ul>
                <li>Dips warmup (light bar dips or assistance).</li>
                <li>Impossible dips or straight bar dips.</li>
                <li>Ring or Bulgarian dips.</li>
                <li>Weighted dips and archer dips.</li>
                <li className="placeholder">Add the remaining variations from your "100 dips" note.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>100 Handstands Session</h3>
              <p>Volume day for handstand control.</p>
              <div className="workout-badges">
                <span className="workout-badge">inversion</span>
              </div>
              <ul>
                <li>Wall-assisted handstand holds (narrow, diamond, wide).</li>
                <li>Handstand presses and negatives.</li>
                <li>Kick-ups for reps, focus on control.</li>
                <li>Handstand pushup attempts or progressions.</li>
                <li className="placeholder">Complete using the rest of your "100 handstands" note.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>Night Stretch</h3>
              <p>End-of-day flexibility and recovery anchor.</p>
              <div className="workout-badges">
                <span className="workout-badge">recovery</span>
              </div>
              <ul>
                <li>Sunday: pancake and hip openers.</li>
                <li>Monday: oversplits or hamstring focus.</li>
                <li>Tuesday-Friday: back, shoulders, and leg holds.</li>
                <li>Saturday: balance, hands, ankles, and abs.</li>
                <li className="placeholder">Tweak the days to match your "Night stretch" note.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>Chest & Back + Cardio</h3>
              <p>Calisthenics-heavy push/pull day.</p>
              <div className="workout-badges">
                <span className="workout-badge">strength</span>
              </div>
              <ul>
                <li>Incline bench presses (or equivalent).</li>
                <li>Jefferson rolls.</li>
                <li>Pull-up warmup: Australian, scap shrugs, swings.</li>
                <li>Pull-up workout: archer, behind-the-back, weighted variations.</li>
                <li>Jump rope with the "trip equals 10 pushups" rule.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>Leg / Abs / Trap Routine</h3>
              <p>Lower-body, core, and upper back density.</p>
              <div className="workout-badges">
                <span className="workout-badge">strength</span>
              </div>
              <ul>
                <li>Sumo squats or reverse lunges.</li>
                <li>Hip thrusts or glute bridge variations.</li>
                <li>Calf raises and machine-assisted options.</li>
                <li>Dragon flag progressions, Russian twists, leg raises.</li>
                <li>Trap shrugs and lower trap raises.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>Arm, Shoulder & Wrist Day</h3>
              <p>Direct work to support skills and joint health.</p>
              <div className="workout-badges">
                <span className="workout-badge">support</span>
              </div>
              <ul>
                <li>Tricep extensions (lying or seated), kickbacks.</li>
                <li>Crush-grip curls, hammer curls, regular curls.</li>
                <li>Overhead press, lateral raises, front raises.</li>
                <li>Active hangs, fingertip work, wrist curls and reverse curls.</li>
                <li className="placeholder">Add any missing drills from your "Arm, shoulder, wrist" note.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>Full-Body Smith Machine Day</h3>
              <p>Heavy compound strength with clean form.</p>
              <div className="workout-badges">
                <span className="workout-badge">gym</span>
              </div>
              <ul>
                <li>Smith squats or front squats for 3-4 sets.</li>
                <li>Smith RDL or hip hinge for 3-4 sets.</li>
                <li>Smith bench press for 3-4 sets.</li>
                <li>Smith rows plus overhead press for 3-4 sets each.</li>
                <li>Finish with 10-20 min incline walk or bike.</li>
              </ul>
            </article>
            <article className="workout-card">
              <h3>Rest Day Protocol</h3>
              <p>Built from your "Rest day" note.</p>
              <div className="workout-badges">
                <span className="workout-badge">recovery</span>
              </div>
              <ul>
                <li>50 easy pushups plus 50 easy pullups across the day.</li>
                <li>Light wrist workout.</li>
                <li>Rehab drills for problem areas, slow and controlled.</li>
                <li>Walk, hydrate, sleep early.</li>
              </ul>
            </article>
            <article className="routine-card">
              <h3>Ankle Prehab Session</h3>
              <p>Ballet-inspired ankle strength and control for straight ankle lock defense.</p>
              <div className="routine-tags">
                <span className="routine-tag">ANKLE</span>
                <span className="routine-tag">PREHAB</span>
              </div>
              <ul>
                <li><strong>Slow Relevés (eccentric)</strong> – 3×10–15 controlled calf raises with slow 3–4s lower.</li>
                <li><strong>Band Dorsiflexion</strong> – 3×15–20 reps per foot pulling toes toward the shin against a band.</li>
                <li><strong>Theraband Point–Flex with Control</strong> – 2–3×10–12 smooth point→flex reps per foot, stopping before end-range pain.</li>
                <li><strong>Doming / Short-Foot Holds</strong> – 2–3×8–10 holds per foot, 5–10s each, lifting the arch without curling toes.</li>
                <li><strong>Demi-pointe Balance</strong> – 3×20–30s holds per leg balancing on the balls of the feet (single-leg if possible).</li>
              </ul>
              <p className="routine-note">
                Do this <strong>2–3× per week</strong> on non-hard-sparring days.
              </p>
            </article>
          </div>
        </div>

        <div className="workout-section">
          <div className="workout-section-head">
            <div className="workout-section-label">Section 03</div>
            <div>
              <h4>Goals & Roadmap</h4>
              <p>Anchored to your calisthenics goals: front/back lever, planche, 90 degree hold, one-arm pullup, Maltese/Iron Cross, human flag, handstand work, and flips.</p>
            </div>
          </div>
          <div id="roadmap-editor" className="roadmap-editor"></div>
        </div>

        <div className="workout-section">
          <div className="workout-section-head">
            <div className="workout-section-label">Section 04</div>
            <div>
              <h4>Skill Progress Visualizer</h4>
              <p>Track where you are in each big skill ladder and update it as you move from tuck to full variations.</p>
            </div>
          </div>
          <div id="skill-visualizer" className="skill-visualizer"></div>
        </div>

        <p className="workout-footnote">Built from my 2022-2023 notebooks. Edit the text inside this tab to keep it up to date.</p>
      </div>
    </section>
    <section id="panel-settings" role="tabpanel" aria-labelledby="tab-settings" className="hidden settings-panel">
      <div className="card p-4 card-persist">
        <h3 className="tight-heading">Keep your data persistent</h3>
        <p className="note">Ask the browser for "persistent storage" so your planner, habits, and notes are less likely to be cleared automatically.</p>
        <button className="btn" id="btn-persist">Enable persistent storage</button>
        <div className="note" id="persist-status"></div>
      </div>
      <div className="card p-4 card-notify">
        <h3 className="tight-heading">Stay on track with push reminders</h3>
        <p className="note">Enable browser notifications so we can nudge you about study checks and looming deadlines.</p>
        <button className="btn" id="btn-notify" type="button">Enable push reminders</button>
        <div className="note" id="notify-status"></div>
      </div>
      <div className="card p-4">
        <h3 className="tight-heading">Bunker Mode</h3>
        <p className="note">Flip the safety switch to reskin the planner into a bunker console. Cosmetic only-data stays the same.</p>
        <label className="toggle" style="margin-top:8px;">
          <input type="checkbox" id="bunker-toggle" />
          <span>Activate Bunker Mode (apocalypse skin)</span>
        </label>
        <label className="toggle" style="margin-top:8px;">
          <input type="checkbox" id="bunker-flicker-toggle" checked />
          <span>Allow screen flicker effects</span>
        </label>
        <div style="margin-top:12px;">
          <label className="toggle">
            <input type="checkbox" id="bunker-log-toggle" checked />
            <span>Daily Briefing (story strip)</span>
          </label>
          <label className="toggle" style="margin-top:8px;align-items:center;gap:6px;">
            <span>Tone</span>
            <select id="bunker-log-tone">
              <option value="heroic">Heroic</option>
              <option value="snarky">Snarky</option>
            </select>
          </label>
          <label className="toggle" style="margin-top:8px;">
            <input type="checkbox" id="stability-toggle" checked />
            <span>Base Stability (streak meter)</span>
          </label>
        </div>
      </div>
      <div className="card p-4 card-reset">
        <h3 className="tight-heading">Reset</h3>
        <p className="note">Clears everything and reloads the original sample schedule.</p>
        <button id="btn-reset" className="tab reset-btn">Reset to sample week</button>
      </div>
    </section>
    <section id="panel-calendar" role="tabpanel" aria-labelledby="tab-calendar" className="hidden">
      <div className="calendar-card">
        <div className="calendar-controls">
          <div className="group">
            <button className="btn" id="cal-prev">Prev</button>
            <button className="btn" id="cal-next">Next</button>
            <input type="date" id="cal-date" className="cal-date" aria-label="Select date" />
            <label className="cal-check"><input type="checkbox" id="cal-show-all" checked /> Show all-day</label>
            <label className="cal-check"><input type="checkbox" id="cal-compact" /> Compact</label>
          </div>
          <div className="group calendar-ics-actions">
            <label className="btn cal-import">Import .ics
              <input type="file" id="cal-import" accept=".ics,text/calendar" className="file-input-hidden">
            </label>
            <button className="btn" id="cal-export-ics">Export planner .ics</button>
            <button className="btn" id="cal-clear">Clear events</button>
          </div>
        </div>
        <div className="calendar-ics-note">
          <p className="note cal-ics-status" id="cal-ics-status">Import or export .ics files in this tab.</p>
        </div>
        <div id="cal-range" className="cal-chip"></div>
        <div id="cal-all-row" className="calendar-allrow hidden"></div>
        <div id="cal-grid" className="cal"></div>
      </div>
    </section>
    <section id="panel-danger" role="tabpanel" aria-labelledby="tab-danger" className="hidden">
      <div className="danger-view">
        <div id="daily-briefing" className="daily-briefing hidden">
          <div className="briefing-text"></div>
          <button className="btn briefing-view" type="button" id="briefing-view-log">View log</button>
        </div>
        <div id="stability-strip" className="stability-strip hidden"></div>
        <div id="briefing-log" className="briefing-log hidden"></div>
        <div id="danger-zone" className="danger-zone"></div>
        <div id="ghost-zone"></div>
      </div>
    </section>
  </main>
</div>
<div className="chatbot-widget" id="chatbot-widget">
  <button className="chatbot-toggle btn" id="chatbot-toggle">🤖 AI Coach</button>
  <div className="chatbot-panel hidden" id="chatbot-panel">
    <div className="chatbot-header">
      <h4>AI Training Buddy</h4>
      <p>Ask about workouts, habits, or motivation tips.</p>
    </div>
    <div className="chatbot-messages" id="chatbot-messages"></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button className="btn" type="button" id="chatbot-suggest">Daily suggestion</button>
      <button className="btn" type="button" id="chatbot-ideas">What to ask?</button>
    </div>
    <form className="chatbot-form" id="chatbot-form">
      <input type="text" id="chatbot-input" placeholder="Ask me anything…" autocomplete="off" />
      <button className="btn" type="submit">Send</button>
    </form>
  </div>
</div>

<div id="confetti-wrapper" aria-hidden="true"></div>
<div id="celebration-overlay" className="celebration hidden" aria-live="polite">
  <div className="celebration-card">
    <div className="celebration-icon">🔥</div>
    <h3 id="celebration-title">Streak Extended!</h3>
    <p id="celebration-text">Keep this pace and HQ will promote you fast.</p>
    <button className="btn celebration-btn" id="celebration-close" type="button">Keep grinding</button>
    <div className="celebration-orbs">
      <span className="celebration-orb orb-a"></span>
      <span className="celebration-orb orb-b"></span>
      <span className="celebration-orb orb-c"></span>
    </div>
  </div>
</div>
<div id="toast" className="toast" role="status" aria-live="polite">Saved</div>
<div id="duck-overlay" className="duck-overlay" aria-live="polite" style="display:none;">
  <div className="duck-face">🦆</div>
  <div className="duck-text" id="duck-text">Duck mode ready.</div>
</div>









</>
  );
}
