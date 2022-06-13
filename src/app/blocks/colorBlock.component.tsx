import React, { FC } from 'react';

interface IProps {
    title: string,
    value: string,
    onChange(value: string): void,
    error?: string,
}
const ColorBlockComponent: FC<IProps> = ({ title, value, onChange, error }) => {

    function onRemove() {
        onChange(null);
      }

    return (
        <>
            <span className="input-group-text">{title}</span>
            <input
              type="color"
              className={`form-control form-control-sm ${error ? 'bg-danger' : ''}`} title={error ? error: 'Choose color'} 
              onChange={(e) => {
                onChange(e.target.value)
              }}
              id="colorBackground"
              value={value}
              />
            <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={onRemove}
                disabled={!value}
            >
                x
            </button>
        </>
    );
};

export default ColorBlockComponent;