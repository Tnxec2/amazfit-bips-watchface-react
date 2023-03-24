import React, { FC, Fragment } from 'react';

interface IProps {
    title: string,
    value: number,
    onChange(value: number): void,
    disabled?: boolean,
    min?: number,
    max?: number,
    error?: string,
    info?: string
}
const NumberBlockComponent: FC<IProps> = ({ title, value, onChange, disabled, min, max, error, info }) => {
    return (
        <>
            <span className="input-group-text" id="addon-wrapping">
                {title.split('\n').map((str, index) => <Fragment key={index}>{str}<br/></Fragment>)}
            </span>
            <input
                type="number"
                className={`form-control form-control-sm ${error ? 'bg-danger' : info ? 'bg-info' : ''}`} title={error || info} 
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