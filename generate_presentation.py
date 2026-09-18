"""
TALENTLINK & SCOUTING PLATFORM
PowerPoint Presentation Generator (Netscout Clean White Edition)
Produces a high-quality, professional 12-slide presentation (.pptx)
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Netscout-Inspired Clean White Palette
    C_BG_LIGHT = RGBColor(248, 250, 252) # Soft light background
    C_SURFACE = RGBColor(255, 255, 255)  # Pure white card surface
    C_CARD = RGBColor(255, 255, 255)
    C_TEXT_DARK = RGBColor(15, 23, 42)   # Deep navy / charcoal
    C_EMERALD = RGBColor(5, 150, 105)    # Netscout athletic green
    C_CYAN = RGBColor(0, 153, 168)       # Netscout teal
    C_AMBER = RGBColor(217, 119, 6)      # Amber
    C_CORAL = RGBColor(225, 29, 72)      # Rose coral
    C_MUTED = RGBColor(100, 116, 139)    # Muted slate
    C_BORDER = RGBColor(226, 232, 240)   # Light crisp border

    blank_layout = prs.slide_layouts[6]

    def set_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = C_BG_LIGHT
        bg.line.color.rgb = C_BG_LIGHT
        return bg

    def add_header(slide, title_text, category_tag="TALENTLINK & SCOUTING PLATFORM"):
        # Header category tag (Eyebrow)
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.4))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = category_tag.upper()
        p_tag.font.size = Pt(10)
        p_tag.font.bold = True
        p_tag.font.color.rgb = C_EMERALD

        # Header main title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.7), Inches(0.8))
        tf = title_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = C_TEXT_DARK

        # Divider line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.733), Inches(0.02))
        line.fill.solid()
        line.fill.fore_color.rgb = C_BORDER
        line.line.color.rgb = C_BORDER

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide (Clean White Hero)
    # -------------------------------------------------------------
    s1 = prs.slides.add_slide(blank_layout)
    set_bg(s1)

    # Accent decorative box
    acc = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.733), Inches(4.6))
    acc.fill.solid()
    acc.fill.fore_color.rgb = C_SURFACE
    acc.line.color.rgb = C_BORDER

    tb = s1.shapes.add_textbox(Inches(1.2), Inches(2.2), Inches(10.9), Inches(3.8))
    tf = tb.text_frame
    tf.word_wrap = True

    p0 = tf.paragraphs[0]
    p0.text = "CO-CURRICULAR INTELLIGENCE & TALENT SCOUTING PLATFORM"
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = C_EMERALD

    p1 = tf.add_paragraph()
    p1.text = "TALENTLINK & SCOUTING PLATFORM"
    p1.font.size = Pt(36)
    p1.font.bold = True
    p1.font.color.rgb = C_TEXT_DARK

    p2 = tf.add_paragraph()
    p2.text = "Netscout-Inspired Clean White Design • Precision Tracking for Schools, Referees, Adjudicators & Scouts"
    p2.font.size = Pt(16)
    p2.font.color.rgb = C_CYAN

    p3 = tf.add_paragraph()
    p3.text = "\n• Categories: Sports (Indoor), Sports (Outdoor), Music & Drama\n• Feeders: Official Referee (Sports), Adjudicator (Arts), Judge (Awards)\n• Features: Floating Subnav Pill Bar, Verified Match Scores, Performance Video Feeds, Minor Data Privacy"
    p3.font.size = Pt(13)
    p3.font.color.rgb = C_MUTED

    # -------------------------------------------------------------
    # SLIDE 2: Executive Summary & Project Purpose
    # -------------------------------------------------------------
    s2 = prs.slides.add_slide(blank_layout)
    set_bg(s2)
    add_header(s2, "Executive Summary: Modernizing Co-Curricular Discovery")

    cards_data = [
        ("The Challenge", "Traditional school co-curricular records are paper-bound, prone to inflation, and disconnected from verified scouts. High-performing students lack a credible, tamper-resistant athletic and creative arts transcript.", C_CORAL),
        ("The Solution", "TALENTLINK provides an authentic digital record where certified field officials (Referees, Adjudicators, Judges) log verified scores, time-stamped videos, and standardized rubric evaluations.", C_EMERALD),
        ("Netscout White UI/UX", "Engineered with a clean white aesthetic, crisp elevation shadows, floating pill sub-navigation, and authentic card layouts that eliminate artificial clutter.", C_CYAN)
    ]

    for i, (title, desc, color) in enumerate(cards_data):
        left = Inches(0.8 + i * 4.0)
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.0), Inches(3.733), Inches(4.5))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = color

        tb = s2.shapes.add_textbox(left + Inches(0.3), Inches(2.3), Inches(3.133), Inches(3.8))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = color

        p2 = tf.add_paragraph()
        p2.text = f"\n{desc}"
        p2.font.size = Pt(13)
        p2.font.color.rgb = C_TEXT_DARK

    # -------------------------------------------------------------
    # SLIDE 3: System Sitemap & Navigation Architecture
    # -------------------------------------------------------------
    s3 = prs.slides.add_slide(blank_layout)
    set_bg(s3)
    add_header(s3, "System Sitemap & Floating Subnav Architecture")

    sitemap_nodes = [
        ("1. Scout Talent Hub", "Multi-criteria search, radar metrics, performance video reels, and recruitment outreach dispatch.", C_CYAN),
        ("2. Referee Center", "Match logging for Indoor & Outdoor sports, live point steppers, cards, and game film uploads.", C_EMERALD),
        ("3. Adjudicator Desk", "Standardized 5-criteria performance rubric for music and stage drama with critique remarks.", C_CORAL),
        ("4. Judge Awards", "Podium championship standings, gold/silver medal honors, and formal judicial citations.", C_AMBER),
        ("5. Student CV Portal", "Verified co-curricular transcripts, digital badges, stats summary, and exportable CV sheets.", C_CYAN),
        ("6. Admin Oversight", "Institutional node management, compliance with minor data protection, and scout approvals.", C_EMERALD)
    ]

    for i, (title, desc, color) in enumerate(sitemap_nodes):
        row = i // 3
        col = i % 3
        left = Inches(0.8 + col * 4.0)
        top = Inches(2.0 + row * 2.5)

        card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(3.733), Inches(2.2))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = color

        tb = s3.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(3.333), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = color

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_MUTED

    # -------------------------------------------------------------
    # SLIDE 4: Discipline Categories (Indoor, Outdoor, Music & Drama)
    # -------------------------------------------------------------
    s4 = prs.slides.add_slide(blank_layout)
    set_bg(s4)
    add_header(s4, "Core Disciplines & Categorization Taxonomy")

    categories = [
        ("Sports (Indoor Category)", "🏸 Table Tennis\n🏸 Badminton\n🎾 Lawn Tennis\n♟️ Chess\n🏀 Basketball", C_CYAN, "Focus: Court agility, strategy, and rapid reaction time."),
        ("Sports (Outdoor Category)", "⚽ Football (11-a-side)\n🏉 Rugby (Sevens & XVs)\n🏐 Volleyball\n🏑 Hockey\n🏃 Athletics (Track & Field)\n🤾 Handball", C_EMERALD, "Focus: Endurance, tactical positioning, and physical strength."),
        ("Music and Drama", "🎤 Choral & Solo Singing\n🎻 Instrumental & Ensembles\n📜 Spoken Word & Poetry\n🎭 Stage Drama & Plays\n💃 Cultural Dance & Movement", C_CORAL, "Focus: Pitch accuracy, stage presence, delivery, and creative merit.")
    ]

    for i, (cat_name, items, color, footer_note) in enumerate(categories):
        left = Inches(0.8 + i * 4.0)
        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.0), Inches(3.733), Inches(4.8))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = color

        tb = s4.shapes.add_textbox(left + Inches(0.3), Inches(2.3), Inches(3.133), Inches(4.2))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = cat_name
        p.font.size = Pt(17)
        p.font.bold = True
        p.font.color.rgb = color

        p_items = tf.add_paragraph()
        p_items.text = f"\n{items}"
        p_items.font.size = Pt(13)
        p_items.font.color.rgb = C_TEXT_DARK

        p_foot = tf.add_paragraph()
        p_foot.text = f"\n{footer_note}"
        p_foot.font.size = Pt(11)
        p_foot.font.color.rgb = C_MUTED

    # -------------------------------------------------------------
    # SLIDE 5: The Feeder Ecosystem (Referee, Adjudicator, Judge)
    # -------------------------------------------------------------
    s5 = prs.slides.add_slide(blank_layout)
    set_bg(s5)
    add_header(s5, "The Feeder Ecosystem: Dedicated Evaluator Roles")

    feeders = [
        ("Referee (Sports)", "⚽ Lead Field Official", "• Jurisdiction: All 5 Indoor & 6 Outdoor Sports\n• Logs scorelines, points, and fouls with steppers\n• Submits disciplinary cards and MVP nominations\n• Uploads and verifies official match film clips", C_EMERALD),
        ("Adjudicator (Music & Drama)", "🎭 Performance Arts Critic", "• Jurisdiction: Standardized 100-point rubric\n• Evaluates 5 Key Standards:\n  1. Vocal Tone & Resonance (20 pts)\n  2. Diction & Articulation (20 pts)\n  3. Rhythm & Timing (20 pts)\n  4. Stage Presence (20 pts)\n  5. Technical Precision (20 pts)\n• Submits timed critiques & performance clips", C_CORAL),
        ("Judge (Music & Drama)", "⚖️ Championship Bench", "• Jurisdiction: Competitive ranking & honors\n• Determines 1st Place (Gold), 2nd (Silver), 3rd (Bronze)\n• Issues formal judicial citations of artistic merit\n• Triggers tamper-resistant digital badge credentialing", C_AMBER)
    ]

    for i, (role_title, subtitle, desc, color) in enumerate(feeders):
        left = Inches(0.8 + i * 4.0)
        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.0), Inches(3.733), Inches(4.8))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = color

        tb = s5.shapes.add_textbox(left + Inches(0.3), Inches(2.3), Inches(3.133), Inches(4.2))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = role_title
        p.font.size = Pt(17)
        p.font.bold = True
        p.font.color.rgb = color

        p_sub = tf.add_paragraph()
        p_sub.text = subtitle
        p_sub.font.size = Pt(12)
        p_sub.font.color.rgb = C_CYAN

        p_desc = tf.add_paragraph()
        p_desc.text = f"\n{desc}"
        p_desc.font.size = Pt(12)
        p_desc.font.color.rgb = C_TEXT_DARK

    # -------------------------------------------------------------
    # SLIDE 6: Talent Scouting & Recruitment Workflow
    # -------------------------------------------------------------
    s6 = prs.slides.add_slide(blank_layout)
    set_bg(s6)
    add_header(s6, "Talent Scouting & Discovery Workflow")

    workflow_steps = [
        ("Step 1: Multi-Criteria Filter", "Scouts filter candidates across Indoor Sports, Outdoor, Drama, age brackets (14-16, 16-18), verified overall rating, and key skills.", C_CYAN),
        ("Step 2: Profile & Video Review", "Scouts inspect student performance radar charts, cumulative match logs, official certifications, and watch verified 1080p performance reels.", C_EMERALD),
        ("Step 3: Institutional Outreach", "Scouts initiate a secure recruitment inquiry specifying the scholarship or trial purpose. Direct minor contact is prevented.", C_AMBER),
        ("Step 4: Principal Authorization", "School administration reviews the recruitment request, verifies scout credentials, and coordinates parent/guardian liaison.", C_CORAL)
    ]

    for i, (step_title, step_desc, color) in enumerate(workflow_steps):
        left = Inches(0.8 + i * 3.0)
        card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.1), Inches(2.75), Inches(4.5))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = color

        tb = s6.shapes.add_textbox(left + Inches(0.2), Inches(2.4), Inches(2.35), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = step_title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = color

        p_desc = tf.add_paragraph()
        p_desc.text = f"\n{step_desc}"
        p_desc.font.size = Pt(12)
        p_desc.font.color.rgb = C_TEXT_DARK

    # -------------------------------------------------------------
    # SLIDE 7: Security, Privacy & Ethics of Web Design
    # -------------------------------------------------------------
    s7 = prs.slides.add_slide(blank_layout)
    set_bg(s7)
    add_header(s7, "Security, Privacy & Web Design Principles")

    sec_cards = [
        ("Data Minimization & Minor Protection", "Students are minors; therefore, personally identifiable information (PII) like phone numbers and home addresses are masked. All communication is strictly mediated through verified school principals.", C_CORAL),
        ("Tamper-Evident Credentialing", "Milestone records, referee scorecards, and festival awards are bound to digital audit IDs, preventing fraudulent score manipulation or retroactive metric alterations.", C_EMERALD),
        ("Role-Based Access Control (RBAC)", "Referees only edit match logs; Adjudicators grade performance rubrics; Judges issue competitive medals; Scouts have read-only access to approved public profiles.", C_CYAN),
        ("Netscout Clean Web Principles", "High contrast accessibility, responsive mobile-first grids, clear visual hierarchies, fast load times, and authentic clean white layout without confusing AI clutter.", C_AMBER)
    ]

    for i, (title, desc, color) in enumerate(sec_cards):
        row = i // 2
        col = i % 2
        left = Inches(0.8 + col * 6.0)
        top = Inches(2.0 + row * 2.5)

        card = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.733), Inches(2.2))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = color

        tb = s7.shapes.add_textbox(left + Inches(0.3), top + Inches(0.2), Inches(5.133), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = color

        p_desc = tf.add_paragraph()
        p_desc.text = desc
        p_desc.font.size = Pt(12)
        p_desc.font.color.rgb = C_MUTED

    # -------------------------------------------------------------
    # SLIDE 8: Student Extracurricular CV & Portfolio Showcase
    # -------------------------------------------------------------
    s8 = prs.slides.add_slide(blank_layout)
    set_bg(s8)
    add_header(s8, "Student Extracurricular CV & Portable Portfolio")

    box_l = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.0), Inches(5.7), Inches(4.8))
    box_l.fill.solid()
    box_l.fill.fore_color.rgb = C_SURFACE
    box_l.line.color.rgb = C_EMERALD

    tb_l = s8.shapes.add_textbox(Inches(1.1), Inches(2.3), Inches(5.1), Inches(4.2))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    p = tf_l.paragraphs[0]
    p.text = "The Modern Co-Curricular Transcript"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_EMERALD

    p_body = tf_l.add_paragraph()
    p_body.text = "\n• Cumulative Extracurricular GPA: Validated by certified league referees and festival adjudicators.\n• Dual-Track Showcase: Accommodates multi-talented students (e.g., Basketball Captain who is also Stage Drama Lead).\n• Exportable & Printable: Generates official PDF/print transcripts for college admissions and athletic academies."
    p_body.font.size = Pt(13)
    p_body.font.color.rgb = C_TEXT_DARK

    box_r = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.0), Inches(5.7), Inches(4.8))
    box_r.fill.solid()
    box_r.fill.fore_color.rgb = C_SURFACE
    box_r.line.color.rgb = C_CYAN

    tb_r = s8.shapes.add_textbox(Inches(7.1), Inches(2.3), Inches(5.1), Inches(4.2))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    p_r = tf_r.paragraphs[0]
    p_r.text = "Verified Portfolio Components"
    p_r.font.size = Pt(18)
    p_r.font.bold = True
    p_r.font.color.rgb = C_CYAN

    p_r_body = tf_r.add_paragraph()
    p_r_body.text = "\n1. Verified Badges: e.g., 'County MVP 2025', 'Best Stage Actor Silver', 'FIDE Chess Champion'.\n2. Performance Video Tape: Direct playback of key rallies, solo vocal performances, and match points.\n3. Standardized Radar Metrics: Technique, Agility, Stamina, Leadership, and Academic Discipline."
    p_r_body.font.size = Pt(13)
    p_r_body.font.color.rgb = C_TEXT_DARK

    # -------------------------------------------------------------
    # SLIDE 9: System Architecture & Technical Components
    # -------------------------------------------------------------
    s9 = prs.slides.add_slide(blank_layout)
    set_bg(s9)
    add_header(s9, "System Components & Software Architecture")

    tech_components = [
        ("Frontend Presentation Layer", "Pure Semantic HTML5, Modular CSS3, and Google Display Typography (Outfit & Open Sans). High-performance zero-lag DOM updates.", C_CYAN),
        ("Reactive State Controller", "Pure ES6+ event bus (`app.js`) handling role permissions, view routing, real-time rubric calculations, and modal management.", C_EMERALD),
        ("Domain Model & Data Layer", "Structured data schemas (`data.js`) defining categories, activities, official feeder credentials, talents, and audit logs.", C_AMBER),
        ("Media & Offline Engine", "Video player emulation with timestamp validation, compressed performance clip pointers, and offline local persistence queue.", C_CORAL)
    ]

    for i, (title, desc, color) in enumerate(tech_components):
        left = Inches(0.8 + i * 3.0)
        card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.1), Inches(2.75), Inches(4.5))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = color

        tb = s9.shapes.add_textbox(left + Inches(0.2), Inches(2.4), Inches(2.35), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = color

        p_desc = tf.add_paragraph()
        p_desc.text = f"\n{desc}"
        p_desc.font.size = Pt(12)
        p_desc.font.color.rgb = C_MUTED

    # -------------------------------------------------------------
    # SLIDE 10: End-to-End Operational Process Flow
    # -------------------------------------------------------------
    s10 = prs.slides.add_slide(blank_layout)
    set_bg(s10)
    add_header(s10, "End-to-End Operational Process Flow")

    box_flow = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.0), Inches(11.733), Inches(4.8))
    box_flow.fill.solid()
    box_flow.fill.fore_color.rgb = C_SURFACE
    box_flow.line.color.rgb = C_BORDER

    tb_flow = s10.shapes.add_textbox(Inches(1.2), Inches(2.3), Inches(10.9), Inches(4.2))
    tf_flow = tb_flow.text_frame
    tf_flow.word_wrap = True

    p = tf_flow.paragraphs[0]
    p.text = "The Verified Talent Pipeline (From Field Match to College Recruitment)"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_EMERALD

    p_flow = tf_flow.add_paragraph()
    p_flow.text = """
1. Match / Event Occurrence: Tournament takes place across indoor sports courts, outdoor fields, or festival theaters.
2. Official Feeder Ingestion:
   • Referees log sport scorelines, MVP, and game tape.
   • Adjudicators evaluate 5-criteria performance rubric out of 100 with time-stamped critiques.
   • Judges finalize podium rankings and issue gold/silver/bronze commendations.
3. Automated Ledger Verification: Metrics are bound to the student's immutable profile with audit logs.
4. Scout Discovery: Accredited talent recruiters search candidate radar metrics and view verified video reels.
5. Mediated Institutional Outreach: Scouts submit formal scholarship inquiries approved by the school principal.
"""
    p_flow.font.size = Pt(13)
    p_flow.font.color.rgb = C_TEXT_DARK

    # -------------------------------------------------------------
    # SLIDE 11: Prototype Walkthrough & Key Screens
    # -------------------------------------------------------------
    s11 = prs.slides.add_slide(blank_layout)
    set_bg(s11)
    add_header(s11, "Prototype Walkthrough: Key UI Screens in 'NEW SYSTEM'")

    screens = [
        ("Screen 1: Match Center", "Dedicated Referee interface featuring sport selector (Indoor & Outdoor), team rosters, +/- score steppers, fouls, and video clip URL.", C_EMERALD),
        ("Screen 2: Adjudication Desk", "Interactive rubric sliders (Tone, Diction, Rhythm, Presence, Technique) dynamically totaling 100 points with live qualitative verdict input.", C_CORAL),
        ("Screen 3: Talent Directory", "Live filtering by category, sport, and search keywords. Cards display ratings, badges, video preview ribbons, and recruitment buttons.", C_CYAN),
        ("Screen 4: Admin Oversight", "Institutional dashboard for school principals to inspect audit feeds, manage compliance, and approve incoming scout inquiries.", C_AMBER)
    ]

    for i, (title, desc, color) in enumerate(screens):
        left = Inches(0.8 + i * 3.0)
        card = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.1), Inches(2.75), Inches(4.5))
        card.fill.solid()
        card.fill.fore_color.rgb = C_SURFACE
        card.line.color.rgb = color

        tb = s11.shapes.add_textbox(left + Inches(0.2), Inches(2.4), Inches(2.35), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = color

        p_desc = tf.add_paragraph()
        p_desc.text = f"\n{desc}"
        p_desc.font.size = Pt(12)
        p_desc.font.color.rgb = C_TEXT_DARK

    # -------------------------------------------------------------
    # SLIDE 12: Conclusion & Next Steps
    # -------------------------------------------------------------
    s12 = prs.slides.add_slide(blank_layout)
    set_bg(s12)
    add_header(s12, "Summary, Impact & Future Horizons")

    box_end = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.0), Inches(11.733), Inches(4.8))
    box_end.fill.solid()
    box_end.fill.fore_color.rgb = C_SURFACE
    box_end.line.color.rgb = C_EMERALD

    tb_end = s12.shapes.add_textbox(Inches(1.2), Inches(2.3), Inches(10.9), Inches(4.2))
    tf_end = tb_end.text_frame
    tf_end.word_wrap = True

    p = tf_end.paragraphs[0]
    p.text = "TALENTLINK & SCOUTING PLATFORM: Empowering the Next Generation"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = C_TEXT_DARK

    p_end = tf_end.add_paragraph()
    p_end.text = """
• Netscout-Inspired Clean White Design: Clean, responsive, and purposeful interface built with professional web standards.
• Comprehensive Scope: Encompasses all 5 Indoor Sports, 6 Outdoor Sports, and 5 Music & Drama artistic disciplines.
• Trusted Feeders: Referees, Adjudicators, and Judges provide authoritative verification for true meritocracy.
• Child Protection & Privacy: Ethical web principles ensure minors are protected while their talents shine.

Delivered into folder: /NEW SYSTEM/
Prototype Files: index.html • css/style.css • js/data.js • js/app.js
Documentation: TALENTLINK_System_Specification_and_Prototype_Guide.pdf
"""
    p_end.font.size = Pt(13)
    p_end.font.color.rgb = C_MUTED

    output_path = os.path.join(os.path.dirname(__file__), "TALENTLINK_System_Presentation.pptx")
    prs.save(output_path)
    print(f"Successfully generated PowerPoint presentation at: {output_path}")

if __name__ == "__main__":
    create_presentation()
