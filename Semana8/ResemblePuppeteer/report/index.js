function formatTime(timeMs) {
  let time = timeMs / 1000;
  let seconds = Math.round(time % 60);
  time = (time - seconds) / 60;
  let minutes = Math.round(time % 60);
  time = Math.round((time - minutes) / 60);
  let hours = time;

  let message = "";
  if (hours > 0) {
    message += `${hours}h `;
  }

  if (minutes > 0) {
    message += `${minutes}m `;
  }

  message += `${seconds}s`;

  return message;
}

/**
 * 
 * @param {string} str The string to turn to title case
 * @returns The string in title case
 */
function toTitleCase(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * @typedef {Object} Step
 * @property {number} id
 * @property {boolean} sameDimensions
 * @property {string} difference
 * @property {string} originalImage
 * @property {string} newImage
 * @property {string} diffImage
 */

/**
 * @typedef {Object} Scenario
 * @property {string} scenarioId
 * @property {string} title
 * @property {Step[]} steps
 */

/**
 * @typedef {Object} ReportData
 * @property {number} totalComparisons
 * @property {number} averageDifference
 * @property {number} executionTime
 * @property {Object.<string, number>} differences
 * @property {string} vrtType
 * @property {string} originalTitle
 * @property {string} newTitle
 * @property {Scenario[]} report
 */

/**
 * @returns {Promise<ReportData>} data The report's data
 */
async function loadData() {
  let data = await fetch("../results_full_flow/results.json");
  let results = await data.json();

  return results;
}

/**
 * @param {ReportData} data The report's data
 */
function renderSummary(data) {
  let element = document.querySelector("#total-comparisons");
  element.innerHTML = data.totalComparisons;

  element = document.querySelector("#average-difference");
  const percentage = data.averageDifference.toFixed(2);
  element.innerHTML = `${percentage}%`;

  element = document.querySelector("#execution-time");
  element.innerHTML = formatTime(data.executionTime);
}

/**
 * @param {string} originalTitle The title of the original version/browser
 * @param {string} newTitle The title of the new version/browser
 * @param {Step[]} steps The scenario's steps
 * @param {HTMLElement} node The node to append the steps
 */
function renderSteps(originalTitle, newTitle, steps, node) {
  const stepBody = node.querySelector("#step");

  for (const step of steps) {
    const clone = stepBody.cloneNode(true);
    clone.querySelector("#step-title").innerHTML = `Paso ${step.id}`;

    let element = clone.querySelector("#step-same-dimensions");
    element.innerHTML = element.innerHTML.replace("{same-dimensions}", step.sameDimensions ? "Sí" : "No");

    element = clone.querySelector("#step-mismatch");
    element.innerHTML = element.innerHTML.replace("{mismatch}", `${step.difference}%`);

    // Original image
    clone.querySelector("#step-original-title").innerHTML = originalTitle;
    clone.querySelector("#original-image").src = step.originalImage;

    // New image
    clone.querySelector("#step-new-title").innerHTML = newTitle;
    clone.querySelector("#new-image").src = step.newImage;

    // Diff image
    clone.querySelector("#diff-image").src = step.diffImage;

    node.appendChild(clone);
  }

  stepBody.remove();
}

/**
 * @param {string} originalTitle The title of the original version/browser
 * @param {string} newTitle The title of the new version/browser
 * @param {Scenario[]} scenarios The scenarios
 */
function renderReport(originalTitle, newTitle, scenarios) {
  const title = document.querySelector("#report-title");
  title.innerHTML = title.innerHTML
    .replace("{original-title}", originalTitle)
    .replace("{new-title}", newTitle);

  element = document.querySelector("#accordion-section");
  const container = document.querySelector("#accordionExample");

  for (const scenario of scenarios) {
    const node = element.cloneNode(true);
    const sectionTitle = node.querySelector("#section-title");
    const scenarioTitle = toTitleCase(scenario.title.replaceAll("-", " "));
    sectionTitle.innerHTML = `${scenario.scenarioId} - ${scenarioTitle}`;
    sectionTitle.setAttribute("data-bs-target", `#${scenario.scenarioId}`);
    sectionTitle.setAttribute("aria-controls", `${scenario.scenarioId}`);

    const collapsible = node.querySelector("#collapseOne");
    collapsible.id = `${scenario.scenarioId}`;

    renderSteps(originalTitle, newTitle, scenario.steps, collapsible);

    container.appendChild(node);
  }

  element.remove();
}

/**
 * @param {ReportData} data The report's data
 */
function renderData(data) {
  renderSummary(data);
  renderReport(data.originalTitle, data.newTitle, data.report);
}

/**
 * 
 * @param {ReportData} data The report's data
 */
function renderChart(data) {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Diferencias entre versiones por paso"
    },
    axisY: {
      title: "Pasos con diferencias"
    },
    axisX: {
      title: "Porcentaje de diferencia"
    },
    data: [{
      type: "column",
      dataPoints: [
        { y: data["10"], label: "< 10%" },
        { y: data["30"], label: "10% - 30%" },
        { y: data["50"], label: "30% - 50%" },
        { y: data["70"], label: "50% - 70%" },
        { y: data["90"], label: "70% - 90%" },
        { y: data["100"], label: "> 90%" }
      ]
    }]
  });
  chart.render();
}

window.onload = async function () {
  const data = await loadData();
  data.report.sort((a, b) => a.scenarioId.localeCompare(b.scenarioId));
  renderData(data);
  renderChart(data.differences);
}