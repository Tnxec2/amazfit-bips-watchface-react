import "bootstrap/dist/css/bootstrap.min.css";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import FileLoaderComponent from "./app/components/main/fileLoader.component";
import LeftSideComponent from "./app/components/main/leftside.component";
import RightSideComponent from "./app/components/main/rightside.component";
import { IImage } from "./app/model/image.model";

import { WatchState } from "./app/model/watchState";
import { WatchfaceContext } from "./app/context";
import { WatchFace } from "./app/model/watchFace.bips.model";
import { Constant } from "./app/shared/constant";

const App: FC = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [watchface, setWatchface] = useState<WatchFace>(new WatchFace());
  const [watchState, setWatchState] = useState<WatchState>(new WatchState());

  const [jsonName, setJsonName] = useState<string>(null);
  const [previewScreenNormal, setPreviewScreenNormal] = useState<boolean>(true);

  // useEffect(() => {
  //   localStorage.setItem(Constant.CONFIG_WATCHFACE_BACKUP, JSON.stringify(watchface));
  // }, [watchface]);

  return (
    <WatchfaceContext.Provider
      value={{
        images,
        setImages,
        watchface,
        setWatchface,
        watchState,
        setWatchState,
        jsonName,
        setJsonName,
        previewScreenNormal,
        setPreviewScreenNormal,
      }}
    >
      <Container className="App d-flex flex-column min-vh-100 vh-100">
        <Row className="header">
          <FileLoaderComponent />
        </Row>
        <Row className="main">
          <Col xs={6} className="leftcol">
            <LeftSideComponent />
          </Col>
          <Col xs={6} className="rightcol">
            <RightSideComponent />
          </Col>
        </Row>
      </Container>
    </WatchfaceContext.Provider>
  );
};

export default App;



