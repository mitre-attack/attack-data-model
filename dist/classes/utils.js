import { TacticImpl } from './sdo/tactic.impl.js';
import { MitigationImpl } from './sdo/mitigation.impl.js';
import { DataSourceImpl } from './sdo/data-source.impl.js';
export function getSubTechniques(technique, relationships, attackObjects) {
    return relationships
        .filter((rel) => rel.relationship_type === 'subtechnique-of' && rel.source_ref === technique.id)
        .map((rel) => {
        const subTech = attackObjects.find((obj) => obj.id === rel.target_ref);
        return subTech;
    })
        .filter((subTech) => subTech !== undefined);
}
export function getTactics(technique, relationships, attackObjects) {
    const killChainPhaseIds = technique.kill_chain_phases?.map((phase) => phase.phase_name) ?? [];
    return attackObjects
        .filter((obj) => obj.type === 'x-mitre-tactic' && killChainPhaseIds.includes(obj.id))
        .map((obj) => new TacticImpl(obj));
}
export function getPlatforms(technique) {
    return technique.x_mitre_platforms ?? [];
}
export function getMitigations(technique, relationships, attackObjects) {
    return relationships
        .filter((rel) => rel.relationship_type === 'mitigates' && rel.target_ref === technique.id)
        .map((rel) => {
        const mitigation = attackObjects.find((obj) => obj.id === rel.source_ref);
        if (mitigation && mitigation.type === 'course-of-action') {
            return new MitigationImpl(mitigation);
        }
        return null;
    })
        .filter((mitigation) => mitigation !== null);
}
export function getDataSources(technique, relationships, attackObjects) {
    return relationships
        .filter((rel) => rel.relationship_type === 'detects' && rel.target_ref === technique.id)
        .map((rel) => {
        const dataSource = attackObjects.find((obj) => obj.id === rel.source_ref);
        if (dataSource && dataSource.type === 'x-mitre-data-source') {
            return new DataSourceImpl(dataSource);
        }
        return null;
    })
        .filter((dataSource) => dataSource !== null);
}
//# sourceMappingURL=utils.js.map