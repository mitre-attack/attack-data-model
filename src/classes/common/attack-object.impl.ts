export class AttackBaseImpl {
  private revokedBy?: any;

  /**
   * Sets the object that revokes the current object.
   * @param obj - The object that revokes this object.
   */
  setRevokedBy(obj: any): void {
    this.revokedBy = obj;
  }

  /**
   * Returns the object that revoked this object.
   */
  getRevokedBy(): any {
    return this.revokedBy;
  }
}
