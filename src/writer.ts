const fs = require("fs-extra");
import * as core from "@actions/core";

export const writeJSONFile = async (data: any, language: string) => {
  const objToWrite = JSON.stringify(data, null, 2);
  const destination: string = core.getInput("destination");
  const path = `${destination}/${language}.json`;

  await fs.outputFile(path, objToWrite, (err: any) => {
    if (err) throw err;
    core.info(`Translation to ${language} written to file.`);
  });

  return path;
};
