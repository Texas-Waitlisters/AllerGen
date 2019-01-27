import requests

#upc = '01275900'

query = input('What food are you searching for? ')
allergen = input('What allergen are you looking for? ')

api_key = ''
_url = 'https://api.nal.usda.gov/ndb/search'
num_requests = '1'
_params = {'api_key':api_key, 'q':query, 'max':num_requests}

r = requests.get(url = _url, params = _params)
data = r.json().get('list').get('item')
ndbno = ''

for entry in data:
    ndbno = entry.get('ndbno')
    print('\n' + str(entry.get('name')) + '\n')

_url = 'https://api.nal.usda.gov/ndb/V2/reports'
_params = {'api_key':api_key, 'ndbno':ndbno}

r = requests.get(url = _url, params = _params)
data = r.json().get('foods')[0].get('food').get('ing').get('desc')

print(data)

if allergen in str(data).lower():
    print("\nThis food contains " + allergen)
else:
    print("\nThis food does not contain " + allergen)
