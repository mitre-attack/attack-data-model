import { z } from 'zod';

// Enhanced robustToJSON function with flattening support
function robustToJSON(obj: any, flatten: string[] = []): any {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return obj.toISOString();
    }

    if (Array.isArray(obj)) {
        return obj.map(item => robustToJSON(item, flatten));
    }

    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value !== 'function' && key !== 'toJSON') {
            if (flatten.includes(key) && typeof value === 'object' && value !== null) {
                // Flatten the object to a string representation
                if ('toString' in value && typeof value.toString === 'function') {
                    result[key] = value.toString();
                } else {
                    // Default flattening behavior if toString is not available
                    result[key] = JSON.stringify(robustToJSON(value));
                }
            } else {
                result[key] = robustToJSON(value, flatten);
            }
        }
    }
    return result;
}

// User schema with transform
const UserSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
}).transform((obj) => ({
    ...obj,
    greet: function () {
        return `Hello, I am ${obj.first_name} ${obj.last_name}`;
    },
    toString: function () {
        return `${obj.first_name} ${obj.last_name}`;
    },
    toJSON: function (options: { flatten?: string[] } = {}) {
        return robustToJSON(this, options.flatten);
    }
}));

type User = z.infer<typeof UserSchema>;

// Profile schema with transform
const ProfileSchema = z.object({
    user: UserSchema,
    description: z.string(),
    created: z.date()
}).transform((obj) => ({
    ...obj,
    daysSinceCreation: function () {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - obj.created.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    toJSON: function (options: { flatten?: string[] } = {}) {
        return robustToJSON(this, options.flatten);
    }
}));

type Profile = z.infer<typeof ProfileSchema>;

// Usage
try {
    const user: User = UserSchema.parse({
        first_name: 'John',
        last_name: 'Doe',
    });

    console.log("User's first name:", user.first_name);
    // User's first name: John

    console.log("User's last name:", user.last_name);
    // User's last name: Doe

    console.log("User's greeting:", user.greet());
    // User's greeting: Hello, I am John Doe

    console.log(typeof user)
    // object

    const userSchema = UserSchema.parse(user);
    console.log(userSchema);
    /**
     * {
        first_name: 'John',
        last_name: 'Doe',
        greet: [Function: greet],
        toString: [Function: toString]
        }
     */

    console.log(userSchema.toJSON());
    // { first_name: 'John', last_name: 'Doe' }

    const profile: Profile = ProfileSchema.parse({
        user: user,
        description: 'Hello, welcome to my profile.',
        created: new Date('2023-07-01')
    });
    console.log(profile);
    /**
        {
        user: {
            first_name: 'John',
            last_name: 'Doe',
            greet: [Function: greet],
            toString: [Function: toString],
            toJSON: [Function: toJSON]
        },
        description: 'Hello, welcome to my profile.',
        created: 2023-07-01T00:00:00.000Z,
        daysSinceCreation: [Function: daysSinceCreation],
        toJSON: [Function: toJSON]
        }
     */

    console.log(profile.toJSON());
    /**
        {
        user: { first_name: 'John', last_name: 'Doe' },
        description: 'Hello, welcome to my profile.',
        created: '2023-07-01T00:00:00.000Z'
        }     
     */

    console.log("Profile JSON (default):", JSON.stringify(profile.toJSON(), null, 2));
    /**
        {
        "user": {
            "first_name": "John",
            "last_name": "Doe"
        },
        "description": "Hello, welcome to my profile.",
        "created": "2023-07-01T00:00:00.000Z"
        }
     */

    console.log("Profile JSON (flattened user):", JSON.stringify(profile.toJSON({ flatten: ['user'] }), null, 2));
    /**
        {
        "user": "John Doe",
        "description": "Hello, welcome to my profile.",
        "created": "2023-07-01T00:00:00.000Z"
        } 
     */


} catch (error) {
    if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
    } else {
        console.error("Unexpected error:", error);
    }
}