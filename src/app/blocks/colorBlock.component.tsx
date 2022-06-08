import React, { FC } from 'react';

interface IProps {
    title: string,
    value: string,
    onChange(value: string): void
}
const ColorBlockComponent: FC<IProps> = ({ title, value, onChange }) => {

    function onRemove() {
        onChange(null);
      }

    return (
        <>
            <span className="input-group-text">{title}</span>
            <input
              type="color"
              className="form-control form-control-sm"
              onChange={(e) => {
                onChange(e.target.value)
              }}
              id="colorBackground"
              value={value}
              title="Choose color"
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