import React, { FC } from 'react';

interface IProps {
    title: string,
    checked: boolean,
    onChange(checked: boolean): void,
    disabled?: boolean
    error?: string
    info?: string
}

const CheckBoxBlockComponent: FC<IProps> = ({ title, checked, onChange, disabled, error, info }) => {
    return (
        <>
            <span className="input-group-text" id="addon-wrapping">
                {title.split('\n').map(str => <>{str}<br/></>)}
            </span>
            <div className="input-group-text">
                <input
                    className={`form-check-input form-check-input-sm ${error ? 'bg-danger' : info ? 'bg-info' : ''}`} title={error || info} 
                    type="checkbox"
                    disabled={disabled}
                    checked={checked ? true : false}
                    onChange={() => onChange(!checked)}
                    />
            </div>
        </>
    );
};

export default CheckBoxBlockComponent;