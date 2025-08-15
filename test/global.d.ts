// test/global.d.ts
import { getAttackObjects } from './utils/attack-data';

declare global {
  var attackData: Awaited<ReturnType<typeof getAttackObjects>>;
}
