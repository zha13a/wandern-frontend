import React from "react";

import Table from "../../Components/Table/Table";

import "./UserGroups.css";
import Modal from "../../Components/Modal/Modal";

const userGroupsData = [
  {
    name: "UserGroup1",
    id: "UserGroup1",
    nodes: [
      {
        NodeId: "node-1",
        ip: "127.0.0.1",
      },
      {
        NodeId: "node-2",
        ip: "127.0.0.1",
      },
    ]
  },
  {
    name: "UserGroup2",
    id: "UserGroup2",
    nodes: [
      {
        NodeId: "adfasdfssSSSS",
        ip: "127.2.2.1",
      },
      {
        NodeId: "node-4",
        ip: "127.0.0.1",
      },
      {
        NodeId: "123123",
        ip: "127.0.0.1",
      },
    ]
  },
  {
    name: "UserGroup3",
    id: "UserGroup3",
    nodes: [
      {
        NodeId: "node-5",
        ip: "127.0.0.1",
      },
      {
        NodeId: "node-6",
        ip: "127.0.0.1",
      },
    ]
  }
];

const allNodesData = [
  {
    NodeId: "node-1",
    ip: "127.0.0.1",
  },
  {
    NodeId: "node-2",
    ip: "127.0.0.1",
  },
  {
    NodeId: "node-3",
    ip: "127.0.0.1",
  },
  {
    NodeId: "node-4",
    ip: "127.0.0.1",
  },
  {
    NodeId: "node-5",
    ip: "127.0.0.1",
  }
];



const UserGroups = () => {
  const [selectedGroup, setSelectedGroup] = React.useState(userGroupsData[0]);
  const [selectedNewGroupNodes, setSelectedNewGroupNodes] = React.useState([]);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = React.useState(false);
  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = React.useState(false);

  const groupNameInputRef = React.useRef(null);
  const groupNameInputErrorRef = React.useRef(null);

  const toggleCreateGroupModal = () => {
    setIsCreateGroupModalOpen(!isCreateGroupModalOpen);
  };

  const toggleDeleteGroupModal = () => {
    setIsDeleteGroupModalOpen(!isDeleteGroupModalOpen);
  }

  const deleteGroup = () => {
    // TODO: запрос на удаление
    console.log(selectedGroup.id);
    toggleDeleteGroupModal();
  }

  const selectGroup = (index) => {
    setSelectedGroup(userGroupsData[index]);
  }

  const addNodesToGroup = (node) => {
    if (!selectedNewGroupNodes.includes(node))
      setSelectedNewGroupNodes([...selectedNewGroupNodes, node]);
  }
  
  const removeNodesFromGroup = (node) => {
    if (selectedNewGroupNodes.includes(node))
      setSelectedNewGroupNodes(selectedNewGroupNodes.filter((n) => n !== node));  
  }

  const createGroup = (e) => {
    e.preventDefault();
    // TODO: запрос на создание
    alert(selectedNewGroupNodes, groupNameInputRef.current.value);
    console.log(selectedNewGroupNodes, groupNameInputRef.current.value);
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
                className={`user-groups__group ${userGroupsData[index].id === selectedGroup.id ? "user-groups__group_selected" : ""}`}
                onClick={() => selectGroup(index)}
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
            {selectedGroup.nodes.map((node) => (
              <>
                <div className="table__cell">{node.NodeId}</div>
                <div className="table__cell">{node.ip}</div>
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
                      {node.NodeId}
                    </div>
                  );
              })}
            </div>
            <span>New group nodes</span>
            <div className="create-group-modal__selected-nodes">
              {selectedNewGroupNodes.map((node) => (
                <div className="user-groups__group" onClick={() => removeNodesFromGroup(node)}>
                  {node.NodeId}
                </div>
              ))}
            </div>
          </div>
          <button className="modal__accept-btn">
            CREATE
          </button>
        </form>
      </Modal>

      <Modal isOpen={isDeleteGroupModalOpen} toggleFunction={toggleDeleteGroupModal}>
        <div className="modal__header">Are you sure you want to delete group?</div>
        <div className="modal__service-name">{selectedGroup.id}</div>
        <button className="modal__accept-btn" onClick={() => deleteGroup()}>
          YES, DELETE
        </button>
      </Modal>
    </>
  );
};

export default UserGroups;