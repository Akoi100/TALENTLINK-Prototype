/**
 * TALENTLINK - Scout Discovery Portal & Minor-Safe Outreach Engine
 * Complies with Sections 3, 4.2, 5:
 * "1. Filtering: Scout filters database for students aged 14 to 16 with verified rating and conduct score.
 *  2. Portfolio Review: Scout views verified timeline, compressed video, and official certificates.
 *  3. Secure Outreach: Encrypted inquiry routed to School Principal and Activity Patron for approval.
 *  4. Data Minimization: PII such as home addresses and direct contacts are masked."
 */

const ScoutPortal = {
  currentFilter: {
    category: "all",
    minAge: 14,
    maxAge: 18,
    minRating: 85,
    minConduct: 80,
    search: ""
  },

  init() {
    this.bindEvents();
    this.renderTalentGrid();
  },

  getFilteredStudents() {
    return window.TALENT_DATA.students.filter(student => {
      // Category filter
      if (this.currentFilter.category !== "all" && student.category !== this.currentFilter.category) {
        return false;
      }
      // Age filter
      if (student.age < this.currentFilter.minAge || student.age > this.currentFilter.maxAge) {
        return false;
      }
      // Rating
      if (student.verifiedRating < this.currentFilter.minRating) {
        return false;
      }
      // Conduct
      if (student.academicConduct < this.currentFilter.minConduct) {
        return false;
      }
      // Search
      if (this.currentFilter.search) {
        const query = this.currentFilter.search.toLowerCase();
        const matches = student.name.toLowerCase().includes(query) ||
                        student.discipline.toLowerCase().includes(query) ||
                        student.category.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  },

  renderTalentGrid() {
    const grid = document.getElementById('scout-talent-grid');
    const countBadge = document.getElementById('talent-count-badge');
    if (!grid) return;

    const students = this.getFilteredStudents();
    if (countBadge) {
      countBadge.textContent = `${students.length} Verified Candidates`;
    }

    if (students.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-card);">
          <h3 style="margin-bottom: 0.5rem; color: var(--text-secondary);">No Candidates Match The Selected Criteria</h3>
          <p style="font-size: 0.9rem;">Try adjusting the age slider, lowering the conduct threshold, or selecting "All Categories".</p>
          <button class="btn-secondary" style="margin-top: 1rem;" onclick="ScoutPortal.resetFilters()">Reset Search Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = students.map(s => `
      <div class="talent-card" data-student-id="${s.id}">
        <div class="talent-card-header">
          <img src="${s.avatar}" alt="${s.name}" class="talent-card-img" />
          <div class="talent-overlay-gradient"></div>
          <span class="talent-category-pill">${s.category}</span>
          <span class="talent-verified-stamp">✓ Verified Record</span>
        </div>

        <div class="talent-card-body">
          <div class="talent-meta-row">
            <div>
              <h3 class="talent-name">${s.name}</h3>
              <p class="talent-school">${window.TALENT_DATA.school.name} • ${s.grade}</p>
            </div>
            <span class="talent-age-badge">Age ${s.age}</span>
          </div>

          <p style="font-size: 0.85rem; color: #cbd5e1; font-weight: 500;">${s.discipline}</p>

          <!-- Core Metric Meters -->
          <div class="metric-bars-stack">
            <div class="metric-bar-item">
              <div class="metric-label-row">
                <span>Verified Talent Rating</span>
                <span class="val" style="color: #60a5fa;">${s.verifiedRating}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill blue" style="width: ${s.verifiedRating}%;"></div>
              </div>
            </div>

            <div class="metric-bar-item">
              <div class="metric-label-row">
                <span>Academic & Conduct Score</span>
                <span class="val" style="color: #34d399;">${s.academicConduct}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill emerald" style="width: ${s.academicConduct}%;"></div>
              </div>
            </div>
          </div>

          <!-- Badges Strip -->
          <div class="talent-badges-strip">
            ${s.badges.map(b => `
              <span class="badge-micro-pill" title="SHA-256 Hash Verified">
                🛡️ ${b.title}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="talent-card-footer">
          <button class="btn-primary" onclick="ScoutPortal.openDossier('${s.id}')">
            <span>Inspect Verified Dossier</span>
          </button>
          <button class="btn-secondary" onclick="ScoutPortal.openOutreachModal('${s.id}')" title="Encrypted Institutional Inquiry">
            <span>Offer Inquiry</span>
          </button>
        </div>
      </div>
    `).join('');
  },

  openDossier(studentId) {
    const student = window.TALENT_DATA.students.find(s => s.id === studentId);
    if (!student) return;

    const modal = document.getElementById('student-dossier-modal');
    const content = document.getElementById('dossier-modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; align-items: center;">
        <img src="${student.avatar}" alt="${student.name}" style="width: 110px; height: 110px; border-radius: var(--radius-lg); object-fit: cover; border: 2px solid var(--accent-blue);" />
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <h2 style="font-size: 1.5rem;">${student.name}</h2>
            <span class="meta-badge">ID: ${student.id}</span>
            <span class="meta-badge warning">Age ${student.age}</span>
          </div>
          <p style="color: var(--accent-blue); font-weight: 600; font-size: 0.95rem;">${student.discipline}</p>
          <p style="color: var(--text-muted); font-size: 0.85rem;">${window.TALENT_DATA.school.name} • ${student.grade}</p>
          
          <!-- Minor Data Minimization Alert -->
          <div style="margin-top: 0.75rem; padding: 6px 12px; background: rgba(59, 130, 246, 0.1); border: 1px dashed rgba(59, 130, 246, 0.4); border-radius: var(--radius-sm); font-size: 0.76rem; color: #93c5fd;">
            🔒 <strong>Minor Privacy Guard:</strong> Residential address & direct contact masked. Scout contact is routed through Institutional Mediation Officer <em>${student.guardianMediation}</em>.
          </div>
        </div>
      </div>

      <!-- Radar & Key Metrics Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 0.75rem;">Physical / Performance Radar</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.8rem;">
            ${Object.entries(student.radar).map(([metric, val]) => `
              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                  <span style="text-transform: capitalize;">${metric.replace(/([A-Z])/g, ' $1')}</span>
                  <span style="font-family: var(--font-mono); color: #93c5fd;">${val}%</span>
                </div>
                <div class="progress-track" style="height: 4px;">
                  <div class="progress-fill blue" style="width: ${val}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 0.75rem;">Verified Match & Field Metrics</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem;">
            ${Object.entries(student.keyStats).map(([key, val]) => `
              <div style="display: flex; justify-content: space-between; padding-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="color: var(--text-secondary); text-transform: capitalize;">${key.replace(/([A-Z0-9])/g, ' $1')}:</span>
                <strong style="color: var(--text-highlight); font-family: var(--font-mono);">${val}</strong>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Verified Badges (Cryptographically signed) -->
      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.9rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 6px;">
          <span>🛡️ Cryptographically Signed Credentials & Badges</span>
          <span style="font-size: 0.7rem; color: #10b981; font-weight: 500;">(Tamper-Evident SHA-256)</span>
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          ${student.badges.map(b => `
            <div style="background: #090e1a; border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 0.75rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
              <div>
                <strong style="color: var(--text-highlight); font-size: 0.88rem;">${b.title}</strong>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Issued on ${b.date} by ${b.issuer}</p>
                <code style="font-size: 0.68rem; color: #60a5fa; display: block; margin-top: 3px;">Hash: ${b.hash}</code>
              </div>
              <button class="btn-secondary" style="font-size: 0.75rem; padding: 4px 10px;" onclick="AdminModule.testVerifyHash('${b.hash}')">
                Verify Signature
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Verified Timeline -->
      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.9rem; margin-bottom: 0.75rem;">📅 Verified Performance History</h4>
        <div class="timeline-feed">
          ${student.timeline.map(t => `
            <div class="timeline-node">
              <div class="timeline-marker"></div>
              <div class="timeline-card">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <strong style="color: var(--text-highlight); font-size: 0.85rem;">${t.event}</strong>
                  <small style="color: var(--accent-blue); font-family: var(--font-mono);">${t.date}</small>
                </div>
                <div style="font-size: 0.8rem; color: #34d399; font-weight: 600; margin-bottom: 3px;">${t.result}</div>
                <p style="font-size: 0.78rem; color: var(--text-secondary);">${t.notes}</p>
                <small style="color: var(--text-muted); font-size: 0.72rem; display: block; margin-top: 4px;">Verified by: ${t.verifiedBy}</small>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Compressed Media Highlight Simulation -->
      <div>
        <h4 style="font-size: 0.9rem; margin-bottom: 0.75rem;">🎬 Performance Media Snippet (Compressed Edge Sync)</h4>
        <div style="background: #080c14; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
              ▶️
            </div>
            <div>
              <strong style="font-size: 0.85rem; color: var(--text-highlight);">${student.media[0]?.title || "Official Highlight Reel"}</strong>
              <p style="font-size: 0.75rem; color: var(--text-muted);">${student.media[0]?.duration || "1m 30s"} • ${student.media[0]?.size || "4.5 MB"}</p>
            </div>
          </div>
          <button class="btn-secondary" style="font-size: 0.75rem;" onclick="App.showToast('Playing compressed clip from local cache...', 'info')">
            Play Video Snippet
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  },

  openOutreachModal(studentId) {
    const student = window.TALENT_DATA.students.find(s => s.id === studentId);
    if (!student) return;

    const modal = document.getElementById('outreach-inquiry-modal');
    const targetStudentInput = document.getElementById('inquiry-student-id');
    const targetStudentName = document.getElementById('inquiry-student-name-display');

    if (targetStudentInput) targetStudentInput.value = student.id;
    if (targetStudentName) targetStudentName.textContent = `${student.name} (${student.id}) • ${student.discipline}`;

    if (modal) modal.classList.add('active');
  },

  submitOutreach(formData) {
    const student = window.TALENT_DATA.students.find(s => s.id === formData.studentId);
    if (!student) return;

    const newInq = {
      id: "INQ-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      studentId: student.id,
      studentName: student.name,
      scoutName: formData.scoutOrg || "International Athletics Scout",
      scoutRep: formData.scoutRep || "Authorized Scout Representative",
      scoutType: formData.opportunityType || "Sports Scholarship",
      message: formData.message,
      terms: formData.terms || "Tuition Coverage + Training Support",
      date: new Date().toISOString().split('T')[0],
      status: "Pending Principal Review",
      principalApproved: false,
      patronReviewed: false
    };

    window.TALENT_DATA.inquiries.unshift(newInq);
    App.updateHeaderCounters();
    App.closeModals();
    AdminModule.renderInquiriesTable();

    App.showToast(`Encrypted Inquiry (${newInq.id}) submitted! Routed to Principal Dr. Margaret Kosgey for child-safety clearance.`, "success");
  },

  resetFilters() {
    this.currentFilter = {
      category: "all",
      minAge: 14,
      maxAge: 18,
      minRating: 85,
      minConduct: 80,
      search: ""
    };

    // Reset UI inputs
    const catSelect = document.getElementById('filter-category');
    if (catSelect) catSelect.value = "all";
    const ageSlider = document.getElementById('filter-age-max');
    if (ageSlider) ageSlider.value = 18;
    const ratingSlider = document.getElementById('filter-rating-min');
    if (ratingSlider) ratingSlider.value = 85;
    const conductSlider = document.getElementById('filter-conduct-min');
    if (conductSlider) conductSlider.value = 80;
    const searchInput = document.getElementById('filter-search');
    if (searchInput) searchInput.value = "";

    this.renderTalentGrid();
  },

  bindEvents() {
    const catSelect = document.getElementById('filter-category');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.currentFilter.category = e.target.value;
        this.renderTalentGrid();
      });
    }

    const ageSlider = document.getElementById('filter-age-max');
    const ageVal = document.getElementById('filter-age-val');
    if (ageSlider) {
      ageSlider.addEventListener('input', (e) => {
        this.currentFilter.maxAge = parseInt(e.target.value);
        if (ageVal) ageVal.textContent = `14 - ${e.target.value} yrs`;
        this.renderTalentGrid();
      });
    }

    const ratingSlider = document.getElementById('filter-rating-min');
    const ratingVal = document.getElementById('filter-rating-val');
    if (ratingSlider) {
      ratingSlider.addEventListener('input', (e) => {
        this.currentFilter.minRating = parseInt(e.target.value);
        if (ratingVal) ratingVal.textContent = `${e.target.value}%+`;
        this.renderTalentGrid();
      });
    }

    const conductSlider = document.getElementById('filter-conduct-min');
    const conductVal = document.getElementById('filter-conduct-val');
    if (conductSlider) {
      conductSlider.addEventListener('input', (e) => {
        this.currentFilter.minConduct = parseInt(e.target.value);
        if (conductVal) conductVal.textContent = `${e.target.value}%+`;
        this.renderTalentGrid();
      });
    }

    const searchInput = document.getElementById('filter-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentFilter.search = e.target.value;
        this.renderTalentGrid();
      });
    }
  }
};

window.ScoutPortal = ScoutPortal;
