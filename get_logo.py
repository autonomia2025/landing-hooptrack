import re
import base64

with open('hooptrack_brandbook_con_boton_pdf_colores.html', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'<img class="logo-raster" src="data:image/png;base64,([^"]+)"', content)
if match:
    image_data = base64.b64decode(match.group(1))
    with open('logo.png', 'wb') as out:
        out.write(image_data)
else:
    print("Logo not found")
