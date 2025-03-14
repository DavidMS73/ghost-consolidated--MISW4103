const { faker } = require("@faker-js/faker");
const scope = require("../support/scope");

const waitUtil = (millis) =>
  new Promise((resolve) => {
    setTimeout(resolve, millis);
  });

const formatString = (string) => string.trim().replace(/[\n\r\t]/gm, "");

const getText = async (page, selector) => {
  const element = await page.$(selector);
  return await page.evaluate(
    (e) => e.textContent.trim().replace(/[\n\r\t]/gm, ""),
    element
  );
};

const getInputText = async (page, selector) => {
  return await page.$eval(selector, ipt => {
    return ipt.value;
  });
};

const getImageExists = async (page, selector) => {
  const element = await page.$(selector);
  return element !== null;
};

const dataSource = (data) => {
  const regex =
    /\{(?<data_source>a_priori|faker|pseudo_aleatorio)\((?<attribute>\w*[-]?\w*)\)\}/;
  const match = regex.exec(data);
  const origin = match ? match.groups.data_source : "default";
  const attribute = match ? match.groups.attribute : "";
  return [origin, attribute];
};

const subgroup = (attribute) => {
  const splitInfo = attribute.split("-");
  const group = splitInfo[0];
  const attribute_name = splitInfo[1];
  return [group, attribute_name];
};

const fakerData = (attribute) => {
  // Faker random seed
  faker.seed();
  if (attribute === "sentence") return faker.lorem.sentence();
  else if (attribute === "sentence_5") return faker.lorem.sentence(5);
  else if (attribute === "sentence_100") return faker.lorem.sentence(100);
  else if (attribute === "paragraph") return faker.lorem.paragraph(2);
  else if (attribute === "paragraph_5") return faker.lorem.paragraph(5);
  else if (attribute === "paragraph_10") return faker.lorem.paragraph(10);
  else if (attribute === "alphanumeric") return faker.string.alphanumeric(15);
  else if (attribute === "internal_alphanumeric") return "#" + faker.string.alphanumeric(15);
  else if (attribute.includes("alphanumeric_")) {
    const length = parseInt(attribute.split("_")[1]);
    return faker.string.alphanumeric(length);
  }
  else if (attribute === "url") return faker.internet.url();
  else if (attribute === "email") return faker.internet.email();
  else if (attribute === "username") return faker.internet.username();
  else if (attribute === "firstName") return faker.person.firstName();
  else if (attribute === "lastName") return faker.person.lastName();
  else if (attribute === "fullName") return faker.person.fullName();
  else if (attribute === "special_characters") return faker.string.fromCharacters('!"#$%&', 10);
  else if (attribute === "hex_color") return faker.color.rgb().replace("#", "");
  else if (attribute === "html_tag") {
    var tagName = faker.lorem.word();
    return `<${tagName}>${faker.lorem.sentence()}</${tagName}>`;
  }
  else if (attribute === "words") return faker.lorem.words();
  else if (attribute.includes("word_")) {
    const length = parseInt(attribute.split("_")[1]);
    return faker.lorem.words(length);
  }
  else if (attribute === "country") return faker.location.country();
};

const dataProcessor = (data) => {
  let content = data;
  if (data.startsWith("{")) {
    // Get the source and the attribute
    let data_source = dataSource(data);
    let origin = data_source[0];
    let attribute = data_source[1];
    // Get the data dfrom the respective source
    if (origin === "a_priori") {
      const groupInfo = subgroup(attribute);
      const group = groupInfo[0];
      const attribute_info_split = groupInfo[1].split("_");

      content =
        scope.aPrioriDataPool[group][attribute_info_split[0]][
        attribute_info_split[1]
        ];
    } else if (origin === "pseudo_aleatorio") {
      const groupInfo = subgroup(attribute);
      const group = groupInfo[0];
      const attributeInfo = groupInfo[1];
      const position = scope.actualPseudoAleatorioPosition[group];

      content = scope.pseudoAleatorioDataPool[group][position][attributeInfo];
    } else if (origin === "faker") {
      content = fakerData(attribute);
    } else if (origin === "default") {
      content = data;
    }
  }
  return content;
};

const changeInJsonPseudoAleatorio = (obj, fakerWithSeed) => {
  const sentenceKeys = new Set(["title"]);
  const shortParagraphKeys = new Set(["excerpt"]);
  const paragraphKeys = new Set(["description", "content"]);
  const middleNameKeys = new Set(["name"]);
  const alphanumericKeys = new Set(["customUrl"]);

  for (const [key, value] of Object.entries(obj)) {
    if (sentenceKeys.has(key)) {
      obj[key] = fakerWithSeed.lorem.sentence(1);
    } else if (shortParagraphKeys.has(key)) {
      obj[key] = fakerWithSeed.lorem.paragraphs(1);
    } else if (paragraphKeys.has(key)) {
      obj[key] = fakerWithSeed.lorem.paragraphs(2);
    } else if (middleNameKeys.has(key)) {
      obj[key] = fakerWithSeed.person.middleName();
    } else if (alphanumericKeys.has(key)) {
      obj[key] = fakerWithSeed.string.alphanumeric(15);
    } else if (value && typeof value === "object") {
      changeInJsonPseudoAleatorio(value, fakerWithSeed);
    }
  }
};

const isElementVisible = async (page, cssSelector) => {
  let visible = true;
  await page.waitForSelector(cssSelector, { visible: true, timeout: 2000 })
    .catch(() => {
      visible = false;
    });
  return visible;
};

module.exports = {
  waitUtil,
  getText,
  getInputText,
  getImageExists,
  dataProcessor,
  formatString,
  changeInJson: changeInJsonPseudoAleatorio,
  isElementVisible,
};
