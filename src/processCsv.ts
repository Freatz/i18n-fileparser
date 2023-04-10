const fs = require("fs");
const csv = require("csv-parser");
const _ = require("lodash");

import { writeJSONFile } from "./writer";

const readCsv = async (filepath: string) => {
  const records = [];
  const parser = fs.createReadStream(filepath).pipe(csv());

  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

const buildCSVFiles = async (data: any[], lang: string) => {
  let obj = {};
  for (const row of data) {
    _.set(obj, row.key, row[lang]);
  }

  const file = await writeJSONFile(obj, lang);
  return file;
};

export async function processCSV(filePath: string): Promise<any> {
  const data = await readCsv(filePath);
  const languageKeys = Object.keys(data[0]).slice(1);

  const results = Promise.all(
    languageKeys.map(async (language) => await buildCSVFiles(data, language))
  );
  return results;
}
