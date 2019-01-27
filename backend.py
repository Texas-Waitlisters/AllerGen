import requests, json, re

allergens = ['wheat', 'egg', 'soy']
api_key = ''

def findAllergens(ingredients):
    result = []
    ing = str(ingredients)
    for a in allergens:
        if a in ing:
            print('\nFound allergen ' + str(a) + ' in food\n')
            result.append(a)
    return result

def getIngredients(id):
    data = getInfo(id)
    ingredients = data.get('foods')[0].get('food').get('ing').get('desc').lower()
    result = re.split(', | \(|\)| \[|\]', ingredients)
    result = [x for x in result if x is not None]
    result = [x for x in result if len(x) > 1]
    print(str(result) + '\n')
    return result

def findCommon(q):
    data = []
    for id in q:
        a = getIngredients(id)
        data.append(a)
    common = list(set.intersection(*map(set, data)))
    print(common)

    result = []
    for allergen in allergens:
        for food in common:
            if allergen in food:
                result.append(allergen)
    print(result)

def getInfo(ndbno):
    _url = 'https://api.nal.usda.gov/ndb/V2/reports'
    _params = {'api_key':api_key, 'ndbno':ndbno}
    r = requests.get(url = _url, params = _params)
    return r.json()

def search(q):
    _url = 'https://api.nal.usda.gov/ndb/search'
    num_requests = '1'
    _params = {'api_key':api_key, 'q':q, 'max':num_requests}

    data = requests.get(url = _url, params = _params).json()

    if (data == None):
        print('I did not find any foods matching that name')
    else:
        data = data.get('list').get('item')
        ndbno = data[0].get('ndbno')
        name = data[0].get('name')

        data = getInfo(ndbno)
        ingredients = data.get('foods')[0].get('food').get('ing').get('desc')
        allergens = findAllergens(ingredients)
        allergic = 'n'
        if len(allergens):
            allergic = 'y'

        data = {
            "food": {
                "name": str(name),
                "id": str(ndbno),
                "ingredients": ingredients,
                "allergic": str(allergic),
                "allergens": allergens
            }
        }

        data = json.dumps(data) #JSON String
        print(data)
        return data

def upceToA(upce):
    orig = upce
    check_digit = upce[-1]
    start_digit = upce[0]
    upce = upce[1:-1]

    upca = ""
    if int(upce[-1]) in [0,1,2]:
        upca = upce[0:2] + upce[-1] + "0000" + upce[2:5]
    elif int(upce[-1]) == 3:
        upca = upce[0:3] + "00000" + upce[3:5]
    elif int(upce[-1]) == 4:
        upca = upce[0:4] + "00000" + upce[4]
    elif int(upce[-1]) in [5,6,7,8,9]:
        upca = upce[0:5] + "0000" + upce[-1]
    else:
        raise Exception("Invalid upce")

    upca = start_digit + upca + check_digit
    return upca

def checkCode(num):
    if(len(num) == 6):
        num = upceToA(num)
    return query(num)

def main():
    choice = input('\n[C]ode or [W]ord? ').lower()
    if choice == 'c':
        q = input('\nEnter code: ')
    elif choice == 'w':
        q = input('\nEnter search term: ')
    else:
        q = ''
        print('Invalid choice')

    findCommon(['45293442','45253999','45128355'])
    #return search(q)

main()
    
