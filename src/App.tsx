import "bootstrap/dist/css/bootstrap.min.css";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import "./App.css";
import FileLoaderComponent from "./app/components/main/fileLoader.component";
import LeftSideComponent from "./app/components/main/leftside.component";
import RightSideComponent from "./app/components/main/rightside.component";
import { AppContextProvider } from "./app/context/app.context";
import { ImagesProvider } from "./app/context/images.context";

import { WatchfaceProvider } from "./app/context/watchface.context";
import { WatchstateContextProvider } from "./app/context/watchstate.context";

const App: FC = () => {

  return (
    <AppContextProvider>
    <WatchfaceProvider>
    <ImagesProvider>
    <WatchstateContextProvider>
      <div className="App d-flex flex-column min-vh-100 vh-100">
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
      </div>
    </WatchstateContextProvider>
    </ImagesProvider>
    </WatchfaceProvider>
    </AppContextProvider>
  );
};

export default App;



