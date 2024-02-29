/*
 * next.config.js
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  experimental: {
    scrollRestoration: false
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
});

module.exports = nextConfig;
