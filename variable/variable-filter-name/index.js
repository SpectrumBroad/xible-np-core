'use strict';

module.exports = (NODE) => {
  const variablesIn = NODE.getInputByName('variables');

  const filteredOut = NODE.getOutputByName('filtered');

  const valuesOut = NODE.getOutputByName('values');

  filteredOut.on('trigger', async (conn, state) => {
    const [variables, names] = await Promise.all([
      variablesIn.getValues(state),
      NODE.getData('name', state)
    ]);

    return variables
      .filter((variable) => names.includes(variable.name));
  });

  valuesOut.on('trigger', async (conn, state) => {
    const [variables, names] = await Promise.all([
      variablesIn.getValues(state),
      NODE.getData('name', state)
    ]);

    return [].concat(...variables
      .filter((variable) => names.includes(variable.name))
      .map((variable) => variable.values));
  });
};
