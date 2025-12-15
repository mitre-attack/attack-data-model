import fs from 'fs-extra';
import { globbySync } from 'globby';
import path from 'path';
import { fileURLToPath } from 'url';
import { convertSchemas, formatModelsAsMarkdown, zod2md } from 'zod2md';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- CONFIG ----
const SCHEMA_DIR = path.resolve(__dirname, 'src/schemas');
const OUTPUT_DIR = path.resolve(__dirname, 'docusaurus/schemas');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'attack-concept-table.mdx');
const SPEC_VERSION_FILE = path.resolve(__dirname, 'ATTACK_SPEC_VERSION');

// ---- MAPPING ----
type TableType = 'SDO' | 'SRO' | 'SMO';
const tableTypeHeaders: Record<TableType, string> = {
  SDO: 'STIX Domain Objects',
  SRO: 'STIX Relationship Objects',
  SMO: 'STIX Meta Objects',
};

interface ConceptMeta {
  concept: string;
  stixType: string;
  stixDoc?: string;
  stixDoc21?: string;
  table: TableType;
  notes?: string;
}

const conceptMetas: ConceptMeta[] = [
  // STIX Domain Objects
  {
    concept: 'Analytic',
    stixType: 'x-mitre-analytic',
    table: 'SDO',
  },
  {
    concept: 'Asset',
    stixType: 'x-mitre-asset',
    table: 'SDO',
  },
  {
    concept: 'Campaign',
    stixType: 'campaign',
    stixDoc:
      'https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714304',
    stixDoc21: 'https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_pcpvfz4ik6d6',
    table: 'SDO',
  },
  {
    concept: 'Collection',
    stixType: 'x-mitre-collection',
    table: 'SDO',
    notes:
      'This type was added in the upgrade to STIX 2.1 and is not available in the [STIX 2.0 dataset](https://github.com/mitre/cti).',
  },
  {
    concept: 'Data Component',
    stixType: 'x-mitre-data-component',
    table: 'SDO',
  },
  {
    concept: 'Data Source',
    stixType: 'x-mitre-data-source',
    table: 'SDO',
  },
  {
    concept: 'Detection Strategy',
    stixType: 'x-mitre-detection-strategy',
    table: 'SDO',
  },
  {
    concept: 'Group',
    stixType: 'intrusion-set',
    stixDoc:
      'https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714316',
    stixDoc21: 'https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_5ol9xlbbnrdn',
    table: 'SDO',
  },
  {
    concept: 'Identity',
    stixType: 'identity',
    stixDoc:
      'https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714310',
    stixDoc21: 'https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_wh296fiwpklp',
    table: 'SDO',
    notes:
      'Referenced by `created_by_ref` and `x_mitre_modified_by_ref` to convey the creator and most recent modifier of each object',
  },
  {
    concept: 'Matrix',
    stixType: 'x-mitre-matrix',
    table: 'SDO',
  },
  {
    concept: 'Mitigation',
    stixType: 'course-of-action',
    stixDoc:
      'https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714307',
    stixDoc21: 'https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_a925mpw39txn',
    table: 'SDO',
  },
  {
    concept: 'Software',
    stixType: 'malware or tool',
    stixDoc:
      '[malware](https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714319) or [tool](https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714331)',
    stixDoc21:
      '[malware](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_s5l7katgbp09) or [tool](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_z4voa9ndw8v)',
    table: 'SDO',
  },
  {
    concept: 'Tactic',
    stixType: 'x-mitre-tactic',
    table: 'SDO',
  },
  {
    concept: 'Technique',
    stixType: 'attack-pattern',
    stixDoc:
      'https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714301',
    stixDoc21: 'https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_axjijf603msy',
    table: 'SDO',
  },

  // STIX Relationship Objects
  {
    concept: 'Relationship',
    stixType: 'relationship',
    stixDoc:
      'https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714337',
    stixDoc21: 'https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_cqhkqvhnlgfh',
    table: 'SRO',
    notes: 'ATT&CK uses many relationship types. Refer to them [here](./relationship-types).',
  },

  // STIX Meta Objects
  {
    concept: 'Marking Definition',
    stixType: 'marking-definition',
    stixDoc:
      'https://docs.oasis-open.org/cti/stix/v2.0/cs01/part1-stix-core/stix-v2.0-cs01-part1-stix-core.html#_Toc496709283',
    stixDoc21: 'https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_k5fndj2c7c1k',
    table: 'SMO',
    notes:
      'Referenced in the `object_marking_refs` of all objects to express the MITRE Corporation copyright',
  },
];

// ---- UTILS ----
function conceptCell(meta: ConceptMeta): string {
  // if (meta.concept === 'Software') {
  //   return 'Software ([Malware](./sdo/malware.schema.mdx) or [Tool](./sdo/tool.schema.mdx))';
  // }
  return `[${meta.concept}](${getSchemaLink(meta.concept)})`;
}

function conceptToSchemaFile(concept: string): string {
  // Convert concept to lowercase, hyphens, and append .schema.ts
  return concept.toLowerCase().replace(/ /g, '-') + '.schema.ts';
}

function getSchemaLink(concept: string): string {
  if (concept === 'STIX Bundle') return './stix-bundle.schema';
  const file = conceptToSchemaFile(concept);
  // Find the file in SCHEMA_DIR (recursively)
  const matches = globbySync([`**/${file}`], { cwd: SCHEMA_DIR });
  if (matches.length === 0) return '#'; // fallback
  return './' + matches[0].replace(/\.ts$/, '.mdx');
}

function stixObjectCell(meta: ConceptMeta): string {
  if (meta.concept === 'Software') {
    // Software is special: two objects, two links for each version
    return (
      '`malware` ' +
      '([STIX 2.0](https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714319), ' +
      '[STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_s5l7katgbp09)) or ' +
      '`tool` ' +
      '([STIX 2.0](https://docs.oasis-open.org/cti/stix/v2.0/cs01/part2-stix-objects/stix-v2.0-cs01-part2-stix-objects.html#_Toc496714331), ' +
      '[STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_z4voa9ndw8v))'
    );
  }
  if (meta.stixDoc && meta.stixDoc21) {
    return `\`${meta.stixType}\` ([STIX 2.0](${meta.stixDoc}), [STIX 2.1](${meta.stixDoc21}))`;
  }
  return `\`${meta.stixType}\``;
}

function groupConceptsByTable(): Record<TableType, ConceptMeta[]> {
  const grouped: Record<TableType, ConceptMeta[]> = { SDO: [], SRO: [], SMO: [] };
  for (const meta of conceptMetas) {
    grouped[meta.table].push(meta);
  }
  return grouped;
}

function generateConceptTableMarkdown(specVersion: string): string {
  let out = '';
  out += '## Schema Reference\n\n';
  out += `Current ATT&CK Spec Version: [${specVersion}](https://github.com/mitre-attack/attack-stix-data/blob/master/CHANGELOG.md)\n\n`;

  const grouped = groupConceptsByTable();

  for (const type of ['SDO', 'SRO', 'SMO'] as TableType[]) {
    out += `### ${tableTypeHeaders[type]}\n\n`;
    out += '| ATT&CK Concept | STIX Object | Notes |\n';
    out += '|:-------------- |:----------- |:------|\n';

    const sorted = grouped[type].sort((a, b) => a.concept.localeCompare(b.concept));
    for (const meta of sorted) {
      out += `| ${conceptCell(meta)} | ${stixObjectCell(meta)} | ${meta.notes ?? ''} |\n`;
    }
    out += '\n';
  }

  return out;
}

async function writeSoftwareSchema(): Promise<void> {
  const sdoIndex = await import(path.join(SCHEMA_DIR, 'sdo/index.ts'));
  const { malwareSchema, toolSchema } = sdoIndex;

  const models = convertSchemas([
    { schema: malwareSchema, path: 'sdo/malware.schema.ts', name: 'Malware' },
    { schema: toolSchema, path: 'sdo/tool.schema.ts', name: 'Tool' },
  ]);
  const softwareMarkdown = formatModelsAsMarkdown(models, {
    title: 'Software Schema',
  });

  const softwareOutputFile = path.join(OUTPUT_DIR, 'sdo', 'software.schema.mdx');
  await fs.ensureDir(path.dirname(softwareOutputFile));
  await fs.writeFile(softwareOutputFile, softwareMarkdown, 'utf8');
  console.log(`Wrote ${softwareOutputFile}`);
}

async function generateSchemaFiles(): Promise<void> {
  const schemaFiles = globbySync(['**/*.schema.ts'], { cwd: SCHEMA_DIR });

  for (const relativePath of schemaFiles) {
    if (
      relativePath.endsWith('software.schema.ts') ||
      relativePath.endsWith('stix-bundle.schema.ts') ||
      relativePath.endsWith('malware.schema.ts') ||
      relativePath.endsWith('tool.schema.ts')
    ) {
      continue;
    }

    const outputFile = path.join(OUTPUT_DIR, relativePath.replace(/\.ts$/, '.mdx'));
    await fs.ensureDir(path.dirname(outputFile));

    const fileName = path.basename(relativePath);
    let title = fileName.replace(/-/g, ' ').replace(/\.schema\.ts$/, '');
    title = title.replace(/\b\w/g, (c) => c.toUpperCase()) + ' Schema';

    const markdown = await zod2md({
      entry: path.join(SCHEMA_DIR, relativePath),
      title,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    });

    await fs.writeFile(outputFile, markdown, 'utf8');
    console.log(`Wrote ${outputFile}`);
  }
}

async function main() {
  fs.ensureDir(OUTPUT_DIR);
  const specVersion = (await fs.readFile(SPEC_VERSION_FILE, 'utf8')).trim();

  const conceptTable = generateConceptTableMarkdown(specVersion);

  await fs.writeFile(OUTPUT_FILE, conceptTable, 'utf8');
  console.log(`Wrote ${OUTPUT_FILE}`);

  await writeSoftwareSchema();
  await generateSchemaFiles();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
