import React from "react";
import { useEffect } from "react";
import Table from "../../Components/Table/Table.js";
import CircleBar from "../../Components/CircleBar/CircleBar.js";
import Modal from "../../Components/Modal/Modal.js";
import routes from "../../routes.js";

import "./Services.css";

const Services = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [servicesData, setServicesData] = React.useState([]);
  const [selectedServiceID, setSelectedServiceID] = React.useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(routes.services);
        setServicesData(await response.json());
      } catch (error) {
        console.log(error);
      }
    };

    dataFetch();
  }, []);

  const toggleModal = () => {
    isOpen && setSelectedServiceID(null);
    setIsOpen(!isOpen);
  }

  const turnOffService = async (id) => {
    try {
      await fetch(routes.turnOffService(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="services">
      <h1>Dashboard</h1>
      <span>All information about deployed services</span>
      <Table colsCount={7} headers={["System", "Deployment Information", "Service Info", "Status", "System Load", "JVM CPU Load", "Memory"]}>
        {servicesData.map(service => {
          return (
            <>
              <div className="table__cell">{service.system}</div>
              <div className="table__cell">
                <div>
                  <span className="cell-label">ID: </span>
                  <span>{service.deploymentId}</span>
                </div>
                <div>
                  <span className="cell-label">Unit: </span>
                  <span>{service.deploymentUnit}</span>
                </div>
              </div>
              <div className="table__cell">
                {/* <div>
                  <span className="cell-label">URL: </span>
                  <span>{service.serviceUrl}</span>
                </div> */}
                <div>
                  <span className="cell-label">Context Path: </span>
                  <span>{service.contextPath}</span>
                </div>
                <div>
                  <span className="cell-label">Port: </span>
                  <span>{service.port}</span>
                </div>
                {/* <div>
                  <span className="cell-label">IP Address: </span>
                  <span>{service.ip}</span>
                </div> */}
              </div>
              <div className="table__cell status-cell">
                <div className="status-badge" status={service.healthCheck.status} onClick={() => {setSelectedServiceID(service.deploymentId); toggleModal()}}>{service.healthCheck.status}</div>
              </div>
              <CircleBar percentage={service.metrics.systemLoad} stroke="#7A80F0"/>
              <CircleBar percentage={service.metrics.jvmCpuLoad} stroke="#F9CD73"/>
              <div className="services-table__cell">
                <div>{Math.round(service.metrics.usedMemoryMB)} / {Math.round(service.metrics.freeMemoryMB)} Mb</div>
                <div>{service.metrics.totalThreads} Threads</div>
              </div>
            </>
          )
        })}
        </Table>
      </div>
      <Modal isOpen={isOpen} toggleFunction={toggleModal}>
        <div className="modal__header">Are you sure you want to turn off this service?</div>
        <div className="modal__service-name">{selectedServiceID}</div>
        <button className="modal__accept-btn" onClick={() => {turnOffService(selectedServiceID); toggleModal()}}>YES, TURN OFF</button>
      </Modal>
    </>
  )
};

export default Services;