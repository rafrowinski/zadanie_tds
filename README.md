### How to start the application

1. Download and install node.js (https://nodejs.org/en/download)
2. To install required dependencies open terminal and go to the project root folder then run: ```npm install```
3. To run the project once again open terminal and go to the project root folder then run: ```npm run dev```

### Changing the settings

Project settings are stored in .env file and they are as follows:

VITE_CURRENCY_BEACON_API_URL=url to the currency beacon api
VITE_CURRENCY_BEACON_API_KEY=api key enabling the usage of the api

### Issues

1. No .env file

Create an empty file in the project root and proceed to next point

2. No api key in .env file

Register a free account here https://currencybeacon.com/register. You will receive an api key along with current api url
Put them like this in your .env file

VITE_CURRENCY_BEACON_API_URL=url to the currency beacon api
VITE_CURRENCY_BEACON_API_KEY=api key enabling the usage of the api

Do not use quotation marks for the key or the url!