const fs = require("fs");

export const writeJSONFile = async (data: any, language: string) => {
  const objToWrite = JSON.stringify(data, null, 2);

  fs.writeFile(`${language}.json`, objToWrite, (err: any) => {
    if (err) throw err;
    console.log(`Translation to ${language} written to file.`);
  });
};
