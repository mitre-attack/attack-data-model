import { AssetImpl, CampaignImpl, CollectionImpl, DataComponentImpl, DataSourceImpl, GroupImpl, IdentityImpl, MalwareImpl, MatrixImpl, MitigationImpl, TacticImpl, TechniqueImpl, ToolImpl } from "../sdo";
import { MarkingDefinitionImpl } from "../smo";
import { RelationshipImpl } from "../sro";

export type AnyAttackObject =
    | MalwareImpl
    | AssetImpl
    | CampaignImpl
    | CollectionImpl
    | DataComponentImpl
    | DataSourceImpl
    | IdentityImpl
    | MatrixImpl
    | ToolImpl
    | TacticImpl
    | TechniqueImpl
    | GroupImpl
    | MitigationImpl
    | RelationshipImpl
    | MarkingDefinitionImpl;

export class AttackObjectImpl {

    private revokedBy?: AnyAttackObject;

    setRevokedBy(obj: AnyAttackObject): void {
        this.revokedBy = obj;
    }
}