from docx import Document
from docx.shared import Pt, Cm
from docx.enum.text import WD_BREAK, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

FONT_SIZE = 10
# Entry number -> break inserted before it.
# Page 1: 1-10 | 11-20.  Page 2: 21-31 | 32-41.
BREAKS = {11: WD_BREAK.COLUMN, 21: WD_BREAK.PAGE, 32: WD_BREAK.COLUMN}
N = 41

doc = Document()
st = doc.styles['Normal']
st.font.name = 'Arial'; st.font.size = Pt(FONT_SIZE)
st.element.rPr.rFonts.set(qn('w:eastAsia'), 'Arial')
pf = st.paragraph_format
pf.space_before = Pt(0); pf.space_after = Pt(0)
pf.line_spacing_rule = WD_LINE_SPACING.EXACTLY; pf.line_spacing = Pt(11)

sec = doc.sections[0]
sec.page_width, sec.page_height = Cm(29.7), Cm(21)   # A4 landscape
for m in ('top_margin', 'bottom_margin'): setattr(sec, m, Cm(1))
for m in ('left_margin', 'right_margin'): setattr(sec, m, Cm(2))
cols = OxmlElement('w:cols'); cols.set(qn('w:num'), '2'); cols.set(qn('w:space'), '1440')
sec._sectPr.append(cols)

for i in range(1, N + 1):
    lines = [f"{i}.\tЈанко Марић - 1.разред", "\tВиолина", "\tКласа:", "\tКорепетитор:"]
    for j, text in enumerate(lines):
        p = doc.add_paragraph()
        f = p.paragraph_format
        f.left_indent = Cm(1); f.first_line_indent = Cm(-1)
        f.tab_stops.add_tab_stop(Cm(1))
        f.keep_with_next = j < 3          # never split an entry
        if j == 3: f.space_after = Pt(3)
        if j == 0 and i in BREAKS:
            p.add_run().add_break(BREAKS[i])
        p.add_run(text)

doc.save('spisak_ucenika.docx')
