'use strict';

module.exports = (NODE) => {
  const varsIn = NODE.getInputByName('variables');
  const valuesOut = NODE.getOutputByName('values');

  valuesOut.on('trigger', async (conn, state) => {
    const variables = await varsIn.getValues(state);
    return [].concat(...variables.map((variable) => variable.values));
  });
};
