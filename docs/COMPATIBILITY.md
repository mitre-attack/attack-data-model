# Compatibility

This document tracks the compatibility between versions of the ATT&CK® Data Model (ADM) TypeScript API (`@mitre-attack/attack-data-model`), the ATT&CK® Specification, and versions of the MITRE ATT&CK® dataset (`mitre-attack/attack-stix-data`).

## Supported Versions Compatibility Matrix<sup>1</sup>

| ADM Version ([`@mitre-attack/attack-data-model`](npmjs.com/package/@mitre-attack/attack-data-model)) | ATT&CK Specification Version ([`ATTACK_SPEC_VERSION`](https://github.com/mitre-attack/attack-data-model/blob/main/ATTACK_SPEC_VERSION)) | STIX Version ([`spec_version`](https://oasis-open.github.io/cti-documentation/resources#stix-21-specification)) | Supported ATT&CK Releases ([`mitre-attack/attack-stix-data`](https://github.com/mitre-attack/attack-stix-data/)) |
|-------------------------------------------------|------------------------------------------------------|-------------------------------|-------------------------------------------------------------|
| 1.x, 2.x, 3.x                                   | 3.2.0                                                | 2.1                           | >=15.x, <=17.x                                              |
| 4.x                                             | 3.3.0                                                | 2.1                           | >=15.x, <=18.x                                              |
| 5.x (future release)                            | 4.0.0                                                | 2.1                           | >=18.x                                                      |

<sup>1</sup>Other versions of ATT&CK or the ATT&CK Specification may work with the specified ADM release, but are not officially supported.
## Compatibility Details

- **ATT&CK Specification v3.3.0**:
  - **New SDOs**:
    - MITRE Detection Strategies (`x-mitre-detection-strategy`) <sup>[[schema](../src/schemas/sdo/detection-strategy.schema.ts)]</sup>
    - MITRE Analytics (`x-mitre-analytic`) <sup>[[schema](../src/schemas/sdo/analytic.schema.ts)]</sup>
  - **Schema Changes**:
    - Added `x_mitre_log_sources` field to MITRE Data Components for tracking security telemetry across platforms
  - **Deprecations**:
    - MITRE Data Sources (`x-mitre-data-sources`) <sup>[[schema](../src/schemas/sdo/data-source.schema.ts)]</sup> (removal in v4.0.0)
    - `x-mitre-data-component` --[detects]--> `attack-pattern` SROs (replaced by Detection Strategy framework)
  - **Content Support**:
    - ATT&CK Release v18.x and later

## Using Other Versions

While the ADM may function with other versions of the ATT&CK dataset or ATT&CK Specification, the following considerations apply:

- **Older ATT&CK Releases**: May lack properties or objects that the ADM expects based on the latest ATT&CK Specification, potentially causing validation errors or missing data when parsing.
- **Newer ATT&CK Releases**: May introduce new objects or properties not recognized by the current ADM version, leading to incomplete data mapping or parsing failures.
- **Different ATT&CK Specification Versions**: Using a different specification version may result in discrepancies between the expected and actual data model, affecting validation and data integrity.

## Recommendations

- **Stay Updated**: Always use the ADM version that corresponds to the ATT&CK Specification and dataset version you are working with.
- **Check `ATTACK_SPEC_VERSION`**: Refer to the `ATTACK_SPEC_VERSION` file in the repository to identify the ATT&CK Specification version the ADM is pinned to.
- **Testing**: If you need to use unsupported versions, thoroughly test your application to ensure data integrity.
- **Feedback**: If you require support for additional ATT&CK versions or specifications, consider opening an issue or contributing to the project.

## Future Compatibility Plans

We plan to:

- **Regular Updates**: Release new ADM versions shortly after new ATT&CK Specifications or ATT&CK dataset versions are published.
- **Backward Compatibility**: Where feasible, maintain backward compatibility with previous ATT&CK Specifications and releases.
- **Deprecation Notices**: Provide deprecation warnings in documentation and release notes when dropping support for older versions.

## Contributing to Compatibility

Community contributions are welcome to help expand compatibility:

- **Issue Reporting**: Report any compatibility issues you encounter with specific ATT&CK versions or specifications.
- **Pull Requests**: Submit pull requests to add support for additional ATT&CK versions or to improve compatibility.

## Contact and Support

For questions or support regarding compatibility:

- **GitHub Issues**: [Open an issue](https://github.com/mitre-attack/attack-data-model/issues) on the repository.
- **Email**: Contact the maintainers at [attack@mitre.org](mailto:attack@mitre.org).

---

© 2020-2025 The MITRE Corporation.

This project makes use of ATT&CK®.

[ATT&CK Terms of Use](https://attack.mitre.org/resources/terms-of-use/)