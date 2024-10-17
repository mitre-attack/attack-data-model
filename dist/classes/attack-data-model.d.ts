import type { AttackObject } from '../schemas/sdo/stix-bundle.schema.js';
import { AssetImpl } from './sdo/asset.impl.js';
import { CampaignImpl } from './sdo/campaign.impl.js';
import { CollectionImpl } from './sdo/collection.impl.js';
import { DataComponentImpl } from './sdo/data-component.impl.js';
import { DataSourceImpl } from './sdo/data-source.impl.js';
import { GroupImpl } from './sdo/group.impl.js';
import { IdentityImpl } from './sdo/identity.impl.js';
import { MalwareImpl } from './sdo/malware.impl.js';
import { MatrixImpl } from './sdo/matrix.impl.js';
import { MitigationImpl } from './sdo/mitigation.impl.js';
import { TacticImpl } from './sdo/tactic.impl.js';
import { TechniqueImpl } from './sdo/technique.impl.js';
import { ToolImpl } from './sdo/tool.impl.js';
import { MarkingDefinitionImpl } from './smo/marking-definition.impl.js';
import { RelationshipImpl } from './sro/relationship.impl.js';
export declare class AttackDataModel {
    private readonly uuid;
    private readonly attackObjects;
    techniques: TechniqueImpl[];
    campaigns: CampaignImpl[];
    mitigations: MitigationImpl[];
    identities: IdentityImpl[];
    groups: GroupImpl[];
    malware: MalwareImpl[];
    tools: ToolImpl[];
    markingDefinitions: MarkingDefinitionImpl[];
    dataComponents: DataComponentImpl[];
    dataSources: DataSourceImpl[];
    tactics: TacticImpl[];
    assets: AssetImpl[];
    matrices: MatrixImpl[];
    collections: CollectionImpl[];
    relationships: RelationshipImpl[];
    constructor(uuid: string, // Unique ID for the data source
    attackObjects: AttackObject[]);
    /**
     * Returns the unique identifier for this data source/model.
     * @returns string - Returns the unique identifier for this data source/model
     */
    getUuid(): string;
    /**
     * Returns a list of ATT&CK objects that have been parsed by Zod schemas. These objects are not TS classes, but are plain JS objects. They do not contain relationship mappings.
     * @returns AttackObject[] - a list of ATT&CK objects that have been parsed by Zod schemas. These objects are not TS classes, but are plain JS objects. They do not contain relationship mappings.
     */
    getAttackObjects(): AttackObject[];
    /**
     * Populates the class properties (e.g., techniques, groups, etc.) from the parsed objects array.
     */
    private populateData;
    /**
     * Initializes relationships between objects, such as sub-techniques, tactics, mitigations, and more.
     */
    private initializeRelationships;
}
export type AnyAttackObject = MalwareImpl | AssetImpl | CampaignImpl | CollectionImpl | DataComponentImpl | DataSourceImpl | IdentityImpl | MatrixImpl | ToolImpl | TacticImpl | TechniqueImpl | GroupImpl | MitigationImpl | RelationshipImpl | MarkingDefinitionImpl;
//# sourceMappingURL=attack-data-model.d.ts.map