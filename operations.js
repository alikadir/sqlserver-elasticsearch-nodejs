import { Client } from '@elastic/elasticsearch';
import sql from 'mssql';

await sql.connect('mssql://*');
const client = new Client({
  node: 'http://localhost:9200',
});

export const insertBulk = async (dataList, indexName) => {
  try {
    const body = dataList.flatMap((doc) => [{ index: { _index: indexName } }, doc]);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body });
  } catch {}
};

export const insert = async (data, indexName) => {
  await client.index({
    index: indexName,
    refresh: true,
    body: data,
  });
};

export const getData = async (query) => {
  return await sql.query(query);
};
