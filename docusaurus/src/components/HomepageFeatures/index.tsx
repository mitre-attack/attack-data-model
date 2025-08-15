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
    type: 'explanation' as const,
    title: 'Explanation',
    description: 'Deep dives into the architecture, design philosophy, and trade-offs that shape the library.',
    href: 'docs/explanation/',
  },
];

const keyFeatures = [
  {
    title: '🔒 Type-Safe',
    description: 'Full TypeScript support with compile-time validation and IntelliSense.',
  },
  {
    title: '✅ STIX Compliant',
    description: 'Built on STIX 2.1 standards for seamless threat intelligence integration.',
  },
  {
    title: '🔗 Rich Relationships',
    description: 'Intuitive navigation between techniques, tactics, groups, and more.',
  },
  {
    title: '📊 Multi-Domain',
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
              Choose Your Documentation Path
            </Heading>
            <p className={styles.sectionSubtitle}>
              Our documentation aims to provide exactly the right information for your needs.
              Let us know if anything is missing!
            </p>
          </div>
          <div className={clsx('row', styles.docTypeGrid)}>
            {documentationTypes.map((docType, idx) => (
              <div key={idx} className="col col--6">
                <DocTypeCard
                  type={docType.type}
                  title={docType.title}
                  description={docType.description}
                  href={docType.href}
                  className={styles.docTypeCard}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className="text--center margin-bottom--xl">
            <Heading as="h2" className={styles.sectionTitle}>
              Library Features
            </Heading>
            <p className={styles.sectionSubtitle}>
              Built for type safety, standards compliance, and developer experience
            </p>
          </div>
          <div className="row">
            {keyFeatures.map((feature, idx) => (
              <KeyFeature key={idx} title={feature.title} description={feature.description} />
            ))}
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
