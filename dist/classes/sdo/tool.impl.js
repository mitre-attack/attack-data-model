/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { TechniqueImpl } from './technique.impl.js';
export class ToolImpl extends AttackBaseImpl {
    constructor(tool) {
        super();
        this.tool = tool;
        this._techniques = [];
        Object.assign(this, tool);
    }
    // Add a technique used by the tool
    addTechnique(technique) {
        this._techniques.push(technique);
    }
    // Getters
    getTechniques() {
        return this._techniques;
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
//# sourceMappingURL=tool.impl.js.map