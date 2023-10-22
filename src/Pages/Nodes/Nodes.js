import React from "react";
import moment from "moment";

import Table from "../../Components/Table/Table.js";
import "./Nodes.css";

const rowsData = [
  {
    id: 'node-123',
    nodeIp: "178.12.35.1",
    timestamp: "2023-10-12T14:23:55Z",
    totalServices: 10,
    activeServices: 8,
    inactiveServices: 2
  },
  {
    id: 'node-123',
    nodeIp: "178.12.35.1",
    timestamp: "2023-10-21T14:23:55Z",
    totalServices: 10,
    activeServices: 8,
    inactiveServices: 2
  },
  {
    id: 'node-123',
    nodeIp: "178.12.35.1",
    timestamp: "2023-10-12T14:23:55Z",
    totalServices: 10,
    activeServices: 8,
    inactiveServices: 2
  },
];

const Nodes = () => {
  return (
    <div className="nodes">
      <h1>Nodes Dashboard</h1>
      <span>Information about nodes</span>

      <Table colsCount={4} headers={["Node ID", "IP", "Last Check Time", "Services"]}>
        {rowsData.map((row, index) => (
          <>
            <div className="table__cell node-id">{row.id}</div>
            <div className="table__cell">{row.nodeIp}</div>
            <div className="table__cell last-check">{moment(row.timestamp).fromNow()}</div>
            <div className="table__cell services">
              <div><span className="services__active-count">{row.activeServices}</span> Active </div>
              <div><span className="services__inactive-count">{row.inactiveServices}</span> Inactive</div>
            </div>
          </>
        ))}
      </Table>
    </div>
  );
}

export default Nodes;