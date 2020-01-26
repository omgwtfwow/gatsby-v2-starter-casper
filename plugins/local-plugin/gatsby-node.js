// this plugin just to add ad-hoc functionality

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

const _ = require("lodash");
const replace = require("replace-in-file");

// Search & replace
exports.onPostBuild = () => {
  const folders = [
    "public/*.html",
    "public/*.json",
    "public/*/*.html",
    "public/*/*.json",
    "public/*/*/*.html",
    "public/*/*/*.json",
    "public/*/*/*/*.html",
    "public/*/*/*/*.json"
  ];

  const regex = new RegExp(`${process.env.GATSBY_GHOST_API_URL}`, "g");
  const options = {
    files: folders,
    from: regex,
    to: process.env.GATSBY_FINAL_URL,
    countMatches: true,
    ignore: ["public/*.gz", "public/*.map"]
  };
  try {
    const results = replace.sync(options);

    _.mapValues(results, o => {
      if (o.hasChanged) {
        console.log(
          `Matched ${o.numMatches} - Replaced ${o.numReplacements} | Replaced "${process.env.GATSBY_GHOST_API_URL}" with "${process.env.GATSBY_FINAL_URL}" in ${o.file}.`
        );
      }
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }

  if (
    process.env.GATSBY_REPLACE_STRING_WHAT &&
    process.env.GATSBY_REPLACE_STRING_WITH
  ) {
    const string = new RegExp(`${process.env.GATSBY_REPLACE_STRING_WHAT}`, "g");
    const settings = {
      files: folders,
      from: string,
      to: process.env.GATSBY_REPLACE_STRING_WITH,
      countMatches: true,
      ignore: ["public/*.gz", "public/*.map"]
    };
    try {
      const results = replace.sync(settings);
      _.mapValues(results, o => {
        if (o.hasChanged) {
          console.log(
            `Matched ${o.numMatches} - Replaced ${o.numReplacements} | Replaced "${process.env.GATSBY_REPLACE_STRING_WHAT}" with "${process.env.GATSBY_REPLACE_STRING_WITH}" in ${o.file}.`
          );
        }
      });
      // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
};

// Ignores some annoying warnings during build
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-javascript') {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(
        plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
    )
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}
