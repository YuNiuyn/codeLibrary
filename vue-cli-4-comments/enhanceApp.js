module.exports = (option, context) => {
  return {
    enhanceAppFiles() {
      return {
        name: "dynamic-code",
        content: `export default ({ Vue }) => { Vue.mixin('$source', '${context.sourceDir}') }`,
      };
    },
  };
};
