# Python script to generate a crisp, valid PDF resume for Arun Manjunath
import os

def create_resume_pdf(filename):
    def esc(s):
        return s.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

    lines = []
    
    # We will construct a high quality 1-page PDF
    # Coordinate system: (0,0) is bottom-left, page is 595 x 842 pt (A4)
    # Stream commands
    stream_cmds = []

    def set_font(font, size):
        stream_cmds.append(f"/{font} {size} Tf")

    def set_color_fill(r, g, b):
        stream_cmds.append(f"{r:.3f} {g:.3f} {b:.3f} rg")

    def set_color_stroke(r, g, b):
        stream_cmds.append(f"{r:.3f} {g:.3f} {b:.3f} RG")

    def draw_rect(x, y, w, h, fill=True, stroke=False):
        op = "B" if (fill and stroke) else ("f" if fill else "S")
        stream_cmds.append(f"{x:.1f} {y:.1f} {w:.1f} {h:.1f} re {op}")

    def draw_line(x1, y1, x2, y2, width=1):
        stream_cmds.append(f"{width:.1f} w {x1:.1f} y1 m {x2:.1f} {y2:.1f} l S")

    def text(x, y, txt, font="F1", size=10, r=0.1, g=0.1, b=0.1):
        set_font(font, size)
        set_color_fill(r, g, b)
        stream_cmds.append(f"BT {x:.1f} {y:.1f} Td ({esc(txt)}) Tj ET")

    # Header Background Banner
    # Dark modern banner at top
    stream_cmds.append("q")
    set_color_fill(0.05, 0.08, 0.15) # #0d1424
    draw_rect(0, 730, 595, 112, fill=True, stroke=False)

    # Accent gradient line below header
    set_color_fill(0.22, 0.74, 0.97) # #38bdf8 cyan
    draw_rect(0, 726, 200, 4, fill=True, stroke=False)
    set_color_fill(0.39, 0.40, 0.95) # #6366f1 indigo
    draw_rect(200, 726, 200, 4, fill=True, stroke=False)
    set_color_fill(0.66, 0.33, 0.97) # #a855f7 purple
    draw_rect(400, 726, 195, 4, fill=True, stroke=False)

    # Header Text
    text(40, 795, "ARUN MANJUNATH", font="F2", size=22, r=1.0, g=1.0, b=1.0)
    text(40, 775, "Computer Science Engineering Student | Software Developer", font="F2", size=11, r=0.22, g=0.74, b=0.97)
    text(40, 755, "Bangalore, India  |  arunmanjunath.cse@gmail.com  |  linkedin.com/in/arun-manjunath  |  github.com/arunmanjunath", font="F1", size=8.5, r=0.8, g=0.85, b=0.92)
    stream_cmds.append("Q")

    y = 705

    def section_header(title, cur_y):
        stream_cmds.append("q")
        set_color_fill(0.06, 0.09, 0.18)
        draw_rect(40, cur_y - 2, 515, 20, fill=True, stroke=False)
        set_color_fill(0.22, 0.74, 0.97)
        draw_rect(40, cur_y - 2, 4, 20, fill=True, stroke=False)
        text(50, cur_y + 3, title.upper(), font="F2", size=10, r=0.95, g=0.95, b=1.0)
        stream_cmds.append("Q")
        return cur_y - 18

    # PROFILE SUMMARY
    y = section_header("Professional Summary", y)
    y -= 5
    summary = (
        "Dedicated and motivated Computer Science Engineering student with a solid grounding in Data Structures,",
        "Algorithms, Object-Oriented Programming, and Full-Stack Web Development. Passionate about engineering clean,",
        "efficient software solutions using Java, Python, and C. Proven track record in competitive problem-solving and building",
        "impactful academic and personal projects. Actively seeking software engineering internship and entry-level roles."
    )
    for line in summary:
        text(45, y, line, font="F1", size=9, r=0.2, g=0.22, b=0.28)
        y -= 13

    y -= 8
    # TECHNICAL SKILLS
    y = section_header("Technical Skills", y)
    y -= 5
    skills = [
        ("Programming Languages", "Java (Core & OOP, Collections), C, Python, JavaScript (ES6+)"),
        ("Web Technologies", "HTML5, CSS3 (Flexbox/Grid, Responsive Design), Vanilla JS, Modern REST APIs"),
        ("Core Computer Science", "Data Structures & Algorithms, Object-Oriented Design, DBMS & SQL, OS, Computer Networks"),
        ("Tools & Platforms", "Git, GitHub, VS Code, Linux/Bash, MySQL, Postman")
    ]
    for cat, items in skills:
        text(45, y, f"{cat}:", font="F2", size=9, r=0.1, g=0.15, b=0.25)
        text(190, y, items, font="F1", size=9, r=0.25, g=0.28, b=0.35)
        y -= 14

    y -= 8
    # PROJECTS
    y = section_header("Featured Projects", y)
    y -= 5

    projects = [
        {
            "title": "Algoverse - Algorithm & Pathfinding Visualizer",
            "tech": "JavaScript, HTML5 Canvas, CSS3, Data Structures",
            "points": [
                "Built an interactive web tool visualizing sorting algorithms (QuickSort, MergeSort) and pathfinding (Dijkstra, A*).",
                "Implemented step-by-step state animations, variable speed playback, and custom maze generators."
            ]
        },
        {
            "title": "CampusConnect - Academic Portal & Student Management System",
            "tech": "Java, JDBC, MySQL, HTML/CSS, MVC Architecture",
            "points": [
                "Engineered a multi-role student management portal supporting attendance tracking, grade analytics, and courses.",
                "Implemented secure authentication, relational database normalization, and optimized SQL queries."
            ]
        },
        {
            "title": "CodePulse - Developer Task & Productivity Suite",
            "tech": "Python, Flask, SQLite, JavaScript, Responsive UI",
            "points": [
                "Created an intuitive task management dashboard with Kanban workflows, Pomodoro timers, and progress analytics.",
                "Designed RESTful endpoints with full CRUD capabilities and persistent local storage synchronization."
            ]
        },
        {
            "title": "Network Packet Sniffer & Traffic Inspector",
            "tech": "C, Linux Socket Programming, TCP/IP Protocols",
            "points": [
                "Developed a low-level packet capture application using raw sockets in C to decode ethernet, IP, and TCP headers.",
                "Provided real-time terminal diagnostics and traffic metrics calculation for local network interfaces."
            ]
        }
    ]

    for p in projects:
        text(45, y, p["title"], font="F2", size=9.5, r=0.08, g=0.12, b=0.22)
        text(360, y, f"[{p['tech']}]", font="F3", size=7.5, r=0.25, g=0.35, b=0.55)
        y -= 12
        for pt in p["points"]:
            text(52, y, "-  " + pt, font="F1", size=8.5, r=0.22, g=0.25, b=0.32)
            y -= 11
        y -= 3

    y -= 4
    # EDUCATION
    y = section_header("Education", y)
    y -= 5

    text(45, y, "Bachelor of Engineering (B.E.) in Computer Science & Engineering", font="F2", size=9.5, r=0.08, g=0.12, b=0.22)
    text(475, y, "2022 - 2026", font="F2", size=9, r=0.2, g=0.25, b=0.35)
    y -= 12
    text(45, y, "Visvesvaraya Technological University (VTU) / Engineering College", font="F1", size=8.5, r=0.25, g=0.3, b=0.4)
    text(465, y, "CGPA: 8.85 / 10", font="F2", size=8.5, r=0.05, g=0.5, b=0.2)
    y -= 11
    text(52, y, "-  Coursework: Data Structures & Algorithms, OOP with Java, DBMS, Operating Systems, Computer Networks.", font="F1", size=8, r=0.3, g=0.35, b=0.4)
    y -= 15

    text(45, y, "Pre-University Course (PCMC) - Science Stream", font="F2", size=9.5, r=0.08, g=0.12, b=0.22)
    text(475, y, "2020 - 2022", font="F2", size=9, r=0.2, g=0.25, b=0.35)
    y -= 12
    text(45, y, "Department of Pre-University Education, Karnataka", font="F1", size=8.5, r=0.25, g=0.3, b=0.4)
    text(475, y, "Score: 94%", font="F2", size=8.5, r=0.05, g=0.5, b=0.2)
    y -= 16

    # CERTIFICATIONS & ACHIEVEMENTS
    y = section_header("Certifications & Key Achievements", y)
    y -= 5

    certs = [
        ("Java Programming & Object-Oriented Design Masterclass", "Coursera / Oracle Verified"),
        ("Data Structures & Algorithms Mastery in Java & C", "GeeksforGeeks / LeetCode (500+ Solved)"),
        ("Python for Data Structures & Algorithms", "University of Michigan Online"),
        ("Hackathon Finalist - CivicTech Innovation Challenge", "Inter-Collegiate Hackathon 2024")
    ]
    for cert, issuer in certs:
        text(52, y, f"-  {cert}", font="F2", size=8.5, r=0.15, g=0.2, b=0.28)
        text(420, y, f"-- {issuer}", font="F3", size=8, r=0.35, g=0.4, b=0.5)
        y -= 12

    # Assemble PDF Objects
    stream_data = "\n".join(stream_cmds).encode("latin1")

    objects = []
    
    # 1: Catalog
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # 2: Pages
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    # 3: Page
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>")
    # 4: Contents Stream
    objects.append(f"<< /Length {len(stream_data)} >>\nstream\n".encode("latin1") + stream_data + b"\nendstream")
    # 5: Font F1 (Helvetica)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    # 6: Font F2 (Helvetica-Bold)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    # 7: Font F3 (Helvetica-Oblique)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>")

    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    
    offsets = []
    for i, obj in enumerate(objects, 1):
        offsets.append(len(pdf))
        pdf.extend(f"{i} 0 obj\n".encode("latin1"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")

    xref_offset = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode("latin1"))
    pdf.extend(b"0000000000 65535 f \n")
    for off in offsets:
        pdf.extend(f"{off:010d} 00000 n \n".encode("latin1"))

    pdf.extend(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode("latin1"))

    with open(filename, "wb") as f:
        f.write(pdf)
    print(f"Successfully generated {filename} ({len(pdf)} bytes)")

if __name__ == "__main__":
    os.makedirs("assets", exist_ok=True)
    create_resume_pdf("assets/Arun_Manjunath_Resume.pdf")
