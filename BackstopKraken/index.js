const fs = require('fs');
const path = require('path');
const referenceBaseDir = path.join(__dirname, '../PruebasRV/Kraken/output/screenshots/4.5');
const testBaseDir = path.join(__dirname, '../Pruebas E2E/Kraken/output/screenshots/5.96');

const obj = {};

const getStepNumber = (fileName) => {
    return parseInt(fileName.replace('step_', '').replace('.png', ''));
};

const addScreens = (baseDir, screenKey, skipScenario = false) => {
    fs.readdirSync(baseDir).forEach(featureName => {
        const featurePath = path.join(baseDir, featureName);
        fs.readdirSync(featurePath).forEach(scenarioName => {
            const scenarioPath = path.join(featurePath, scenarioName);
            if (!(scenarioName in obj)) {
                if (skipScenario) return;
                obj[scenarioName] = {};
            }
            const orderedSteps = fs.readdirSync(scenarioPath).sort((a, b) => getStepNumber(path.basename(a)) - getStepNumber(path.basename(b)))
            obj[scenarioName][screenKey] = orderedSteps.map(ss => {
                return path.join(scenarioPath, ss);
            });
        });
    });
};

addScreens(referenceBaseDir, 'referenceScreens');
addScreens(testBaseDir, 'testScreens', true);

const scenarios = [];
const misMatchThreshold = 10;

for (const key of Object.keys(obj)) {
    for (let i = 0; i < obj[key].referenceScreens.length; i++) {
        const ref = obj[key].referenceScreens[i];
        const test = obj[key].testScreens[i];
        scenarios.push({
            label: `${key} - Step ${i + 1}`,
            url: `file:///${ref}`,
            referenceUrl: `file:///${test}`,
            selectors: ['body'],
            misMatchThreshold,
        });
    }
}

const config = {
    id: "comparacion-imagenes",
    viewports: [{ label: "default", width: 1024, height: 768 }],
    scenarios: scenarios,
    paths: {
        bitmaps_reference: "backstop_data/bitmaps_reference",
        bitmaps_test: "backstop_data/bitmaps_test",
        html_report: "backstop_data/html_report",
        ci_report: "backstop_data/ci_report"
    },
    engine: "puppeteer",
    report: ["browser"],
    debug: false
};

fs.writeFileSync('backstop.json', JSON.stringify(config, null, 2));
