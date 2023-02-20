const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const store = [
  ...common,
  'test/**/*.feature',
  '--require test/apps/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  store
};
