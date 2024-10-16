/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { MarkingDefinition } from '../../schemas/smo/marking-definition.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class MarkingDefinitionImpl extends AttackBaseImpl {
  constructor(readonly markingDefinition: MarkingDefinition) {
    super();
    Object.assign(this, markingDefinition);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MarkingDefinitionImpl extends MarkingDefinition {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
