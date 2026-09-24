/**
 * TALENTLINK
 * UI/UX Controller & Reactive Engine
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
    currentUserBadge: document.getElementById("current-user-badge"),
    currentUserName: document.getElementById("current-user-name"),
    btnSwitchRole: document.getElementById("btn-switch-role"),
    roleNavBtns: document.querySelectorAll(".nav-item[data-view], .subnav-link[data-view]"),
    categoryChips: document.querySelectorAll(".cat-chip"),
    btnFeederReferee: document.getElementById("btn-quick-referee"),
    btnFeederAdjudicator: document.getElementById("btn-quick-adjudicator"),
    btnFeederJudge: document.getElementById("btn-quick-judge"),
    views: document.querySelectorAll(".workspace-view"),
    talentGrid: document.getElementById("talent-cards-grid"),
    sponsorGrid: document.getElementById("sponsor-cards-grid"),
    searchInput: document.getElementById("talent-search-input"),
    sponsorSearchInput: document.getElementById("sponsor-search-input"),
    filterCategory: document.getElementById("filter-category-select"),
    sponsorFilterCategory: document.getElementById("sponsor-filter-category"),
    filterActivity: document.getElementById("filter-activity-select"),
    officialLogsBody: document.getElementById("official-logs-body"),
    refereeMatchForm: document.getElementById("referee-match-form"),
    adjudicatorScoreForm: document.getElementById("adjudicator-score-form"),
    judgeAwardForm: document.getElementById("judge-award-form"),
    inquiryForm: document.getElementById("scout-inquiry-form"),
    roleModal: document.getElementById("role-select-modal"),
    talentModal: document.getElementById("talent-detail-modal"),
    videoModal: document.getElementById("video-reel-modal"),
    inquiryModal: document.getElementById("inquiry-modal"),
    modalTalentDetails: document.getElementById("modal-talent-details"),
    modalVideoDetails: document.getElementById("modal-video-details"),
    toastContainer: document.getElementById("toast-container")
  };

  function init() {
    updateUserDisplay();
    renderTalentDirectory();
    renderOfficialLogs();
    populateCategorySelectOptions();
    bindEvents();
    switchView(state.activeView);
    showToast(`Welcome, ${state.currentUser.name} (${state.currentUser.badge})`);
  }

  function switchUser(roleKey) {
    let user = TL_DATA.defaultUsers.find(u => u.role === roleKey);
    if (!user) {
      if (roleKey === "sponsor") user = { name: "Foundation Rep", badge: "Sponsor", role: "sponsor" };
    }
    
    if (user) {
      state.currentUser = user;
      updateUserDisplay();

      if (roleKey === "referee") switchView("workspace_referee");
      else if (roleKey === "adjudicator") switchView("workspace_adjudicator");
      else if (roleKey === "judge") switchView("workspace_judge");
      else if (roleKey === "scout") switchView("workspace_scout");
      else if (roleKey === "student") switchView("workspace_student");
      else if (roleKey === "admin") switchView("workspace_admin");
      else if (roleKey === "sponsor") switchView("workspace_sponsor");

      closeAllModals();
      showToast(`Switched active role to ${user.name}`);
    }
  }

  function switchView(viewId) {
    state.activeView = viewId;
    el.views.forEach(v => {
      if (v.id === viewId) v.classList.add("active-view");
      else v.classList.remove("active-view");
    });
    el.roleNavBtns.forEach(btn => {
      if (btn.dataset.view === viewId) btn.classList.add("active");
      else btn.classList.remove("active");
    });
    const targetSection = document.getElementById(viewId);
    if (targetSection) {
      const topbar = document.querySelector('.topbar');
      const offset = topbar ? topbar.offsetHeight + 20 : 80;
      const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function updateUserDisplay() {
    if (el.currentUserBadge) el.currentUserBadge.textContent = state.currentUser.badge;
    if (el.currentUserName) el.currentUserName.textContent = state.currentUser.name;
  }

  function renderTalentDirectory() {
    const filtered = state.talents.filter(talent => {
      if (state.activeCategoryFilter !== "all" && talent.primaryCategory !== state.activeCategoryFilter) return false;
      const selCat = (state.activeView === "workspace_sponsor" && el.sponsorFilterCategory) ? el.sponsorFilterCategory.value : (el.filterCategory ? el.filterCategory.value : "all");
      if (selCat !== "all" && talent.primaryCategory !== selCat) return false;
      const selAct = el.filterActivity ? el.filterActivity.value : "all";
      if (selAct !== "all" && talent.activityId !== selAct) return false;
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

    const markup = filtered.length === 0 ? `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <h4>No candidates found</h4>
        <p>Try resetting the category filter or changing your search terms.</p>
      </div>
    ` : filtered.map(t => {
      const catObj = Object.values(TL_DATA.categories).find(c => c.id === t.primaryCategory);
      const catBadge = catObj ? catObj.badge : t.primaryCategory;
      return `
        <article class="talent-card" data-talent-id="${t.id}">
          <div class="talent-card-header">
            <h4>${t.name}</h4>
            <div style="font-size: 0.85rem; color: var(--text-muted);">${t.school} • ${t.grade} (Age ${t.age})</div>
            <div class="badge">${t.overallRating} OVR</div>
          </div>
          <div class="talent-card-body">
            <div style="font-family: var(--font-display); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.5rem;">
              <span>${catBadge}</span> • <strong>${t.activityName}</strong>
            </div>
            <div style="font-size: 0.9rem; margin-bottom: 1rem;">${t.position}</div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${t.bio}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; border-top: var(--border-width) solid var(--border-color); padding-top: 1rem; margin-bottom: 1.5rem;">
              <div><span style="font-size: 0.75rem; text-transform: uppercase;">Tech</span><br><strong>${t.metrics.technique}</strong></div>
              <div><span style="font-size: 0.75rem; text-transform: uppercase;">Agi</span><br><strong>${t.metrics.agility}</strong></div>
              <div><span style="font-size: 0.75rem; text-transform: uppercase;">Disc</span><br><strong>${t.metrics.discipline}</strong></div>
            </div>
          </div>
          <div class="talent-card-actions">
            <button type="button" class="btn-primary" style="width: 100%; margin-bottom: 0.5rem;" onclick="window.TL_APP.openInquiryModal('${t.id}')">Recruit / Sponsor</button>
            <button type="button" class="btn-secondary" style="width: 100%;" onclick="window.TL_APP.openTalentModal('${t.id}')">Student Profile</button>
          </div>
        </article>
      `;
    }).join("");

    if (el.talentGrid) el.talentGrid.innerHTML = markup;
    if (el.sponsorGrid) el.sponsorGrid.innerHTML = markup;
  }

  function renderOfficialLogs() {
    if (!el.officialLogsBody) return;
    el.officialLogsBody.innerHTML = state.logs.map(log => `
      <tr>
        <td>
          <strong>${log.feederType}</strong>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${log.feederName}</div>
        </td>
        <td>
          <strong>${log.activity}</strong>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${log.disciplineCategory}</div>
        </td>
        <td>
          ${log.matchOrEvent}
          <div style="font-size: 0.85rem; color: var(--text-muted);">${log.date}</div>
        </td>
        <td>
          <strong>${log.scoreline}</strong>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${log.keyMetrics}</div>
        </td>
        <td>${log.videoStatus}</td>
        <td><strong>${log.status}</strong></td>
      </tr>
    `).join("");
  }

  function populateCategorySelectOptions() {
    if (!el.filterActivity) return;
    const activities = [];
    Object.values(TL_DATA.categories).forEach(cat => {
      cat.activities.forEach(act => activities.push({ id: act.id, name: `${cat.name.split(' ')[0]}: ${act.name}` }));
    });
    el.filterActivity.innerHTML = `
      <option value="all">All Activities & Disciplines</option>
      ${activities.map(a => `<option value="${a.id}">${a.name}</option>`).join("")}
    `;
  }

  // Forms
  if (el.refereeMatchForm) {
    el.refereeMatchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const sportSelect = document.getElementById("ref-sport-select").value;
      const teamHome = document.getElementById("ref-team-home").value;
      const teamAway = document.getElementById("ref-team-away").value;
      const scoreHome = document.getElementById("ref-score-home").textContent;
      const scoreAway = document.getElementById("ref-score-away").textContent;
      const matchType = document.getElementById("ref-match-category").value;
      const mvpStudent = document.getElementById("ref-mvp-student").value;
      const cards = document.getElementById("ref-discipline-notes").value;
      const videoLink = document.getElementById("ref-video-url").value;

      state.logs.unshift({
        id: `LOG-REF-${Date.now().toString().slice(-4)}`,
        feederType: "Referee",
        feederName: state.currentUser.name,
        disciplineCategory: matchType,
        activity: sportSelect,
        matchOrEvent: `${teamHome} vs ${teamAway}`,
        date: new Date().toISOString().split("T")[0],
        scoreline: `${teamHome} ${scoreHome} - ${scoreAway} ${teamAway}`,
        keyMetrics: `MVP: ${mvpStudent} | Disciplinary: ${cards}`,
        mvpCandidate: mvpStudent,
        videoStatus: "Match Clip Verified",
        videoUrl: videoLink,
        officialVerdict: "Certified Match Record",
        status: "Verified & Locked"
      });
      renderOfficialLogs();
      showToast(`Match score for ${sportSelect} certified.`);
      el.refereeMatchForm.reset();
      document.getElementById("ref-score-home").textContent = "0";
      document.getElementById("ref-score-away").textContent = "0";
    });
  }

  if (el.adjudicatorScoreForm) {
    el.adjudicatorScoreForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const artActivity = document.getElementById("adj-activity-select").value;
      const performer = document.getElementById("adj-performer-name").value;
      const galaEvent = document.getElementById("adj-festival-name").value;
      const s1 = parseInt(document.getElementById("adj-score-vocal").value) || 18;
      const s2 = parseInt(document.getElementById("adj-score-diction").value) || 18;
      const s3 = parseInt(document.getElementById("adj-score-rhythm").value) || 18;
      const s4 = parseInt(document.getElementById("adj-score-presence").value) || 19;
      const s5 = parseInt(document.getElementById("adj-score-technique").value) || 19;
      const total = s1 + s2 + s3 + s4 + s5;

      state.logs.unshift({
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
        videoStatus: "Reel Attached",
        videoUrl: "https://talentlink.edu/media/adjudication-clip",
        officialVerdict: "Adjudicated",
        status: "Verified & Locked"
      });
      renderOfficialLogs();
      showToast(`Adjudicator rubric for ${performer} recorded with ${total}/100.`);
      el.adjudicatorScoreForm.reset();
    });
  }

  if (el.judgeAwardForm) {
    el.judgeAwardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const festival = document.getElementById("judge-festival-title").value;
      const candidate = document.getElementById("judge-candidate-select").value;
      const rank = document.getElementById("judge-award-rank").value;
      const citation = document.getElementById("judge-citation").value;

      state.logs.unshift({
        id: `LOG-JDG-${Date.now().toString().slice(-4)}`,
        feederType: "Judge",
        feederName: state.currentUser.name,
        disciplineCategory: "Music and Drama",
        activity: "Competition Award",
        matchOrEvent: `${festival} Honors`,
        date: new Date().toISOString().split("T")[0],
        scoreline: `${rank}`,
        keyMetrics: `Honoree: ${candidate}`,
        mvpCandidate: candidate,
        videoStatus: "Certificate Archived",
        videoUrl: "https://talentlink.edu/certificates/gold-award",
        officialVerdict: citation,
        status: "Verified & Locked"
      });
      renderOfficialLogs();
      showToast(`Award of ${rank} issued to ${candidate}.`);
      el.judgeAwardForm.reset();
    });
  }

  if (el.inquiryForm) {
    el.inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const studentName = document.getElementById("inquiry-student-name").value;
      const purpose = document.getElementById("inquiry-purpose").value;

      state.inquiries.unshift({
        id: `INQ-2026-${Date.now().toString().slice(-3)}`,
        scoutName: state.currentUser.name,
        organization: state.currentUser.institution || "Sponsor Foundation",
        studentId: document.getElementById("inquiry-student-id").value,
        studentName: studentName,
        category: "Scouting Pool",
        purpose: purpose,
        dateSubmitted: new Date().toISOString().split("T")[0],
        status: "Pending Review",
        confidentialityMode: "Data Guard Active"
      });
      renderAdminInquiries();
      closeAllModals();
      showToast(`Outreach for ${studentName} dispatched.`);
    });
  }

  function renderAdminInquiries() {
    const tableBody = document.getElementById("admin-inquiries-body");
    if (!tableBody) return;
    tableBody.innerHTML = state.inquiries.map(inq => `
      <tr>
        <td>
          <strong>${inq.scoutName}</strong>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${inq.organization}</div>
        </td>
        <td>
          <strong>${inq.studentName}</strong>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${inq.category}</div>
        </td>
        <td>
          ${inq.purpose}
        </td>
        <td>
          <span class="badge">${inq.status}</span>
        </td>
        <td>
          <button class="btn-primary" style="padding: 0.5rem; font-size: 0.75rem;" onclick="window.TL_APP.approveInquiry('${inq.id}')">Approve</button>
          <button class="btn-secondary" style="padding: 0.5rem; font-size: 0.75rem;" onclick="window.TL_APP.rejectInquiry('${inq.id}')">Decline</button>
        </td>
      </tr>
    `).join("");
  }

  function bindEvents() {
    if (el.btnSwitchRole) el.btnSwitchRole.addEventListener("click", () => openModal(el.roleModal));
    document.querySelectorAll(".role-select-card").forEach(card => {
      card.addEventListener("click", () => switchUser(card.dataset.role));
    });
    el.roleNavBtns.forEach(btn => btn.addEventListener("click", () => switchView(btn.dataset.view)));
    if (el.btnFeederReferee) el.btnFeederReferee.addEventListener("click", () => switchUser("referee"));
    if (el.btnFeederAdjudicator) el.btnFeederAdjudicator.addEventListener("click", () => switchUser("adjudicator"));
    if (el.btnFeederJudge) el.btnFeederJudge.addEventListener("click", () => switchUser("judge"));
    
    el.categoryChips.forEach(chip => {
      chip.addEventListener("click", () => {
        el.categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        state.activeCategoryFilter = chip.dataset.category;
        renderTalentDirectory();
      });
    });

    const searchHandler = (e) => {
      state.searchQuery = e.target.value;
      renderTalentDirectory();
    };
    if (el.searchInput) el.searchInput.addEventListener("input", searchHandler);
    if (el.sponsorSearchInput) el.sponsorSearchInput.addEventListener("input", searchHandler);

    if (el.filterCategory) el.filterCategory.addEventListener("change", renderTalentDirectory);
    if (el.sponsorFilterCategory) el.sponsorFilterCategory.addEventListener("change", renderTalentDirectory);
    if (el.filterActivity) el.filterActivity.addEventListener("change", renderTalentDirectory);

    document.querySelectorAll(".btn-close-modal").forEach(btn => btn.addEventListener("click", closeAllModals));
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) closeAllModals();
    });

    document.querySelectorAll(".btn-step").forEach(btn => {
      btn.addEventListener("click", () => {
        const display = document.getElementById(btn.dataset.target);
        if (display) {
          let current = parseInt(display.textContent) || 0;
          current = Math.max(0, current + (parseInt(btn.dataset.delta) || 1));
          display.textContent = current;
        }
      });
    });

    document.querySelectorAll(".rubric-slider").forEach(slider => {
      slider.addEventListener("input", (e) => {
        const display = document.getElementById(e.target.dataset.scoreTarget);
        if (display) display.textContent = `${e.target.value}/20`;
        const totalEl = document.getElementById("adj-total-score-display");
        if (totalEl) {
          const s1 = parseInt(document.getElementById("adj-score-vocal")?.value || 0);
          const s2 = parseInt(document.getElementById("adj-score-diction")?.value || 0);
          const s3 = parseInt(document.getElementById("adj-score-rhythm")?.value || 0);
          const s4 = parseInt(document.getElementById("adj-score-presence")?.value || 0);
          const s5 = parseInt(document.getElementById("adj-score-technique")?.value || 0);
          totalEl.textContent = `${s1 + s2 + s3 + s4 + s5}/100`;
        }
      });
    });
  }

  function openModal(modalEl) { if (modalEl) modalEl.classList.add("active"); }
  function closeAllModals() { document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active")); }

  function showToast(msg) {
    if (!el.toastContainer) return;
    const toast = document.createElement("div");
    toast.style.padding = "1rem";
    toast.style.background = "var(--bg-dark)";
    toast.style.color = "var(--text-inverse)";
    toast.style.border = "var(--border-width) solid var(--text-inverse)";
    toast.style.marginBottom = "0.5rem";
    toast.textContent = msg;
    el.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  window.TL_APP = {
    switchView,
    switchUser,
    openTalentModal: (talentId) => {
      const talent = state.talents.find(t => t.id === talentId);
      if (!talent) return;
      if (el.modalTalentDetails) {
        el.modalTalentDetails.innerHTML = `
          <div style="margin-bottom: 2rem;">
            <h2>${talent.name}</h2>
            <p>${talent.school} • ${talent.grade}</p>
            <div class="badge">${talent.overallRating} OVR</div>
          </div>
          <div style="margin-bottom: 1rem;">
            <h4>Biography</h4>
            <p>${talent.bio}</p>
          </div>
          <div style="margin-bottom: 1rem;">
            <h4>Verified Milestones</h4>
            <ul style="list-style: square; padding-left: 1.5rem;">
              ${talent.verifiedBadges.map(b => `<li>${b}</li>`).join("")}
            </ul>
          </div>
          <button class="btn-primary" onclick="window.TL_APP.openInquiryModal('${talent.id}')">Recruit Candidate</button>
        `;
      }
      openModal(el.talentModal);
    },
    openInquiryModal: (talentId) => {
      const talent = state.talents.find(t => t.id === talentId);
      if (!talent) return;
      document.getElementById("inquiry-student-id").value = talent.id;
      document.getElementById("inquiry-student-name").value = talent.name;
      document.getElementById("inquiry-target-label").textContent = `${talent.name} (${talent.school})`;
      openModal(el.inquiryModal);
    },
    approveInquiry: (inqId) => {
      const item = state.inquiries.find(i => i.id === inqId);
      if (item) { item.status = "Approved"; renderAdminInquiries(); showToast(`Inquiry approved.`); }
    },
    rejectInquiry: (inqId) => {
      const item = state.inquiries.find(i => i.id === inqId);
      if (item) { item.status = "Declined"; renderAdminInquiries(); showToast(`Inquiry declined.`); }
    }
  };

  init();
  renderAdminInquiries();
});
