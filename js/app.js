/**
 * TALENTLINK & SCOUTING PLATFORM
 * Human-Centric UI/UX Controller & Reactive Engine
 * Handles Role Views, Categorized Talent Directory, Feeders (Referee, Adjudicator, Judge),
 * Video Modal, and Institutional Outreach.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global App State
  const state = {
    currentUser: TL_DATA.defaultUsers[0], // Starts as Referee
    activeView: "workspace_referee",
    activeCategoryFilter: "all",
    selectedTalent: null,
    searchQuery: "",
    talents: [...TL_DATA.talents],
    logs: [...TL_DATA.officialLogs],
    inquiries: [...TL_DATA.pendingInquiries]
  };

  // Cache DOM Elements
  const el = {
    // Nav & Topbar
    currentUserBadge: document.getElementById("current-user-badge"),
    currentUserName: document.getElementById("current-user-name"),
    btnSwitchRole: document.getElementById("btn-switch-role"),
    roleNavBtns: document.querySelectorAll(".nav-item[data-view], .subnav-link[data-view]"),
    
    // Quick category chips
    categoryChips: document.querySelectorAll(".cat-chip"),
    
    // Quick Feeder buttons in header
    btnFeederReferee: document.getElementById("btn-quick-referee"),
    btnFeederAdjudicator: document.getElementById("btn-quick-adjudicator"),
    btnFeederJudge: document.getElementById("btn-quick-judge"),

    // Workspaces
    views: document.querySelectorAll(".workspace-view"),

    // Talent Directory (Scout View)
    talentGrid: document.getElementById("talent-cards-grid"),
    searchInput: document.getElementById("talent-search-input"),
    filterCategory: document.getElementById("filter-category-select"),
    filterActivity: document.getElementById("filter-activity-select"),

    // Official Logs Table
    officialLogsBody: document.getElementById("official-logs-body"),

    // Forms
    refereeMatchForm: document.getElementById("referee-match-form"),
    adjudicatorScoreForm: document.getElementById("adjudicator-score-form"),
    judgeAwardForm: document.getElementById("judge-award-form"),
    inquiryForm: document.getElementById("scout-inquiry-form"),

    // Modals
    roleModal: document.getElementById("role-select-modal"),
    talentModal: document.getElementById("talent-detail-modal"),
    videoModal: document.getElementById("video-reel-modal"),
    inquiryModal: document.getElementById("inquiry-modal"),

    // Dynamic Elements inside Modals
    modalTalentDetails: document.getElementById("modal-talent-details"),
    modalVideoDetails: document.getElementById("modal-video-details"),
    toastContainer: document.getElementById("toast-container")
  };

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function init() {
    updateUserDisplay();
    renderTalentDirectory();
    renderOfficialLogs();
    populateCategorySelectOptions();
    bindEvents();
    switchView(state.activeView);
    showToast(`Welcome, ${state.currentUser.name} (${state.currentUser.badge})`);
  }

  // =========================================================================
  // VIEW & ROLE SWITCHING
  // =========================================================================
  function switchUser(roleKey) {
    const user = TL_DATA.defaultUsers.find(u => u.role === roleKey);
    if (user) {
      state.currentUser = user;
      updateUserDisplay();

      // Automatically route to their primary specialized view
      if (roleKey === "referee") switchView("workspace_referee");
      else if (roleKey === "adjudicator") switchView("workspace_adjudicator");
      else if (roleKey === "judge") switchView("workspace_judge");
      else if (roleKey === "scout") switchView("workspace_scout");
      else if (roleKey === "student") switchView("workspace_student");
      else if (roleKey === "admin") switchView("workspace_admin");

      closeAllModals();
      showToast(`Switched active role to ${user.roleName} - ${user.name}`);
    }
  }

  function switchView(viewId) {
    state.activeView = viewId;

    // Toggle Workspace views
    el.views.forEach(v => {
      if (v.id === viewId) {
        v.classList.add("active-view");
      } else {
        v.classList.remove("active-view");
      }
    });

    // Update Topbar Nav buttons active class
    el.roleNavBtns.forEach(btn => {
      if (btn.dataset.view === viewId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Scroll smoothly to top of workspace
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  function updateUserDisplay() {
    if (el.currentUserBadge) el.currentUserBadge.textContent = state.currentUser.badge;
    if (el.currentUserName) el.currentUserName.textContent = state.currentUser.name;
  }

  // =========================================================================
  // RENDER TALENT DIRECTORY (SCOUT & EXPLORATION)
  // =========================================================================
  function renderTalentDirectory() {
    if (!el.talentGrid) return;

    // Filter talents
    const filtered = state.talents.filter(talent => {
      // Category filter
      if (state.activeCategoryFilter !== "all" && talent.primaryCategory !== state.activeCategoryFilter) {
        return false;
      }
      // Dropdown category filter
      const selCat = el.filterCategory ? el.filterCategory.value : "all";
      if (selCat !== "all" && talent.primaryCategory !== selCat) {
        return false;
      }
      // Dropdown activity filter
      const selAct = el.filterActivity ? el.filterActivity.value : "all";
      if (selAct !== "all" && talent.activityId !== selAct) {
        return false;
      }
      // Search query
      if (state.searchQuery.trim() !== "") {
        const q = state.searchQuery.toLowerCase();
        const matchName = talent.name.toLowerCase().includes(q);
        const matchSchool = talent.school.toLowerCase().includes(q);
        const matchActivity = talent.activityName.toLowerCase().includes(q);
        const matchPos = talent.position.toLowerCase().includes(q);
        if (!matchName && !matchSchool && !matchActivity && !matchPos) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      el.talentGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h4 style="color: var(--text-dark); font-size: 1.15rem; margin-bottom: 0.35rem;">No candidates found</h4>
          <p>Try resetting the category filter or changing your search terms.</p>
        </div>
      `;
      return;
    }

    el.talentGrid.innerHTML = filtered.map(t => {
      const catObj = Object.values(TL_DATA.categories).find(c => c.id === t.primaryCategory);
      const catBadge = catObj ? `${catObj.icon} ${catObj.badge}` : t.primaryCategory;

      return `
        <article class="talent-card" data-talent-id="${t.id}">
          <div class="talent-card-header">
            <div class="talent-identity">
              <div class="talent-avatar">${getAvatarIcon(t.primaryCategory, t.activityId)}</div>
              <div>
                <h4 class="talent-name">${t.name}</h4>
                <div class="talent-school">${t.school} • ${t.grade} (Age ${t.age})</div>
              </div>
            </div>
            <div class="rating-badge" title="Verified Extracurricular Rating">${t.overallRating} OVR</div>
          </div>

          <div class="talent-card-body">
            <div class="talent-discipline-badge">
              <span>${catBadge}</span>
              <span>•</span>
              <strong style="color: var(--text-dark);">${t.activityName}</strong>
            </div>
            
            <div class="talent-position">${t.position}</div>
            <div class="talent-bio">${t.bio}</div>

            <div class="mini-metrics-row">
              <div class="mini-metric-item">
                <span>Technique</span>
                <strong>${t.metrics.technique}</strong>
              </div>
              <div class="mini-metric-item">
                <span>Agility</span>
                <strong>${t.metrics.agility}</strong>
              </div>
              <div class="mini-metric-item">
                <span>Discipline</span>
                <strong>${t.metrics.discipline}</strong>
              </div>
            </div>

            <div class="video-preview-ribbon" onclick="window.TL_APP.openVideoModal('${t.id}')">
              <span style="display: flex; align-items: center; gap: 0.45rem;">
                <span style="color: var(--emerald-400);">▶</span>
                <strong>${t.videoReel.title}</strong>
              </span>
              <span style="color: var(--text-muted); font-size: 0.72rem;">${t.videoReel.duration}</span>
            </div>
          </div>

          <div class="talent-card-footer">
            <button type="button" class="btn-primary" onclick="window.TL_APP.openInquiryModal('${t.id}')">
              <span>📨 Recruit Inquiry</span>
            </button>
            <button type="button" class="btn-secondary" onclick="window.TL_APP.openTalentModal('${t.id}')">
              <span>Full Dossier</span>
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  function getAvatarIcon(catId, activityId) {
    if (activityId === "basketball") return "🏀";
    if (activityId === "football") return "⚽";
    if (activityId === "athletics") return "🏃";
    if (activityId === "table_tennis") return "🏓";
    if (activityId === "badminton") return "🏸";
    if (activityId === "lawn_tennis") return "🎾";
    if (activityId === "chess") return "♟️";
    if (activityId === "rugby") return "🏉";
    if (activityId === "volleyball") return "🏐";
    if (activityId === "hockey") return "🏑";
    if (activityId === "handball") return "🤾";
    if (activityId === "choral_vocal") return "🎤";
    if (activityId === "instrumental") return "🎻";
    if (activityId === "spoken_word") return "📜";
    if (activityId === "stage_drama") return "🎭";
    if (activityId === "cultural_dance") return "💃";
    return "⭐";
  }

  // =========================================================================
  // RENDER OFFICIAL AUDIT & SCORES LOG
  // =========================================================================
  function renderOfficialLogs() {
    if (!el.officialLogsBody) return;

    el.officialLogsBody.innerHTML = state.logs.map(log => {
      let badgeClass = "badge-referee";
      let icon = "⚽";
      if (log.feederType === "Adjudicator") {
        badgeClass = "badge-adjudicator";
        icon = "🎭";
      } else if (log.feederType === "Judge") {
        badgeClass = "badge-judge";
        icon = "⚖️";
      }

      return `
        <tr>
          <td>
            <span class="feeder-badge ${badgeClass}">${icon} ${log.feederType}</span>
            <div style="font-size: 0.76rem; color: var(--text-secondary); margin-top: 0.2rem;">${log.feederName}</div>
          </td>
          <td>
            <strong style="color: var(--text-dark);">${log.activity}</strong>
            <div style="font-size: 0.74rem; color: var(--text-muted);">${log.disciplineCategory}</div>
          </td>
          <td>
            <div>${log.matchOrEvent}</div>
            <div style="font-size: 0.74rem; color: var(--text-secondary);">${log.date}</div>
          </td>
          <td>
            <strong style="color: var(--emerald-400); font-family: var(--font-display);">${log.scoreline}</strong>
            <div style="font-size: 0.76rem; color: var(--text-secondary);">${log.keyMetrics}</div>
          </td>
          <td>
            <span style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.78rem; background: var(--bg-light); padding: 0.25rem 0.55rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
              <span style="color: var(--emerald-400);">📹</span> ${log.videoStatus}
            </span>
          </td>
          <td>
            <span style="color: var(--emerald-400); font-weight: 600; font-size: 0.76rem; background: rgba(16, 185, 129, 0.1); padding: 0.2rem 0.6rem; border-radius: var(--radius-full);">
              ✓ ${log.status}
            </span>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Populate Filter Activity Dropdown based on all categories
  function populateCategorySelectOptions() {
    if (!el.filterActivity) return;
    const activities = [];
    Object.values(TL_DATA.categories).forEach(cat => {
      cat.activities.forEach(act => {
        activities.push({ id: act.id, name: `${cat.name.split(' ')[0]}: ${act.name}` });
      });
    });

    el.filterActivity.innerHTML = `
      <option value="all">All Activities & Disciplines</option>
      ${activities.map(a => `<option value="${a.id}">${a.name}</option>`).join("")}
    `;
  }

  // =========================================================================
  // FEEDER FORM HANDLERS
  // =========================================================================

  // 1. Referee Match Form Submission
  if (el.refereeMatchForm) {
    el.refereeMatchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const sportSelect = document.getElementById("ref-sport-select").value;
      const teamHome = document.getElementById("ref-team-home").value || "Home Roster";
      const teamAway = document.getElementById("ref-team-away").value || "Visiting Roster";
      const scoreHome = document.getElementById("ref-score-home").textContent;
      const scoreAway = document.getElementById("ref-score-away").textContent;
      const matchType = document.getElementById("ref-match-category").value;
      const mvpStudent = document.getElementById("ref-mvp-student").value || "Selected High Performer";
      const videoLink = document.getElementById("ref-video-url").value || "Uploaded Referee Match Tape";
      const cards = document.getElementById("ref-discipline-notes").value || "None";

      // Create new official log
      const newLog = {
        id: `LOG-REF-${Date.now().toString().slice(-4)}`,
        feederType: "Referee",
        feederName: state.currentUser.name,
        disciplineCategory: matchType,
        activity: sportSelect,
        matchOrEvent: `${teamHome} vs ${teamAway}`,
        date: new Date().toISOString().split("T")[0],
        scoreline: `${teamHome} ${scoreHome} - ${scoreAway} ${teamAway}`,
        keyMetrics: `MVP: ${mvpStudent} • Cards/Fouls: ${cards}`,
        mvpCandidate: mvpStudent,
        videoStatus: "Match Clip Verified",
        videoUrl: videoLink,
        officialVerdict: "Certified Match Record by Official Referee",
        status: "Verified & Locked"
      };

      state.logs.unshift(newLog);
      renderOfficialLogs();
      showToast(`Referee match score for ${sportSelect} certified and added to ledger!`);
      el.refereeMatchForm.reset();
      document.getElementById("ref-score-home").textContent = "0";
      document.getElementById("ref-score-away").textContent = "0";
    });
  }

  // 2. Adjudicator Form Submission (Music & Drama)
  if (el.adjudicatorScoreForm) {
    el.adjudicatorScoreForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const artActivity = document.getElementById("adj-activity-select").value;
      const performer = document.getElementById("adj-performer-name").value || "Festival Entrant";
      const galaEvent = document.getElementById("adj-festival-name").value || "Interschool Gala";
      
      const s1 = parseInt(document.getElementById("adj-score-vocal").value) || 18;
      const s2 = parseInt(document.getElementById("adj-score-diction").value) || 18;
      const s3 = parseInt(document.getElementById("adj-score-rhythm").value) || 18;
      const s4 = parseInt(document.getElementById("adj-score-presence").value) || 19;
      const s5 = parseInt(document.getElementById("adj-score-technique").value) || 19;
      const total = s1 + s2 + s3 + s4 + s5;

      const remarks = document.getElementById("adj-remarks").value || "Demonstrated outstanding artistry.";

      const newLog = {
        id: `LOG-ADJ-${Date.now().toString().slice(-4)}`,
        feederType: "Adjudicator",
        feederName: state.currentUser.name,
        disciplineCategory: "Music and Drama",
        activity: artActivity,
        matchOrEvent: `${galaEvent}: ${performer}`,
        date: new Date().toISOString().split("T")[0],
        scoreline: `Score: ${total}/100`,
        keyMetrics: `Tone: ${s1} | Diction: ${s2} | Rhythm: ${s3} | Presence: ${s4} | Tech: ${s5}`,
        mvpCandidate: performer,
        videoStatus: "Adjudication Reel Attached",
        videoUrl: "https://talentlink.edu/media/adjudication-clip",
        officialVerdict: remarks,
        status: "Verified & Locked"
      };

      state.logs.unshift(newLog);
      renderOfficialLogs();
      showToast(`Adjudicator rubric for ${performer} recorded with ${total}/100!`);
      el.adjudicatorScoreForm.reset();
    });
  }

  // 3. Judge Awards Form Submission (Music & Drama)
  if (el.judgeAwardForm) {
    el.judgeAwardForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const festival = document.getElementById("judge-festival-title").value || "Championship";
      const candidate = document.getElementById("judge-candidate-select").value;
      const rank = document.getElementById("judge-award-rank").value;
      const citation = document.getElementById("judge-citation").value || "Awarded for exceptional creative merit.";

      const newLog = {
        id: `LOG-JDG-${Date.now().toString().slice(-4)}`,
        feederType: "Judge",
        feederName: state.currentUser.name,
        disciplineCategory: "Music and Drama",
        activity: "Competition Award",
        matchOrEvent: `${festival} Honors`,
        date: new Date().toISOString().split("T")[0],
        scoreline: `${rank}`,
        keyMetrics: `Honoree: ${candidate} • Official Citation: ${citation}`,
        mvpCandidate: candidate,
        videoStatus: "Certificate & Video Archived",
        videoUrl: "https://talentlink.edu/certificates/gold-award",
        officialVerdict: citation,
        status: "Verified & Locked"
      };

      state.logs.unshift(newLog);
      renderOfficialLogs();
      showToast(`Official Award of ${rank} issued to ${candidate}!`);
      el.judgeAwardForm.reset();
    });
  }

  // 4. Scout Recruitment Inquiry Form Submission
  if (el.inquiryForm) {
    el.inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const studentId = document.getElementById("inquiry-student-id").value;
      const studentName = document.getElementById("inquiry-student-name").value;
      const purpose = document.getElementById("inquiry-purpose").value;

      const newInquiry = {
        id: `INQ-2026-${Date.now().toString().slice(-3)}`,
        scoutName: state.currentUser.name,
        organization: state.currentUser.institution,
        studentId: studentId,
        studentName: studentName,
        category: "Cross-Disciplinary Scouting Pool",
        purpose: purpose,
        dateSubmitted: new Date().toISOString().split("T")[0],
        status: "Pending Principal Review",
        confidentialityMode: "COPPA / Minor Privacy Guard (PII Masked)"
      };

      state.inquiries.unshift(newInquiry);
      renderAdminInquiries();
      closeAllModals();
      showToast(`Secure outreach inquiry for ${studentName} dispatched to school administration!`);
    });
  }

  // =========================================================================
  // ADMIN INQUIRIES WORKBENCH
  // =========================================================================
  function renderAdminInquiries() {
    const tableBody = document.getElementById("admin-inquiries-body");
    if (!tableBody) return;

    tableBody.innerHTML = state.inquiries.map(inq => `
      <tr>
        <td>
          <strong style="color: var(--text-dark);">${inq.scoutName}</strong>
          <div style="font-size: 0.74rem; color: var(--text-secondary);">${inq.organization}</div>
        </td>
        <td>
          <strong style="color: var(--emerald-400);">${inq.studentName}</strong>
          <div style="font-size: 0.74rem; color: var(--text-muted);">${inq.category}</div>
        </td>
        <td>
          <div style="font-size: 0.82rem;">${inq.purpose}</div>
          <div style="font-size: 0.72rem; color: #a78bfa; margin-top: 0.25rem;">🛡️ ${inq.confidentialityMode}</div>
        </td>
        <td>
          <span style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; font-size: 0.74rem; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 600;">
            ${inq.status}
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button type="button" class="btn-primary" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" onclick="window.TL_APP.approveInquiry('${inq.id}')">
              Approve
            </button>
            <button type="button" class="btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" onclick="window.TL_APP.rejectInquiry('${inq.id}')">
              Decline
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  // =========================================================================
  // MODAL CONTROLS & EVENT BINDINGS
  // =========================================================================
  function bindEvents() {
    // Role switcher button in header
    if (el.btnSwitchRole) {
      el.btnSwitchRole.addEventListener("click", () => {
        openModal(el.roleModal);
      });
    }

    // Role select items in modal
    document.querySelectorAll(".role-select-card").forEach(card => {
      card.addEventListener("click", () => {
        const role = card.dataset.role;
        switchUser(role);
      });
    });

    // Topbar Nav Buttons
    el.roleNavBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        switchView(btn.dataset.view);
      });
    });

    // Quick Feeder Buttons
    if (el.btnFeederReferee) {
      el.btnFeederReferee.addEventListener("click", () => {
        switchUser("referee");
      });
    }
    if (el.btnFeederAdjudicator) {
      el.btnFeederAdjudicator.addEventListener("click", () => {
        switchUser("adjudicator");
      });
    }
    if (el.btnFeederJudge) {
      el.btnFeederJudge.addEventListener("click", () => {
        switchUser("judge");
      });
    }

    // Category chips in filter bar
    el.categoryChips.forEach(chip => {
      chip.addEventListener("click", () => {
        el.categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        state.activeCategoryFilter = chip.dataset.category;
        renderTalentDirectory();
      });
    });

    // Search and filter dropdowns
    if (el.searchInput) {
      el.searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        renderTalentDirectory();
      });
    }
    if (el.filterCategory) {
      el.filterCategory.addEventListener("change", () => {
        renderTalentDirectory();
      });
    }
    if (el.filterActivity) {
      el.filterActivity.addEventListener("change", () => {
        renderTalentDirectory();
      });
    }

    // Modal Close Buttons
    document.querySelectorAll(".btn-close-modal").forEach(btn => {
      btn.addEventListener("click", closeAllModals);
    });

    // Close modal when clicking backdrop
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        closeAllModals();
      }
    });

    // Referee score stepper buttons (+ / -)
    document.querySelectorAll(".btn-step").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        const delta = parseInt(btn.dataset.delta) || 1;
        const display = document.getElementById(targetId);
        if (display) {
          let current = parseInt(display.textContent) || 0;
          current = Math.max(0, current + delta);
          display.textContent = current;
        }
      });
    });

    // Adjudicator slider live updates
    document.querySelectorAll(".rubric-slider").forEach(slider => {
      slider.addEventListener("input", (e) => {
        const targetDisplayId = e.target.dataset.scoreTarget;
        const display = document.getElementById(targetDisplayId);
        if (display) display.textContent = `${e.target.value}/20`;
        updateAdjudicatorTotal();
      });
    });
  }

  function updateAdjudicatorTotal() {
    const s1 = parseInt(document.getElementById("adj-score-vocal")?.value || 0);
    const s2 = parseInt(document.getElementById("adj-score-diction")?.value || 0);
    const s3 = parseInt(document.getElementById("adj-score-rhythm")?.value || 0);
    const s4 = parseInt(document.getElementById("adj-score-presence")?.value || 0);
    const s5 = parseInt(document.getElementById("adj-score-technique")?.value || 0);
    const totalEl = document.getElementById("adj-total-score-display");
    if (totalEl) totalEl.textContent = `${s1 + s2 + s3 + s4 + s5}/100`;
  }

  function openModal(modalEl) {
    if (modalEl) modalEl.classList.add("active");
  }

  function closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  }

  // Toast Notification helper
  function showToast(msg) {
    if (!el.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>⚡</span> <span>${msg}</span>`;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // =========================================================================
  // GLOBAL APPLICATION API (EXPOSED FOR INLINE HANDLERS)
  // =========================================================================
  window.TL_APP = {
    switchView,
    switchUser,
    openTalentModal: (talentId) => {
      const talent = state.talents.find(t => t.id === talentId);
      if (!talent) return;
      state.selectedTalent = talent;

      if (el.modalTalentDetails) {
        el.modalTalentDetails.innerHTML = `
          <div style="display: flex; gap: 1.5rem; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1.25rem; margin-bottom: 1.25rem;">
            <div style="width: 72px; height: 72px; border-radius: var(--radius-md); background: var(--bg-light); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; border: 1px solid var(--border-light);">
              ${getAvatarIcon(talent.primaryCategory, talent.activityId)}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <h3 style="font-size: 1.4rem; color: var(--text-dark);">${talent.name}</h3>
                <span class="rating-badge">${talent.overallRating} OVR</span>
              </div>
              <p style="color: var(--text-secondary); font-size: 0.86rem;">${talent.school} • ${talent.grade} • Age ${talent.age}</p>
              <div style="color: var(--emerald-400); font-weight: 600; font-size: 0.88rem; margin-top: 0.25rem;">
                ${talent.activityName} (${talent.position})
              </div>
            </div>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h5 style="color: var(--text-muted); text-transform: uppercase; font-size: 0.75rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">Performance Biography</h5>
            <p style="color: var(--text-primary); font-size: 0.9rem; line-height: 1.6;">${talent.bio}</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h5 style="color: var(--text-muted); text-transform: uppercase; font-size: 0.75rem; margin-bottom: 0.5rem; letter-spacing: 0.05em;">Key Verified Milestones & Badges</h5>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${talent.verifiedBadges.map(b => `
                <span style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); color: var(--emerald-400); padding: 0.3rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600;">
                  🏅 ${b}
                </span>
              `).join("")}
            </div>
          </div>

          <div style="background: var(--bg-light); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 1.25rem;">
            <h5 style="color: var(--text-muted); text-transform: uppercase; font-size: 0.75rem; margin-bottom: 0.65rem; letter-spacing: 0.05em;">Cumulative Statistics Summary</h5>
            <p style="font-family: var(--font-display); font-size: 0.95rem; color: var(--text-dark);">${talent.statsSummary}</p>
          </div>

          <div style="display: flex; gap: 0.85rem; margin-top: 1.5rem;">
            <button type="button" class="btn-primary" onclick="window.TL_APP.openInquiryModal('${talent.id}')">
              <span>Initiate Institutional Recruitment</span>
            </button>
            <button type="button" class="btn-secondary" onclick="window.TL_APP.openVideoModal('${talent.id}')">
              <span>Watch Verified Reel</span>
            </button>
          </div>
        `;
      }
      openModal(el.talentModal);
    },

    openVideoModal: (talentId) => {
      const talent = state.talents.find(t => t.id === talentId);
      if (!talent) return;

      if (el.modalVideoDetails) {
        el.modalVideoDetails.innerHTML = `
          <div class="video-player-container" style="background: ${talent.videoReel.thumbnailBg}">
            <div style="display: flex; justify-content: space-between; align-items: center; color: rgba(255, 255, 255, 0.85); font-size: 0.8rem;">
              <span>🔴 OFFICIAL MATCH / RECITAL TAPE</span>
              <span>HD 1080p • 60 FPS</span>
            </div>

            <div class="video-player-overlay">
              <div class="btn-play-pulse" onclick="alert('Playing verified media feed for ${talent.name}')">
                ▶
              </div>
            </div>

            <div class="video-player-bottom">
              <div>
                <strong style="color: var(--text-dark); font-size: 0.9rem;">${talent.videoReel.title}</strong>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">Verified by: ${talent.videoReel.verifiedBy}</div>
              </div>
              <span style="background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 4px;">${talent.videoReel.duration}</span>
            </div>
          </div>

          <div style="margin-top: 1.25rem; font-size: 0.86rem; color: var(--text-secondary);">
            <p><strong>Note on Integrity:</strong> This performance clip is digitally timestamped and signed by certified tournament officials. Raw footage has been archived on the institutional cloud node.</p>
          </div>
        `;
      }
      openModal(el.videoModal);
    },

    openInquiryModal: (talentId) => {
      const talent = state.talents.find(t => t.id === talentId);
      if (!talent) return;

      document.getElementById("inquiry-student-id").value = talent.id;
      document.getElementById("inquiry-student-name").value = talent.name;
      document.getElementById("inquiry-target-label").textContent = `${talent.name} (${talent.school} • ${talent.activityName})`;
      openModal(el.inquiryModal);
    },

    approveInquiry: (inqId) => {
      const item = state.inquiries.find(i => i.id === inqId);
      if (item) {
        item.status = "Approved by Principal";
        renderAdminInquiries();
        showToast(`Inquiry ${inqId} for ${item.studentName} approved! Scout contacted.`);
      }
    },

    rejectInquiry: (inqId) => {
      const item = state.inquiries.find(i => i.id === inqId);
      if (item) {
        item.status = "Declined (Academic Focus)";
        renderAdminInquiries();
        showToast(`Inquiry ${inqId} declined.`);
      }
    }
  };

  // Run initialization
  init();
  renderAdminInquiries();
});
