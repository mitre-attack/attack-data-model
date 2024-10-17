export class AttackBaseImpl {
    /**
     * Sets the object that revokes the current object.
     * @param obj - The object that revokes this object.
     */
    setRevokedBy(obj) {
        this.revokedBy = obj;
    }
    /**
     * Returns the object that revoked this object.
     */
    getRevokedBy() {
        return this.revokedBy;
    }
}
//# sourceMappingURL=attack-object.impl.js.map