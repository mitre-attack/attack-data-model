/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
export class MarkingDefinitionImpl extends AttackBaseImpl {
    constructor(markingDefinition) {
        super();
        this.markingDefinition = markingDefinition;
        Object.assign(this, markingDefinition);
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=marking-definition.impl.js.map