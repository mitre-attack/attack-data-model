import clsx from 'clsx';
import Heading from '@theme/Heading';
import { DocTypeCard } from '../DocTypeIndicator';
import styles from './styles.module.css';

const documentationTypes = [
  {
    type: 'tutorial' as const,
    title: 'Tutorials',
    description: 'Step-by-step guides to get you started with ATT&CK data processing. Perfect for beginners who want hands-on experience.',
    href: 'docs/tutorials/',
  },
  {
    type: 'how-to' as const,
    title: 'How-to Guides',
    description: 'Practical solutions for experienced users who know what they want to achieve and need direct guidance.',
    href: 'docs/how-to-guides/',
  },
  {
    type: 'reference' as const,
    title: 'Reference',
    description: 'Complete API documentation, configuration options, and technical specifications for when you need precise information.',
    href: 'docs/reference/',
  },
  {
    type: 'principles' as const,
    title: 'Principles',
    description: 'Deep dives into the architecture, design philosophy, and trade-offs that shape the library.',
    href: 'docs/principles/',
  },
];

const keyFeatures = [
  {
    title: 'Type-Safe',
    description: 'Full TypeScript support with compile-time validation and IntelliSense.',
  },
  {
    title: 'STIX Compliant',
    description: 'Built on STIX 2.1 standards for seamless threat intelligence integration.',
  },
  {
    title: 'Rich Relationships',
    description: 'Intuitive navigation between techniques, tactics, groups, and more.',
  },
  {
    title: 'Multi-Domain',
    description: 'Supports Enterprise, Mobile, and ICS ATT&CK domains.',
  },
];

function KeyFeature({ title, description }: { title: string; description: string }) {
  return (
    <div className={clsx('col col--4', styles.keyFeature)}>
      <div className={styles.keyFeatureContent}>
        <h4 className={styles.keyFeatureTitle}>{title}</h4>
        <p className={styles.keyFeatureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      {/* Documentation Navigation Section */}
      <section className={styles.documentationSection}>
        <div className="container">
          <div className="text--center margin-bottom--xl">
            <Heading as="h2" className={styles.sectionTitle}>
              Let's Get Started
            </Heading>
            <p className={styles.sectionSubtitle}>
              This is the official documentation for the ATT&CK Data Model library.
            </p>
          </div>
          <div className={styles.docTypeGrid}>
            <div className="row">
              <div className="col col--6">
                <DocTypeCard {...documentationTypes[0]} className={styles.docTypeCard} />
              </div>
              <div className="col col--6">
                <DocTypeCard {...documentationTypes[1]} className={styles.docTypeCard} />
              </div>
            </div>
            <div className="row">
              <div className="col col--6">
                <DocTypeCard {...documentationTypes[2]} className={styles.docTypeCard} />
              </div>
              <div className="col col--6">
                <DocTypeCard {...documentationTypes[3]} className={styles.docTypeCard} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className={styles.quickStartSection}>
        <div className="container">
          <div className="text--center margin-bottom--xl">
            <Heading as="h2" className={styles.sectionTitle}>
              Quick Start
            </Heading>
            <p className={styles.sectionSubtitle}>
              Get up and running with ATT&CK data in minutes
            </p>
          </div>
          <div className={styles.quickStartContent}>
            <div className="row">
              <div className="col col--6">
                <div className={styles.codeBlock}>
                  <h4>Install</h4>
                  <pre><code>npm install @mitre-attack/attack-data-model</code></pre>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.codeBlock}>
                  <h4>Import and Use</h4>
                  <pre><code>{`import { registerDataSource, loadDataModel } from '@mitre-attack/attack-data-model';

const uuid = await registerDataSource(dataSource);
const attackModel = loadDataModel(uuid);`}</code></pre>
                </div>
              </div>
            </div>
            <div className="text--center margin-top--lg">
              <a href="docs/tutorials/your-first-query" className={styles.primaryButton}>
                Start with Your First Query →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
