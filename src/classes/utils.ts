import { Relationship } from '../schemas/sro/relationship.schema';
import { AttackObject } from '../schemas/sdo/stix-bundle.schema';
import { Technique } from '../schemas/sdo/technique.schema';
import { TacticImpl } from './sdo/tactic.impl';
import { MitigationImpl } from './sdo/mitigation.impl';
import { DataSourceImpl } from './sdo/data-source.impl';
import { XMitrePlatforms } from '../schemas/common';

export function getSubTechniques(technique: Technique, relationships: Relationship[], attackObjects: AttackObject[]): Technique[] {
    return relationships
        .filter(rel => rel.relationship_type === 'subtechnique-of' && rel.source_ref === technique.id)
        .map(rel => attackObjects.find(obj => obj.id === rel.target_ref)) as Technique[];
}

export function getTactics(technique: Technique, relationships: Relationship[], attackObjects: AttackObject[]): TacticImpl[] {
    const killChainPhaseIds = technique.kill_chain_phases?.map(phase => phase.phase_name) ?? [];
    return attackObjects
        .filter(obj => obj.type === 'x-mitre-tactic' && killChainPhaseIds.includes(obj.id))
        .map(obj => new TacticImpl(obj as any)); // Casting as TacticImpl
}

export function getPlatforms(technique: Technique): XMitrePlatforms {
    const platformNames = technique.x_mitre_platforms ?? [];
    return platformNames;
}

export function getMitigations(technique: Technique, relationships: Relationship[], attackObjects: AttackObject[]): MitigationImpl[] {
    return relationships
        .filter(rel => rel.relationship_type === 'mitigates' && rel.target_ref === technique.id)
        .map(rel => new MitigationImpl(attackObjects.find(obj => obj.id === rel.source_ref) as any));
}

export function getDataSources(technique: Technique, relationships: Relationship[], attackObjects: AttackObject[]): DataSourceImpl[] {
    return relationships
        .filter(rel => rel.relationship_type === 'detects' && rel.target_ref === technique.id)
        .map(rel => new DataSourceImpl(attackObjects.find(obj => obj.id === rel.source_ref) as any));
}
