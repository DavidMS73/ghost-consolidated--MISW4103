const scope = require("./scope");
const fse = require("fs-extra");
const fs = require("fs");
const moment = require("moment");
const _ = require("lodash");
const constants = require("./constants");
const {
  BeforeAll,
  Before,
  AfterStep,
  After,
  AfterAll,
  setDefaultTimeout,
  Status,
} = require("@cucumber/cucumber");
const LoginPageObject = require("../pages/login_page");
const PostPageObject = require("../pages/post_page");
const PagePageObject = require("../pages/page_page");
const SidebarPageObject = require("../pages/sidebar_page");
const TagsPageObject = require("../pages/tags_page");
const MembersPageObject = require("../pages/members_page");
const CommonPageObject = require("../pages/common_page");
const PostsViewPageObject = require("../pages/posts_view_page");
const { faker } = require("@faker-js/faker");

// set default timeout to config value
setDefaultTimeout(constants.pageTimeout * 1000);

BeforeAll(async () => {
  // reset counter
  counter = 0;
  scenarioCounter = 1;
  oldFeatureName = "";

  const puppeteer = require("puppeteer");
  scope.driver = puppeteer;

  // set up launchProperties object with specified parameters
  // ignoreHTTPSErrors flag required for some test envs testing
  let launchProperties = {
    headless: constants.headlessMode,
    ignoreHTTPSErrors: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      // debug logging
      // '--enable-logging', '--v=1'
    ],
    // set 'devtools: true' => if you want to be able to launch the dev tools console too
    //  just need to add 'await scope.page.evaluate(() => {debugger})' to the step
    //  you want to stop at
    devtools: false,
    setDefaultTimeout: constants.pageTimeout,
  };

  scope.browser = await scope.driver.launch(launchProperties);

  // *************************************** \\
  // clear output folders
  //  or set them up if they don't exist
  // *************************************** \\

  // clear output/report directory if it exists or create output/report directory
  if (fse.pathExistsSync("output/report")) {
    console.log("Clear report directory ...");
    // remove any .html files in the report directory > to ensure only latest reports are in the folder
    fs.readdirSync("output/report").forEach((file) => {
      if (file.match(/.*\.html/) != null) {
        console.log(`removing file: output/report/${file}`);
        fse.removeSync(`output/report/${file}`);
      }
    });
    fse.removeSync("output/results.xml");
  } else {
    fse.ensureDirSync("output/report");
  }

  // clear output/screenshots directory if it exists or create output/screenshots directory
  if (fse.pathExistsSync("output/screenshots")) {
    console.log("Clear screenshots directory ...");
    fse.removeSync("output/screenshots/");
    // recreate directory
    fse.ensureDirSync("output/screenshots");
  } else {
    fse.ensureDirSync("output/screenshots");
  }

  const version = constants.reportConfig.metadata["Version"];
  fse.ensureDirSync(`output/screenshots/${version}`);

  // *************************************** \\
  // collect information about the run
  //  and to write details to json file
  // *************************************** \\
  const env = process.env.NODE_ENV;
  const browserVersion = await scope.browser.version();

  // look for arg that specifies output file location - starts with 'json:'
  let outputPath = _.find(process.argv, (arg) => {
    return arg.indexOf("json:") >= 0;
  });
  // extract the path location from the argument,
  //  remove 'json:' from outputPath to extract out the actual path
  if (outputPath) {
    outputPath = outputPath.replace("json:", "");
  }

  // update and create report-config.json to be used to generate cucumber html report
  let reportConfig = constants.reportConfig;
  // append to reportConfig run specific parameters
  reportConfig.jsonFile = outputPath;
  reportConfig.metadata["Test Environment"] = env;
  reportConfig.metadata["Browser"] = browserVersion;
  reportConfig.metadata["Version"] = version;

  fse.writeJsonSync("output/report-config.json", reportConfig);

  // *************************************** \\

  // Data pool
  const pathPool = "./data_pools/data_pool.json";
  const pathDynamicPool = "./data_pools/dynamic_data_pool.json";

  fs.readFile(pathPool, "utf8", (err, data) => {
    try {
      // Parsear el JSON
      const jsonData = JSON.parse(data);
      // Guardar los datos en scope.data_pool
      scope.dataPool = jsonData;
    } catch (error) {
      console.error("Error al parsear el JSON:", error);
      throw error;
    }
  });

  // Dynamic Data Pool
  dynamicDataPool(pathDynamicPool);
});

Before(async function ({ gherkinDocument }) {
  stepCounter = 1;
  const featureName = gherkinDocument.feature.name
    .replace(/ /g, "-")
    .toLowerCase();
  if (oldFeatureName !== featureName) {
    oldFeatureName = featureName;
    scenarioCounter = 1;
  }

  // create new page between scenarios
  scope.page = await scope.browser.newPage();
  createPageObjects(scope.page);
  await scope.page.setViewport({ width: 1280, height: 1000 });
  // add in accept language header - this is required when running in headless mode
  await scope.page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.8,zh-TW;q=0.6",
  });
});

AfterStep(async function ({ pickle, gherkinDocument }) {
  //Scneario counter
  const featureName = gherkinDocument.feature.name
    .replace(/ /g, "-")
    .toLowerCase();
  if (oldFeatureName !== featureName) {
    oldFeatureName = featureName;
  }

  const stepNumber = stepCounter++;
  //Paths
  const version = constants.reportConfig.metadata["Version"];
  const scenarioName = pickle.name.split(" - ")[0];
  const screenshotPath = `./output/screenshots/${version}/${featureName}/${scenarioName}/OUTLINE_${scenarioCounter}/`;
  const screenshotName = `step_${stepNumber}.png`;
  const fullPath = `${screenshotPath}${screenshotName}`;

  //Validate if the folder exists
  if (!fse.pathExistsSync(screenshotPath)) {
    fse.ensureDirSync(screenshotPath);
  }

  //Screenshot
  await scope.page.screenshot({ path: fullPath, fullPage: true });
});

After(async function (scenario) {
  // *************************************** \\
  // take screenshot at end of scenario,
  // if failure attach screenshot to test steps
  // *************************************** \\

  let name = scenario.pickle.name.replace(/ /g, "-");
  let result = scenario.result.status;
  if (result === Status.FAILED) {
    await scope.page.screenshot({
      path: `./output/screenshots/${counter}-${result}-[${name}].png`,
      fullPage: true,
    });
  }
  // close the current page at end of scenario - to ensure fresh page is loaded each time
  await scope.page.close();
  // increment counter
  counter++;
  scenarioCounter++;
});

AfterAll(async () => {
  if (scope.browser) {
    // close the browser at end of run
    await scope.browser.close();
  }
});

function createPageObjects(page) {
  scope.pages = {
    login: new LoginPageObject(page),
    posts: new PostPageObject(page),
    pages: new PagePageObject(page),
    sidebar: new SidebarPageObject(page),
    tags: new TagsPageObject(page),
    members: new MembersPageObject(page),
    common: new CommonPageObject(page),
    postsView: new PostsViewPageObject(page),
  };
}

const changeInJson = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key === "title") {
      obj[key] = value + faker.lorem.sentence(10);
    } else if (key === "description") {
      obj[key] = value + faker.lorem.paragraphs(3);
    } else if (key === "name") {
      obj[key] = value + faker.person.middleName();
    } else if (value && typeof value === "object") {
      changeInJson(value);
    }
  }
};

function dynamicDataPool(pathPool) {
  fs.readFile(pathPool, "utf8", (err, data) => {
    try {
      // Parsear el JSON
      const jsonData = JSON.parse(data);
      changeInJson(jsonData);

      // Guardar los datos en scope.dynamicDataPool
      scope.dynamicDataPool = jsonData;
    } catch (error) {
      console.error("Error al parsear el JSON:", error);
      throw error;
    }
  });
}
