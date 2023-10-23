const baseURL = 'http://localhost:3000'

const routes = {
  home: `${baseURL}/home`,
  node: (nodeId) => `${baseURL}/node/${nodeId}`,
  nodes: (type) => `${baseURL}/nodes/${type}`,
  services: `${baseURL}/services`,
  groups: `${baseURL}/groups`,
  createGroup: `${baseURL}/groups/create`,
  deleteGroup: (groupId) => `${baseURL}/groups/delete/${groupId}`,
  turnOffService: (id) => `${baseURL}/services/toggle/${id}`
}

export default routes;