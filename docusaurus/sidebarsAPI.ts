import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    'index',
    {
      type: 'link',
      label: 'Changelog',
      href: 'https://github.com/mitre-attack/attack-data-model/releases'
    }
  ],
};

export default sidebars;