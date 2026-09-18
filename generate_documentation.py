"""
TALENTLINK & SCOUTING PLATFORM
System Specification, Architecture & Prototype Guide PDF Generator
Uses ReportLab to produce a publication-quality technical specification PDF.
"""

import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Canvas for adding page numbers and running header/footer."""
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Cover page suppresses headers/footers

        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748b"))

        # Running header
        self.drawString(54, 750, "TALENTLINK & SCOUTING PLATFORM — TECHNICAL SPECIFICATION & PROTOTYPE GUIDE")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 742, 558, 742)

        # Running footer
        self.setFont("Helvetica", 8)
        self.drawString(54, 40, "Confidential • Interschool Extracurricular Accreditation • Jane's Project")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 40, page_str)
        self.line(54, 52, 558, 52)
        self.restoreState()

def build_pdf():
    output_pdf = os.path.join(os.path.dirname(__file__), "TALENTLINK_System_Specification_and_Prototype_Guide.pdf")
    doc = SimpleDocTemplate(
        output_pdf,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom Color Palette
    PRIMARY = colors.HexColor("#0f172a")     # Deep Slate
    ACCENT_EMERALD = colors.HexColor("#059669") # Emerald Green
    ACCENT_CORAL = colors.HexColor("#e11d48")   # Vibrant Rose/Coral
    ACCENT_AMBER = colors.HexColor("#d97706")   # Warm Amber
    TEXT_DARK = colors.HexColor("#1e293b")
    TEXT_MUTED = colors.HexColor("#64748b")
    BG_LIGHT = colors.HexColor("#f8fafc")
    BORDER_LIGHT = colors.HexColor("#e2e8f0")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=PRIMARY,
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=ACCENT_EMERALD,
        spaceAfter=20
    )

    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Header2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=ACCENT_EMERALD,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=TEXT_DARK,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=TEXT_DARK,
        leftIndent=15,
        spaceAfter=3
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=TEXT_DARK
    )

    story = []

    # =========================================================================
    # COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 40))
    story.append(Paragraph("INSTITUTIONAL TECHNICAL REPORT & DESIGN MANUAL", ParagraphStyle(
        'SubTag', fontName='Helvetica-Bold', fontSize=10, textColor=ACCENT_EMERALD, spaceAfter=8
    )))
    story.append(Paragraph("TALENTLINK & SCOUTING PLATFORM", title_style))
    story.append(Paragraph("A Unified Co-Curricular Tracking and Talent Scouting Ecosystem for Secondary Education", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=ACCENT_EMERALD, spaceBefore=0, spaceAfter=25))

    meta_text = """
    <b>System Name:</b> TALENTLINK & SCOUTING PLATFORM<br/>
    <b>Project Context:</b> Jane's Extracurricular Capstone Implementation<br/>
    <b>Deployment Directory:</b> <code>/NEW SYSTEM/</code><br/>
    <b>Architectural Standard:</b> Human-Centric UI/UX, Accessible Responsive Layouts, COPPA/GDPR-K Compliance<br/>
    <b>Date of Publication:</b> March 2026<br/>
    <b>Target User Roles:</b> Sports Referees, Arts Adjudicators, Competition Judges, Scouts, Students, Administrators
    """
    story.append(Paragraph(meta_text, body_style))
    story.append(Spacer(1, 30))

    # Executive Overview Box
    exec_summary_box = [
        [Paragraph("<b>EXECUTIVE SUMMARY & SYSTEM PURPOSE</b>", ParagraphStyle('EB', fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor('#065f46')))],
        [Paragraph(
            "The <b>TALENTLINK & Scouting Platform</b> bridges the gap between grassroots high school extracurricular activities and accredited athletic/creative institutions. By replacing fragmented manual records with a structured, sporty, and aesthetic digital workspace, the system empowers official feeders—<b>Referees</b> for sports, <b>Adjudicators</b> for performance rubrics, and <b>Judges</b> for festival honors—to certify student achievements directly. Extracurricular data is maintained with tamper-resistant audit logs, high-resolution video proof, and strict minor privacy guards.",
            body_style
        )]
    ]
    t_box = Table(exec_summary_box, colWidths=[504])
    t_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#ecfdf5')),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#a7f3d0')),
        ('PADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 4),
    ]))
    story.append(t_box)

    story.append(PageBreak())

    # =========================================================================
    # SECTION 1: ETHICS, RULES AND PRINCIPLES OF WEB DESIGN
    # =========================================================================
    story.append(Paragraph("1. Web Design Principles & Ethical Standards", h1_style))
    story.append(Paragraph(
        "Modern web systems must adhere to strict principles of accessibility, aesthetics, responsive hierarchy, and ethical data governance. TALENTLINK has been engineered specifically to avoid the cluttered, synthetic, and over-scrambled interfaces typical of uncurated prototypes.",
        body_style
    ))

    design_principles_data = [
        [Paragraph("Principle", table_header_style), Paragraph("Implementation in TALENTLINK Platform", table_header_style)],
        [
            Paragraph("<b>Sporty & Co-Curricular Visual Feel</b>", table_cell_style),
            Paragraph("Vibrant athletic emerald, deep midnight slate surfaces, high-contrast typography, and energetic status badges that convey physical agility and theatrical drama.", table_cell_style)
        ],
        [
            Paragraph("<b>Human-Centric UI/UX Layout</b>", table_cell_style),
            Paragraph("Clear role-based sectioning upon login. Each operating persona (Referee, Adjudicator, Judge, Scout) accesses an uncluttered, purpose-built workbench rather than confusing scrambled bars.", table_cell_style)
        ],
        [
            Paragraph("<b>Minor Protection & COPPA Ethics</b>", table_cell_style),
            Paragraph("Because students are minors, personally identifiable information (PII) like phone numbers and home addresses are strictly masked. All scout inquiries are routed through school principals.", table_cell_style)
        ],
        [
            Paragraph("<b>Accessibility & Typography</b>", table_cell_style),
            Paragraph("Strict WCAG AA contrast compliance, semantic HTML5 landmarks, clear label-to-input pairings, and readable Google Display fonts (Outfit & Plus Jakarta Sans).", table_cell_style)
        ]
    ]

    t_principles = Table(design_principles_data, colWidths=[160, 344])
    t_principles.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT]),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_principles)
    story.append(Spacer(1, 14))

    # =========================================================================
    # SECTION 2: SYSTEM SITEMAP & ARCHITECTURAL HIERARCHY
    # =========================================================================
    story.append(Paragraph("2. System Sitemap & Navigation Hierarchy", h1_style))
    story.append(Paragraph(
        "The system sitemap organizes the platform into distinct, authenticated zones accessible through the master topbar navigation.",
        body_style
    ))

    sitemap_data = [
        [Paragraph("Navigation Route", table_header_style), Paragraph("Primary Scope & Feeder Function", table_header_style), Paragraph("Target Operating Persona", table_header_style)],
        [
            Paragraph("<b>/workspace_scout</b><br/>Scout Talent Hub", table_cell_style),
            Paragraph("Multi-variable candidate directory, radar skill visualization, match video player, and recruitment dispatch.", table_cell_style),
            Paragraph("Talent Scouts, University Coaches, Academy Directors", table_cell_style)
        ],
        [
            Paragraph("<b>/workspace_referee</b><br/>Referee Match Center", table_cell_style),
            Paragraph("Log indoor and outdoor sports scores, points steppers, fouls, cards, and game film links with offline queueing.", table_cell_style),
            Paragraph("Official Sports Referees & Match Commissioners", table_cell_style)
        ],
        [
            Paragraph("<b>/workspace_adjudicator</b><br/>Adjudicator Desk", table_cell_style),
            Paragraph("5-standard performance rubric (Tone, Diction, Rhythm, Presence, Technique) with qualitative critiques.", table_cell_style),
            Paragraph("Official Music & Drama Festival Adjudicators", table_cell_style)
        ],
        [
            Paragraph("<b>/workspace_judge</b><br/>Judge Awards Bench", table_cell_style),
            Paragraph("Championship podium rankings, 1st/2nd/3rd medal certifications, and digital badge credential issuance.", table_cell_style),
            Paragraph("Chief Competition Judges & Award Assessors", table_cell_style)
        ],
        [
            Paragraph("<b>/workspace_student</b><br/>Student CV Portal", table_cell_style),
            Paragraph("Certified co-curricular extracurricular portfolio, printable athletic transcript, and verified video highlights.", table_cell_style),
            Paragraph("Student Athletes, Performers, Parents", table_cell_style)
        ],
        [
            Paragraph("<b>/workspace_admin</b><br/>Admin Oversight", table_cell_style),
            Paragraph("School node management, review and approval of incoming scout recruitment inquiries, and audit inspection.", table_cell_style),
            Paragraph("School Principals, Extracurricular Directors", table_cell_style)
        ]
    ]

    t_sitemap = Table(sitemap_data, colWidths=[120, 240, 144])
    t_sitemap.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT]),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_sitemap)

    story.append(PageBreak())

    # =========================================================================
    # SECTION 3: ACTIVITY CATEGORIES TAXONOMY
    # =========================================================================
    story.append(Paragraph("3. Activity Taxonomy & Sanctioned Categories", h1_style))
    story.append(Paragraph(
        "The TALENTLINK platform strictly structures all co-curricular activities into three distinct, standardized tiers as required by educational and sporting boards:",
        body_style
    ))

    cat_table_data = [
        [Paragraph("Tier / Category", table_header_style), Paragraph("Sanctioned Activities", table_header_style), Paragraph("Core Athletic / Artistic Focus", table_header_style)],
        [
            Paragraph("<b>1. Sports<br/>(Indoor Category)</b>", table_cell_style),
            Paragraph("• Table Tennis (Singles & Doubles)<br/>• Badminton (Court Sets)<br/>• Lawn Tennis (Indoor Arena)<br/>• Chess (Classical & Rapid)<br/>• Basketball (Full Regulation)", table_cell_style),
            Paragraph("Spatial anticipation, rapid reaction reflexes, agility, tactical board calculation, and explosive close-court athleticism.", table_cell_style)
        ],
        [
            Paragraph("<b>2. Sports<br/>(Outdoor Category)</b>", table_cell_style),
            Paragraph("• Football (11-a-side pitch)<br/>• Rugby (Sevens & XVs)<br/>• Volleyball (Court/Sand)<br/>• Hockey (Field/Turf)<br/>• Athletics (Track & Field)<br/>• Handball (Team Field)", table_cell_style),
            Paragraph("Cardiorespiratory endurance, tactical pitch positioning, physical contact toughness, sprint acceleration, and team synchronicity.", table_cell_style)
        ],
        [
            Paragraph("<b>3. Music and Drama</b>", table_cell_style),
            Paragraph("• Choral & Solo Singing<br/>• Instrumental & Ensembles<br/>• Spoken Word & Poetry<br/>• Stage Drama & One-Act Plays<br/>• Cultural Dance & Movement", table_cell_style),
            Paragraph("Vocal resonance, diction, rhythmic articulation, dramatic presence, emotional authenticity, and choreography execution.", table_cell_style)
        ]
    ]

    t_cat = Table(cat_table_data, colWidths=[120, 204, 180])
    t_cat.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), ACCENT_EMERALD),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT]),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_cat)
    story.append(Spacer(1, 14))

    # =========================================================================
    # SECTION 4: THE OFFICIAL FEEDER ROLES SPECIFICATION
    # =========================================================================
    story.append(Paragraph("4. Feeder Roles Specification (Referee, Adjudicator, Judge)", h1_style))
    story.append(Paragraph(
        "To ensure verifiable truth, TALENTLINK enforces strict separation of evaluation duties through three dedicated feeder roles:",
        body_style
    ))

    feeders_spec_data = [
        [Paragraph("Official Feeder Role", table_header_style), Paragraph("Primary Domain", table_header_style), Paragraph("Input Methods & Verified Deliverables", table_header_style)],
        [
            Paragraph("<b>Referee</b><br/>(Sports Feeder)", table_cell_style),
            Paragraph("Indoor & Outdoor Sports", table_cell_style),
            Paragraph("• Match scoreline entry with real-time +/- steppers<br/>• Disciplinary logging (Yellow/Red cards, personal fouls)<br/>• Game MVP nomination<br/>• Direct upload or linking of verified match game film", table_cell_style)
        ],
        [
            Paragraph("<b>Adjudicator</b><br/>(Music/Drama Feeder)", table_cell_style),
            Paragraph("Music and Drama", table_cell_style),
            Paragraph("• Standardized 100-pt rubric grading across 5 standards:<br/>  - Vocal Tone & Resonance (20 pts)<br/>  - Diction & Text Delivery (20 pts)<br/>  - Rhythm & Tempo Pacing (20 pts)<br/>  - Stage Presence (20 pts)<br/>  - Artistic Technical Precision (20 pts)<br/>• Time-stamped qualitative critique remarks<br/>• Performance video clip attachment", table_cell_style)
        ],
        [
            Paragraph("<b>Judge</b><br/>(Music/Drama Awards)", table_cell_style),
            Paragraph("Music and Drama", table_cell_style),
            Paragraph("• Championship rankings: 1st Place (Gold), 2nd (Silver), 3rd (Bronze)<br/>• Issuance of formal judicial citations for artistic merit<br/>• Triggers verifiable digital credentials on student profiles", table_cell_style)
        ]
    ]

    t_feeders = Table(feeders_spec_data, colWidths=[120, 114, 270])
    t_feeders.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT]),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_feeders)

    story.append(PageBreak())

    # =========================================================================
    # SECTION 5: TALENT SCOUTING & MINOR DATA PROTECTION WORKFLOW
    # =========================================================================
    story.append(Paragraph("5. Talent Scouting & Minor Data Protection Workflow", h1_style))
    story.append(Paragraph(
        "The scouting module facilitates recruitment while adhering strictly to international minor protection regulations (COPPA & GDPR-K).",
        body_style
    ))

    story.append(Paragraph("<b>End-to-End Outreach Protocol:</b>", h2_style))
    story.append(Paragraph("<b>1. Multi-Criteria Discovery:</b> Scouts filter candidates by discipline (Indoor Sports, Outdoor Sports, Drama), age brackets (14–16, 16–18), overall rating (0–100), and specific skill tags.", bullet_style))
    story.append(Paragraph("<b>2. Verified Evidence Review:</b> Scouts review the student's radar chart, cumulative stats, and watch verified 1080p performance clips certified by official referees or adjudicators.", bullet_style))
    story.append(Paragraph("<b>3. Mediated Outreach Dispatch:</b> Scouts initiate an outreach inquiry detailing the scholarship or academy pathway. At no point is direct personal contact information (phone, address) revealed.", bullet_style))
    story.append(Paragraph("<b>4. Principal Authorization:</b> The inquiry appears in the school principal's administrative oversight portal for formal institutional approval and parental coordination.", bullet_style))

    story.append(Spacer(1, 10))

    # =========================================================================
    # SECTION 6: SOFTWARE ARCHITECTURE & PROTOTYPE IMPLEMENTATION
    # =========================================================================
    story.append(Paragraph("6. Software Components & Implementation Architecture", h1_style))
    story.append(Paragraph(
        "The platform has been implemented entirely within the <code>/NEW SYSTEM/</code> directory as a modular, high-performance web application:",
        body_style
    ))

    arch_data = [
        [Paragraph("Component File", table_header_style), Paragraph("Technology", table_header_style), Paragraph("Architectural Purpose & Responsibility", table_header_style)],
        [
            Paragraph("<code>index.html</code>", table_cell_style),
            Paragraph("HTML5 Semantic", table_cell_style),
            Paragraph("Master layout structure, responsive navigation, dedicated workspace sections, and accessible dialog modals.", table_cell_style)
        ],
        [
            Paragraph("<code>css/style.css</code>", table_cell_style),
            Paragraph("Modern Vanilla CSS3", table_cell_style),
            Paragraph("Athletic color tokens, responsive grid/flexbox layouts, card elevations, steppers, and interactive video player frames.", table_cell_style)
        ],
        [
            Paragraph("<code>js/data.js</code>", table_cell_style),
            Paragraph("JavaScript (ES6+)", table_cell_style),
            Paragraph("Domain models, category taxonomy, certified student profiles, historical audit logs, and rubric definitions.", table_cell_style)
        ],
        [
            Paragraph("<code>js/app.js</code>", table_cell_style),
            Paragraph("JavaScript (ES6+)", table_cell_style),
            Paragraph("Reactive state management, role switching, dynamic filtering, rubric point calculations, and form validation.", table_cell_style)
        ],
        [
            Paragraph("<code>generate_presentation.py</code>", table_cell_style),
            Paragraph("Python / python-pptx", table_cell_style),
            Paragraph("Generates the official 12-slide presentation (.pptx) detailing system architecture and workflows.", table_cell_style)
        ],
        [
            Paragraph("<code>generate_documentation.py</code>", table_cell_style),
            Paragraph("Python / ReportLab", table_cell_style),
            Paragraph("Compiles the complete technical specification and prototype manual into a publication-ready PDF.", table_cell_style)
        ]
    ]

    t_arch = Table(arch_data, colWidths=[130, 110, 264])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT]),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_arch)
    story.append(Spacer(1, 14))

    # =========================================================================
    # SECTION 7: PROTOTYPE VERIFICATION & SUMMARY
    # =========================================================================
    story.append(Paragraph("7. Prototype Verification & Acceptance Criteria", h1_style))
    story.append(Paragraph(
        "The system has been verified against all specified requirements:",
        body_style
    ))

    story.append(Paragraph("✓ <b>Sporty & Co-Curricular Feel:</b> High visual polish, clean cards, authentic athletic color palette, eliminating artificial AI clutter.", bullet_style))
    story.append(Paragraph("✓ <b>Organized Logged-In Sections:</b> Dedicated workspaces for Referee, Adjudicator, Judge, Scout, Student, and Principal.", bullet_style))
    story.append(Paragraph("✓ <b>All Required Indoor Sports:</b> Table Tennis, Badminton, Lawn Tennis, Chess, Basketball.", bullet_style))
    story.append(Paragraph("✓ <b>All Required Outdoor Sports:</b> Football, Rugby, Volleyball, Hockey, Athletics, Handball.", bullet_style))
    story.append(Paragraph("✓ <b>Complete Music & Drama Arts:</b> Choral/Solo Singing, Instrumental, Spoken Word/Poetry, Stage Drama, Cultural Dance.", bullet_style))
    story.append(Paragraph("✓ <b>Official Feeders:</b> Separate and authenticated Referee, Adjudicator, and Judge recording interfaces.", bullet_style))
    story.append(Paragraph("✓ <b>Deliverables:</b> Working web application in <code>/NEW SYSTEM/</code>, PowerPoint presentation (<code>.pptx</code>), and System PDF Guide (<code>.pdf</code>).", bullet_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF Documentation at: {output_pdf}")

if __name__ == "__main__":
    build_pdf()
