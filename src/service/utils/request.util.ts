export function buildAuthHeaders(token: string) {
    return { Authorization: `Bearer ${token}` };
}
