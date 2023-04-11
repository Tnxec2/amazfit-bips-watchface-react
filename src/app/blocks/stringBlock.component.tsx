import React, { FC, Fragment } from 'react';

interface IProps {
    title: string,
    value: string,
    onChange(value: string): void,
    disabled?: boolean,
    error?: string,
    info?: string
}
const StringBlockComponent: FC<IProps> = ({ title, value, onChange, disabled, error, info }) => {
    return (
        <>
            <span className="input-group-text" id="addon-wrapping">
                {title.split('\n').map((str, index) => <Fragment key={index}>{str}<br/></Fragment>)}
            </span>
            <input
                type="text"
                className={`form-control form-control-sm ${error ? 'bg-danger' : info ? 'bg-info' : ''}`} title={error || info} 
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
                disabled={disabled}
            />
        </>
    );
};

export default StringBlockComponent;