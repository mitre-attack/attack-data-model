import type { AnyAttackObject } from '../attack-data-model.js';
export declare class AttackBaseImpl {
    private revokedBy?;
    /**
     * Sets the object that revokes the current object.
     * @param obj - The object that revokes this object.
     */
    setRevokedBy(obj: AnyAttackObject): void;
    /**
     * Returns the object that revoked this object.
     */
    getRevokedBy(): AnyAttackObject | undefined;
}
//# sourceMappingURL=attack-object.impl.d.ts.map