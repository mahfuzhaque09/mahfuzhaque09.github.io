import os

# Ensure working directory is project root
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
os.chdir(project_root)

from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from PIL import Image

output_pdf = 'Md_Mahfuz_Haque_All_Certificates.pdf'

certs = [
    {
        'title': 'Supervised Machine Learning: Regression and Classification',
        'issuer': 'Stanford University & DeepLearning.AI',
        'date': 'November 2025',
        'file': 'images/certificates/cert-stanford-ml.jpg'
    },
    {
        'title': 'Climate Change International Legal Regime',
        'issuer': 'UNITAR & UNEP (United Nations)',
        'date': 'May 2026',
        'file': 'images/certificates/cert-unitar-unep.jpg'
    },
    {
        'title': 'Young SDG Fellowship',
        'issuer': "Commonwealth Students' Association (CSA)",
        'date': 'May 2026',
        'file': 'images/certificates/cert-csa-fellowship.jpg'
    },
    {
        'title': 'Research Assistant Credential — Urban CPTED, Traffic & Waste ML',
        'issuer': 'Dept. of Local Govt & Urban Dev, JKKNIU (Asst. Prof. Uswatun M. Khushi)',
        'date': 'July 2026',
        'file': 'images/certificates/cert-ra-uswatun-khushi.jpg'
    },
    {
        'title': 'Teaching & Research Assistant Testimonial — NVivo, GIS & UGC Project',
        'issuer': 'Dept. of Local Govt & Urban Dev, JKKNIU (Chairman Sadik Hasan Shuvo)',
        'date': 'July 2026',
        'file': 'images/certificates/cert-ta-ra-sadik-shuvo.jpg'
    },
    {
        'title': '3rd Research Fair 2025 — CPTED & Urban Safety Project Presentation',
        'issuer': 'Social Science Faculty, JKKNIU',
        'date': 'May 2025',
        'file': 'images/certificates/cert-cpted-research-fair.jpg'
    },
    {
        'title': 'Day-Long GIS Training Workshop — ArcGIS Tools & Spatial Analysis',
        'issuer': 'Dept. of Local Govt & Urban Dev, JKKNIU',
        'date': 'July 2025',
        'file': 'images/certificates/cert-gis-workshop-jkkniu.jpg'
    },
    {
        'title': 'Professional Training on STATA for Advanced Research',
        'issuer': 'Dept. of Local Govt & Urban Dev, JKKNIU',
        'date': 'November 2025',
        'file': 'images/certificates/cert-stata-jkkniu.jpg'
    },
    {
        'title': 'TEDxJKKNIU Participation — Unleashing Creativity',
        'issuer': 'TED Conferences / JKKNIU',
        'date': 'January 2025',
        'file': 'images/certificates/cert-tedx.jpg'
    },
    {
        'title': 'Data Science Workshop for Research & Higher Studies',
        'issuer': 'Ostad Platform & Research Network',
        'date': '2025',
        'file': 'images/certificates/cert-ostad-datascience.jpg'
    },
    {
        'title': 'SPSS for Quantitative Research & Statistical Analysis',
        'issuer': 'Jagannath University Research Society (JURS)',
        'date': 'January 2026',
        'file': 'images/certificates/cert-spss-jurs.jpg'
    },
    {
        'title': 'Research Methodology — Basic to Advanced (48h Intensive)',
        'issuer': 'Research Help Bangladesh',
        'date': 'November 2025',
        'file': 'images/certificates/cert-research-methodology.jpg'
    },
    {
        'title': 'Basic Research Training Season Two',
        'issuer': 'MK Center for Research & Debate (MKCRD)',
        'date': 'March 2026',
        'file': 'images/certificates/cert-mkcrd-research.jpg'
    },
    {
        'title': 'Youth Climate Justice Workshop 2023',
        'issuer': 'SERAC-Bangladesh & KOICA-NGO Volunteers',
        'date': 'May 2023',
        'file': 'images/certificates/cert-climate-justice.jpg'
    },
    {
        'title': 'Pursuing Electoral Integrity in Bangladesh',
        'issuer': 'Applied Democracy Lab, DU & Westminster Foundation for Democracy (WFD), UK',
        'date': 'July 2025',
        'file': 'images/certificates/cert-electoral-integrity.jpg'
    },
    {
        'title': 'Janata Bank Academic Excellence Merit Award',
        'issuer': 'Janata Bank Limited',
        'date': 'November 2021',
        'file': 'images/certificates/cert-janata-bank-merit.jpg'
    },
    {
        'title': 'Higher Secondary Certificate Examination (HSC) — Science (GPA 5.00)',
        'issuer': 'Board of Intermediate and Secondary Education, Mymensingh',
        'date': 'December 2020',
        'file': 'images/certificates/cert-hsc-2020.jpg'
    },
    {
        'title': 'Secondary School Certificate Examination (SSC) — Science (GPA 5.00)',
        'issuer': 'Board of Intermediate and Secondary Education, Dhaka',
        'date': 'May 2018',
        'file': 'images/certificates/cert-ssc-2018.jpg'
    },
    {
        'title': 'Junior School Certificate Examination (JSC) — GPA 5.00',
        'issuer': 'Board of Intermediate and Secondary Education, Dhaka',
        'date': 'December 2015',
        'file': 'images/certificates/cert-jsc-2015.jpg'
    },
    {
        'title': 'Primary Education Completion Examination (PSC) — GPA 5.00',
        'issuer': 'Directorate of Primary Education, Govt. of Bangladesh',
        'date': 'December 2012',
        'file': 'images/certificates/cert-psc-2012.jpg'
    }
]

c = canvas.Canvas(output_pdf)

# Cover Page (A4 Portrait)
c.setPageSize(A4)
pw, ph = A4

# Dark aesthetic cover
c.setFillColor(colors.HexColor('#0b1120'))
c.rect(0, 0, pw, ph, stroke=0, fill=1)

# Cyan accent line
c.setStrokeColor(colors.HexColor('#06b6d4'))
c.setLineWidth(3)
c.line(40, ph - 55, pw - 40, ph - 55)

c.setFont('Helvetica-Bold', 24)
c.setFillColor(colors.white)
c.drawString(40, ph - 90, 'Md. Mahfuz Haque')

c.setFont('Helvetica', 13)
c.setFillColor(colors.HexColor('#38bdf8'))
c.drawString(40, ph - 112, 'Urban Planner & Geospatial Data Scientist')

c.setFont('Helvetica-Bold', 16)
c.setFillColor(colors.HexColor('#f8fafc'))
c.drawString(40, ph - 150, 'Verified Credentials & Academic Certifications')

c.setFont('Helvetica', 9.5)
c.setFillColor(colors.HexColor('#94a3b8'))
c.drawString(40, ph - 170, f'Comprehensive dossier of {len(certs)} professional certifications, academic honors, and research appointments.')

# Table of contents box
box_top = ph - 190
box_h = ph - 245
c.setFillColor(colors.HexColor('#131e36'))
c.setStrokeColor(colors.HexColor('#1e293b'))
c.roundRect(40, 50, pw - 80, box_h, 8, stroke=1, fill=1)

c.setFont('Helvetica-Bold', 10.5)
c.setFillColor(colors.HexColor('#38bdf8'))
c.drawString(55, box_top - 20, 'INDEX OF CERTIFICATES & CREDENTIALS')

y = box_top - 42
line_spacing = (box_h - 55) / len(certs)
for i, item in enumerate(certs):
    c.setFont('Helvetica-Bold', 8)
    c.setFillColor(colors.HexColor('#e2e8f0'))
    title_snippet = item['title']
    if len(title_snippet) > 55:
        title_snippet = title_snippet[:52] + '...'
    c.drawString(55, y, f"{i+1:02d}. {title_snippet}")
    
    c.setFont('Helvetica', 7.5)
    c.setFillColor(colors.HexColor('#94a3b8'))
    meta_str = f"{item['issuer']} • {item['date']}"
    if len(meta_str) > 42:
        meta_str = meta_str[:40] + '..'
    c.drawRightString(pw - 55, y, meta_str)
    
    y -= line_spacing

c.setFont('Helvetica', 8)
c.setFillColor(colors.HexColor('#64748b'))
c.drawString(40, 30, 'Portfolio: https://mdmahfuzhaque.github.io/  |  Email: mahfuzhaque09@gmail.com  |  Phone: +880 1708 783802')

c.showPage()

# Certificate Pages
for i, item in enumerate(certs):
    with Image.open(item['file']) as im:
        img_w, img_h = im.size
    
    if img_w >= img_h:
        page_size = landscape(A4)
        pw, ph = page_size
    else:
        page_size = A4
        pw, ph = page_size
    
    c.setPageSize(page_size)
    
    c.setFillColor(colors.HexColor('#060b13'))
    c.rect(0, 0, pw, ph, stroke=0, fill=1)
    
    c.setFillColor(colors.HexColor('#0f172a'))
    c.rect(0, ph - 55, pw, 55, stroke=0, fill=1)
    
    c.setStrokeColor(colors.HexColor('#06b6d4'))
    c.setLineWidth(1.5)
    c.line(0, ph - 55, pw, ph - 55)
    
    c.setFont('Helvetica-Bold', 11)
    c.setFillColor(colors.white)
    c.drawString(30, ph - 24, f"Certificate #{i+1:02d}: {item['title']}")
    
    c.setFont('Helvetica', 8.5)
    c.setFillColor(colors.HexColor('#38bdf8'))
    c.drawString(30, ph - 40, f"Issuer: {item['issuer']}  |  Date: {item['date']}")
    
    avail_w = pw - 60
    avail_h = ph - 95
    
    scale = min(avail_w / img_w, avail_h / img_h)
    draw_w = img_w * scale
    draw_h = img_h * scale
    
    draw_x = (pw - draw_w) / 2
    draw_y = 30 + (avail_h - draw_h) / 2
    
    c.setFillColor(colors.white)
    c.roundRect(draw_x - 3, draw_y - 3, draw_w + 6, draw_h + 6, 4, stroke=0, fill=1)
    
    c.drawImage(item['file'], draw_x, draw_y, width=draw_w, height=draw_h)
    
    c.setFont('Helvetica', 8)
    c.setFillColor(colors.HexColor('#64748b'))
    c.drawString(30, 14, 'Md. Mahfuz Haque Portfolio  |  Official Credential Record')
    c.drawRightString(pw - 30, 14, f"Page {i+2} of {len(certs)+1}")
    
    c.showPage()

c.save()
print(f"Generated successfully: {output_pdf} ({os.path.getsize(output_pdf)} bytes)")
