import React, { useState, useEffect } from "react";
import SideNavBar from "./SideNavBar";
import SideNavBar2 from "./SideNavBar2";
import Businesses from "./Businesses";
import SvgMenu from "../../Assets/icons/Menu";
import AddButton from "./AddButton";
import AddBusiness from "./AddBusiness";
import DeleteBusiness from "./DeleteBusiness";
import "../../css/business.css";
import { logout } from "../../auth/index";
import SecureStorage from "../../auth/secure";

const BusinessPage = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
  const [deletebusiness, setDeleteBusiness] = useState(false);
  const [business_select, setBusinessSelect] = useState(false);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    const response = await fetch(
      "http://yeboah326.pythonanywhere.com/business",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    if (response.status === 401) {
      logout();
      alert("Session has expired");
    } else if (response.status === 400) {
      alert(res.message);
    } else {
      setBusinesses(res);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickMenu = () => {
    setShowSideNavBar(!showsidenavbar);
  };
  const onClickClose = () => {
    setShowSideNavBar(!showsidenavbar);
  };
  const onClickAdd = () => {
    setShowAdd(!showAdd);
  };

  const onDelete = () => {
    setDeleteBusiness(!deletebusiness);
  };

  const getId = (id) => {
    return setId(id);
  };

  const onHover = () => {
    setShowFullSideNavBar(!showfullsidenavbar);
  };

  return (
    <div className="business-page">
      {showsidenavbar ? (
        <div className="side-nav-page">
          <SideNavBar onClick={onClickClose} />
        </div>
      ) : null}
      {showAdd ? (
        <div className="popup">
          <AddBusiness toggle={onClickAdd} onClick={fetchData} />
        </div>
      ) : null}
      {deletebusiness ? (
        <div className="popup">
          <DeleteBusiness onClick={onDelete} fetchData={fetchData} id={id} />
        </div>
      ) : null}
      <div className="container-businesses">
        <header>
          <div className="menu" onClick={onClickMenu}>
            <SvgMenu fill="#6842ff" />
          </div>
          <div className="mobile-add">
            <AddButton toggle={onClickAdd} />
          </div>
        </header>
        <div className="desktop-side-nav-bar">
          {!showfullsidenavbar ? (
            <SideNavBar2 onHover={onHover} />
          ) : (
            <SideNavBar onHover={onHover} />
          )}
        </div>
        <div className="businesses-grid">
          <Businesses
            onAdd={onClickAdd}
            onDelete={onDelete}
            setBusinessSelect={() => {
              setBusinessSelect(true);
            }}
            setDeleteBusiness={() => {
              setDeleteBusiness(!deletebusiness);
            }}
            business_select={business_select}
            businesses={businesses}
            fetchData={fetchData}
            getId={getId}
          />
          <div className="desktop-add">
            <AddButton toggle={onClickAdd} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
