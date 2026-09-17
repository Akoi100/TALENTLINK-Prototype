/**
 * TALENTLINK - Main Application Orchestrator
 * Manages RBAC View Switching, Administrator Credentials Engine,
 * Student CV View, and Global App State.
 */

const AdminModule = {
  init() {
    this.populateStudentDropdowns();
    this.renderInquiriesTable();
    this.bindAdminEvents();
  },

  populateStudentDropdowns() {
    const studentSelects = [
      document.getElementById('badge-student-select'),
      document.getElementById('logger-student-select')
    ];

    studentSelects.forEach(select => {
      if (!select) return;
      select.innerHTML = window.TALENT_DATA.students.map(s => `
        <option value="${s.id}">${s.name} (${s.id}) - ${s.discipline}</option>
      `).join('');
    });
  },

  renderInquiriesTable() {
    const tbody = document.getElementById('admin-inquiries-tbody');
    if (!tbody) return;

    tbody.innerHTML = window.TALENT_DATA.inquiries.map(inq => `
      <tr>
        <td><strong style="font-family: var(--font-mono); color: var(--accent-purple);">${inq.id}</strong></td>
        <td>${inq.date}</td>
        <td><strong>${inq.studentName}</strong><br><small style="color: var(--text-muted); font-family: var(--font-mono);">${inq.studentId}</small></td>
        <td><strong>${inq.scoutName}</strong><br><small style="color: var(--text-muted);">${inq.scoutRep} (${inq.scoutType})</small></td>
        <td style="max-width: 260px; font-size: 0.78rem; color: #cbd5e1;">${inq.message}</td>
        <td>
          <span class="badge-status ${inq.principalApproved ? 'synced' : 'pending'}">
            ${inq.principalApproved ? '✓ Cleared by Principal' : '🔒 Pending Approval'}
          </span>
        </td>
        <td>
          ${inq.principalApproved ? `
            <span style="font-size: 0.75rem; color: #34d399; font-weight: 600;">Routed to Guardian</span>
          ` : `
            <div style="display: flex; gap: 4px;">
              <button class="btn-primary" style="padding: 4px 8px; font-size: 0.72rem;" onclick="AdminModule.approveInquiry('${inq.id}')">
                Approve & Mediate
              </button>
              <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.72rem; color: #f43f5e;" onclick="AdminModule.rejectInquiry('${inq.id}')">
                Decline
              </button>
            </div>
          `}
        </td>
      </tr>
    `).join('');
  },

  approveInquiry(inquiryId) {
    const inq = window.TALENT_DATA.inquiries.find(i => i.id === inquiryId);
    if (!inq) return;

    inq.principalApproved = true;
    inq.status = "Approved by Principal & Routed to Student Guardian";
    this.renderInquiriesTable();
    App.updateHeaderCounters();
    App.renderStudentCV();
    App.showToast(`Inquiry ${inquiryId} cleared by Principal! Student guardian notified via mediated channel.`, "success");
  },

  rejectInquiry(inquiryId) {
    const inq = window.TALENT_DATA.inquiries.find(i => i.id === inquiryId);
    if (!inq) return;

    inq.principalApproved = false;
    inq.status = "Declined by Administration";
    this.renderInquiriesTable();
    App.updateHeaderCounters();
    App.showToast(`Inquiry ${inquiryId} was rejected based on minor welfare guidelines.`, "warning");
  },

  async testVerifyHash(targetHash) {
    // Switch to Admin console view
    App.switchRole('admin');
    const input = document.getElementById('verify-hash-input');
    if (input) input.value = targetHash;
    
    // Auto-trigger verification check
    await this.runHashVerification();
  },

  async runHashVerification() {
    const hashInput = document.getElementById('verify-hash-input');
    const resultBox = document.getElementById('verify-result-box');
    if (!hashInput || !resultBox) return;

    const hashToTest = hashInput.value.trim();
    if (!hashToTest) {
      App.showToast("Please enter or paste a cryptographic hash to verify", "error");
      return;
    }

    // Search across all student badges
    let foundBadge = null;
    let studentOwner = null;

    for (const student of window.TALENT_DATA.students) {
      for (const badge of student.badges) {
        if (badge.hash.toLowerCase() === hashToTest.toLowerCase()) {
          foundBadge = badge;
          studentOwner = student;
          break;
        }
      }
      if (foundBadge) break;
    }

    if (foundBadge) {
      resultBox.style.display = 'block';
      resultBox.style.background = 'rgba(16, 185, 129, 0.1)';
      resultBox.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      resultBox.innerHTML = `
        <div style="color: #34d399; font-weight: 700; font-size: 0.95rem; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          ✓ VALID DIGITAL CREDENTIAL (IMMUTABLE RECORD)
        </div>
        <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
          <strong>Badge Title:</strong> ${foundBadge.title} <br>
          <strong>Student:</strong> ${studentOwner.name} (${studentOwner.id}) <br>
          <strong>Issuing Authority:</strong> ${foundBadge.issuer} <br>
          <strong>Date of Issue:</strong> ${foundBadge.date} <br>
          <strong>Cryptographic Algorithm:</strong> SHA-256 Ledger Anchor
        </div>
      `;
      App.showToast("Credential Integrity Confirmed: Signature matches official ledger!", "success");
    } else {
      resultBox.style.display = 'block';
      resultBox.style.background = 'rgba(244, 63, 94, 0.1)';
      resultBox.style.borderColor = 'rgba(244, 63, 94, 0.4)';
      resultBox.innerHTML = `
        <div style="color: #f43f5e; font-weight: 700; font-size: 0.95rem; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          ⚠️ INVALID OR TAMPERED DIGITAL SIGNATURE
        </div>
        <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
          The supplied hash does not match any authenticated institutional record. Either the score was modified locally, the student ID was forged, or the certificate was never signed by an authorized patron.
        </div>
      `;
      App.showToast("Tamper Alert: Hash verification failed!", "error");
    }
  },

  async simulateTamperingDemo() {
    const resultBox = document.getElementById('tamper-demo-output');
    if (!resultBox) return;

    // Pick Brian Omondi's genuine badge
    const student = window.TALENT_DATA.students.find(s => s.id === "STU-9104");
    const genuineBadge = student.badges[0];

    const genuineData = `STU-9104|STJ-PAT-01|2026-05-30|${genuineBadge.title}`;
    const forgedData = `STU-9104|STJ-PAT-01|2026-05-30|County Football MVP - MODIFIED_GOALS_FROM_18_TO_30`;

    const legitHashObj = await CryptoEngine.generateBadgeHash("STU-9104", "STJ-PAT-01", "2026-05-30", genuineBadge.title);
    const forgedHashObj = await CryptoEngine.generateBadgeHash("STU-9104", "STJ-PAT-01", "2026-05-30", genuineBadge.title + " - TAMPERED STATS");

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div style="font-size: 0.82rem; line-height: 1.6;">
        <strong style="color: #34d399;">1. Original Authentic Record:</strong><br>
        Payload: <code>${genuineData}</code><br>
        SHA-256: <code style="color: #60a5fa;">${legitHashObj.hash}</code><br><br>
        
        <strong style="color: #f43f5e;">2. Attempted Local Database Tamper (e.g. inflating goals/ranking):</strong><br>
        Payload: <code>${forgedData}</code><br>
        Computed Hash: <code style="color: #f43f5e;">${forgedHashObj.hash}</code><br><br>
        
        <div style="padding: 8px; background: rgba(244, 63, 94, 0.15); border-left: 3px solid #f43f5e; border-radius: 4px; font-weight: 600; color: #fca5a5;">
          🛑 REJECTION: The cloud ledger rejects the modified transaction because the hash deviates from the patron's cryptographic private key. Tamper prevention verified!
        </div>
      </div>
    `;

    App.showToast("Tampering demonstration calculated! Cryptographic proof displayed.", "warning");
  },

  bindAdminEvents() {
    const issueForm = document.getElementById('issue-badge-form');
    if (issueForm) {
      issueForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentId = document.getElementById('badge-student-select').value;
        const badgeTitle = document.getElementById('badge-title-input').value;
        const category = document.getElementById('badge-category-select').value;
        const patronId = document.getElementById('badge-patron-id').value;

        const result = await CryptoEngine.issueBadge(studentId, patronId, badgeTitle, category);
        if (result.success) {
          App.showToast(`Verifiable Badge Issued to ${result.student.name}! Hash generated.`, "success");
          issueForm.reset();
          App.renderStudentCV();
          ScoutPortal.renderTalentGrid();
          
          // Display the generated hash
          const hashDisplay = document.getElementById('newly-issued-hash-display');
          if (hashDisplay) {
            hashDisplay.style.display = 'block';
            hashDisplay.innerHTML = `
              <strong>Newly Minted Credential Hash (SHA-256):</strong><br>
              <code style="color: #34d399;">${result.badge.hash}</code><br>
              <small style="color: var(--text-muted);">Payload: ${result.badge.payload}</small>
            `;
          }
        } else {
          App.showToast(result.error, "error");
        }
      });
    }

    const verifyBtn = document.getElementById('btn-run-verify');
    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => this.runHashVerification());
    }

    const tamperBtn = document.getElementById('btn-run-tamper-demo');
    if (tamperBtn) {
      tamperBtn.addEventListener('click', () => this.simulateTamperingDemo());
    }
  }
};

const App = {
  currentRole: 'scout',

  init() {
    this.bindGlobalEvents();
    MatchLogger.init();
    ScoutPortal.init();
    AdminModule.init();
    this.renderStudentCV();
    this.updateHeaderCounters();
  },

  switchRole(role) {
    this.currentRole = role;
    
    // Update role nav buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === role);
    });

    // Update view panels
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `view-${role}`);
    });

    // Scroll to top of main wrapper
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.showToast(`Switched view to ${this.getRoleFriendlyName(role)}`, "info");
  },

  getRoleFriendlyName(role) {
    switch(role) {
      case 'scout': return 'Talent Scout & Scholarship Portal';
      case 'patron': return 'Club Patron & Coach Offline Console';
      case 'admin': return 'School Administrator Credentialing Engine';
      case 'student': return 'Student Cumulative Co-Curricular Portfolio';
      case 'blueprint': return 'Assessor System Blueprint & Specification';
      default: return role;
    }
  },

  switchSubtab(parentPanelId, targetSubtabId) {
    const parent = document.getElementById(parentPanelId);
    if (!parent) return;

    // Subtab buttons
    parent.querySelectorAll('.subtab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.subtab === targetSubtabId);
    });

    // Subtab panes
    parent.querySelectorAll('.subtab-pane').forEach(pane => {
      pane.style.display = (pane.id === targetSubtabId) ? 'block' : 'none';
    });
  },

  renderStudentCV() {
    const cvWrap = document.getElementById('student-cv-content');
    if (!cvWrap) return;

    // Default to Dennis Kipruto as primary showcase student
    const student = window.TALENT_DATA.students[0];

    cvWrap.innerHTML = `
      <div class="student-cv-hero">
        <img src="${student.avatar}" alt="${student.name}" class="student-avatar-large" />
        <div class="student-hero-info">
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <h1 style="font-size: 1.85rem;">${student.name}</h1>
            <span class="meta-badge" style="font-size: 0.8rem;">${student.id}</span>
            <span class="meta-badge warning" style="font-size: 0.8rem;">Age ${student.age} • ${student.grade}</span>
          </div>
          <p style="color: var(--accent-blue); font-size: 1.05rem; font-weight: 600; margin-top: 4px;">${student.discipline}</p>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 2px;">${window.TALENT_DATA.school.name} • ${window.TALENT_DATA.school.region}</p>
          
          <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
            <div style="background: rgba(255,255,255,0.05); padding: 6px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <small style="color: var(--text-muted); display: block; font-size: 0.72rem;">Verified Athletic Rating</small>
              <strong style="color: #60a5fa; font-size: 1.15rem; font-family: var(--font-mono);">${student.verifiedRating}%</strong>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 6px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <small style="color: var(--text-muted); display: block; font-size: 0.72rem;">Academic Conduct</small>
              <strong style="color: #34d399; font-size: 1.15rem; font-family: var(--font-mono);">${student.academicConduct}%</strong>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 6px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <small style="color: var(--text-muted); display: block; font-size: 0.72rem;">5000m Personal Best</small>
              <strong style="color: #fbbf24; font-size: 1.15rem; font-family: var(--font-mono);">${student.keyStats.pb5000m}</strong>
            </div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1.5rem;">
        <!-- Left Column: Verified Badges & Opportunities -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div class="card-panel">
            <h3 class="card-panel-title">
              <span>🛡️ Tamper-Evident Credentials & Badges</span>
              <span class="meta-badge">${student.badges.length} Verified</span>
            </h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${student.badges.map(b => `
                <div style="background: #0a0e1a; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <strong style="color: var(--text-highlight); font-size: 0.95rem;">${b.title}</strong>
                      <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">Issued on ${b.date} by ${b.issuer}</p>
                    </div>
                    <span class="talent-verified-stamp" style="position: static;">Verified Ledger Hash</span>
                  </div>
                  <div class="crypto-hash-box" style="margin-top: 0.6rem; padding: 6px 10px; font-size: 0.7rem;">
                    SHA-256: ${b.hash}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Opportunities / Scholarship Offers (Institutional Mediation) -->
          <div class="card-panel">
            <h3 class="card-panel-title">
              <span>🎓 Scholarship Offers & Scout Inquiries</span>
              <span class="meta-badge warning">Mediated Access</span>
            </h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${window.TALENT_DATA.inquiries.filter(i => i.studentId === student.id).map(inq => `
                <div style="background: #0a0e1a; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                    <div>
                      <strong style="color: #93c5fd; font-size: 0.9rem;">${inq.scoutName}</strong>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">${inq.scoutRep} • ${inq.scoutType}</div>
                    </div>
                    <span class="badge-status ${inq.principalApproved ? 'synced' : 'pending'}">
                      ${inq.principalApproved ? '✓ Approved by Principal' : '🔒 Under Institutional Review'}
                    </span>
                  </div>
                  <p style="font-size: 0.82rem; color: #e2e8f0; margin-top: 4px;">${inq.message}</p>
                  <div style="margin-top: 8px; font-size: 0.75rem; color: #a5b4fc; background: rgba(99, 102, 241, 0.1); padding: 4px 8px; border-radius: 4px;">
                    <strong>Proposed Terms:</strong> ${inq.terms}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Column: Timeline & Media Highlight -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div class="card-panel">
            <h3 class="card-panel-title">
              <span>📅 Verified Match & Event History</span>
            </h3>
            <div class="timeline-feed">
              ${student.timeline.map(t => `
                <div class="timeline-node">
                  <div class="timeline-marker"></div>
                  <div class="timeline-card">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                      <strong style="color: var(--text-highlight); font-size: 0.82rem;">${t.event}</strong>
                      <small style="color: var(--accent-blue); font-family: var(--font-mono); font-size: 0.72rem;">${t.date}</small>
                    </div>
                    <div style="font-size: 0.78rem; color: #34d399; font-weight: 600;">${t.result}</div>
                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 3px;">${t.notes}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card-panel">
            <h3 class="card-panel-title">
              <span>🎬 Compressed Media Reel</span>
            </h3>
            <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle); position: relative;">
              <img src="${student.avatar}" style="width: 100%; height: 160px; object-fit: cover;" />
              <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
                <button class="btn-primary" style="padding: 8px 16px;" onclick="App.showToast('Playing compressed clip from local SQLite pointer...', 'info')">
                  ▶️ Play 5000m Final Lap
                </button>
              </div>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px; text-align: center;">
              Binary compressed: 4.8MB (Stored as local pointer, synced via background queue).
            </p>
          </div>
        </div>
      </div>
    `;
  },

  updateHeaderCounters() {
    const pendingSyncCount = window.TALENT_DATA.transactions.filter(t => t.status === "Pending_Sync").length;
    const pendingInqCount = window.TALENT_DATA.inquiries.filter(i => !i.principalApproved).length;

    const pendingTag = document.getElementById('pending-tx-counter');
    if (pendingTag) pendingTag.textContent = `${pendingSyncCount} Pending Sync`;

    const inqTag = document.getElementById('pending-inq-counter');
    if (inqTag) inqTag.textContent = `${pendingInqCount} Pending Review`;
  },

  showToast(message, type = "info") {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = "ℹ️";
    if (type === "success") icon = "✓";
    if (type === "warning") icon = "⚠️";
    if (type === "error") icon = "❌";

    toast.innerHTML = `
      <span style="font-weight: 800; font-size: 1rem;">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.remove('active');
    });
  },

  bindGlobalEvents() {
    // Role switcher clicks
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchRole(btn.dataset.role);
      });
    });

    // Subtab clicks
    document.querySelectorAll('.subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parentId = btn.closest('.view-panel').id;
        this.switchSubtab(parentId, btn.dataset.subtab);
      });
    });

    // Modal close clicks
    document.querySelectorAll('.modal-close-btn, .btn-modal-close').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    // Logger form submit
    const loggerForm = document.getElementById('match-logger-form');
    if (loggerForm) {
      loggerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
          studentId: document.getElementById('logger-student-select').value,
          activityType: document.getElementById('logger-activity-type').value,
          fixtureName: document.getElementById('logger-fixture-select').value,
          goals: document.getElementById('logger-goals').value,
          assists: document.getElementById('logger-assists').value,
          cards: document.getElementById('logger-cards').value,
          distance: document.getElementById('logger-distance').value,
          sprintTime: document.getElementById('logger-time').value,
          position: document.getElementById('logger-position').value,
          patronName: document.getElementById('logger-patron-name').value,
          notes: document.getElementById('logger-notes').value
        };

        MatchLogger.logMatchEvent(formData);
        loggerForm.reset();
      });
    }

    // Dynamic show/hide fields based on activity in logger
    const activitySelect = document.getElementById('logger-activity-type');
    if (activitySelect) {
      activitySelect.addEventListener('change', (e) => {
        const footballFields = document.getElementById('logger-football-fields');
        const athleticsFields = document.getElementById('logger-athletics-fields');
        if (e.target.value === 'Football') {
          if (footballFields) footballFields.style.display = 'grid';
          if (athleticsFields) athleticsFields.style.display = 'none';
        } else if (e.target.value === 'Athletics') {
          if (footballFields) footballFields.style.display = 'none';
          if (athleticsFields) athleticsFields.style.display = 'grid';
        } else {
          if (footballFields) footballFields.style.display = 'none';
          if (athleticsFields) athleticsFields.style.display = 'none';
        }
      });
    }

    // Creative Media upload mock
    const mediaForm = document.getElementById('creative-upload-form');
    if (mediaForm) {
      mediaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('creative-title').value;
        const studentId = document.getElementById('creative-student-select').value;
        const category = document.getElementById('creative-category').value;
        
        App.showToast(`Compressing media locally (24.2 MB -> 4.1 MB)...`, "info");
        setTimeout(() => {
          App.showToast(`Media '${title}' queued as local pointer. Will sync in background.`, "success");
          mediaForm.reset();
        }, 800);
      });
    }

    // Scout Inquiry form submit
    const inquiryForm = document.getElementById('scout-inquiry-form');
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
          studentId: document.getElementById('inquiry-student-id').value,
          scoutOrg: document.getElementById('inquiry-scout-org').value,
          scoutRep: document.getElementById('inquiry-scout-rep').value,
          opportunityType: document.getElementById('inquiry-type').value,
          terms: document.getElementById('inquiry-terms').value,
          message: document.getElementById('inquiry-message').value
        };
        ScoutPortal.submitOutreach(formData);
      });
    }
  }
};

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;
window.AdminModule = AdminModule;
