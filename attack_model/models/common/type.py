from enum import Enum
import re

class STIXType(str, Enum):
    """
    Enumeration of supported STIX types in ATT&CK.
    """
    ATTACK_PATTERN = "attack-pattern"
    MALWARE = "malware"
    COURSE_OF_ACTION = "course-of-action"
    INTRUSION_SET = "intrusion-set"
    X_MITRE_DATA_COMPONENT = "x-mitre-data-component"
    TOOL = "tool"
    X_MITRE_DATA_SOURCE = "x-mitre-data-source"
    X_MITRE_TACTIC = "x-mitre-tactic"
    CAMPAIGN = "campaign"
    X_MITRE_ASSET = "x-mitre-asset"
    X_MITRE_MATRIX = "x-mitre-matrix"
    X_MITRE_COLLECTION = "x-mitre-collection"
    IDENTITY = "identity"

    @classmethod
    def validate(cls, value: str) -> "STIXType":
        """
        Validate the input value against the enumeration and additional constraints.
        
        Args:
            value (str): The value to validate.
        
        Returns:
            STIXType: The validated STIX type.
        
        Raises:
            ValueError: If the input value is not a valid STIX type or fails the additional constraints.
        """
        try:
            stix_type = cls(value)
        except ValueError:
            raise ValueError(f"Invalid STIX type: {value}")
        
        if len(value) < 3:
            raise ValueError(f"STIX type must have a minimum length of 3: {value}")
        
        if len(value) > 250:
            raise ValueError(f"STIX type must have a maximum length of 250: {value}")
        
        pattern = r"^([a-z][a-z0-9]*)+(-[a-z0-9]+)*\-?$"
        if not re.match(pattern, value):
            raise ValueError(f"STIX type must match the pattern '{pattern}': {value}")
        
        return stix_type