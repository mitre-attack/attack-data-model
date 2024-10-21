import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Zod Schema Definitions',
    description: (
      <>
        Zod is a powerful TypeScript-first schema declaration and validation library that we use to
        define our ATT&CK Data Model. By utilizing Zod, we ensure that our data structures are
        robust, consistent, and easy to maintain. The schemas allow us to generate documentation,
        providing clear and concise information for developers and ATT&CK users. This approach not
        only streamlines our development process but also enhances the reliability of our data
        model. With Zod, we can easily adapt to changes and ensure that our data model remains
        accurate and up-to-date.
      </>
    ),
  },
  {
    title: 'Benefits and Uses',
    description: (
      <>
        This site leverages Zod schemas to automatically generate comprehensive documentation,
        ensuring it is always in sync with the underlying data model. By minimizing documentation
        discrepancies previously prone to human error, this approach ensures our documentation
        remains accessible and user-friendly. Beyond documentation, the ATT&CK Data Model allows
        users to parse, validate, and utilize the data in the ATT&CK knowledge base as a TypeScript
        object. Integrating Zod ensures data handling is efficient and reliable, enhancing the
        accuracy and usability of our data to support developers in their work.
      </>
    ),
  },
  {
    title: 'Known Compliance Issues',
    description: (
      <>
        Currently, the ATT&CK knowledge base does not fully conform to the defined Zod schemas, and
        there are known discrepancies that need to be addressed. We are actively working on aligning
        our data with the schemas to ensure complete compliance. Your understanding and patience are
        appreciated as we work to make improvements.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center"></div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
