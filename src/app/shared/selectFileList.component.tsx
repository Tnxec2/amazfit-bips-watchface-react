import React, { FC, ReactElement, useContext, useState } from "react";
import { Constant } from "./constant";
import "./selectFileList.css";
import { IImagesContext, ImagesContext } from "../context/images.context";
interface IProps {
  title: string,
  value: number;
  onChange(id: number): void;
  disabled?: boolean
  error?: string
}

const SelectFileListComponent: FC<IProps> = ({
  title,
  value,
  onChange,
  disabled,
  error,
}) => {
  const { images } = useContext<IImagesContext>(ImagesContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

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
      <span className="input-group-text">{title}</span>
      <div className={`input-group-text dropdown ${error ? 'bg-danger' : ''}`} title={error}>
        <div>
          {value !== null &&
          value !== undefined &&
          images[value - Constant.startImageIndex]
            ? images[value - Constant.startImageIndex].name
            : "None"}
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
        disabled={disabled || !(value >= 0)}
      >
        x
      </button>
    </>
  );
};

export default SelectFileListComponent;
