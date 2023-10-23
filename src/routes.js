const routes = {
  node: (nodeId) => `http://localhost:3000/node/${nodeId}`,
  nodes: (type) => `http://localhost:3000/nodes/${type}`,
  services: 'http://localhost:3000/services',
}

export default routes;