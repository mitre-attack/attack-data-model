import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    'index',
    'data-sources',
    'attack-data-model',
    'utilities',
    'errors',
    'configuration',
    'common-usage-patterns',
    // {
    //   type: 'category',
    //   label: 'API Documentation',
    //   link: { type: 'doc', id: 'index' },
    //   items: [
    //     'data-sources',
    //     'attack-data-model',
    //     'utilities',
    //     'errors',
    //     'configuration',
    //     'common-usage-patterns',
    //   ],
    // },
  ],
};

export default sidebars;