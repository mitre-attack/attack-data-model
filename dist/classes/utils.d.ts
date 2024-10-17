import type { Relationship } from '../schemas/sro/relationship.schema.js';
import type { AttackObject } from '../schemas/sdo/stix-bundle.schema.js';
import type { Technique } from '../schemas/sdo/index.js';
import { TacticImpl } from './sdo/tactic.impl.js';
import { MitigationImpl } from './sdo/mitigation.impl.js';
import { DataSourceImpl } from './sdo/data-source.impl.js';
import type { XMitrePlatforms } from '../schemas/common/index.js';
export declare function getSubTechniques(technique: Technique, relationships: Relationship[], attackObjects: AttackObject[]): Technique[];
export declare function getTactics(technique: Technique, relationships: Relationship[], attackObjects: AttackObject[]): TacticImpl[];
export declare function getPlatforms(technique: Technique): XMitrePlatforms;
export declare function getMitigations(technique: Technique, relationships: Relationship[], attackObjects: AttackObject[]): MitigationImpl[];
export declare function getDataSources(technique: Technique, relationships: Relationship[], attackObjects: AttackObject[]): DataSourceImpl[];
//# sourceMappingURL=utils.d.ts.map