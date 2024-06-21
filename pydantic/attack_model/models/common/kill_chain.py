from typing import Annotated
from pydantic import BaseModel, Field


class KillChainPhase(BaseModel):
    _required = ["kill_chain_name", "phase_name"]
    kill_chain_name: Annotated[str, Field(description="The name of the kill chain.")]
    phase_name: Annotated[str, Field(description="The name of the phase in the kill chain.")]
