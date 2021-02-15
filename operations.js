export const insertBulk = async (client, dataList, indexName) => {
  const body = dataList.flatMap((doc) => [
    { index: { _index: indexName } },
    doc,
  ]);

  const { body: bulkResponse } = await client.bulk({ refresh: true, body });
  if (bulkResponse.errors) console.error(bulkResponse.errors);
  else {
    const { body: count } = await client.count({ index: indexName });
    console.log(count);
  }
};

export const insert = async (client, data, indexName) => {
  await client.index({
    index: indexName,
    refresh: true,
    body: data,
  });
};

export const getData = async (sql, query) => {
  return await sql.query`select * from mytable`;
};
