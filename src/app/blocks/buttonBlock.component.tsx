import React, { FC, Fragment } from 'react';

interface IProps {
    title: string,
    onClick(e): void,
    disabled: boolean,
    className: string,
    error?: string,
    info?: string,
}
const ButtonBlockComponent: FC<IProps> = ({ title, onClick, disabled, className, error, info }) => {
    return (
        <>
            <button className={`btn ${className} ${error ? 'bg-danger' : info ? 'bg-info' : ''}`} title={error || info} 
            type="button" 
            onClick={onClick} 
            disabled={disabled}>
             {title.split('\n').map((str, index) => <Fragment key={index}>{str}<br/></Fragment>)}
            </button> 
        </>
    );
};

export default ButtonBlockComponent;