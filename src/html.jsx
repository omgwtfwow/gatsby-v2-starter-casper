/* eslint import/no-unresolved:"off" */
/* eslint import/extensions:"off" */
/* eslint global-require:"off" */
import React from "react";
import favicon from "./favicon.ico";

const fs = require('fs');
const path = require('path');

let inlinedStyles = "";
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve('public');
  const stylesFile = fs.readdirSync(dirPath).filter(fn => fn.endsWith('.css'));
  console.log(`public/${  stylesFile}`);
  try {

    /* eslint import/no-webpack-loader-syntax: off */

    // eslint-disable-next-line import/no-dynamic-require
    inlinedStyles = require(`!raw-loader!../public/${stylesFile}`)

  } catch (e) {
    /* eslint no-console: "off" */
    console.log(e);
  }
}

export default class HTML extends React.Component {
  render() {
    const { headComponents, body, postBodyComponents } = this.props;
    let css;
    if (process.env.NODE_ENV === "production") {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: inlinedStyles }}
        />
      );
    }
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          {/* Mobile Meta */}
          <meta name="HandheldFriendly" content="True" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          {/* Styles'n'Scripts */}

          {this.props.headComponents}
          <link rel="shortcut icon" href={favicon} />
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
