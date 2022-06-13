import React, { FC } from 'react';

interface IProps {
    title: string,
    checked: boolean,
    onChange(checked: boolean): void,
    disabled?: boolean
    error?: string
}

const CheckBoxBlockComponent: FC<IProps> = ({ title, checked, onChange, disabled, error }) => {
    return (
        <>
            <span className="input-group-text" id="addon-wrapping">
                {title}
            </span>
            <div className="input-group-text">
                <input
                    className={`form-check-input form-check-input-sm ${error ? 'bg-danger' : ''}`} title={error} 
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