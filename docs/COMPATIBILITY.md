# Compatibility

This document tracks the compatibility between versions of the ATT&CK® Data Model (ADM) TypeScript API (`@mitre-attack/attack-data-model`), the ATT&CK® Specification, and versions of the MITRE ATT&CK® dataset (`mitre-attack/attack-stix-data`).

## Supported Versions Compatibility Matrix<sup>1</sup>

| ADM Version (`@mitre-attack/attack-data-model`) | ATT&CK Specification Version (`ATTACK_SPEC_VERSION`) | Supported ATT&CK Releases (`mitre-attack/attack-stix-data`) |
|-------------------------------------------------|------------------------------------------------------|-------------------------------------------------------------|
| 1.0.0                                           | 3.2.0                                                | 15.1                                                        |

<sup>1</sup>Other versions of ATT&CK or the ATT&CK Specification may work with the specified ADM release, but are not officially supported.

## Compatibility Details

- **ADM Version 1.0.0**: Officially supports ATT&CK Specification Version **3.2.0** and ATT&CK Release Version **15.1**.
  - **Features**:
    - Full parsing and validation support for all objects and properties defined in the ATT&CK Specification v3.2.0.
    - Supports all content introduced in ATT&CK Release v15.1, including new techniques, tactics, and relationships.
  - **Notes**:
    - Ensure that you are using the correct domain (e.g., `enterprise-attack`, `mobile-attack`) when loading data to avoid inconsistencies.
    - The ADM's Zod schemas and TypeScript types are aligned with the ATT&CK Specification v3.2.0, providing a codified expression of the specification.

## Using Other Versions

While the ADM may function with other versions of the ATT&CK dataset or ATT&CK Specification, the following considerations apply:

- **Older ATT&CK Releases**: May lack properties or objects that the ADM expects based on the ATT&CK Specification v3.2.0, potentially causing validation errors or missing data when parsing.
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

© 2020-2024 The MITRE Corporation.

This project makes use of ATT&CK®.

[ATT&CK Terms of Use](https://attack.mitre.org/resources/terms-of-use/)