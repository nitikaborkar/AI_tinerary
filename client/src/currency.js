import React, { useState } from 'react';
import currencies from './codes'; // Import the currencies array

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('SGD');
    const [conversionResult, setConversionResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setAmount(value);
        }
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    const handleConvert = async () => {
        try {
            const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.toLowerCase()}/${toCurrency.toLowerCase()}.json`);
            const data = await response.json();
            const rate = data[toCurrency.toLowerCase()];
            const finalAmount = amount * rate;
            setConversionResult(`${amount} ${fromCurrency} = ${finalAmount} ${toCurrency}`);
            setErrorMessage('');
        } catch (error) {
            setConversionResult('');
            setErrorMessage('Error fetching conversion data. Please try again.');
        }
    };

    return (
        <div>
            <h2>Currency Converter</h2>
            <form>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={handleAmountChange} />
                </label>
                <label>
                    From:
                    <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                        {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>{currency.code}</option>
                        ))}
                    </select>
                </label>
                <label>
                    To:
                    <select value={toCurrency} onChange={handleToCurrencyChange}>
                        {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>{currency.code}</option>
                        ))}
                    </select>
                </label>
                <button type="button" onClick={handleConvert}>Convert</button>
            </form>
            {conversionResult && <div>{conversionResult}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
};

export default CurrencyConverter;
