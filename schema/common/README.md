# ATT&CK Base Object Schema

## Overview

The ATT&CK Base Object Schema is a foundational JSON schema designed for all objects within the MITRE ATT&CK framework. It extends the core STIX 2.1 schema, incorporating additional properties and requirements specific to ATT&CK. This schema serves as the base for defining various ATT&CK object types, such as techniques, tactics, groups, and software, ensuring consistent and comprehensive representation of ATT&CK data across domains (Enterprise, ICS, and Mobile).

## Purpose

The primary purpose of the ATT&CK Base Object Schema is to abstract the underlying STIX schema and introduce ATT&CK-specific modifications and enhancements. This ensures that all ATT&CK objects adhere to a standardized format, facilitating interoperability, data sharing, and analysis. The schema captures essential attributes common to all ATT&CK objects, enabling a unified approach to cataloging and managing ATT&CK content.

## Schema Details

The ATT&CK Base Object Schema includes the following key properties:

- `name`: A string representing the name of the ATT&CK object.
- `x_mitre_attack_spec_version`: A string specifying the version of the ATT&CK specification used by the object. This property follows the semantic versioning pattern `\d+\.\d+\.\d+`.
- `x_mitre_version`: A string indicating the version of the object within the ATT&CK catalog, adhering to the semantic versioning pattern `\d+\.\d+`, but excluding the patch version for simplicity.

These properties are required in addition to those inherited from the core STIX schema (`type`, `id`, `created`, `modified`, `spec_version`), ensuring a comprehensive definition of each ATT&CK object.

## How It Works

The ATT&CK Base Object Schema serves as a template for defining specific ATT&CK object types. When creating a new ATT&CK object (e.g., a technique or tactic), the schema for that object will extend the base schema, inheriting its properties and validation rules. Additional properties specific to that object type can then be added, along with any further requirements.

For example, a schema for an ATT&CK technique would extend the base schema and include technique-specific properties such as `x_mitre_detection`, `x_mitre_platforms`, and others, defining the full structure and requirements for technique objects within the ATT&CK framework.

## Usage

To use the ATT&CK Base Object Schema for defining a new ATT&CK object type, simply reference the base schema using the `$ref` property in your object's schema definition. This will automatically incorporate the base properties and requirements, allowing you to focus on specifying additional attributes and rules specific to your object type.

## Conclusion

The ATT&CK Base Object Schema is a critical component of the MITRE ATT&CK framework, ensuring consistency, completeness, and compatibility across all ATT&CK objects. By standardizing the representation of ATT&CK data, this schema facilitates effective cataloging, sharing, and analysis of adversary tactics, techniques, and procedures (TTPs), supporting cybersecurity practitioners in their efforts to understand and counteract threats.