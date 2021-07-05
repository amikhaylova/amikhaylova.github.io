import React, { useState, useEffect, useRef } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { useAsync } from 'react-use';
import { useAlert } from 'react-alert';
import SelectBox from './Dropdown';

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default function Exchanger() {
    const [list, setList] = useState([]);
    const [fromCurrency, setFromCurrency] = useState({});
    const [toCurrency, setToCurrency] = useState();
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [estimatedAmount, setEstimatedAmount] = useState('');
    const prevAmount = usePrevious(minAmount);
    const alert = useAlert();

    async function getCurrency() {
        const response = await fetch('https://api.changenow.io/v1/currencies?active=true&fixedRate=true');
        const data = await response.json();
        return data;
    }

    const state = useAsync(getCurrency);

    useEffect(() => {
        if (state.value) setList(state.value);
    }, [state.value]);

    async function getEstimatedAmount(value) {
        if (
            fromCurrency !== undefined &&
            toCurrency !== undefined &&
            (fromValue !== undefined || fromValue !== '' || fromValue === minAmount)
        ) {
            const exchange = `${fromCurrency.ticker}_${toCurrency.ticker}`;
            const url = `https://api.changenow.io/v1/exchange-amount/${value}/${exchange}?api_key=${process.env.API_KEY}`;
            const response = await fetch(url);
            const obj = await response.json();
            if (obj.estimatedAmount !== undefined) {
                setEstimatedAmount(obj.estimatedAmount);
            } else {
                alert.show('pair is disabled');
            }
        }
    }

    async function getMinAmount() {
        const exchange = `${fromCurrency.ticker}_${toCurrency.ticker}`;
        const url = `https://api.changenow.io/v1/min-amount/${exchange}?api_key=${process.env.API_KEY}`;
        const response = await fetch(url);
        let data = await response.json();
        data = JSON.stringify(data);
        const obj = JSON.parse(data);
        if (obj.minAmount) {
            setMinAmount(obj.minAmount);
        } else {
            alert.show('pair is disabled');
        }
    }

    useEffect(() => {
        if (fromCurrency !== undefined && toCurrency !== undefined) {
            setMinAmount('');
            setEstimatedAmount('');
            getMinAmount(true);
        }
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        if (fromCurrency !== undefined && toCurrency !== undefined) {
            if (fromValue >= minAmount) {
                getEstimatedAmount(fromValue);
            } else {
                setEstimatedAmount('-');
                alert.show('amount is less than min');
            }
        }
    }, [fromValue]);

    useEffect(() => {
        if (fromCurrency !== undefined && toCurrency !== undefined && prevAmount !== minAmount) {
            if (minAmount !== '') {
                if (fromValue !== '' && prevAmount !== '') {
                    if (fromValue < minAmount) {
                        setEstimatedAmount('-');
                        alert.show('amount is less than min');
                    } else {
                        getEstimatedAmount(fromValue);
                    }
                } else {
                    getEstimatedAmount(minAmount);
                }
            }
        }
    }, [minAmount, prevAmount]);

    useEffect(() => {
        setToValue(estimatedAmount);
    }, [estimatedAmount]);

    const handleCurrencyChange = React.useCallback((name, item) => {
        switch (name) {
            case 'from':
                setFromCurrency(item);
                break;
            case 'to':
                setToCurrency(item);
                break;
            default:
                break;
        }
    }, []);

    const handleValueChange = React.useCallback((name, value) => {
        switch (name) {
            case 'from':
                setFromValue(value);
                break;
            case 'to':
                setToValue(value);
                break;
            default:
                break;
        }
    }, []);

    return (
        <div className="exchange-container">
            <div id="header">Crypto Exchange</div>
            <div id="description">Exchange fast and easy</div>
            <div id="from">
                <SelectBox
                    name="from"
                    items={list}
                    onCurrencyChange={handleCurrencyChange}
                    onValueChange={handleValueChange}
                    amount={minAmount}
                    currency={fromCurrency}
                    key={minAmount}
                    readonly={false}
                />
            </div>
            <FaExchangeAlt color="#11b3fe" id="exchange" />
            <div id="to">
                <SelectBox
                    name="to"
                    items={list}
                    onCurrencyChange={handleCurrencyChange}
                    onValueChange={handleValueChange}
                    amount={estimatedAmount}
                    currency={toCurrency}
                    key={estimatedAmount}
                    readonly
                />
            </div>
            <div id="address">Your Ethereum address</div>
            <div id="address-input">
                <input />
            </div>
            <div id="exchange-button">
                <button type="button">EXCHANGE</button>
            </div>
        </div>
    );
}
