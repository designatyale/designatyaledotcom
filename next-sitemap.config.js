/*
 * next-sitemap.config.js
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000',
  changefreq: 'daily',
  priority: 0.7,
  generateRobotsTxt: true,
  exclude: ['/studio'],
};
