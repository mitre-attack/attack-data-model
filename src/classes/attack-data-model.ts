// Import Types
import { Asset } from "../schemas/sdo/asset.schema";
import { Campaign } from "../schemas/sdo/campaign.schema";
import { Collection } from "../schemas/sdo/collection.schema";
import { DataComponent } from "../schemas/sdo/data-component.schema";
import { DataSource } from "../schemas/sdo/data-source.schema";
import { Group } from "../schemas/sdo/group.schema";
import { Identity } from "../schemas/sdo/identity.schema";
import { Malware } from "../schemas/sdo/malware.schema";
import { Matrix } from "../schemas/sdo/matrix.schema";
import { Mitigation } from "../schemas/sdo/mitigation.schema";
import { Tactic } from "../schemas/sdo/tactic.schema";
import { Technique } from "../schemas/sdo/technique.schema";
import { Tool } from "../schemas/sdo/tool.schema";
import { MarkingDefinition } from "../schemas/smo/marking-definition.schema";
import { Relationship } from "../schemas/sro/relationship.schema";
import { AttackObject } from '../schemas/sdo/stix-bundle.schema';

// Import ES6 Classes
import { AnyAttackObject } from "./common/attack-object.impl";
import { AssetImpl } from "./sdo/asset.impl";
import { CampaignImpl } from "./sdo/campaign.impl";
import { CollectionImpl } from "./sdo/collection.impl";
import { DataComponentImpl } from "./sdo/data-component.impl";
import { DataSourceImpl } from "./sdo/data-source.impl";
import { GroupImpl } from "./sdo/group.impl";
import { IdentityImpl } from "./sdo/identity.impl";
import { MalwareImpl } from "./sdo/malware.impl";
import { MatrixImpl } from "./sdo/matrix.impl";
import { MitigationImpl } from "./sdo/mitigation.impl";
import { TacticImpl } from "./sdo/tactic.impl";
import { TechniqueImpl } from "./sdo/technique.impl";
import { ToolImpl } from "./sdo/tool.impl";
import { MarkingDefinitionImpl } from "./smo/marking-definition.impl";
import { RelationshipImpl } from "./sro/relationship.impl";

export class AttackDataModel {

    public techniques: TechniqueImpl[] = [];
    public campaigns: CampaignImpl[] = [];
    public mitigations: MitigationImpl[] = [];
    public identities: IdentityImpl[] = [];
    public groups: GroupImpl[] = [];
    public malware: MalwareImpl[] = [];
    public tools: ToolImpl[] = [];
    public markingDefinitions: MarkingDefinitionImpl[] = [];
    public dataComponents: DataComponentImpl[] = [];
    public dataSources: DataSourceImpl[] = [];
    public tactics: TacticImpl[] = [];
    public assets: AssetImpl[] = [];
    public matrices: MatrixImpl[] = [];
    public collections: CollectionImpl[] = [];
    public relationships: RelationshipImpl[] = [];

    constructor(
        private readonly uuid: string,  // Unique ID for the data source
        private readonly attackObjects: AttackObject[] // Parsed ATT&CK objects (trusted)
    ) {
        this.populateData();
    }

    /**
     * Populates the class properties (e.g., techniques, groups, etc.) from the parsed objects array.
     */
    private populateData(): void {
        const objectMap: Map<string, AnyAttackObject> = new Map(); // Map STIX ID to ES6 class instance

        // Step 1: Initialize core objects
        this.attackObjects.forEach((object) => {
            switch (object.type) {

                // ASSET
                case "x-mitre-asset":
                    const asset = new AssetImpl(object as Asset);
                    this.assets.push(asset);
                    objectMap.set(object.id, asset);
                    break;

                // CAMPAIGN
                case "campaign":
                    const campaign = new CampaignImpl(object as Campaign);
                    this.campaigns.push(campaign);
                    objectMap.set(object.id, campaign);
                    break;

                // COLLECTION
                case "x-mitre-collection":
                    const collection = new CollectionImpl(object as Collection);
                    this.collections.push(collection);
                    objectMap.set(object.id, collection);
                    break;

                // DATA COMPONENT
                case "x-mitre-data-component":
                    const dataComponent = new DataComponentImpl(object as DataComponent);
                    this.dataComponents.push(dataComponent);
                    objectMap.set(object.id, dataComponent);
                    break;

                // DATA SOURCE
                case "x-mitre-data-source":
                    const dataSource = new DataSourceImpl(object as DataSource);
                    this.dataSources.push(dataSource);
                    objectMap.set(object.id, dataSource);
                    break;

                // GROUP
                case "intrusion-set":
                    const group = new GroupImpl(object as Group);
                    this.groups.push(group);
                    objectMap.set(object.id, group);
                    break;

                // IDENTITY
                case "identity":
                    const identity = new IdentityImpl(object as Identity);
                    this.identities.push(identity);
                    objectMap.set(object.id, identity);
                    break;

                // MALWARE
                case "malware":
                    const malware = new MalwareImpl(object as Malware);
                    this.malware.push(malware);
                    objectMap.set(object.id, malware);
                    break;

                // MATRIX
                case "x-mitre-matrix":
                    const matrix = new MatrixImpl(object as Matrix);
                    this.matrices.push(matrix);
                    objectMap.set(object.id, matrix);
                    break;

                // MITIGATION
                case "course-of-action":
                    const mitigation = new MitigationImpl(object as Mitigation);
                    this.mitigations.push(mitigation);
                    objectMap.set(object.id, mitigation);
                    break;

                // TACTIC
                case "x-mitre-tactic":
                    const tactic = new TacticImpl(object as Tactic);
                    this.tactics.push(tactic);
                    objectMap.set(object.id, tactic);
                    break;

                // TECHNIQUE
                case "attack-pattern":
                    const technique = new TechniqueImpl(object as Technique);
                    this.techniques.push(technique);
                    objectMap.set(object.id, technique);
                    break;

                // TOOL
                case "tool":
                    const tool = new ToolImpl(object as Tool);
                    this.tools.push(tool);
                    objectMap.set(object.id, tool);
                    break;

                // MARKING DEFINITION
                case "marking-definition":
                    const markingDefinition = new MarkingDefinitionImpl(object as MarkingDefinition);
                    this.markingDefinitions.push(markingDefinition);
                    objectMap.set(object.id, markingDefinition);
                    break;

                // RELATIONSHIP
                case "relationship":
                    const relationship = new RelationshipImpl(object as Relationship)
                    this.relationships.push(relationship);
                    objectMap.set(object.id, relationship);
                    break;
            }
        });

        // Step 2: Initialize relationships
        this.initializeRelationships(objectMap);
    }

    /**
     * Initializes relationships between objects, such as sub-techniques, tactics, mitigations, and more.
     */
    private initializeRelationships(objectMap: Map<string, AnyAttackObject>): void {

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
                        } else if (sourceObj instanceof CampaignImpl && targetObj instanceof TechniqueImpl) {
                            sourceObj.addTechnique(targetObj);
                        } else if (sourceObj instanceof MalwareImpl && targetObj instanceof TechniqueImpl) {
                            sourceObj.addTechnique(targetObj);
                        } else if (sourceObj instanceof ToolImpl && targetObj instanceof TechniqueImpl) {
                            sourceObj.addTechnique(targetObj);
                        } else if (sourceObj instanceof GroupImpl && (targetObj instanceof MalwareImpl || targetObj instanceof ToolImpl)) {
                            sourceObj.addSoftware(targetObj);
                        } else if (sourceObj instanceof CampaignImpl && (targetObj instanceof MalwareImpl || targetObj instanceof ToolImpl)) {
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


    // Other methods to query objects, get by ID, etc. (unchanged from previous version)
}