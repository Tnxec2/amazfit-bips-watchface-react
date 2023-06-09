import { FC, useState } from "react";
import ScreenNormalcomponent from "../watchface/screennormal.component";
import PreviewStatesComponent from "./previewstates.component";
import { Constant } from "../../shared/constant";

const tabs = [
  {
    id: 0, name: "Screen normal", el: <div className="mt-3 blocks">
      <ScreenNormalcomponent />
    </div>
  },
  {
    id: 1, name: "Preview State", el: <div className="mt-3">
        <PreviewStatesComponent />
    </div>
  },
];

const LeftSideComponent: FC = () => {

  const [selectedTab, setSelectedTab] = useState<number>(0);

  function onclick(tabid: number) {
    setSelectedTab(tabid)
  }
  
  return (
    <div>
      <ul className="nav nav-tabs">
      <span className="navbar-brand mb-0 h1">
        {Constant.DEVICE}
      </span>
        {tabs.map((tab) => {
          return (
            <li key={tab.id} className="nav-item">
              <button
                className={`nav-link ${selectedTab === tab.id ? "active" : ""} `}
                onClick={() => onclick(tab.id)}
              >
                {tab.name}
              </button>
            </li>
          );
        })}
      </ul>
      {tabs[selectedTab].el}
    </div>
  );
};

export default LeftSideComponent;
