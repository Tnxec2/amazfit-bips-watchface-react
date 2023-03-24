import React, { FC, Fragment } from 'react';

interface IProps {
    title: string,
    disabled?: boolean,
    error?: string,
    info?: string
}
const EmptyBlockComponent: FC<IProps> = ({ title, disabled, error, info }) => {
    return (
        <>
            <span className={`input-group-text ${error ? 'bg-danger' : info ? 'bg-info': ''}`} title={error || info}>
             {title.split('\n').map((str, index) => <Fragment key={index}>{str}<br/></Fragment>)}
            </span>
        </>
    );
};

export default EmptyBlockComponent;