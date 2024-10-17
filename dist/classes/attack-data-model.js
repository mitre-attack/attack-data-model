// Import ES6 Classes
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
export class AttackDataModel {
    constructor(uuid, // Unique ID for the data source
    attackObjects) {
        this.uuid = uuid;
        this.attackObjects = attackObjects;
        this.techniques = [];
        this.campaigns = [];
        this.mitigations = [];
        this.identities = [];
        this.groups = [];
        this.malware = [];
        this.tools = [];
        this.markingDefinitions = [];
        this.dataComponents = [];
        this.dataSources = [];
        this.tactics = [];
        this.assets = [];
        this.matrices = [];
        this.collections = [];
        this.relationships = [];
        this.populateData();
    }
    /**
     * Returns the unique identifier for this data source/model.
     * @returns string - Returns the unique identifier for this data source/model
     */
    getUuid() {
        return this.uuid;
    }
    /**
     * Returns a list of ATT&CK objects that have been parsed by Zod schemas. These objects are not TS classes, but are plain JS objects. They do not contain relationship mappings.
     * @returns AttackObject[] - a list of ATT&CK objects that have been parsed by Zod schemas. These objects are not TS classes, but are plain JS objects. They do not contain relationship mappings.
     */
    getAttackObjects() {
        return this.attackObjects;
    }
    /**
     * Populates the class properties (e.g., techniques, groups, etc.) from the parsed objects array.
     */
    populateData() {
        const objectMap = new Map(); // Map STIX ID to ES6 class instance
        // Step 1: Initialize core objects
        this.attackObjects.forEach((object) => {
            switch (object.type) {
                // ASSET
                case 'x-mitre-asset': {
                    const asset = new AssetImpl(object);
                    this.assets.push(asset);
                    objectMap.set(object.id, asset);
                    break;
                }
                // CAMPAIGN
                case 'campaign': {
                    const campaign = new CampaignImpl(object);
                    this.campaigns.push(campaign);
                    objectMap.set(object.id, campaign);
                    break;
                }
                // COLLECTION
                case 'x-mitre-collection': {
                    const collection = new CollectionImpl(object);
                    this.collections.push(collection);
                    objectMap.set(object.id, collection);
                    break;
                }
                // DATA COMPONENT
                case 'x-mitre-data-component': {
                    const dataComponent = new DataComponentImpl(object);
                    this.dataComponents.push(dataComponent);
                    objectMap.set(object.id, dataComponent);
                    break;
                }
                // DATA SOURCE
                case 'x-mitre-data-source': {
                    const dataSource = new DataSourceImpl(object);
                    this.dataSources.push(dataSource);
                    objectMap.set(object.id, dataSource);
                    break;
                }
                // GROUP
                case 'intrusion-set': {
                    const group = new GroupImpl(object);
                    this.groups.push(group);
                    objectMap.set(object.id, group);
                    break;
                }
                // IDENTITY
                case 'identity': {
                    const identity = new IdentityImpl(object);
                    this.identities.push(identity);
                    objectMap.set(object.id, identity);
                    break;
                }
                // MALWARE
                case 'malware': {
                    const malware = new MalwareImpl(object);
                    this.malware.push(malware);
                    objectMap.set(object.id, malware);
                    break;
                }
                // MATRIX
                case 'x-mitre-matrix': {
                    const matrix = new MatrixImpl(object);
                    this.matrices.push(matrix);
                    objectMap.set(object.id, matrix);
                    break;
                }
                // MITIGATION
                case 'course-of-action': {
                    const mitigation = new MitigationImpl(object);
                    this.mitigations.push(mitigation);
                    objectMap.set(object.id, mitigation);
                    break;
                }
                // TACTIC
                case 'x-mitre-tactic': {
                    const tactic = new TacticImpl(object);
                    this.tactics.push(tactic);
                    objectMap.set(object.id, tactic);
                    break;
                }
                // TECHNIQUE
                case 'attack-pattern': {
                    const technique = new TechniqueImpl(object);
                    this.techniques.push(technique);
                    objectMap.set(object.id, technique);
                    break;
                }
                // TOOL
                case 'tool': {
                    const tool = new ToolImpl(object);
                    this.tools.push(tool);
                    objectMap.set(object.id, tool);
                    break;
                }
                // MARKING DEFINITION
                case 'marking-definition': {
                    const markingDefinition = new MarkingDefinitionImpl(object);
                    this.markingDefinitions.push(markingDefinition);
                    objectMap.set(object.id, markingDefinition);
                    break;
                }
                // RELATIONSHIP
                case 'relationship': {
                    const relationship = new RelationshipImpl(object);
                    this.relationships.push(relationship);
                    objectMap.set(object.id, relationship);
                    break;
                }
            }
        });
        // Step 2: Initialize relationships
        this.initializeRelationships(objectMap);
    }
    /**
     * Initializes relationships between objects, such as sub-techniques, tactics, mitigations, and more.
     */
    initializeRelationships(objectMap) {
        this.relationships.forEach((relationship) => {
            const sourceObj = objectMap.get(relationship.source_ref);
            const targetObj = objectMap.get(relationship.target_ref);
            if (sourceObj && targetObj) {
                switch (relationship.relationship_type) {
                    case 'subtechnique-of':
                        if (sourceObj instanceof TechniqueImpl && targetObj instanceof TechniqueImpl) {
                            sourceObj.setParent(targetObj);
                            targetObj.addSubTechnique(sourceObj);
                        }
                        break;
                    case 'uses':
                        if (sourceObj instanceof GroupImpl && targetObj instanceof TechniqueImpl) {
                            sourceObj.addTechnique(targetObj);
                        }
                        else if (sourceObj instanceof CampaignImpl && targetObj instanceof TechniqueImpl) {
                            sourceObj.addTechnique(targetObj);
                        }
                        else if (sourceObj instanceof MalwareImpl && targetObj instanceof TechniqueImpl) {
                            sourceObj.addTechnique(targetObj);
                        }
                        else if (sourceObj instanceof ToolImpl && targetObj instanceof TechniqueImpl) {
                            sourceObj.addTechnique(targetObj);
                        }
                        else if (sourceObj instanceof GroupImpl &&
                            (targetObj instanceof MalwareImpl || targetObj instanceof ToolImpl)) {
                            sourceObj.addSoftware(targetObj);
                        }
                        else if (sourceObj instanceof CampaignImpl &&
                            (targetObj instanceof MalwareImpl || targetObj instanceof ToolImpl)) {
                            sourceObj.addSoftware(targetObj);
                        }
                        break;
                    case 'mitigates':
                        if (sourceObj instanceof MitigationImpl && targetObj instanceof TechniqueImpl) {
                            targetObj.addMitigation(sourceObj);
                        }
                        break;
                    case 'detects':
                        if (sourceObj instanceof DataComponentImpl && targetObj instanceof TechniqueImpl) {
                            sourceObj.addDetectedTechnique(targetObj);
                            targetObj.addDetectingDataComponent(sourceObj);
                        }
                        break;
                    case 'targets':
                        if (sourceObj instanceof TechniqueImpl && targetObj instanceof AssetImpl) {
                            sourceObj.addTargetAsset(targetObj);
                        }
                        break;
                    case 'attributed-to':
                        if (sourceObj instanceof CampaignImpl && targetObj instanceof GroupImpl) {
                            sourceObj.setAttributedTo(targetObj);
                            targetObj.addAttributedCampaign(sourceObj);
                        }
                        break;
                    case 'revoked-by':
                        if (sourceObj.constructor.name === targetObj.constructor.name) {
                            sourceObj.setRevokedBy(targetObj);
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    }
}
//# sourceMappingURL=attack-data-model.js.map