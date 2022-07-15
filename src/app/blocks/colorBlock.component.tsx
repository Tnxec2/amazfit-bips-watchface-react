import React, { FC } from 'react';

interface IProps {
    title: string,
    value: string,
    onChange(value: string): void,
    error?: string,
    info?: string,
}
const ColorBlockComponent: FC<IProps> = ({ title, value, onChange, error, info }) => {

    function onRemove() {
        onChange(null);
      }

    return (
        <>
            <span className="input-group-text">{title.split('\n').map(str => <>{str}<br/></>)}</span>
            <input
              type="color"
              className={`form-control form-control-sm ${error ? 'bg-danger' : info ? 'bg-info': ''}`} title={error ? error: info ? info : 'Choose color'} 
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