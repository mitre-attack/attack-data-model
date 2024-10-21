import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MITRE ATT&CK Data Model',
  tagline: '',
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
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: ['rss'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'ATT&CK Data Model',
      logo: {
        alt: 'MITRE ATT&CK Logo',
        src: 'img/favicon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'ATT&CK Schemas',
        },
        {
          to: '/blog',
          label: 'Known Issues',
          position: 'left',
        },
        {
          href: 'https://github.com/mitre-attack/attack-data-model',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
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
      style: 'dark',
      copyright: `© ${new Date().getFullYear()}, The MITRE Corporation. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
