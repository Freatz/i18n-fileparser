export async function processCsv(filePath: string): Promise<string> {
    return new Promise(resolve => {
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
      resolve("Done")
    })
  }