const fs = require("fs");
const csv = require("csv-parser");

const readCsv = async (filepath: string) => {
  const records = [];
  const parser = fs.createReadStream(filepath).pipe(csv());

  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

export async function processCsv(filePath: string): Promise<any> {
  const data = await readCsv(filePath);
  console.log(data);
  return data;
  // return new Promise((resolve) => {
  // let results: string[] = [];
  // let languages: string[] = [];

  // const parser = fs.createReadStream(filePath).pipe(csv());

  // parser.on("readable", function () {
  //   let record;
  //   while ((record = parser.read()) !== null) {
  //     results.push(record);
  //   }
  // });
  // parser.end();

  // console.log(results);
  // .on("data", (row: any) => {
  //   results.push(row);
  // })
  // .on("headers", (headers: any[]) => {
  //   languages = headers.slice(1);
  //   console.log(languages);
  // })
  // .on("end", () => {
  //   //console.log(results);
  // });

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
