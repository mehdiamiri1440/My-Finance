const enUs = require('./en-us');
const caSp = require('./ca-sp');
const esSp = require('./es-sp');
const languages = {
  [enUs.locale]: enUs,
  [caSp.locale]: caSp,
  [esSp.locale]: esSp,
};

let activeLanguage = null;

const localize = (key, params = {}) => {
  let result = activeLanguage?.strings[key];

  for (const param in params) {
    let val = params[param];
    if (val === undefined || val === null) {
      val = ``;
    }
    result = result.replace(`{${param}}`, val);
  }

  return result;
};

const setActiveLanguage = locale => {
  activeLanguage = languages[locale];
};

module.exports = {
  localize,
  setActiveLanguage,
};
