import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  documentationSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Documentation Home',
    },
    {
      type: 'category',
      label: 'Tutorials',
      description: 'Learning-oriented guides for getting started',
      link: { type: 'doc', id: 'tutorials/index' },
      items: [
        'tutorials/your-first-query',
        'tutorials/technique-browser',
        'tutorials/relationships',
        'tutorials/multi-domain-analysis',
      ],
    },
    {
      type: 'category',
      label: 'How-to Guides',
      description: 'Problem-oriented solutions for specific tasks',
      link: { type: 'doc', id: 'how-to-guides/index' },
      items: [
        'how-to-guides/manage-data-sources',
        'how-to-guides/validate-bundles',
        'how-to-guides/error-handling',
        'how-to-guides/performance',
      ],
    },
    {
      type: 'category',
      label: 'Principles',
      description: 'Understanding-oriented context and design rationale',
      link: { type: 'doc', id: 'principles/index' },
      items: [
        'principles/why-adm-exists',
        'principles/why-typescript',
        'principles/why-zod',
        'principles/extending-stix',
        'principles/attack-specification-overview',
        'principles/attack-versioning',
        'principles/attack-detections',
        'principles/schema-design',
        'principles/trade-offs',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      description: 'How to contribute to the project',
      link: { type: 'doc', id: 'contributing/index' },
      items: [
        'contributing/dev-setup',
        'contributing/coding-style',
        'contributing/tests',
        'contributing/docs',
      ],
    },
  ],
};

export default sidebars;
