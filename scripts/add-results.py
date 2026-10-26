# usage: python3 scripts/add-results.py slug=url slug=url ...  (merges into higgsfield/results.json)
import json,sys
p='higgsfield/results.json'; d=json.load(open(p))
for a in sys.argv[1:]:
    k,v=a.split('=',1); d[k]=v
json.dump(d,open(p,'w'),indent=1)
