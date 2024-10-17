/**
 * Normalizes a version string by removing any leading 'v' character.
 * @param version - The version string to normalize.
 * @returns The normalized version string.
 */
function normalizeVersion(version) {
    return version.replace(/^v/, '');
}
/**
 * Fetches the list of ATT&CK versions from the MITRE ATT&CK STIX data GitHub repository.
 * @returns A promise that resolves to an array of version strings.
 * @throws An error if the HTTP request fails.
 */
export async function fetchAttackVersions() {
    const url = 'https://api.github.com/repos/mitre-attack/attack-stix-data/releases';
    // Make a GET request to the GitHub API
    const response = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const releases = await response.json();
    // Extract and normalize version numbers, then sort them in descending order
    const versions = releases
        .map((release) => normalizeVersion(release.tag_name))
        .sort((a, b) => {
        const [aMajor, aMinor] = a.split('.').map(Number);
        const [bMajor, bMinor] = b.split('.').map(Number);
        if (bMajor !== aMajor)
            return bMajor - aMajor;
        return bMinor - aMinor;
    });
    return versions;
}
//# sourceMappingURL=fetch-attack-versions.js.map