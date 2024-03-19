document.getElementById('currencyConverterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get user input
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    // Fetch exchange rates from API
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            document.getElementById('result').innerText = `${amount} ${getCurrencySymbol(fromCurrency)} - ${fromCurrency} = ${convertedAmount} ${getCurrencySymbol(toCurrency)} - ${toCurrency}`;
        })
        .catch(error => console.error('Error fetching exchange rates:', error));
});

function getCurrencySymbol(currencyCode) {
    switch(currencyCode) {
        case 'USD':
            return '$';
        case 'EUR':
            return '€';
        case 'GBP':
            return '£';
        default:
            return '';
    }
}
