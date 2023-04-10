const fs = require("fs");
import * as core from "@actions/core";

export const writeJSONFile = async (data: any, language: string) => {
  const objToWrite = JSON.stringify(data, null, 2);
  const destination: string = core.getInput("destination");
  const path = `${destination}/${language}.json`;

  fs.writeFile(path, objToWrite, (err: any) => {
    if (err) throw err;
    console.log(`Translation to ${language} written to file.`);
  });
  return path;
};
