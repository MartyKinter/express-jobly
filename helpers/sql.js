const { BadRequestError } = require("../expressError");

/**
 * Helper to update partial data
 * 
 * used to make the SET clause of SQL update
 * 
 * @param dataToUpdate {field1: newValue, field2: newValue, ...}
 * @param jsToSql maps js data to database column names
 * @returns {Object} {sqlSetCols, dataToUpdate}
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
