import React, { FC, Fragment, ReactElement, useContext, useMemo, useState } from "react";
import "./selectFileList.css";
import { IImagesContext, ImagesContext } from "../context/images.context";
import { findImageById } from "./helper";

interface IProps {
  title: string,
  value: number;
  onChange(id: number): void;
  disabled?: boolean
  error?: string
  info?: string
  imagesCount: number
}

const SelectFileListComponent: FC<IProps> = ({
  title,
  value: imageIndex,
  onChange,
  disabled,
  error,
  info,
  imagesCount,
}) => {
  const { images } = useContext<IImagesContext>(ImagesContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const imagesCountError = useMemo<boolean>(() => {
    if (!imageIndex) return false
    if (!imagesCount) return true
    for(let mIndex = 0; mIndex < imagesCount; mIndex++) {
      let img = findImageById(imageIndex+mIndex, images);
      if ( img === null) return true
    }
    return false
  },[images, imageIndex, imagesCount])

  const imageIndexReal = useMemo<string>(() => {

      if (imageIndex !== null && imageIndex !== undefined) {
        var ix = images.find(it => {
          return it.id === imageIndex
        })
        return ix ? ix.name : "None"
      } else {
        return "None"
      }
    
  },[images, imageIndex])

  const selectFileTitle = useMemo<string>(() => {
    if (!error && !imagesCountError && !info) return 'Select image'
    const imagesCountErrorString = `Not all images exist for count ${imagesCount}.`
    if (error && imagesCountError) return error + '\n' + imagesCountErrorString
    else if (imagesCountError) return imagesCountErrorString 
    else return info
  }, [error, imagesCountError, imagesCount, info])



  function onFileSelected(id: number) {
    onChange(id);
    setCollapsed(true);
  }

  function onRemove() {
    onFileSelected(null);
  }

  const options: ReactElement[] = [];

  options.push(
    <option key={"None"} value={"None"}>
      {" "}
    </option>
  );

  if (images) {
    for (var i = 0; i < images.length; i++) {
      let img = images[i];

      options.push(
        <li
          key={img.id}
          value={img.id}
          className="list-group-item fileitem"
          onClick={() => onFileSelected(img.id)}
        >
          {<img src={img.image.src} alt={img.name} width={30} />}
          {img.name}
        </li>
      );
    }
  }
  
  return (
    <>
      <span className="input-group-text">{title.split('\n').map((str, index) => <Fragment key={index}>{str}<br/></Fragment>)}</span>
      <div className={`input-group-text dropdown ${error || imagesCountError ? 'bg-danger' : info ? 'bg-info' : ''}`} title={selectFileTitle}>
        <div>
          {imageIndexReal}
        </div>
        {collapsed ? (
          ""
        ) : (
          <ul className="list-group dropdown-content">{options}</ul>
        )}
      </div>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
        disabled={disabled || !images || images.length === 0}
      >
        + 
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={onRemove}
        disabled={disabled || !(imageIndex >= 0)}
      >
        x
      </button>
    </>
  );
};

export default SelectFileListComponent;
