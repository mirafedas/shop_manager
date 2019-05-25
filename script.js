const parseCommand = () => {
    const command = document.getElementById('command').value;
    const commandArr = command.split(' ');
    switch (commandArr[0]) {
        case 'purchase':
            addPurchase(commandArr)
            break;
        case 'all':
            showAllPurchases()
            break;
        case 'clear':
            removePurchases(commandArr)
            break;
        case 'report':
            getRates(commandArr)
            break;
        default:
            displayMessage('Error!');
    }
}

const hideElement = (element) => {
    element.innerHTML = '';
}

const displayMessage = (message) => {
    container.innerHTML = message ;
    setTimeout(hideElement, 2000, container);
}

const addPurchase = (commandArr) => {
    const date = commandArr[1];
    const price = commandArr[2];
    const currency = commandArr[3];
    const name = commandArr.slice(4).join(' ');
    const newItem = {
        date,
        price,
        currency,
        name
    }
    let existingEntries = JSON.parse(localStorage.getItem('items'));
    if(existingEntries == null) existingEntries = [];
    localStorage.setItem('items', JSON.stringify(newItem));
    existingEntries.push(newItem);
    localStorage.setItem('items', JSON.stringify(existingEntries));
    displayMessage('New purchase added!');
}

const showAllPurchases = () => {
    const itemsList = JSON.parse(localStorage.getItem('items'));
    container.innerHTML = '';
    itemsList.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    itemsList.forEach((oneItem) => {
        const tableItem = '<li>' + oneItem.date + ' - ' + oneItem.price + ' ' + oneItem.currency + ' - ' + oneItem.name + '</li>';
        container.innerHTML += tableItem;
    })    
}

const removePurchases = (commandArr) => {
    const removeDate = commandArr[1];
    const itemsList = JSON.parse(localStorage.getItem('items'));
    for( let i = 0; i < itemsList.length; i++){ 
        if (itemsList[i].date == removeDate) {
           itemsList.splice(i, 1);
           i--;
           localStorage.setItem('items', JSON.stringify(itemsList));
        }
     }
     displayMessage("Purchase(s) removed!");
}

const doPurchasesExist = (itemsList) => {
    if (!itemsList) {
    displayMessage('Add at least one purchase!');
    return;
    }
}

const isYearOK = (reportYear) => {
    if(reportYear <= 0) {
    displayMessage('Wrong year!');
    }
}

const countTotalSum = (commandArr, currency, itemsList) => {
    const reportYear = commandArr[1];
    doPurchasesExist(itemsList);
    isYearOK(reportYear);
    let total = 0;
    for(let i = 0; i < itemsList.length; i++){ 
        if(itemsList[i].currency === currency && itemsList[i].date.startsWith(reportYear + '-')) {
            total = Number(itemsList[i].price) + total;
        }
    }
    return total;
}

const getRates = (commandArr) => {
    const fixerAPIKey = '070f8427bc3e3997609c7479279e5539';
    const fixerBaseAPI = 'http://data.fixer.io/api/latest';
    const finalURL = fixerBaseAPI + '?access_key=' + fixerAPIKey;
  
    fetch(finalURL)
        .then(function(response) {
            response.json().then((r) => {
                let rates = [];
                const ratePLN = r.rates['PLN'];
                const rateUAH = r.rates['UAH'];
                const rateUSD = r.rates['USD'];
                rates.push(ratePLN, rateUAH, rateUSD);
                convertCurrency(commandArr, rates);
            }
            );
        })
        .catch( alert );
}

const convertCurrency = (commandArr, rates) => {
    const toCurrency = commandArr[2];
    const itemsList = JSON.parse(localStorage.getItem('items'));
    const totalUAH = countTotalSum(commandArr, 'UAH', itemsList);
    const totalUSD = countTotalSum(commandArr, 'USD', itemsList);
    const totalEUR = countTotalSum(commandArr, 'EUR', itemsList);
    const totalPLN = countTotalSum(commandArr, 'PLN', itemsList);
    if (toCurrency !== "UAH" || toCurrency !== "EUR" || toCurrency !== "USD" || toCurrency !== "PLN") {
        displayMessage('Wrong currency!');
    }
    let finalAmount = 0;
    ratePLN = rates[0];
    rateUAH = rates[1];
    rateUSD = rates[2];

    if(toCurrency === 'EUR') {
        finalAmount = totalEUR + totalPLN/ratePLN + totalUAH/rateUAH + totalUSD/rateUSD;
    } else if(toCurrency === 'UAH') {
        finalAmount = totalUAH + totalEUR*rateUAH + (totalPLN/ratePLN)*rateUAH + (totalUSD/rateUSD)*rateUAH;
    } else if(toCurrency === 'PLN') {
        finalAmount = totalPLN + totalEUR*ratePLN + (totalUAH/rateUAH)*ratePLN + (totalUSD/rateUSD)*ratePLN;
    } else if(toCurrency === 'USD') {
        finalAmount = totalUSD + totalEUR*rateUSD + (totalUAH/rateUAH)*rateUSD + (totalPLN/ratePLN)*rateUSD;
    } else {
        displayMessage('Error');
    }
    showReport(finalAmount, toCurrency);
}

const showReport = (finalAmount, toCurrency) => {
    container.innerHTML = finalAmount + toCurrency;
}

module.exports = countTotalSum;