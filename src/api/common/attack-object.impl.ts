import type { AnyAttackObject } from '../attack-data-model.js';

export class AttackBaseImpl {
  private revokedBy?: AnyAttackObject;

  /**
   * Sets the object that revokes the current object.
   * @param obj - The object that revokes this object.
   */
  setRevokedBy(obj: AnyAttackObject): void {
    this.revokedBy = obj;
  }

  /**
   * Returns the object that revoked this object.
   */
  getRevokedBy() {
    return this.revokedBy;
  }
}
