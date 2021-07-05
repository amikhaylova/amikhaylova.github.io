import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import onClickOutside from 'react-onclickoutside';
import { useAlert } from 'react-alert';

function Dropdown({ items, name, onCurrencyChange, onValueChange, currency, amount, readonly }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(currency);
    const [value, setValue] = useState(amount);
    const toggle = () => setOpen(!open);
    const alert = useAlert();

    Dropdown[`handleClickOutside_${name}`] = () => setOpen(false);

    function handleOnClick(item) {
        setSelected(item);
        setOpen(false);
        onCurrencyChange(name, item);
    }

    function handleOnChange(event) {
        let input = event.target.value;
        if (name === 'to') {
            input = '';
        }
        setValue(input);
    }

    function handleOnFocus(event) {
        const input = event.target.value;
        if ((!Number.isNaN(input) && input > 0) || input === '') onValueChange(name, value);
        else {
            setValue('');
            alert.show('input is invalid');
        }
    }

    const filterList = (filter) => {
        const list = document.getElementsByTagName('li');
        console.log(list);
        for (let i = 0; i < list.length; i += 1) {
            const button = list[i].getElementsByClassName('button-list-item')[0];
            const span = button.getElementsByClassName('button-item-content')[1];
            const ticker = span.innerHTML;
            if (ticker.toLowerCase().indexOf(filter.toLowerCase()) === 0) list[i].style.display = 'list-item';
            else list[i].style.display = 'none';
        }
    };

    function search(event) {
        filterList(event.target.value);
    }

    return (
        <div className="dd-wrapper">
            <div className="dd-header">
                <input
                    className="currency-amount"
                    onBlur={handleOnFocus}
                    value={value}
                    onChange={handleOnChange}
                    readOnly={readonly}
                />
                <div className="currency-div pointer" onClick={() => toggle(!open)} aria-hidden="true">
                    {selected !== undefined && selected.image !== undefined && (
                        <img src={selected.image} alt="new" color="#11b3fe" className="button-item-content" />
                    )}
                    <div id="currency-ticker">
                        {selected !== undefined && selected.ticker !== undefined && selected.ticker.toUpperCase()}
                    </div>
                    <IoIosArrowDown color="8FADBE" id="arrow-icon" />
                </div>
            </div>

            {open && (
                <div className="dd">
                    <div id="search-div">
                        <input type="text" placeholder="Search" id="currency-search-input" onKeyUp={search} />
                        <AiOutlineClose
                            color="8FADBE"
                            className="cancel-button pointer"
                            onClick={() => toggle(!open)}
                        />
                    </div>
                    <ul className="dd-list">
                        {items.map((item) => (
                            <li className="dd-list-item" key={item.id}>
                                <button type="button" onClick={() => handleOnClick(item)} className="button-list-item">
                                    <img src={item.image} alt="new" color="#11b3fe" className="button-item-content" />
                                    <span className="button-item-content">{item.ticker.toUpperCase()}</span>
                                    <span className="button-item-content full-currency-name">{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const clickOutsideConfig = {
    handleClickOutside: ({ props }) => Dropdown[`handleClickOutside_${props.name}`],
};

export default onClickOutside(Dropdown, clickOutsideConfig);
