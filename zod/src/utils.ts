import { z } from 'zod';

export function createSchemaWithMethods<T extends z.ZodTypeAny>(schema: T) {
    return schema.transform((data) => ({
        ...data,
        toJSON() {
            const json: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(this)) {
                if (key !== 'toJSON' && key !== 'toString') {
                    if (Array.isArray(value)) {
                        json[key] = value.map(item =>
                            typeof item === 'object' && item !== null && 'toJSON' in item && typeof (item as any).toJSON === 'function'
                                ? (item as any).toJSON()
                                : item
                        );
                    } else if (typeof value === 'object' && value !== null && 'toJSON' in value && typeof (value as any).toJSON === 'function') {
                        json[key] = (value as any).toJSON();
                    } else {
                        json[key] = value;
                    }
                }
            }
            return json;
        },
        toString(this: { toJSON: () => Record<string, unknown> }) {
            return JSON.stringify(this.toJSON());
        }
    }));
}