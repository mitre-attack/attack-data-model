import type { DataSource } from '../../schemas/sdo/data-source.schema.js';
import { AttackBaseImpl } from '../common/attack-object.impl.js';

export class DataSourceImpl extends AttackBaseImpl {
  constructor(readonly dataSource: DataSource) {
    super();
    Object.assign(this, dataSource);
  }
}

export interface DataSourceImpl extends DataSource {}
