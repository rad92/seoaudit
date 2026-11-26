from docx import Document
from docx.shared import Pt, Cm
from docx.enum.text import WD_BREAK
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document()
st = doc.styles['Normal']
st.font.name = 'Arial'; st.font.size = Pt(9)
st.element.rPr.rFonts.set(qn('w:eastAsia'), 'Arial')
pf = st.paragraph_format
pf.space_before = Pt(0); pf.space_after = Pt(0); pf.line_spacing = 1.0

sec = doc.sections[0]
sec.page_width, sec.page_height = Cm(21), Cm(29.7)
for m in ('top_margin','bottom_margin'): setattr(sec, m, Cm(1.5))
for m in ('left_margin','right_margin'): setattr(sec, m, Cm(2))
cols = OxmlElement('w:cols'); cols.set(qn('w:num'), '2'); cols.set(qn('w:space'), '720')
sec._sectPr.append(cols)

N, PER_COL = 25, 13
for i in range(1, N + 1):
    lines = [f"{i}.\tЈанко Марић - 1.разред", "\tВиолина", "\tКласа:", "\tКорепетитор:"]
    for j, text in enumerate(lines):
        p = doc.add_paragraph()
        f = p.paragraph_format
        f.left_indent = Cm(1); f.first_line_indent = Cm(-1)
        f.tab_stops.add_tab_stop(Cm(1))
        f.keep_with_next = j < 3          # never split an entry across columns
        if j == 3: f.space_after = Pt(10)
        if i == PER_COL + 1 and j == 0:   # entries 14-25 start the right column
            p.add_run().add_break(WD_BREAK.COLUMN)
        p.add_run(text)

doc.save('/home/user/seoaudit/output/spisak_ucenika.docx')
