import { FC, useState } from "react";
import { Constant } from "../../shared/constant";
import ClockhandConstructorComponent from "./clockHandConstructor.component";
import JsonComponent from "./json.bips.component";
import PreviewComponent from "./preview.component";
import UploadedImagesomponent from "./uploadedImages.component";

const tabs = [
  { id: 0, name: "Preview", el: <PreviewComponent width={Constant.width} height={Constant.height} /> },
  { id: 1, name: "Uploaded Images", el:  <UploadedImagesomponent />},
  { id: 2, name: "Json", el: <JsonComponent /> },
  { id: 3, name: "Clockhand", el: <ClockhandConstructorComponent width={Constant.width} height={Constant.height} /> },
];

const RightSideComponent: FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab) => {
          return (
            <li key={tab.id} className="nav-item">
              <button
                className={`nav-link ${selectedTab === tab.id ? "active" : ""} `}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.name}
              </button>
            </li>
          );
        })}
        <li key="version" className="nav-item"><div className="nav-link disabled">v. {Constant.version}</div></li>
      </ul>
      { tabs[selectedTab].el }
    </div>
  );
};

export default RightSideComponent;
