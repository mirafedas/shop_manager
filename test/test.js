const expect = require('chai').expect;
const countTotalSum = require('../script.js');

describe('countTotalSum()', function () {
  it('should add all prices in specified currency', function () {
    
    // 1. ARRANGE
    const itemsList = [
{date: "2019-05-15", price: "1", currency: "UAH", name: "Apple"},
{date: "2019-05-01", price: "11", currency: "EUR", name: "Apple"},
{date: "2019-05-01", price: "111", currency: "PLN", name: "Apple"},
{date: "2019-04-25", price: "10", currency: "USD", name: "“Photo Frame”"},
{date: "2019-04-25", price: "10", currency: "USD", name: "“Photo Frame”"},
{date: "2019-04-25", price: "10", currency: "USD", name: "“Photo Frame”"}
    ];
    const commandArr =  ["report", "2019", "UAH"];
    const currency = "USD";
    const totalSum1 = 30;

    // 2. ACT
   const totalSum2 = countTotalSum(commandArr, currency, itemsList);

    // 3. ASSERT
    expect(totalSum2).to.be.equal(totalSum1);

  });
});