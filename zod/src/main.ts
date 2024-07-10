import { z } from 'zod';
import axios from 'axios';
import fs from 'fs/promises';
import { TechniqueSchema } from './schemas/sdo/technique.schema';
import { TacticSchema } from './schemas/sdo/tactic.schema';
import { GroupSchema } from './schemas/sdo/group.schema';

export class AttackDataModel {
    private techniques: Map<string, z.infer<typeof TechniqueSchema>> = new Map();
    private tactics: Map<string, z.infer<typeof TacticSchema>> = new Map();
    private groups: Map<string, z.infer<typeof GroupSchema>> = new Map();

    private constructor() { }

    static async loadFromStixBundle(source: string): Promise<AttackDataModel> {
        let jsonData: any;

        if (source.startsWith('http')) {
            const response = await axios.get(source);
            jsonData = response.data;
        } else {
            const fileContent = await fs.readFile(source, 'utf-8');
            jsonData = JSON.parse(fileContent);
        }

        const model = new AttackDataModel();
        await model.parseStixBundle(jsonData);
        return model;
    }

    private async parseStixBundle(bundle: any) {
        for (const obj of bundle.objects) {
            switch (obj.type) {
                case 'attack-pattern':
                    const technique = TechniqueSchema.parse(obj);
                    this.techniques.set(technique.x_mitre_id, technique);
                    break;
                case 'x-mitre-tactic':
                    const tactic = TacticSchema.parse(obj);
                    this.tactics.set(tactic.x_mitre_shortname, tactic);
                    break;
                case 'intrusion-set':
                    const group = GroupSchema.parse(obj);
                    this.groups.set(group.id, group);
                    break;
                // Add more cases for other object types
            }
        }
    }

    getTechnique(id: string) {
        return this.techniques.get(id);
    }

    getTactic(shortname: string) {
        return this.tactics.get(shortname);
    }

    getGroup(id: string) {
        return this.groups.get(id);
    }

    // Add more methods for accessing and querying the data
}