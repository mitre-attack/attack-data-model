// test/vitest.setup.ts
import { getAttackObjects } from './utils/attack-data';
import { beforeAll } from 'vitest';

beforeAll(async () => {
  globalThis.attackData = await getAttackObjects();
}, 30000);
