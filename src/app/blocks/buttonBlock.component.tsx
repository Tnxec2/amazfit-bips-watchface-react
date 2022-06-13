import React, { FC } from 'react';

interface IProps {
    title: string,
    onClick(e): void,
    disabled: boolean,
    className: string,
    error?: string,
}
const ButtonBlockComponent: FC<IProps> = ({ title, onClick, disabled, className, error }) => {
    return (
        <>
            <button className={`btn ${className} ${error ? 'bg-danger' : ''}`} title={error} 
            type="button" 
            onClick={onClick} 
            disabled={disabled}>
                {title}
            </button> 
        </>
    );
};

export default ButtonBlockComponent;