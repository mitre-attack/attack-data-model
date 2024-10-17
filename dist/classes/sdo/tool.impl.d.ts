import type { Tool } from '../../schemas/sdo/tool.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';
import { TechniqueImpl } from './technique.impl.js';
export declare class ToolImpl extends AttackBaseImpl implements Tool {
    readonly tool: Tool;
    private _techniques;
    constructor(tool: Tool);
    addTechnique(technique: TechniqueImpl): void;
    getTechniques(): TechniqueImpl[];
}
export interface ToolImpl extends Tool {
}
//# sourceMappingURL=tool.impl.d.ts.map