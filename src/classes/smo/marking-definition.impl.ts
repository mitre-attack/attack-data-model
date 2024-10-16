import type { MarkingDefinition } from '../../schemas/smo/marking-definition.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class MarkingDefinitionImpl extends AttackBaseImpl {
  constructor(readonly markingDefinition: MarkingDefinition) {
    super();
    Object.assign(this, markingDefinition);
  }
}

export interface MarkingDefinitionImpl extends MarkingDefinition {}
