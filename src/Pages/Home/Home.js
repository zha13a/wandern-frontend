import React from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import routes from "../../routes.js";
import { useEffect } from "react";

import "./Home.css";

import ServicesIcon from '../../Static/Icons/services_icon.svg';
import GroupsIcon from '../../Static/Icons/groups_icon.svg';
import ServerIcon from '../../Static/Icons/server_icon.svg';
import FailedNodesIcon from '../../Static/Icons/failed_nodes_icon.svg';
import OkNodesIcon from '../../Static/Icons/ok_nodes_icon.svg';

const Home = () => {
  const navigate = useNavigate();

  const [homeData, setHomeData] = React.useState({});

  const dataFetch = async () => {
    try {
      const response = await fetch(routes.home);
      setHomeData(await response.json());
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div className="home">
      <div className="buttons-container">
        <div className="menu-button services-button" onClick={() => navigate("/services")}>
          <ServicesIcon className="menu-button__icon"/>
          <span className="menu-button__title">Services</span>
          <span className="menu-button__count">{homeData?.services}</span>
        </div>
        <div className="menu-button groups-button" onClick={() => navigate("/groups")}>
          <GroupsIcon className="menu-button__icon "/>
          <span className="menu-button__title">GROUPS</span>
          <span className="menu-button__count">{homeData?.groups}</span>
        </div>
        <div className="menu-button all-nodes-button" onClick={() => navigate("/nodes/all")}>
          <ServerIcon className="menu-button__icon"/>
          <span className="menu-button__title">All nodes</span>
          <span className="menu-button__count">{homeData?.nodes}</span>
        </div>
        <div className="menu-button failed-nodes-button" onClick={() => navigate("nodes/failed")}>
          <FailedNodesIcon className="menu-button__icon" />
          <span className="menu-button__title">Failed</span>
          <span className="menu-button__count">{homeData?.failedNodes}</span>
        </div>
        <div className="menu-button ok-nodes-button" onClick={() => navigate("nodes/ok")}>
          <OkNodesIcon className="menu-button__icon "/>
          <span className="menu-button__title">OK</span>
          <span className="menu-button__count">{homeData?.okNodes}</span>
        </div>
      </div>
    </div>
  )
};

export default Home;