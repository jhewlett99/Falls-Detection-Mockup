rsbuild.config.js

module.exports = {
  plugins: [
    {
      name: '@rsbuild/plugin-postcss',
      options: {
        config: './postcss.config.js',
      },
    },
  ],
};