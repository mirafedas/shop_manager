## Project name: Shop Manager Application
[Demo](https://myrosvas.github.io/shop_manager/)

> This is a simple command-line-like tool to manage finanses in the small shop. There are four commands you can use:
* purchase 2019-04-25 12 USD “Photo Frame”  — adds purchases made by customers in any supported currency (e.g. USD, EUR, PLN, etc.) to the list of purchases. Purchases for various dates could be added in any order. Command accepts the following parameters:

2019-04-25 — the date when purchase has occurred
12 — an amount of money spent by customer
USD — the currency in which purchase has occurred
“Photo Frame” — the name of the product purchased

* all — shows all purchases sorted by date

* clear 2019-04-25 — removes all purchases for specified date, where:

* 2019-04-25 — the date for which all purchases should be removed

* report 2019 UAH — this command should take a list of cross-currency exchange rates from http://fixer.io (register for a free plan), calculate the total income for specified year, convert and present it in specified currency, where:

2019 — year for which total income should be calculated
UAH — currency in which total income is presented


## Tech stack

* JavaScript
* HTML, CSS
* Mocha

## How to run

To run this application, you need to:
1) Clone this repository: git clone https://github.com/myrosvas/shop_manager.git
2) In that directory execute: 
npm install
3) Open index.html in the browser;
4) To run tests, execute:
npm test

## TODO

1. Add more unit tests;
2. Add validation for all possible options;