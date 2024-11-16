module.exports = {
  pageTimeout: "30000",
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
      Version: "v4.5",
    },
  },
};
