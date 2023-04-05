const fs = require("fs");
const csv = require("csv-parser");
const _ = require("lodash");

const readCsv = async (filepath: string) => {
  const records = [];
  const parser = fs.createReadStream(filepath).pipe(csv());

  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

const buildFiles = async (data: any[], lang: string) => {
  let obj = {};
  for (const row of data) {
    _.set(obj, row.key, row[lang]);
  }
  const objToWrite = JSON.stringify(obj, null, 2);

  // fs.writeFile(`${lang}.json`, objToWrite, (err: any) => {
  //   if (err) throw err;
  //   console.log(`Translation to ${lang} written to file.`);
  // });
};

export async function processCsv(filePath: string): Promise<any> {
  const data = await readCsv(filePath);
  const languageKeys = Object.keys(data[0]).slice(1);

  languageKeys.forEach((language) => buildFiles(data, language));

  return data;

  // 1. read csv file
  // 2. ver quais idiomas, cada idioma é uma coluna
  // key, en, pt -> [en, pt]

  // 3. função para processar a coluna do idioma
  // lodash set -> https://lodash.com/docs/4.17.15#set
  // 3.1 criar um objeto vazio (let object);
  // 3.2 loop em cada linha _.set(object, key, valor da coluna);
  // 4. salvar o arquivo
  // 4.1 é salvar o object como json

  // 3 e 4 tem que ser para cada idioma
  // main.ts -> commit dos arquivos
  // retornar os nomes dos arquivos criados
}
