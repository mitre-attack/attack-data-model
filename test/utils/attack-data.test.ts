import { describe, it, expect } from 'vitest';

describe('Global Tests', () => {
  describe('ATT&CK Testing Data', () => {
    it('should have loaded ATT&CK data', () => {
      expect(globalThis.attackData).toBeDefined();
      expect(globalThis.attackData.allObjects.length).toBeGreaterThan(0);
    });

    it('should have loaded STIX Bundles', () => {
      expect(globalThis.attackData.bundles).toBeDefined();
      expect(globalThis.attackData.bundles.length).toBeGreaterThan(0);
      expect(
        globalThis.attackData.bundles.every(
          (bundle) => bundle.type === 'bundle' && Array.isArray(bundle.objects),
        ),
      ).toBe(true);
    });

    it('should have correct number of objects in allObjects matching total objects in bundles', () => {
      const totalObjectsInBundles = globalThis.attackData.bundles.reduce(
        (sum, bundle) => sum + bundle.objects.length,
        0,
      );
      expect(globalThis.attackData.allObjects.length).toEqual(totalObjectsInBundles);
    });

    it('should have all expected STIX Domain Objects (SDOs)', () => {
      const expectedSDOs = [
        'attack-pattern',
        'campaign',
        'course-of-action',
        'identity',
        'intrusion-set',
        'malware',
        'marking-definition',
        'relationship',
        'software', // included as a composition of 'tool' and 'malware'
        'tool',
        'x-mitre-collection',
        'x-mitre-data-component',
        'x-mitre-data-source',
        'x-mitre-matrix',
        'x-mitre-tactic',
        'x-mitre-asset',
        'x-mitre-detection-strategy',
        'x-mitre-analytic',
      ];

      const presentTypes = Object.keys(globalThis.attackData.objectsByType);
      const missingTypes = expectedSDOs.filter((type) => !presentTypes.includes(type));
      const unexpectedTypes = presentTypes.filter((type) => !expectedSDOs.includes(type));

      if (missingTypes.length > 0) {
        console.warn('Missing SDO types:', missingTypes);
      }
      if (unexpectedTypes.length > 0) {
        console.warn('Unexpected SDO types:', unexpectedTypes);
      }

      expectedSDOs.forEach((type) => {
        if (globalThis.attackData.objectsByType[type]) {
          expect(globalThis.attackData.objectsByType[type].length).toBeGreaterThan(0);
        } else {
          console.warn(`Missing SDO type: ${type}`);
        }
      });

      expect(missingTypes).toHaveLength(0);
      expect(unexpectedTypes).toHaveLength(0);
    });

    it('should have STIX Relationship Objects (SROs)', () => {
      expect(globalThis.attackData.sros).toBeDefined();
      expect(globalThis.attackData.sros.length).toBeGreaterThan(0);
    });

    it('should have marking definitions (SMOs)', () => {
      expect(globalThis.attackData.smos).toBeDefined();
      expect(globalThis.attackData.smos.length).toBeGreaterThan(0);
    });

    it('should have software objects (combination of malware and tools)', () => {
      expect(globalThis.attackData.objectsByType['software']).toBeDefined();
      expect(globalThis.attackData.objectsByType['software'].length).toBeGreaterThan(0);
      expect(globalThis.attackData.objectsByType['software'].length).toEqual(
        globalThis.attackData.objectsByType['malware'].length +
          globalThis.attackData.objectsByType['tool'].length,
      );
    });

    it('should have data sources and data components', () => {
      expect(globalThis.attackData.objectsByType['x-mitre-data-source']).toBeDefined();
      expect(globalThis.attackData.objectsByType['x-mitre-data-source'].length).toBeGreaterThan(0);
      expect(globalThis.attackData.objectsByType['x-mitre-data-component']).toBeDefined();
      expect(globalThis.attackData.objectsByType['x-mitre-data-component'].length).toBeGreaterThan(
        0,
      );
    });

    it('should have assets for ICS', () => {
      expect(globalThis.attackData.objectsByType['x-mitre-asset']).toBeDefined();
      expect(globalThis.attackData.objectsByType['x-mitre-asset'].length).toBeGreaterThan(0);
    });

    it('should have correct number of objects in allObjects', () => {
      const totalObjectCount = Object.values(globalThis.attackData.objectsByType).reduce(
        (sum, arr) => sum + arr.length,
        0,
      );
      // Subtract software count as it's a duplicate of malware and tool
      const adjustedCount =
        totalObjectCount - globalThis.attackData.objectsByType['software'].length;
      expect(globalThis.attackData.allObjects.length).toEqual(adjustedCount);
    });

    it('should have correct number of SDOs', () => {
      const sdoTypes = [
        'attack-pattern',
        'campaign',
        'course-of-action',
        'identity',
        'indicator',
        'intrusion-set',
        'malware',
        'tool',
        'vulnerability',
        'x-mitre-tactic',
        'x-mitre-matrix',
        'x-mitre-collection',
        'x-mitre-data-source',
        'x-mitre-data-component',
        'x-mitre-asset',
        'x-mitre-detection-strategy',
        'x-mitre-analytic',
      ];
      const sdoCount = sdoTypes.reduce(
        (sum, type) => sum + (globalThis.attackData.objectsByType[type]?.length || 0),
        0,
      );
      expect(globalThis.attackData.sdos.length).toEqual(sdoCount);
    });
  });
});
