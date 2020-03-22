import urllib.request
import random
import time
url='https://api.thingspeak.com/update?api_key=YX9W5VDMGH9NRC4A&field2='
print('sssss')
for i in range(1,10):
    value=random.randrange(1,10)
    print(value)
    urllib.request.urlopen(url+str(value))
    time.sleep(20)
