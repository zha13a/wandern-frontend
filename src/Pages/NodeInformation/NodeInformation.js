import React from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import moment from "moment";
import routes from "../../routes";

import ChonkyBar from "../../Components/ChonkyBar/ChonkyBar";
import Table from "../../Components/Table/Table";
import CircleBar from "../../Components/CircleBar/CircleBar";
import Modal from "../../Components/Modal/Modal";

import "./NodeInformation.css";

const NodeInformation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [nodeData, setNodeData] = React.useState({});
  const [selectedServiceID, setSelectedServiceID] = React.useState(null);

  let { nodeId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const dataFetch = async () => {
      try {
        const response = await fetch(routes.node(nodeId));
        setNodeData(await response.json());
      } catch (error) {
        console.log(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
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

  if (!isLoading && !hasError) {
    return(
        <div className="node-information">
        <h1 className="node-information__title">{nodeData.node.id}</h1>
        <div>Information about node and deployed services</div>
        <div className="node-data">
          <div className="node-data__item">
            <div><span className="node-data__label">ID: </span>{nodeData.node.id}</div>
            <div><span className="node-data__label">IP: </span>{nodeData.node.nodeIp}</div>
            <div><span className="node-data__label">Last Check: </span>{moment(nodeData.lastActive).fromNow()}</div>
          </div>
          <div className="node-data__item">
            <div><span className="node-data__label">Services: </span>{nodeData.node.activeServices} / {nodeData.node.totalServices}</div>
            <div><span className="node-data__label">Threads: </span>{nodeData.node.metrics.totalThreads}</div>
            <div><span className="node-data__label">Memory: </span>{nodeData.node.metrics.usedMemoryMB} / {nodeData.node.metrics.freeMemoryMB} Mb</div>
          </div>
        </div>
        <div className="node-data">
          <div className="node-data__bar">
            <div className="node-data__bar-data">
              <span className="node-data__bar-label">System Load: </span>
              <span>{nodeData.node.metrics.systemLoad}%</span>
            </div>
            <ChonkyBar persantage={Math.round(nodeData.node.metrics.systemLoad)} color="#F9CD73"/>
          </div>
          <div className="node-data__bar">
            <div className="node-data__bar-data">
              <span className="node-data__bar-label">JVM CPU Load: </span>
              <span>{nodeData.node.metrics.jvmCpuLoad}%</span>
            </div>
            <ChonkyBar persantage={Math.round(nodeData.node.metrics.jvmCpuLoad)} color="#7A80F0"/>
          </div>
        </div>
        <div className="node-information__services-count">
          Services: {nodeData.node.activeServices} / {nodeData.node.totalServices}
        </div>
        <Table colsCount={7} headers={["System", "Deployment Information", "Service Info", "Status", "System Load", "JVM CPU Load", "Memory"]}>
          {nodeData.services.map(service => {
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
          <Modal isOpen={isOpen} toggleFunction={toggleModal}>
            <div className="modal__header">Are you sure you want to turn off this service?</div>
            <div className="modal__service-name">{selectedServiceID}</div>
            <button className="modal__accept-btn" onClick={() => {turnOffService(selectedServiceID); toggleModal()}}>YES, TURN OFF</button>
          </Modal>
      </div>
    );
  }
};

export default NodeInformation;