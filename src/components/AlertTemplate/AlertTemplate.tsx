import React from 'react';
import { AlertComponentPropsWithStyle } from 'react-alert';
// import InfoIcon from './icons/InfoIcon'
// import SuccessIcon from './icons/SuccessIcon'
// import ErrorIcon from './icons/ErrorIcon'
// import CloseIcon from './icons/CloseIcon'

const AlertTemplate = ({ options, message, close }: AlertComponentPropsWithStyle) => (
    <div
        style={{
            backgroundColor: '#151515',
            color: 'white',
            padding: '10px',
            textTransform: 'uppercase',
            borderRadius: '3px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
            fontFamily: 'Arial',
            width: '300px',
            boxSizing: 'border-box',
        }}
    >
        {options.type === 'info' && '!'}
        {options.type === 'success' && ':)'}
        {options.type === 'error' && ':('}
        {message}
        <button
            style={{
                marginLeft: '20px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                color: '#FFFFFF',
            }}
            type="submit"
            onClick={close}
        >
            X
        </button>
    </div>
);

export default AlertTemplate;
