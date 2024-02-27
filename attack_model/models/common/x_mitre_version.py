from typing import Annotated
from pydantic import BaseModel, Field, constr


class MitreVersionModel(BaseModel):
    x_mitre_version: Annotated[
        str,
        Field(
            default="2.1",  # TODO verify 2.1 is the true default
            pattern=r"^\d+\.\d+$",
            description="Represents the version of the object in a 'major.minor' format, where both 'major' and 'minor' are integers. This versioning follows semantic versioning principles but excludes the patch number. The version number is incremented by ATT&CK when the content of the object is updated. This property does not apply to relationship objects.",
        ),
    ]
