import React from "react";
import Table from "../../Components/Table/Table.js";
import CircleBar from "../../Components/CircleBar/CircleBar.js";
import Modal from "../../Components/Modal/Modal.js";

import "./Services.css";

const servicesData = [
  {
    "deploymentId": "ApiGWApplication-db07",
    "deploymentUnit": "db07089ca1c6",
    "system": "ApiGWApplication",
    "serviceUrl": "http://127.0.1.1:8083",
    "contextPath": "/",
    "port": 8083,
    "ip": "127.0.1.1",
    "status": "UP",
    "metrics": {
      "systemLoad": 35.02,
      "jvmCpuLoad": 0.02,
      "usedMemoryMB": 35,
      "freeMemoryMB": 3946,
      "totalThreads": 27
    }
  },
  {
    "deploymentId": "MasterApplication-4a36",
    "deploymentUnit": "4a3685c4d152",
    "system": "MasterApplication",
    "serviceUrl": "http://127.0.1.1:8080",
    "contextPath": "/master",
    "port": 8080,
    "ip": "127.0.1.1",
    "status": "DOWN",
    "metrics": {
      "systemLoad": 90.02,
      "jvmCpuLoad": 0.11,
      "usedMemoryMB": 43,
      "freeMemoryMB": 3938,
      "totalThreads": 31
    }
  },
  {
    "deploymentId": "mragent-03a9",
    "deploymentUnit": "03a9af67a824",
    "system": "AgentApplication",
    "serviceUrl": "http://127.0.1.1:8081",
    "contextPath": "/ctx",
    "port": 8081,
    "ip": "127.0.1.1",
    "status": "UP",
    "metrics": {
      "systemLoad": 25.02,
      "jvmCpuLoad": 10,
      "usedMemoryMB": 26,
      "freeMemoryMB": 3955,
      "totalThreads": 33
    }
  }
]

const Services = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedServiceID, setSelectedServiceID] = React.useState(null);

  const toggleModal = () => {
    isOpen && setSelectedServiceID(null);
    setIsOpen(!isOpen);
  }

  const turnOffService = (id) => {
    // TODO: запрос на удаление
    console.log(id);
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
                <div>
                  <span className="cell-label">URL: </span>
                  <span>{service.serviceUrl}</span>
                </div>
                <div>
                  <span className="cell-label">Context Path: </span>
                  <span>{service.contextPath}</span>
                </div>
                <div>
                  <span className="cell-label">Port: </span>
                  <span>{service.port}</span>
                </div>
                <div>
                  <span className="cell-label">IP Address: </span>
                  <span>{service.ip}</span>
                </div>
              </div>
              <div className="table__cell status-cell">
                <div className="status-badge" status={service.status} onClick={() => {setSelectedServiceID(service.deploymentId); toggleModal()}}>{service.status}</div>
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
        <div className="modal__service-name">ApiGWApplication</div>
        <button className="modal__accept-btn" onClick={() => {turnOffService(selectedServiceID); toggleModal()}}>YES, TURN OFF</button>
      </Modal>
    </>
  )
};

export default Services;