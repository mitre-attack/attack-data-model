/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type { DataSource } from '../../schemas/sdo/data-source.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class DataSourceImpl extends AttackBaseImpl {
  constructor(readonly dataSource: DataSource) {
    super();
    Object.assign(this, dataSource);
  }
}

// Suppress the lint error for the empty interface
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DataSourceImpl extends DataSource {}

/* eslint-enable @typescript-eslint/no-unsafe-declaration-merging */
