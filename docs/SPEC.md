> [!IMPORTANT]
> **Documentation Notice**
>
> This document is **not the source of truth** for the ATT&CK specification. The authoritative source is the **ATT&CK Data Model (ADM) TypeScript library**.
>
> 📖 **Browse ATT&CK schemas:** <https://mitre-attack.github.io/attack-data-model/>
>
> While maintained to the best of our ability, this documentation may drift from the ADM library. If you find discrepancies, please [open a GitHub Issue](https://github.com/mitre-attack/attack-data-model/issues).

# The ATT&CK Specification

The ATT&CK specification is built atop the [STIX 2.1 specification](https://oasis-open.github.io/cti-documentation/resources#stix-21-specification). It is a codified expression of the concepts outlined in the [MITRE ATT&CK Philosophy Paper](https://attack.mitre.org/docs/ATTACK_Design_and_Philosophy_March_2020.pdf), expressed in the ATT&CK Data Model (ADM).

ATT&CK uses a mix of predefined and custom STIX objects to implement ATT&CK concepts. The following table is a mapping of ATT&CK concepts to STIX 2.1 objects:

| ATT&CK concept                                                                                                                            | STIX object type                                                                                                                                                                                                                                                              | Custom type? |
| :---------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| [Matrix](#matrices)                                                                                                                       | `x-mitre-matrix`                                                                                                                                                                                                                                                              | yes          |
| [Tactic](#tactics)                                                                                                                        | `x-mitre-tactic`                                                                                                                                                                                                                                                              | yes          |
| [Technique](#techniques)                                                                                                                  | [attack-pattern](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230921)                                                                                                                                 | no           |
| [Sub-technique](#sub-techniques)                                                                                                          | [attack-pattern](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230921) where `x_mitre_is_subtechnique = true`                                                                                          | no           |
| [Procedure](#procedures)                                                                                                                  | [relationship](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230970) where `relationship_type = "uses"` and `target_ref` is an `attack-pattern`                                                       | no           |
| [Mitigation](#mitigations)                                                                                                                | [course-of-action](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230929)                                                                                                                              | no           |
| [Group](#groups)                                                                                                                          | [intrusion-set](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230941)                                                                                                                                 | no           |
| [Software](#software)                                                                                                                     | [malware](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230945) or [tool](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230961) | no           |
| [Collection](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend/blob/master/docs/collections.md)<sup>1</sup> | `x-mitre-collection`                                                                                                                                                                                                                                                          | yes          |
| [Data Source](#data-sources) <sup>2</sup>                                                                                                 | `x-mitre-data-source`                                                                                                                                                                                                                                                         | yes          |
| [Data Component](#data-components)                                                                                                        | `x-mitre-data-component`                                                                                                                                                                                                                                                      | yes          |
| [Campaign](#campaigns)                                                                                                                    | [campaign](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230925)                                                                                                                                       | no           |
| [Asset](#assets)                                                                                                                          | `x-mitre-asset`                                                                                                                                                                                                                                                               | yes          |
| [Detection Strategy](#detection-strategies) <sup>3</sup>                                                                                  | `x-mitre-detection-strategy`                                                                                                                                                                                                                                                  | yes          |
| [Analytic](#analytics) <sup>3</sup>                                                                                                       | `x-mitre-analytic`                                                                                                                                                                                                                                                            | yes          |
| [Log Source](#log-sources) <sup>3</sup>                                                                                                   | `x-mitre-log-source`                                                                                                                                                                                                                                                          | yes          |

<sup>1</sup> This type was added in the upgrade to STIX 2.1 and is not available in [the STIX 2.0 dataset](https://github.com/mitre/cti).

<sup>2</sup> **Deprecated as of ATT&CK Specification 3.3.0.** Data Sources are superseded by the Detection Strategy framework but remain supported for backward compatibility. They will be removed in ATT&CK Specification 4.0.0.

<sup>3</sup> These types were added in ATT&CK Specification 3.3.0 as part of the Detection Strategy framework.

The following STIX 2.1 objects also appear in the ATT&CK catalog:

| STIX object type                                                                                                                             | About                                                                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| [identity](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230933)     | Referenced by `created_by_ref` and `x_mitre_modified_by_ref` to convey the creator and most recent modifier of each object |
| [marking-definition](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part1-stix-core/stix-v2.0-csprd01-part1-stix-core.html#_Toc476227338) | Referenced in the `object_marking_refs` of all objects to express the MITRE Corporation copyright                          |

## Extensions of the STIX specification

There are three general ways that ATT&CK extends the STIX 2.1 specification:

- **Custom Object Types**: Object types prefixed with `x-mitre-`, e.g `x-mitre-matrix`, are custom STIX types extending the STIX 2.1 specification. They follow the general [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920) but describe concepts not covered by types defined in STIX 2.1.

- **Custom Fields**: Custom MITRE ATT&CK properties may exist on ATT&CK object's (custom or otherwise). Such fields are prefixed with `x_mitre_`, e.g `x_mitre_platforms` in `attack-patterns`. The following extended fields are common across ATT&CK types except where otherwise noted:

| Field                                     | Type     | Description                                                                                                                                                                                                                                                                                                 |
| :---------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x_mitre_version` <sup>1</sup>                         | string   | The version of the object in format `major.minor` where `major` and `minor` are integers. ATT&CK increments this version number when the object content is updated. not found on `relationship` objects.                                                                                                    |
| `x_mitre_contributors`                    | string[] | People and organizations who have contributed to the object.<br>Not found on objects of type `relationship`.                                                                                                                                                                                                           |
| `x_mitre_modified_by_ref`                 | string   | The STIX ID of an `identity` object. Used to track the identity of the individual or organization which created the current _version_ of the object. Previous versions of the object may have been created by other individuals or organizations.                                                           |
| `x_mitre_domains`                         | string[] | Identifies the domains the object is found in. See [domains](#domains) for more information.<br>Not found on objects of type `relationship`, `identity`, or `marking-definition`.                                                                                                                                                                           |
| `x_mitre_attack_spec_version`<sup>1</sup> | string   | The version of the ATT&CK specification used by the object. Consuming software can use this field to determine if the data format is supported. Current version is 3.3.0. |

- New relationship types. Unlike custom object types and extended fields, custom relationship types are **not** prefixed with `x_mitre_`. You can find a full list of relationship types in the [Relationships](#relationships) section, which also mentions whether the type is a default STIX type.

Please see also the STIX documentation on [customizing STIX](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part1-stix-core/stix-v2.0-csprd01-part1-stix-core.html#_Toc476227365).

## Versioning in ATT&CK <sup>1</sup>

ATT&CK uses three distinct version fields that track different aspects of the specification and its objects:

| Field                         | Scope                | Purpose                                                                     | Example                   | Managed By   |
| ----------------------------- | -------------------- | --------------------------------------------------------------------------- | ------------------------- | ------------ |
| `spec_version`                | STIX specification   | Tracks which version of the STIX 2.1 specification the object conforms to   | `"2.1"`                   | STIX/OASIS   |
| `x_mitre_attack_spec_version` | ATT&CK specification | Tracks which version of the ATT&CK specification extensions the object uses | `"3.3.0"`                 | MITRE ATT&CK |
| `x_mitre_version`             | Individual object    | Tracks semantic changes to the specific object content over time            | `"1.0"`, `"1.1"`, `"2.0"` | MITRE ATT&CK |

### Key Distinctions

- **`spec_version`**: Defined by STIX 2.1, ensures STIX parser compatibility
- **`x_mitre_attack_spec_version`**: Defined by ATT&CK, ensures compatibility with ATT&CK's custom extensions and structural changes to the taxonomy
- **`x_mitre_version`**: Defined by ATT&CK, tracks when object content is meaningfully updated (starts at `1.0`, increments with semantic changes)

The ATT&CK specification builds upon and remains compatible with STIX 2.1. Refer to the [Compatibility Matrix](./COMPATIBILITY.md) for mapping between ATT&CK Data Model releases and specification versions.

## Domain Membership

The `x_mitre_domains` (string array) field identifies the "domain" to which the object belongs. The values of `x_mitre_domains` is as follows:

| identifier          | domain         |
| :------------------ | :------------- |
| `enterprise-attack` | Enterprise     |
| `mobile-attack`     | Mobile         |
| `ics-attack`        | ATT&CK for ICS |

Most objects in ATT&CK belong in a single technology domain, but an object _may_ be included in multiple domains.

`x_mitre_domains` is supported on all ATT&CK object types except the following:

- Marking Definition
- Identity
- Relationship

## Identifiers in ATT&CK

ATT&CK objects use multiple identifier systems to support different use cases and ensure compatibility with external frameworks.

### ATT&CK IDs

ATT&CK IDs are human-readable identifiers commonly used for referencing objects in documentation and communication. Each ATT&CK object type follows a specific ID format:

| ATT&CK concept                            | ID format                               |
| :---------------------------------------- | :-------------------------------------- |
| [Matrix](#matrices)                       | [domain identifier](#domain-membership) |
| [Tactic](#tactics)                        | `TAxxxx`                                |
| [Technique](#techniques)                  | `Txxxx`                                 |
| [Sub-Technique](#sub-techniques)          | `Txxxx.yyy`                             |
| [Mitigation](#mitigations)                | `Mxxxx`                                 |
| [Group](#groups)                          | `Gxxxx`                                 |
| [Software](#software)                     | `Sxxxx`                                 |
| [Data Source](#data-sources)              | `DSxxxx`                                |
| [Data Component](#data-components)        | `DCxxxx`                                |
| [Campaign](#campaigns)                    | `Cxxxx`                                 |
| [Asset](#assets)                          | `Axxxx`                                 |
| [Detection Strategy](#detection-strategies) | `DETxxxx`                             |
| [Analytic](#analytics)                    | `ANxxxx`                                |
| [Log Source](#log-sources)                | `LSxxxx`                                |

**Important limitations:**

- ATT&CK IDs are not guaranteed to be unique (see [Collisions with Technique ATT&CK IDs](#collisions-with-technique-attck-ids))
- Matrices within the same domain share identical ATT&CK IDs
- Relationship objects do not have ATT&CK IDs

ATT&CK IDs are stored in the first external reference of applicable objects, which also includes a `url` field linking to the object's page on the [ATT&CK Website](https://attack.mitre.org/).

### STIX IDs

Every ATT&CK object (including relationships) contains a STIX ID in its `id` field. STIX IDs are guaranteed to be globally unique and follow the STIX 2.1 specification format. **STIX IDs are the recommended method for programmatic object retrieval and referencing.**

### External Reference IDs

Objects may include additional identifiers from external frameworks in their `external_references` array:

- **NIST Mobile Threat Catalogue IDs**: Found on some Mobile domain techniques where `source_name` equals `"NIST Mobile Threat Catalogue"`
- **CAPEC IDs**: Found on some Enterprise domain techniques where `source_name` equals `"capec"`

## ATT&CK Object Definitions

### Matrices

ATT&CK matrices define the structural layout and organization of tactics within each domain. Matrix data is stored in `x-mitre-matrix` objects, which are custom STIX types that extend the generic [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).

**Matrix-specific fields:**

| Field         | Type     | Description                                                                                                                                                                                                                          |
| :------------ | :------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tactic_refs` | string[] | Ordered array of STIX IDs referencing `x-mitre-tactic` objects. The sequence in this array determines the display order of tactics within the matrix layout. |

### Tactics

Tactics represent the adversary's tactical goals during an attack and are defined by `x-mitre-tactic` objects. As custom STIX types, they extend the generic [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).

**Tactic-specific fields:**

| Field               | Type   | Description                                                                                                                                                             |
| :------------------ | :----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x_mitre_shortname` | string | Short identifier used to associate techniques with this tactic. This value matches the `kill_chain_phases.phase_name` field in techniques that belong to this tactic. |

### Techniques

Techniques describe specific methods adversaries use to achieve tactical objectives and are represented as [attack-pattern](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230921) objects following the STIX 2.1 specification.

**Technique-specific fields:**

| Field                           | Type     | Applies to                                             | Description                                                                                                                                                                       |
| :------------------------------ | :------- | :----------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x_mitre_detection`             | string   | All techniques                                         | Strategies for identifying if a technique has been used by an adversary.                                                                                                          |
| `x_mitre_platforms`             | string[] | All techniques                                         | List of platforms that apply to the technique.                                                                                                                                    |
| `x_mitre_data_sources`          | string[] | Enterprise and ICS domains                             | Sources of information that may be used to identify the action or result of the action being performed.                                                                           |
| `x_mitre_is_subtechnique`       | boolean  | Enterprise domain                                      | If true, this `attack-pattern` is a sub-technique. See [sub-techniques](#sub-techniques).                                                                                         |
| `x_mitre_system_requirements`   | string[] | Enterprise domain                                      | Additional information on requirements the adversary needs to meet or about the state of the system (software, patch level, etc.) that may be required for the technique to work. |
| `x_mitre_tactic_type`           | string[] | Mobile domain                                          | "Post-Adversary Device Access", "Pre-Adversary Device Access", or "Without Adversary Device Access".                                                                              |
| `x_mitre_permissions_required`  | string[] | Enterprise domain in the _Privilege Escalation_ tactic | The lowest level of permissions the adversary is required to be operating within to perform the technique on a system.                                                            |
| `x_mitre_effective_permissions` | string[] | Enterprise domain in the _Privilege Escalation_ tactic | The level of permissions the adversary will attain by performing the technique.                                                                                                   |
| `x_mitre_defense_bypassed`      | string[] | Enterprise domain in the _Defense Evasion_ tactic      | List of defensive tools, methodologies, or processes the technique can bypass.                                                                                                    |
| `x_mitre_remote_support`        | boolean  | Enterprise domain in the _Execution_ tactic            | If true, the technique can be used to execute something on a remote system.                                                                                                       |
| `x_mitre_impact_type`           | string[] | Enterprise domain in the _Impact_ tactic               | Denotes if the technique can be used for integrity or availability attacks.                                                                                                       |

**Tactic Association:**
Techniques are associated with tactics through their `kill_chain_phases` property. When the `kill_chain_name` matches the domain (`mitre-attack`, `mitre-mobile-attack`, or `mitre-ics-attack`), the `phase_name` corresponds to the `x_mitre_shortname` of the associated `x-mitre-tactic` object.

#### Sub-Techniques

Sub-techniques are specialized implementations of parent techniques, providing more granular detail about adversary methods. They are represented as `attack-pattern` objects with the same structure as techniques but include additional constraints and relationships.

**Sub-technique characteristics:**

- **Identification:** Marked by `x_mitre_is_subtechnique = true`
- **Parent relationship:** Connected via `subtechnique-of` relationship where `source_ref` is the sub-technique and `target_ref` is the parent technique
- **Cardinality:** Each sub-technique has exactly one parent technique; parent techniques may have multiple sub-techniques

**Inheritance rules:**

- **ATT&CK ID format:** Sub-technique IDs follow the pattern `Txxxx.yyy`, where `Txxxx` is the parent technique ID and `yyy` is the unique sub-technique identifier
- **STIX ID uniqueness:** Sub-techniques maintain globally unique STIX IDs despite sharing parent ID prefixes
- **Tactic inheritance:** Sub-techniques inherit all tactics from their parent technique
- **Platform constraints:** Sub-techniques must use a subset of their parent technique's platforms

**Domain availability:** Sub-techniques are available only in the Enterprise and Mobile domains.

### Procedures

Procedures describe specific instances of technique implementation by adversaries. Unlike other ATT&CK concepts, procedures are not represented by dedicated STIX objects. Instead, they are modeled as `uses` relationships where the `target_ref` points to a technique (`attack-pattern`).

**Procedure relationships:**

- **Source objects:** Groups (`intrusion-set`) or software (`malware`/`tool`)
- **Target objects:** Techniques (`attack-pattern`)
- **Content:** Procedure details are captured in the relationship's `description` field

### Mitigations

Mitigations represent defensive measures or controls that can reduce the effectiveness of adversary techniques. They are defined as [course-of-action](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230929) objects and strictly follow the STIX 2.1 specification without additional custom fields.

#### ATT&CK ID Collisions (Legacy)

**Historical context:** In ATT&CK versions prior to v5 (July 2019), mitigations maintained 1:1 relationships with techniques and shared identical ATT&CK IDs. This design was deprecated to support more flexible mitigation-to-technique mappings.

**Current impact:** Legacy 1:1 mitigations may cause ATT&CK ID collisions between mitigations and techniques. These deprecated objects can be filtered out during queries—see [Removing revoked and deprecated objects](#removing-revoked-and-deprecated-objects).

### Groups

Groups represent clusters of adversary activity with shared characteristics, tools, tactics, or infrastructure. They are defined as [intrusion-set](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230941) objects and strictly follow the STIX 2.1 specification without additional custom fields.

### Software

Software represents tools and malicious code used by adversaries to accomplish their objectives. ATT&CK models software using two STIX object types: [malware](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230945) and [tool](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230961).

**Software-specific fields (applies to both `malware` and `tool`):**

| Field               | Type     | Description                                   |
| :------------------ | :------- | --------------------------------------------- |
| `x_mitre_platforms` | string[] | List of platforms that apply to the software. |
| `x_mitre_aliases`   | string[] | List of aliases for the given software        |

### Data Sources and Data Components

> [!WARNING]
> **Deprecation Notice**: Data Sources (`x-mitre-data-source`) are deprecated as of ATT&CK Specification 3.3.0 and superseded by the Detection Strategy framework. They remain supported for backward compatibility but will be removed in ATT&CK Specification 4.0.0. Data Components remain supported and are integrated into the new Detection Strategy framework through Log Sources.

Data sources and data components define the telemetry and observational data that security teams can use to detect adversary techniques. This hierarchical model provides granular mapping between detection capabilities and techniques.

**Structural relationships:**

- Data components are nested within data sources but maintain separate STIX objects
- Each data component has exactly one parent data source
- Data sources can contain multiple data components
- Data components can map to multiple techniques via `detects` relationships (deprecated as of 3.3.0)
- Data components can map to log sources via `found-in` relationships (new in 3.3.0)

**Architecture overview:**

```
           "detects"       x_mitre_data_source_ref
          relationship      embedded relationship
          (deprecated)            │
               │                  │
┌───────────┐  ▼  ┌────────────────┐  │  ┌───────────┐
│Technique 1│◄────┤                │  │  │           │
└───────────┘     │                │  ▼  │           │
                  │Data Component 1├────►│           │
┌───────────┐     │                │     │           │
│Technique 2│◄────┤                │     │Data Source│
└───────────┘     └────────────────┘     │           │
                                         │           │
┌───────────┐     ┌────────────────┐     │           │
│Technique 3│◄────┤Data Component 2├────►│           │
└───────────┘     └────────────────┘     └───────────┘
```

**Legacy compatibility:** Prior to ATT&CK v10, data sources were stored in the `x_mitre_data_sources` field on techniques. This field remains available for backward compatibility and accurately reflects current data sources, but lacks the granularity of the component-based model. **The ICS domain continues to use only the legacy `x_mitre_data_sources` field.**

#### Data Sources

Data sources represent categories of information that can be collected for detection purposes. They are defined as `x-mitre-data-source` objects extending the generic [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).

**Data source-specific fields:**

| Field                       | Type     | Description                                      |
| :-------------------------- | :------- | ------------------------------------------------ |
| `x_mitre_platforms`         | string[] | List of platforms that apply to the data source. |
| `x_mitre_collection_layers` | string[] | List of places the data can be collected from.   |

#### Data Components

Data components represent specific types of information within a data source that can be used for detection. They are defined as `x-mitre-data-component` objects extending the generic [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).

**Data component-specific fields:**

| Field                     | Type                           | Description                                             |
| :------------------------ | :----------------------------- | ------------------------------------------------------- |
| `x_mitre_data_source_ref` | embedded relationship (string) | STIX ID of the data source this component is a part of. |

### Campaigns

Campaigns represent sets of adversary activities occurring over a specific time period with shared characteristics and objectives. They are defined as [campaign](http://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230925) objects with additional temporal tracking fields.

**Campaign-specific fields:**

| Field | Type | Description |
|:------|:-----|-------------|
| `x_mitre_first_seen_citation` | string | Citations documenting when the campaign was first reported, formatted as "(Citation: \<citation name>)" where \<citation name> matches a `source_name` in `external_references`. |
| `x_mitre_last_seen_citation` | string | Citations documenting when the campaign was last reported, formatted as "(Citation: \<citation name>)" where \<citation name> matches a `source_name` in `external_references`. |

### Assets

Assets represent systems, devices, or technologies that adversaries may target within organizational environments. They are defined as `x-mitre-asset` objects extending the generic [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).

**Asset-specific fields:**

| Field | Type | Description |
|:------|:-----|-------------|
| `x_mitre_sectors` | string[] | Industry sectors where this asset is commonly observed. |
| `x_mitre_related_assets` | `related_asset[]` | Sector-specific device names or aliases commonly associated with the primary asset, including contextual descriptions of their relationships. |

#### Related Asset Subtype

The `related_asset` object provides sector-specific asset variations and aliases:

| Field                   | Type     | Description                                                                   |
| ----------------------- | -------- | ----------------------------------------------------------------------------- |
| `name`                  | string   | Sector-specific name or alias for the related asset                           |
| `related_asset_sectors` | string[] | Industry sectors where this related asset name applies                        |
| `description`           | string   | Description of how the related asset connects to the primary asset definition |

### Detection Strategies

Detection strategies define high-level approaches for detecting specific adversary techniques. They serve as containers that organize multiple platform-specific analytics into cohesive detection methodologies. Detection strategies are defined as `x-mitre-detection-strategy` objects extending the generic [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).

**Detection strategy-specific fields:**

| Field                       | Type     | Description                                                                                              |
| :-------------------------- | :------- | -------------------------------------------------------------------------------------------------------- |
| `x_mitre_analytic_refs`     | string[] | Array of STIX IDs referencing `x-mitre-analytic` objects that implement this detection strategy.         |

**Key characteristics:**

- Each detection strategy has a one-to-one relationship with a specific ATT&CK technique
- Detection strategies typically reference 1-3 analytics (one for each supported platform)
- Uses soft relationships (STIX ID references) to analytics for flexibility

**Relationship Architecture:**

The following diagrams illustrate how Detection Strategies connect to other ATT&CK objects through both formal STIX Relationship Objects (SROs) and soft relationships (STIX ID references):

```
   ┌───────────────────────┐                               
   │                       │                                    
   │        <<SDO>>        │             ┌─────────────┐   
   │       Detection       │             │             │   
   │       Strategy        │   <<SRO>>   │  <<SDO>>    │   
   │                       ├─────────────►  Technique  │   
   │┌─────────────────────┐│  "detects"  │             │   
   ││x_mitre_analytic_refs││             └─────────────┘   
   │└──────────┬──────────┘│                                    
   └───────────┼───────────┘                                    
               │                                           
               │ "Soft" relationship                       
               │ (STIX ID reference)                       
               │                                           
┌──────────────▼────────────────┐                               
│                               │                               
│            <<SDO>>            │                               
│           Analytic            │                               
│                               │                               
│┌─────────────────────────────┐│                               
││x_mitre_log_source_references││                               
│└─────────────┬───────────────┘│                               
└──────────────┼────────────────┘                               
               │                                           
               │ "Soft" relationship                       
               │ (array of objects:
               │   {
               │      x_mitre_log_source_ref: (Stix ID reference),
               │      permutation_names: array
               │   }
               │ )                       
               │                                           
         ┌─────▼──────┐
         │            │
         │  <<SDO>>   │
         │ Log Source │
         │            │
         └────────────┘
```

### Analytics

Analytics contain platform-specific detection logic and represent the implementation details of a detection strategy. They are defined as `x-mitre-analytic` objects extending the generic [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).

**Analytic-specific fields:**

| Field                      | Type                    | Description                                                                            |
| :------------------------- | :---------------------- | -------------------------------------------------------------------------------------- |
| `x_mitre_platforms`        | string[] (max 1)        | Target platform for this analytic (Windows, Linux, macOS).                             |
| `x_mitre_log_source_references`      | `log_source_reference[]`      | Array of log source references with specific permutation names.                         |
| `x_mitre_mutable_elements` | `mutable_element[]`     | Array of tunable detection parameters for environment-specific adaptation.             |

#### Log Source Reference Subtype

The `log_source_reference` object links analytics to specific log source permutations:

| Field  | Type     | Description                                                                           |
| ------ | -------- | ------------------------------------------------------------------------------------- |
| `x_mitre_log_source_ref`  | string   | STIX ID of the referenced `x-mitre-log-source` object                                |
| `permutation_names` | string[] | Specific permutation names from the log source's `x_mitre_log_source_permutations`     |

#### Mutable Element Subtype

The `mutable_element` object defines tunable parameters within analytics:

| Field         | Type   | Description                                                                      |
| ------------- | ------ | -------------------------------------------------------------------------------- |
| `field`       | string | Name of the detection field that can be tuned                                   |
| `description` | string | Rationale for tunability and environment-specific considerations                 |

### Log Sources

Log sources define immutable configurations for collecting security telemetry across different platforms and deployment scenarios. They are defined as `x-mitre-log-source` objects extending the generic [STIX Domain Object pattern](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920).

**Log source-specific fields:**

| Field                            | Type                          | Description                                                    |
| :------------------------------- | :---------------------------- | -------------------------------------------------------------- |
| `x_mitre_log_source_permutations` | `log_source_permutation[]`   | Array of platform-specific log collection configurations.       |

**Key characteristics:**

- Each log source contains multiple permutations for different deployment scenarios
- Permutations represent different ways to collect the same type of data across platforms
- Connected to data components via `found-in` relationships

#### Log Source Permutation Subtype

The `log_source_permutation` object defines platform-specific collection configurations:

| Field     | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| `name`    | string | Log source identifier (e.g., "sysmon", "auditd")                     |
| `channel` | string | Specific log channel or event type (e.g., "1" for Sysmon Process Creation) |
| `data_component_name` | string | Name of the specific data component. |

**Example:** A single log source for 'Process Creation' might contain permutations for:

- Windows: (name: "sysmon", channel: "1")
- Linux: (name: "auditd", channel: "SYSCALL")
- macOS: (name: "unified_logs", channel: "process")

### Relationships

ATT&CK objects are interconnected through STIX [relationship](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230970) objects that capture associations between groups, techniques, software, and other entities. These relationships enable analysis of adversary behaviors, defensive capabilities, and organizational structures within the ATT&CK framework.

Relationship objects frequently include `description` fields that provide contextual details about the specific association between objects.

**Supported relationship types:**

| Source Type              | Relationship Type | Target Type         | Custom Type? | About                                                                                                                                                                                                                                                                                                                 |
| :----------------------- | :---------------- | :------------------ | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intrusion-set`          | `uses`            | `malware` or `tool` | No           | Group using a software.                                                                                                                                                                                                                                                                                               |
| `intrusion-set`          | `uses`            | `attack-pattern`    | No           | Group using a technique, which is also considered a procedure example.                                                                                                                                                                                                                                                |
| `malware` or `tool`      | `uses`            | `attack-pattern`    | No           | Software using a technique, which is also considered a procedure example.                                                                                                                                                                                                                                             |
| `campaign` | `uses` | `malware` or `tool` | No | Campaign using a software. |
| `campaign` | `uses` | `attack-pattern` | No | Campaign using a technique, which is also considered a procedure example. |
| `campaign` | `attributed-to` | `intrusion-set` | No | Campaign attributed to a group. |
| `course-of-action`       | `mitigates`       | `attack-pattern`    | No           | Mitigation mitigating technique.                                                                                                                                                                                                                                                                                      |
| `attack-pattern`         | `subtechnique-of` | `attack-pattern`    | Yes          | Sub-technique of a technique, where the `source_ref` is the sub-technique and the `target_ref` is the parent technique.                                                                                                                                                                                               |
| `x-mitre-data-component` | `detects`         | `attack-pattern`    | Yes          | **Deprecated as of ATT&CK Specification 3.3.0.** Data component detecting a technique. This relationship type will be removed in ATT&CK Specification 4.0.0.                                                                                                                                                           |
| `x-mitre-detection-strategy` | `detects`     | `attack-pattern`    | Yes          | Detection strategy for detecting a technique.                                                                                                                                                         |
| `x-mitre-data-component` | `found-in`        | `x-mitre-log-source` | Yes         | Data component telemetry found in a log source.                                                                                                                                                      |
| `attack-pattern` | `targets` | `x-mitre-asset` | Yes | Technique targets an asset. |
| any type                 | `revoked-by`      | any type            | Yes          | The target object is a replacement for the source object. Only occurs where the objects are of the same type, and the source object will have the property `revoked = true`. See [Working with deprecated and revoked objects](#working-with-deprecated-and-revoked-objects) for more information on revoked objects. |

**Transitive relationships:** Groups can be considered indirect users of techniques employed by their software, creating a transitive relationship chain: `intrusion-set` → `uses` → `malware`/`tool` → `uses` → `attack-pattern`. See [Getting techniques used by a group's software](#getting-techniques-used-by-a-groups-software) for implementation details.

### Collections

See our [collections document](https://github.com/center-for-threat-informed-defense/attack-workbench-frontend/blob/master/docs/collections.md) for more information about the design and intention of collection objects.
