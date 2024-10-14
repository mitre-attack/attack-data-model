import { getAttackObjects } from './utils/attack-data.js';

declare global {
    var attackData: Awaited<ReturnType<typeof getAttackObjects>>;
}

beforeAll(async () => {
    global.attackData = await getAttackObjects();
}, 30000); // Increase timeout to 30 seconds as fetching might take a while