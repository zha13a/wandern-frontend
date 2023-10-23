const routes = {
  node: (nodeId) => `http://localhost:3000/node/${nodeId}`,
  nodes: (type) => `http://localhost:3000/nodes/${type}`,
  services: 'http://localhost:3000/services',
  groups: 'http://localhost:3000/groups',
  createGroup: 'http://localhost:3000/groups/create',
  deleteGroup: (groupId) => `http://localhost:3000/groups/delete/${groupId}`
}

export default routes;