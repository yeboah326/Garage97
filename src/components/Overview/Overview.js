import React from "react";
import SideNavBar from "../ProductDashboard/SideNavBar";
import SideNavBar2 from "../ProductDashboard/SideNavBar2";
import OverviewPage from "./OverviewPage";
import SvgMenu from "../../Assets/icons/Menu";
import { useState } from "react";

const Overview = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);
  const onClickMenu = () => {
    setShowSideNavBar(!showsidenavbar);
  };
  const onClickClose = () => {
    setShowSideNavBar(!showsidenavbar);
  };
  const onHover = () => {
    setShowFullSideNavBar(!showfullsidenavbar);
  };

  return (
    <div className="overview-overview-page">
      {showsidenavbar ? (
        <div className="side-nav-page">
          <SideNavBar onClick={onClickClose} />
        </div>
      ) : null}
      <div>
        <header>
          <div className="menu" onClick={onClickMenu}>
            <SvgMenu fill="#6842ff" />
          </div>
        </header>
        <OverviewPage />
      </div>
      <div className="desktop-side-nav-bar">
        {!showfullsidenavbar ? (
          <SideNavBar2 onHover={onHover} />
        ) : (
          <SideNavBar onHover={onHover} />
        )}
      </div>
    </div>
  );
};

export default Overview;
