import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@mui/styles";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet as StyledComponentSheets } from "styled-components";

// import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/core/styles";
export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        });
      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <div id="page-transition" key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </div>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          {/* <link
            rel="preload"
            href="https://app.shopsense.pro/embed/widget.js?zone=31"
            as="script"
          /> */}
          <title>Fast Distro Distribution</title>
          <meta name="description" content="Fast Distro Distribution" />
          <meta
            name="viewport"
            content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1"
          />
          <meta name="keywords" content="" />
          <link rel="manifest" href="/favicon/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />
          {/* og images */}
          <meta property="og:image" content="/images/header/logo.png" />
          <meta property="og:image:alt" content="Fast Distro" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          {/* favicons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/favicon/android-chrome-512x512.png"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
