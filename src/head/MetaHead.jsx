import Head from "next/head";

import React from "react";

const OG_IMAGE_VERSION = "2026-05-19";

const CommonHead = () => {
  const siteUrl = process.env.DOMAIN_BASE_URL || "https://www.fastdistro.com";
  const ogImageUrl = `${siteUrl}/images/header/logo.png?v=${OG_IMAGE_VERSION}`;
  return (
    <Head>
      <title>Fast Distro</title>
      <meta name="description" content="Fast Distro" />
      <link rel="manifest" href="/favicon/manifest.json" />
      {/* favicons */}
      <meta property="og:image" content={ogImageUrl} />
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
  );
};

export default CommonHead;
