import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    // {
    //   type: 'doc',
    //   id: 'index',
    //   label: 'API Documentation',
    // },
    {
      type: 'category',
      label: 'API Documentation',
      link: { type: 'doc', id: 'index' },
      items: [
        'data-sources',
        'attack-data-model',
        'utilities',
      ],
    },
  ],
};

export default sidebars;