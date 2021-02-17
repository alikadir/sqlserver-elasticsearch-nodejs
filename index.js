import { getData, insertBulk } from './operations.js';

let maxId = 0;
while (true) {
  const sqlResponse = await getData(
    `SELECT TOP(500) * FROM Urunler u LEFT OUTER JOIN Markalar m ON u.MarkaId = m.MarkaId WHERE u.urunId > ${maxId} ORDER BY urunId`
  );
  const dataList = sqlResponse.recordset;
  const returnedMaxId = Math.max(...dataList.map((x) => x.UrunId));

  if (maxId == returnedMaxId) break;
  else maxId = returnedMaxId;

  await insertBulk(dataList, 'dorduncu_deneme');
  console.log({ returnedMaxId });
  console.log({ maxId });
}
