// src/classes/common/attack-base.ts

export class AttackBase {
    private revokedBy?: any;

    setRevokedBy(obj: any): void {
        this.revokedBy = obj;
    }
}
