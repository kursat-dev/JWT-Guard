import { jwtDecode } from "jwt-decode";

export const analyzeJWT = async (token) => {
    const result = {
        isValid: false,
        header: null,
        payload: null,
        signature: null,
        vulnerabilities: [],
        meta: {
            algorithm: 'Unknown',
            expiration: null,
        }
    };
       
    if (!token) return result;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error("Invalid JWT format. Expected 3 parts.");
        }

        // Decode Header (Base64Url decode)
        const headerStr = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
        const header = JSON.parse(headerStr);
        result.header = header;
        result.signature = parts[2];

        // Decode Payload
        const payload = jwtDecode(token);
        result.payload = payload;
        result.isValid = true;

        // --- Vulnerability Checks ---

        // 1. ALG=NONE
        if (!header.alg || header.alg.toLowerCase() === 'none') {
            result.vulnerabilities.push({
                id: 'ALG_NONE',
                severity: 'CRITICAL',
                title: 'Algorithm "None"',
                description: 'Token signature is not verified (alg: none). This allows attackers to forge tokens.'
            });
        }
        result.meta.algorithm = header.alg || 'None';

        // 2. Expiration
        if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            result.meta.expiration = expDate;
            if (expDate < new Date()) {
                result.vulnerabilities.push({
                    id: 'EXPIRED',
                    severity: 'MEDIUM',
                    title: 'Token Expired',
                    description: `Token expired on ${expDate.toLocaleString()}.`
                });
            }
        } else {
            result.vulnerabilities.push({
                id: 'NO_EXP',
                severity: 'LOW',
                title: 'No Expiration',
                description: 'Token missing expiration (exp) claim. It may be valid forever.'
            });
        }

        // 3. Weak Secret (Client-side brute-force for HS256)
        // Only run if HS256 and signature exists
        if (header.alg === 'HS256' && parts[2]) {
            const weakSecrets = ['secret', '123456', 'password', 'test', 'key', '123'];
            // TODO: Implement actual crypto check here if needed
            // For now, we flag if we find it.
            // We will need to use SubtleCrypto to verify.
            const crackedSecret = await bruteForceHS256(parts[0], parts[1], parts[2], weakSecrets);
            if (crackedSecret) {
                result.vulnerabilities.push({
                    id: 'WEAK_SECRET',
                    severity: 'HIGH',
                    title: 'Weak Secret Detected',
                    description: `Token signature verified with weak secret: "${crackedSecret}"`
                });
            }
        }

    } catch (e) {
        result.isValid = false;
        result.error = e.message;
    }

    return result;
};

// Helper: Brute force HS256
async function bruteForceHS256(headerB64, payloadB64, signatureB64, secrets) {
    const encoder = new TextEncoder();
    const data = encoder.encode(headerB64 + "." + payloadB64);

    // Signature in JWT is Base64UrlEncoded. We need to convert it to raw bytes for comparison?
    // Actually, Web Crypto API produces raw bytes. We verify signature.
    // However, verify() requires the key.

    for (const secret of secrets) {
        try {
            const key = await window.crypto.subtle.importKey(
                "raw",
                encoder.encode(secret),
                { name: "HMAC", hash: "SHA-256" },
                false,
                ["verify"]
            );

            // Need to convert signatureB64 (base64url) to Uint8Array
            const binaryString = atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/'));
            const len = binaryString.length;
            const signatureBytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                signatureBytes[i] = binaryString.charCodeAt(i);
            }

            const isValid = await window.crypto.subtle.verify(
                "HMAC",
                key,
                signatureBytes,
                data
            );

            if (isValid) {
                return secret;
            }
        } catch (e) {
            console.error("Crypto error during brute force", e);
        }
    }
    return null;
}
