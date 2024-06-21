from attrs import define, field

from .stix import StixObjectMixin

@define
class AttackObject:
    _stix: StixObjectMixin = field(
        metadata={'description': 'The STIX object associated with this attack'}
    )
    dummy_attribute: str = field(
        default="dummy",
        metadata={'description': 'A dummy attribute for demonstration purposes'}
    )

    def __getattr__(self, name):
        return getattr(self._stix, name)
    

```
Requirements:
    Export to: JSON, ???

Inheritance vs Composition TS
    Goal: Separation between Attack and STIX

Parsers vs Validators

What is the Zod philosophy on Parsing/Validating and how will that impact our architecture?
```


JSON (raw) --> Structured/Serialized (OOP) --> JSON/XML/JSON Schemas (raw)

Parsing