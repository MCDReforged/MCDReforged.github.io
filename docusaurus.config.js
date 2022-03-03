// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'MCDReforged',
  tagline: 'A rewritten version of MCDaemon, a python script to control your Minecraft server',
  url: 'https://MCDReforged.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'MCDReforged', // Usually your GitHub org/user name.
  projectName: 'MCDReforged.github.io', // Usually your repo name.

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      zh: {
        label: '简体中文',
        htmlLang: 'zh-CN',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/MCDReforged/MCDReforged.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: '5048LEAP30',
  
        // Public API key: it is safe to commit it
        apiKey: 'b1e640f6c2163456ef9421d5a8821d62',
  
        indexName: 'mcdreforged',
  
        // Optional: see doc section below
        contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'mcdreforged\\.(github\\.io|vercel\\.app|netlify\\.app|pages\\.dev)',
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
  
        //... other Algolia params
      },
      navbar: {
        title: 'MCDReforged',
        logo: {
          alt: 'MCDReforged Logo',
          src: 'img/mcdreforged.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/Fallen-Breath/MCDReforged',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        // style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Legacy Docs',
                href: 'https://MCDReforged.readthedocs.io',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Kaiheila',
                href: 'https://kaihei.co/ZiKh8f',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Docs Repo',
                href: 'https://github.com/MCDReforged/MCDReforged.github.io',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://github.com/Fallen-Breath" title="Fallen_Bread">Fallen_Breath</a>, Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};
