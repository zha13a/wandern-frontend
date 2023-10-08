const routes = {
  services: 'http://localhost:3000/services',
  turnOffService: (id) => `http://localhost:3000/services/toggle/${id}`
}

// Ноды шаблона
const rowTemplate = document.getElementById('service-template');
const servicesTable = document.getElementById('services-table');
const errorTemplate = document.getElementById('error-template');
const headerTemplate = document.getElementById('header-template');

let selectedServiceID = '';

function clearTable() {
  servicesTable.innerHTML = '';
  servicesTable.appendChild(headerTemplate.content.cloneNode(true));
}

// Отрисовка строки таблицы
function renderService(service) {
  const row = rowTemplate.content.cloneNode(true);

  row.querySelector('#system').textContent = service.system;
  row.querySelector('#deployment-id').textContent = service.deploymentId;
  row.querySelector('#deployment-unit').textContent = service.deploymentUnit;

  row.querySelector('#service-url').textContent = service.serviceUrl;
  row.querySelector('#service-path').textContent = service.contextPath;
  row.querySelector('#service-port').textContent = service.port;
  row.querySelector('#service-address').textContent = service.ip;

  const statusCell = row.querySelector('#status');

  statusCell.textContent = service.status;
  statusCell.setAttribute('status', service.status);
  statusCell.addEventListener('click', () => {
    toggleModal();
    selectedServiceID = service.deploymentId;
  });

  const systemLoadCell = row.querySelector('#system-load');
  const systemLoadCellProgressCircle = systemLoadCell.querySelector('.progress-ring__circle');
  const systemLoadCellProgressLabel = systemLoadCell.querySelector('.cell-label');

  // 188 - это длина окружности при радиусе 30px
  systemLoadCellProgressCircle.style.strokeDashoffset = 188 - (188 * Math.round(service.metrics.systemLoad) / 100);
  // Прячет линюю прогресса, если значение меньше единицы (иначе будет непонятный круг)
  service.metrics.systemLoad < 1 && (systemLoadCellProgressCircle.style.stroke = '#00000000');
  systemLoadCellProgressLabel.textContent = `${Math.round(service.metrics.systemLoad)}%`;

  const jvmCpuLoadCell = row.querySelector('#jvm-cpu-load');
  const jvmCpuLoadCellProgressCircle = jvmCpuLoadCell.querySelector('.progress-ring__circle');
  const jvmCpuLoadCellProgressLabel = jvmCpuLoadCell.querySelector('.cell-label');

  jvmCpuLoadCellProgressCircle.style.strokeDashoffset = 188 - (188 * Math.round(service.metrics.jvmCpuLoad) / 100);
  service.metrics.jvmCpuLoad < 1 && (jvmCpuLoadCellProgressCircle.style.stroke = '#00000000');
  jvmCpuLoadCellProgressLabel.textContent = `${Math.round(service.metrics.jvmCpuLoad)}%`;

  row.querySelector('#memory').textContent = `${Math.round(service.metrics.usedMemoryMB)} / ${Math.round(service.metrics.freeMemoryMB)} Mb`;

  servicesTable.appendChild(row);
}

function showError(error) {
   console.log(error);
   clearTable();

   const errorRow = errorTemplate.content.cloneNode(true);
   errorRow.querySelector('.error__title').textContent = 'An error has occured :(';
   errorRow.querySelector('.error__message').textContent = error.message;

   servicesTable.appendChild(errorRow);
}

function toggleModal() {
  const modal = document.querySelector('.modal');
  modal.querySelector('.modal__service-name').textContent = selectedServiceID;
  modal.classList.toggle('modal_visible');
}

function showLoader() {
  const loader = document.getElementById('loader-template').content.cloneNode(true);

  clearTable();
  servicesTable.appendChild(loader);
}

async function changeStatus() {
  try {
    await fetch(routes.turnOffService(selectedServiceID));
    selectedServiceID = '';
    
    clearTable();
    showLoader();
    await fetchServicesData();
    toggleModal();
  } catch (error) {
    showError(error);
  }
};

async function fetchServicesData() {
  try {
    const responce = await fetch(routes.services);
    const data = await responce.json();

    clearTable();
    data.forEach(service => renderService(service));
  } catch (error) {
    showError(error)
  }
}

window.onload = () => {
  showLoader();
  document.querySelector('.modal__close-btn').addEventListener('click', toggleModal);
  document.getElementById('turn-off-btn').addEventListener('click', changeStatus);

  clearTable();
  fetchServicesData();
}

window.onclick = (event) => {
  if (event.target == document.querySelector('.modal')) {
    toggleModal();
  }
} 
