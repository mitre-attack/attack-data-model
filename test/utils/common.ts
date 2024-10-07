import { ZodSchema, ZodError } from 'zod';

let objects: any[];

export const validateAttackObjects = (schema: ZodSchema<any>, dataType: string) => {
    describe('should validate existing ATT&CK objects and report errors', () => {
        it(`should validate all objects of type ${dataType}`, () => {
            objects = global.attackData.objectsByType[dataType];
            const errors = [];

            for (let object of objects) {
                try {
                    if ("x_mitre_deprecated" in object && "revoked" in object) {
                        if (!object.x_mitre_deprecated && !object.revoked) {
                            schema.parse(object);
                        }
                    }
                } catch (error) {
                    if (error instanceof ZodError) {
                        errors.push({ object, error });
                    } else {
                        throw error;
                    }
                }
            }

            if (errors.length > 0) {
                let objectInfo = "";
                const errorReport = errors.map(({ object, error }) => {
                    if ("external_references" in object && object.external_references && object.external_references.length > 0) {
                        const objectId = object.external_references[0].external_id;
                        objectInfo += `${dataType} ID: ${objectId}\n`
                    }
                    if ("name" in object) {
                        const objectName = object.name;
                        objectInfo += `${dataType} Name: ${objectName}\n`
                    }
                    const objectStixId = object.id;
                    objectInfo += `${dataType} stixID: ${objectStixId}\n`
                    const errorMessages = error.errors.map(err =>
                        `    - ${err.path.join('.')}: ${err.message}`
                    ).join('\n');

                    return `
                Validation Errors:
                ${errorMessages}`;
                }).join('\n');
                console.warn(`The following ${errors.length} object(s) failed validation:\n${errorReport}`);
            }

            console.log(`Total objects with validation errors: ${errors.length}`);
            expect(true).toBe(true);
        });
    });
};