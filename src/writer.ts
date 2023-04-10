const fs = require("fs");
import * as core from "@actions/core";

export const writeJSONFile = async (data: any, language: string) => {
  const objToWrite = JSON.stringify(data, null, 2);
  const destination: string = core.getInput("destination");
  const path = `${language}.json`;

  await fs.writeFile(path, objToWrite, (err: any) => {
    if (err) throw err;
    core.info(`Translation to ${language} written to file.`);
  });

  return path;
};

