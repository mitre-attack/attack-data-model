export { analyticSchema, extensibleAnalyticSchema, type Analytic } from './analytic.schema.js';

export {
  assetSchema,
  extensibleAssetSchema,
  relatedAssetSchema,
  relatedAssetsSchema,
  xMitreSectorsSchema,
  type Asset,
  type RelatedAsset,
  type RelatedAssets,
  type XMitreSectors,
} from './asset.schema.js';

export {
  campaignSchema,
  extensibleCampaignSchema,
  xMitreFirstSeenCitationSchema,
  xMitreLastSeenCitationSchema,
  type Campaign,
  type XMitreFirstSeenCitation,
  type XMitreLastSeenCitation,
} from './campaign.schema.js';

export {
  collectionSchema,
  extensibleCollectionSchema,
  objectVersionReferenceSchema,
  type Collection,
  type ObjectVersionReference,
} from './collection.schema.js';

export {
  dataComponentSchema,
  extensibleDataComponentSchema,
  xMitreDataSourceRefSchema,
  xMitreLogSourcesSchema,
  type DataComponent,
  type XMitreDataSourceRef,
  type XMitreLogSources,
} from './data-component.schema.js';

export {
  detectionStrategySchema,
  extensibleDetectionStrategySchema,
  type DetectionStrategy,
} from './detection-strategy.schema.js';

export { extensibleGroupSchema, groupSchema, type Group } from './group.schema.js';

export { extensibleIdentitySchema, identitySchema, type Identity } from './identity.schema.js';

export {
  dataSourceSchema,
  extensibleDataSourceSchema,
  xMitreCollectionLayersSchema,
  type DataSource,
  type XMitreCollectionLayers,
} from './data-source.schema.js';

export { extensibleMalwareSchema, malwareSchema, type Malware } from './malware.schema.js';

export {
  extensibleMatrixSchema,
  matrixSchema,
  xMitreTacticRefsSchema,
  type Matrix,
  type XMitreTacticRefs,
} from './matrix.schema.js';

export {
  extensibleMitigationSchema,
  mitigationSchema,
  type Mitigation,
} from './mitigation.schema.js';

export { extensibleSoftwareSchema, softwareSchema, type Software } from './software.schema.js';

export {
  extensibleTacticSchema,
  tacticSchema,
  xMitreShortNameSchema,
  type Tactic,
  type XMitreShortName,
} from './tactic.schema.js';

export {
  extensibleTechniqueSchema,
  techniqueSchema,
  xMitreDataSourceSchema,
  xMitreDataSourcesSchema,
  xMitreDefenseBypassesSchema,
  xMitreDetectionSchema,
  xMitreEffectivePermissionsSchema,
  xMitreImpactTypeSchema,
  xMitreIsSubtechniqueSchema,
  xMitreNetworkRequirementsSchema,
  xMitrePermissionsRequiredSchema,
  xMitreRemoteSupportSchema,
  xMitreSystemRequirementsSchema,
  xMitreTacticTypeSchema,
  type Technique,
  type XMitreDataSource,
  type XMitreDataSources,
  type XMitreDefenseBypasses,
  type XMitreDetection,
  type XMitreEffectivePermissions,
  type XMitreImpactType,
  type XMitreIsSubtechnique,
  type XMitreNetworkRequirements,
  type XMitrePermissionsRequired,
  type XMitreRemoteSupport,
  type XMitreSystemRequirements,
  type XMitreTacticType,
} from './technique.schema.js';

export { extensibleToolSchema, toolSchema, type Tool } from './tool.schema.js';

export {
  attackObjectsSchema,
  extensibleStixBundleSchema,
  stixBundleSchema,
  type AttackObject,
  type AttackObjects,
  type StixBundle,
} from './stix-bundle.schema.js';
