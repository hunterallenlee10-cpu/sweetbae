# usage: python3 -I scripts/contact-sheet.py out.jpg cols file...
import sys
from PIL import Image,ImageDraw
out,cols,fs=sys.argv[1],int(sys.argv[2]),sys.argv[3:]
W=400;H=500
rows=(len(fs)+cols-1)//cols
sheet=Image.new('RGB',(W*cols,(H+18)*rows),'white');d=ImageDraw.Draw(sheet)
for i,f in enumerate(fs):
    im=Image.open(f).convert('RGB');im.thumbnail((W,H));x=(i%cols)*W;y=(i//cols)*(H+18)
    sheet.paste(im,(x,y));d.text((x+4,y+H+3),f.split('/')[-1],fill='black')
sheet.save(out,quality=82)
