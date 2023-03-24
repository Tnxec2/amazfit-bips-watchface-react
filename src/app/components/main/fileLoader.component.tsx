import { FC, useContext, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { AppContext, IAppContext } from "../../context/app.context";
import { IImagesContext, ImagesContext } from "../../context/images.context";
import { IWatchContext, WatchfaceContext } from "../../context/watchface.context";
import { IImage } from "../../model/image.model";
import { WatchJson } from "../../model/json.bips.model";

import { Constant } from "../../shared/constant";

const FileLoaderComponent: FC = () => {
  const { changeJsonName, clearJsonName } = useContext<IAppContext>(AppContext);
  const { setWatchfaceFromJson, clearWatchface } = useContext<IWatchContext>(WatchfaceContext);
  const { images, addImage, clear } = useContext<IImagesContext>(ImagesContext);
  const [ error, setError] = useState<string[]>([])

  function onLoadJson(e: ProgressEvent<FileReader>) {
    let json = e.target.result;
    let j: WatchJson = JSON.parse(json.toString());
    setWatchfaceFromJson(j);
  }

  function uploadJsonFile(e) {
    let file = e.target.files.item(0);
    
    if (file) {
      let fr = new FileReader();
      fr.onload = onLoadJson;
      fr.readAsText(file);
      changeJsonName(e.target.files.item(0).name);
    }
  }

  function imagesUploadHandler(event: any) {
    getImages(event.target.files, []);
  }

  function getImages(files: FileList, ar: IImage[], index = 0) {
    //clearInput()
    //setJsonName(null)
    if (index < files.length) {
      const filename = files[index].name;
      let base = filename;
      if (base.lastIndexOf(".") !== -1)
        base = base.substring(0, base.lastIndexOf("."));

      const id = parseInt(base);
      if ( /^\d+$/.test(base) && !isNaN(id)) {
        const img = new Image();
        img.addEventListener("load", () => {
          index += 1;
          if (index < files.length) 
            getImages(files, ar, index);
          else {
            checkImagesCount(ar);
          }
        });
        img.src = URL.createObjectURL(files[index]);
        img.alt = filename;
        ar.push({
          id: id,
          name: filename,
          image: img,
        });
      } else {
        index += 1;
        if (index < files.length) getImages(files, ar, index);
        else checkImagesCount(ar);
      }
    }
  }

  function checkImagesCount(ar: IImage[]) {
    
    let sortedAr = ar.sort((a, b) => a.id - b.id)

    let errors = [];

    if ( sortedAr[sortedAr.length-1].id !== sortedAr.length - 1 + Constant.startImageIndex) {
      errors.push('Images files go out of order or some of the files are missing. Name the PNG files in ascending order.')
    }
    if ( sortedAr[0].id !== Constant.startImageIndex) {
      errors.push(`Images file numbering must start at ${Constant.startImageIndex}.`)
    }
    if (errors.length > 0) setError(errors)
    clear()
    sortedAr.forEach((image) => {addImage(image)})
  }

  function clearInput() {
    if (document.getElementById("jsonLoad")) (document.getElementById("jsonLoad") as HTMLInputElement).value = null;
    clearJsonName()
    clearWatchface();
  }

  return (
    <>
    <div>
      <span className="input-group input-group-sm mb-3">
        <span className="input-group-text">Load images</span>
        <input
          type="file"
          multiple
          id="fileUpload"
          accept="image/*"
          onChange={imagesUploadHandler}

        />
        {images.length > 0 ? (
          <>
            <span className="input-group-text">Load json file</span>
            <input
              type="file"
              accept="application/json"
              id="jsonLoad"
              onChange={uploadJsonFile}
            />
          </>
        ) : (
          ""
        )}
        <Button onClick={clearInput}>clear</Button>
      </span>
    </div>
    { error.length > 0 && 
    <Alert variant="warning" dismissible  style={{zIndex: 9999}} onClose={() => setError([])}>
      <strong>Error</strong> { error.map((item, index) => <p key={index}>{item}</p>) }
    </Alert> }
  </>
  );
};

export default FileLoaderComponent;

