import React from "react";
import { useEffect } from "react";

import Table from "../../Components/Table/Table";

import "./UserGroups.css";
import Modal from "../../Components/Modal/Modal";
import routes from "../../routes";

const UserGroups = () => {
  const [selectedGroup, setSelectedGroup] = React.useState({});
  const [selectedGroupIndex, setSelectedGroupIndex] = React.useState(0);
  const [userGroupsData, setUserGroupsData] = React.useState([]);
  const [allNodesData, setAllNodesData] = React.useState([]);
  const [selectedNewGroupNodes, setSelectedNewGroupNodes] = React.useState([]);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = React.useState(false);
  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = React.useState(false);

  const groupNameInputRef = React.useRef(null);
  const groupNameInputErrorRef = React.useRef(null);

  const dataFetch = async () => {
    try {
      const response = await fetch(routes.groups);
      setUserGroupsData(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  const dataFetchAllNodes = async () => {
    try {
      const response = await fetch(routes.nodes('all'));
      setAllNodesData(await response.json());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dataFetch();
    dataFetchAllNodes();
  }, []);

  const toggleCreateGroupModal = () => {
    setIsCreateGroupModalOpen(!isCreateGroupModalOpen);
  };

  const toggleDeleteGroupModal = () => {
    setIsDeleteGroupModalOpen(!isDeleteGroupModalOpen);
  }

  const deleteGroup = async () => {
    // Запрос на удаление
    try {
      const response = await fetch(routes.deleteGroup(userGroupsData[selectedGroupIndex]?.id))
      dataFetch();
    } catch (error) {
      console.log(error);
    }

    toggleDeleteGroupModal();
  }

  const addNodesToGroup = (node) => {
    if (!selectedNewGroupNodes.includes(node))
      setSelectedNewGroupNodes([...selectedNewGroupNodes, node]);
  }
  
  const removeNodesFromGroup = (node) => {
    if (selectedNewGroupNodes.includes(node))
      setSelectedNewGroupNodes(selectedNewGroupNodes.filter((n) => n !== node));  
  }

  const createGroup = async (e) => {
    e.preventDefault();
    console.log(selectedNewGroupNodes, groupNameInputRef.current.value);

    // Запрос на создание группы
    try {
      const response = await fetch(routes.createGroup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          groupName: groupNameInputRef.current.value,
          nodes: selectedNewGroupNodes
        })
      });
    } catch (error) {
      console.log(error);
    }

    toggleCreateGroupModal();
  }

  return (
    <>
      <div>
        <div className="page-title">
          <h1>User Groups</h1>
          <span>Information about user groups</span>
        </div>
        <div className="container">
          <div className="user-groups">
            {userGroupsData.map((group, index) => (
              <div 
                className={`user-groups__group ${index === selectedGroupIndex ? "user-groups__group_selected" : ""}`}
                onClick={() => setSelectedGroupIndex(index)}
              >
                {group.name}
              </div>
            ))}
          </div>
          <div className="user-groups__actions">
            <button className="user-groups__action" onClick={toggleCreateGroupModal}>+ Create User Group</button>
            <button className="user-groups__action" onClick={toggleDeleteGroupModal}>&#10005; Delete User Group</button>
          </div>
          <Table additionalClasses={"table__user-groups"} colsCount={2} headers={["Node ID", "IP"]}>
            {userGroupsData[selectedGroupIndex]?.nodes.map((node) => (
              <>
                <div className="table__cell">{node.id}</div>
                <div className="table__cell">{node.nodeIp}</div>
              </>
            ))}
          </Table>
        </div>
      </div>
      <Modal isOpen={isCreateGroupModalOpen} toggleFunction={toggleCreateGroupModal}>
        <div className="modal__header">Create User Group</div>
        <form className="create-group-form" onSubmit={(e) => createGroup(e)}>
          <label className="modal__input-label">
            <span>Input group name:</span>
            <input ref={groupNameInputRef} type="text" className="modal__input" placeholder="Enter group name" required />
            <span ref={groupNameInputErrorRef} className="modal__input-error"></span>
          </label>
          <div className="create-group-modal__nodes-selector">
            <span>All nodes</span>
            <div className="create-group-modal__nodes">
              {allNodesData.map((node) => {
                if (!selectedNewGroupNodes.includes(node))
                  return (
                    <div className="user-groups__group" onClick={() => addNodesToGroup(node)}>
                      {node.id}
                    </div>
                  );
              })}
            </div>
            <span>New group nodes</span>
            <div className="create-group-modal__selected-nodes">
              {selectedNewGroupNodes.map((node) => (
                <div className="user-groups__group" onClick={() => removeNodesFromGroup(node)}>
                  {node.id}
                </div>
              ))}
            </div>
          </div>
          <button className="modal__accept-btn create-button">
            CREATE
          </button>
        </form>
      </Modal>

      <Modal isOpen={isDeleteGroupModalOpen} toggleFunction={toggleDeleteGroupModal}>
        <div className="modal__header">Are you sure you want to delete group?</div>
        <div className="modal__service-name">{userGroupsData[selectedGroupIndex]?.id}</div>
        <button className="modal__accept-btn" onClick={() => deleteGroup()}>
          YES, DELETE
        </button>
      </Modal>
    </>
  );
};

export default UserGroups;