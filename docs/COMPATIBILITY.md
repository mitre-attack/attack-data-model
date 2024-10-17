# Compatibility

This document tracks the compatibility between versions of the ATT&CK Data Model (ADM) TypeScript API (`@mitre-attack/attack-data-model`) and versions of the MITRE ATT&CK® dataset (`mitre-attack/attack-stix-data`).

## Supported Versions Compatibility Matrix<sup>1</sup>

| ADM Version (`@mitre-attack/attack-data-model`) | ATT&CK Version (`mitre-attack/attack-stix-data`) |
|-----------------------------------------------|------------------------------------------------|
| 1.0.0                                         | 15.1                                           |

<sup>1</sup>Other versions of ATT&CK may work with the specified ADM release, but are not officially supported.

## Compatibility Details

- **ADM Version 1.0.0**: Officially supports ATT&CK Version 15.1.
  - **Features**: Full parsing and validation support for all objects introduced in ATT&CK v15.1, including any new techniques, tactics, and relationships.
  - **Notes**: Ensure that you are using the correct domain (e.g., `enterprise-attack`, `mobile-attack`) when loading data to avoid inconsistencies.

## Using Other Versions

While the ADM may function with other versions of the ATT&CK dataset, the following considerations apply:

- **Older ATT&CK Versions**: May lack properties or objects that the ADM expects, potentially causing validation errors or missing data when parsing.
- **Newer ATT&CK Versions**: May introduce new objects or properties not recognized by the current ADM version, leading to incomplete data mapping or parsing failures.

## Recommendations

- **Stay Updated**: Always use the ADM version that corresponds to the ATT&CK dataset version you are working with.
- **Testing**: If you need to use an unsupported ATT&CK version, thoroughly test your application to ensure data integrity.
- **Feedback**: If you require support for additional ATT&CK versions, consider opening an issue or contributing to the project.

## Future Compatibility Plans

We plan to:

- **Regular Updates**: Release new ADM versions shortly after new ATT&CK versions are published.
- **Backward Compatibility**: Where feasible, maintain backward compatibility with previous ATT&CK versions.
- **Deprecation Notices**: Provide deprecation warnings in documentation and release notes when dropping support for older ATT&CK versions.

## Contributing to Compatibility

Community contributions are welcome to help expand compatibility:

- **Issue Reporting**: Report any compatibility issues you encounter with specific ATT&CK versions.
- **Pull Requests**: Submit pull requests to add support for additional ATT&CK versions or to improve compatibility.

## Contact and Support

For questions or support regarding compatibility:

- **GitHub Issues**: [Open an issue](https://github.com/mitre-attack/attack-data-model/issues) on the repository.
- **Email**: Contact the maintainers at [attack@mitre.org](mailto:attack@mitre.org).

---

© 2020-2024 The MITRE Corporation.

This project makes use of ATT&CK®.

[ATT&CK Terms of Use](https://attack.mitre.org/resources/terms-of-use/)