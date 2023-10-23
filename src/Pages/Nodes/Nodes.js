import React from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import moment from "moment";
import routes from "../../routes.js";
import { useNavigate } from "react-router-dom";

import Table from "../../Components/Table/Table.js";
import "./Nodes.css";

const Nodes = () => {
  const [nodesData, setNodesData] = React.useState([]);

  let { type } = useParams();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(routes.nodes(type));
        setNodesData(await response.json());
      } catch (error) {
        console.log(error);
      }
    };

    dataFetch();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="nodes">
      <h1>Nodes Dashboard</h1>
      <span>Information about nodes</span>

      <Table colsCount={4} headers={["Node ID", "IP", "Last Check Time", "Services"]}>
        {nodesData.map(node => (
          <>
            <div className="table__cell node-id" onClick={() => {navigate(`/node/${node.id}`)}}>{node.id}</div>
            <div className="table__cell">{node.nodeIp}</div>
            <div className="table__cell last-check">{moment(node.metrics.timestamp).fromNow()}</div>
            <div className="table__cell services">
              <div><span className="services__active-count">{node.activeServices}</span> Active </div>
              <div><span className="services__inactive-count">{node.inactiveServices}</span> Inactive</div>
            </div>
          </>
        ))}
      </Table>
    </div>
  );
}

export default Nodes;