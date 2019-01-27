import requests

def query(q):
    api_key = ''
    _url = 'https://api.nal.usda.gov/ndb/search'
    num_requests = '1'
    _params = {'api_key':api_key, 'q':q, 'max':num_requests}

    r = requests.get(url = _url, params = _params)
    data = r.json()

    if (data == None):
        print('I did not find any foods matching that name')
    else:
        data = r.json().get('list').get('item')

        ndbno = data[0].get('ndbno')
        print('\n' + str(data[0].get('name')) + '\n')

        _url = 'https://api.nal.usda.gov/ndb/V2/reports'
        _params = {'api_key':api_key, 'ndbno':ndbno}

        r = requests.get(url = _url, params = _params)
        #data = r.json().get('foods')[0].get('food').get('ing').get('desc')
        data = r.json().get('foods')[0].get('food')

        print(data)
        return data

        """
        if allergen in str(data).lower():
            print("\nThis food contains " + allergen)
        else:
            print("\nThis food does not contain " + allergen)
        """

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
        print('Invalid choice')
    return query(q)

main()
    
