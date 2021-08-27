import { getData, insertBulk } from './operations.js';


const indexName = 'product_indx';
const readBlockSize = 500;
let cursorPosition = 0;

while (true) {
  const sqlResponse = await getData(
    `SELECT TOP(${readBlockSize}) * FROM Urunler u LEFT OUTER JOIN Markalar m ON u.MarkaId = m.MarkaId WHERE u.urunId > ${cursorPosition} ORDER BY urunId`
  );
  const dataList = sqlResponse.recordset;
  const returnedCursorPosition = Math.max(...dataList.map((x) => x.UrunId));

  if (cursorPosition == returnedCursorPosition) break;
  else cursorPosition = returnedCursorPosition;

  await insertBulk(dataList, 'product_indx');
  console.log({ returnedCursorPosition });
  console.log({ cursorPosition });
}

console.log('The Transfer has finished.');
