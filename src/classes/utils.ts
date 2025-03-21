import type { Relationship } from '../schemas/sro/relationship.schema.js';
import type { AttackObject } from '../schemas/sdo/stix-bundle.schema.js';
import type { Technique, Tactic } from '../schemas/sdo/index.js';
import { TacticImpl } from './sdo/tactic.impl.js';
import { MitigationImpl } from './sdo/mitigation.impl.js';
import { LogSourceImpl } from './sdo/log-source.impl.js';
import type { XMitrePlatforms } from '../schemas/common/index.js';

export function getSubTechniques(
  technique: Technique,
  relationships: Relationship[],
  attackObjects: AttackObject[],
): Technique[] {
  return relationships
    .filter((rel) => rel.relationship_type === 'subtechnique-of' && rel.source_ref === technique.id)
    .map((rel) => {
      const subTech = attackObjects.find((obj) => obj.id === rel.target_ref);
      return subTech as Technique;
    })
    .filter((subTech): subTech is Technique => subTech !== undefined);
}

export function getTactics(
  technique: Technique,
  relationships: Relationship[],
  attackObjects: AttackObject[],
): TacticImpl[] {
  const killChainPhaseIds = technique.kill_chain_phases?.map((phase) => phase.phase_name) ?? [];
  return attackObjects
    .filter((obj) => obj.type === 'x-mitre-tactic' && killChainPhaseIds.includes(obj.id))
    .map((obj) => new TacticImpl(obj as Tactic));
}

export function getPlatforms(technique: Technique): XMitrePlatforms {
  return technique.x_mitre_platforms ?? [];
}

export function getMitigations(
  technique: Technique,
  relationships: Relationship[],
  attackObjects: AttackObject[],
): MitigationImpl[] {
  return relationships
    .filter((rel) => rel.relationship_type === 'mitigates' && rel.target_ref === technique.id)
    .map((rel) => {
      const mitigation = attackObjects.find((obj) => obj.id === rel.source_ref);
      if (mitigation && mitigation.type === 'course-of-action') {
        return new MitigationImpl(mitigation);
      }
      return null;
    })
    .filter((mitigation): mitigation is MitigationImpl => mitigation !== null);
}

export function getDataSources(
  technique: Technique,
  relationships: Relationship[],
  attackObjects: AttackObject[],
): LogSourceImpl[] {
  return relationships
    .filter((rel) => rel.relationship_type === 'detects' && rel.target_ref === technique.id)
    .map((rel) => {
      const dataSource = attackObjects.find((obj) => obj.id === rel.source_ref);
      if (dataSource && dataSource.type === 'x-mitre-log-source') {
        return new LogSourceImpl(dataSource);
      }
      return null;
    })
    .filter((dataSource): dataSource is LogSourceImpl => dataSource !== null);
}
