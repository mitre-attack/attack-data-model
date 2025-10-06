import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MITRE ATT&CK Data Model',
  tagline: 'A TypeScript library for working with MITRE ATT&CK® data using STIX 2.1',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mitre-attack.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/attack-data-model/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mitre-attack', // Usually your GitHub org/user name.
  projectName: 'attack-data-model', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/mitre-attack/attack-data-model/tree/main/docusaurus/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'schemas',
        path: 'schemas',
        routeBasePath: 'schemas',
        sidebarPath: './sidebarsSchemas.ts',
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api',
        routeBasePath: 'api',
        sidebarPath: './sidebarsAPI.ts',
        // ... other options
      },
    ],
  ],

  themeConfig: {
    // Enhanced metadata for better SEO and social sharing
    metadata: [
      {
        name: 'keywords',
        content: 'MITRE, ATT&CK, STIX, TypeScript, threat intelligence, cybersecurity, data model',
      },
      {
        name: 'description',
        content: 'A TypeScript library for working with MITRE ATT&CK® data using STIX 2.1. Provides type-safe access to ATT&CK objects.',
      },
    ],
    navbar: {
      title: 'ATT&CK Data Model',
      logo: {
        alt: 'MITRE ATT&CK Logo',
        src: 'img/favicon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'documentationSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'schemasSidebar',
          position: 'left',
          label: 'Schemas',
          docsPluginId: 'schemas',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
          docsPluginId: 'api',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          docsPluginId: 'schemas',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          docsPluginId: 'api',
        },
        {
          href: 'https://github.com/mitre-attack/attack-data-model',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // Enable local search for better user experience
    // Note: For production, consider configuring Algolia search
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    footer: {
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Tutorials',
              to: '/docs/tutorials/',
            },
            {
              label: 'How-to Guides',
              to: '/docs/how-to-guides/',
            },
            {
              label: 'Schema Reference',
              to: '/schemas/',
            },
            {
              label: 'API Reference',
              to: '/api/',
            },
            {
              label: 'Principles',
              to: '/docs/principles/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mitre-attack/attack-data-model',
            },
            {
              label: 'Issues',
              href: 'https://github.com/mitre-attack/attack-data-model/issues',
            },
          ],
        },
        {
          title: 'MITRE ATT&CK',
          items: [
            {
              label: 'ATT&CK Website',
              href: 'https://attack.mitre.org',
            },
            {
              label: 'Contact Us',
              href: 'https://attack.mitre.org/resources/engage-with-attack/contact',
            },
            {
              label: 'Terms of Use',
              href: 'https://attack.mitre.org/resources/legal-and-branding/terms-of-use',
            },
            {
              label: 'Privacy Policy',
              href: 'https://attack.mitre.org/resources/legal-and-branding/privacy',
            },
          ],
        },
      ],
      style: 'dark',
      copyright: `© ${new Date().getFullYear()}, The MITRE Corporation. Built with <a href="https://docusaurus.io">Docusaurus</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
