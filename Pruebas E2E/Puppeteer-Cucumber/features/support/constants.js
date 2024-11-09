module.exports = {
  baseUrl: "http://localhost:2368/ghost/#",
  pageTimeout: "20000",
  headlessMode: false,
  reportConfig: {
    jsonFile: "output/results.json",
    output: "output/report/cucumber-report.html",
    screenshotsDirectory: "output/screenshots/",
    reportSuiteAsScenarios: false,
    launchReport: false,
    storeScreenshots: true,
    metadata: {
      "Test Environment": "Test Environment",
      Browser: "Chrome",
    },
  },
};
