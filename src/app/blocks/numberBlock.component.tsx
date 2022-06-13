import React, { FC } from 'react';

interface IProps {
    title: string,
    value: number,
    onChange(value: number): void,
    disabled?: boolean,
    min?: number,
    max?: number,
    error?: string
}
const NumberBlockComponent: FC<IProps> = ({ title, value, onChange, disabled, min, max, error }) => {
    return (
        <>
            <span className="input-group-text" id="addon-wrapping">
                {title}
            </span>
            <input
                type="number"
                className={`form-control form-control-sm ${error ? 'bg-danger' : ''}`} title={error} 
                value={value || 0}
                min={min}
                max={max}
                onChange={(e) => {
                    let val = parseInt(e.target.value)
                    onChange(isNaN(val) ? 0 : val)
                }}
                disabled={disabled}
            />
        </>
    );
};

export default NumberBlockComponent;