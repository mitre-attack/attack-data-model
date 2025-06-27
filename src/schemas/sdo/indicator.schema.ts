import { z } from 'zod/v4';
import { stixTimestampSchema } from '../common/stix-timestamp.js';
import { killChainPhaseSchema } from '../common/common-properties.js';
import { attackBaseDomainObjectSchema } from '../common/attack-base-object.js';
import { PatternTypeOV, IndicatorTypeOV } from '../common/open-vocabulary.js';
import { createStixIdValidator } from '../common/stix-identifier.js';
import { createStixTypeValidator } from '../common/stix-type.js';

/////////////////////////////////////
//
// Indicator Schema
//
/////////////////////////////////////

export const indicatorSchema = attackBaseDomainObjectSchema
  .extend({
    id: createStixIdValidator('indicator'),

    type: createStixTypeValidator('indicator'),

    name: z.string().optional().meta({
      description:
        'A name used to identify the Indicator. Producers SHOULD provide this property to help products and analysts understand what this Indicator actually does.',
    }),

    description: z.string().optional().meta({
      description:
        'A description that provides more details and context about the Indicator, potentially including its purpose and its key characteristics. Producers SHOULD provide this property to help products and analysts understand what this Indicator actually does.',
    }),

    indicator_types: IndicatorTypeOV.optional().meta({
      description:
        'A set of categorizations for this indicator. The values for this property SHOULD come from the indicator-type-ov open vocabulary.',
    }),

    // TODO implement 'STIX Language Patterns' to constrain this field
    pattern: z.string().meta({
      description:
        'The detection pattern for this Indicator MAY be expressed as a STIX Pattern as specified in section 9 or another appropriate language such as SNORT, YARA, etc.',
    }),

    pattern_type: PatternTypeOV,

    pattern_version: z.string().optional().meta({
      description:
        "The version of the pattern language that is used for the data in the pattern property which MUST match the type of pattern data included in the pattern property.\n\nFor patterns that do not have a formal specification, the build or code version that the pattern is known to work with SHOULD be used.\n\nFor the STIX Pattern language, the default value is determined by the specification version of the object.\n\nFor other languages, the default value SHOULD be the latest version of the patterning language at the time of this object's creation.",
    }),

    // Required in STIX but optional in ATT&CK
    valid_from: stixTimestampSchema
      .meta({
        description:
          'The time from which this Indicator is considered a valid indicator of the behaviors it is related or represents.',
      })
      .optional(),

    valid_until: stixTimestampSchema
      .meta({
        description:
          'The time at which this Indicator should no longer be considered a valid indicator of the behaviors it is related to or represents.\n\nIf the valid_until property is omitted, then there is no constraint on the latest time for which the Indicator is valid.\n\nThis MUST be greater than the timestamp in the valid_from property.',
      })
      .optional(),

    kill_chain_phases: z
      .array(killChainPhaseSchema)
      .optional()
      .meta({ description: 'The kill chain phase(s) to which this Indicator corresponds.' }),
  })
  .meta({
    description:
      'Indicators contain a pattern that can be used to detect suspicious or malicious cyber activity. For example, an Indicator may be used to represent a set of malicious domains and use the STIX Patterning Language (see section 9) to specify these domains.\n\nThe Indicator SDO contains a simple textual description, the Kill Chain Phases that it detects behavior in, a time window for when the Indicator is valid or useful, and a required pattern property to capture a structured detection pattern. Conforming STIX implementations MUST support the STIX Patterning Language as defined in section 9.\n\nRelationships from the Indicator can describe the malicious or suspicious behavior that it directly detects (Malware, Tool, and Attack Pattern). In addition, it may also imply the presence of a Campaigns, Intrusion Sets, and Threat Actors, etc.',
  })
  .strict();
//.check(ctx => {
// TODO for valid_until: If the valid_until property is omitted, then there is no constraint on the latest time for which the Indicator is valid.
// TODO for valid_until: This MUST be greater than the timestamp in the valid_from property.
// TODO for pattern_type: The value of this property MUST match the type of pattern data included in the pattern property.
// TODO for pattern_version: The version of the pattern language that is used for the data in the pattern property which MUST match the type of pattern data included in the pattern property.
//});

export type Indicator = z.infer<typeof indicatorSchema>;
