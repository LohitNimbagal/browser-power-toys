// utils/token-encryption.ts
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export class TokenEncryption {
    private readonly algorithm = 'aes-256-gcm';
    private readonly key: Buffer;

    constructor(encryptionKey: string) {
        // Convert hex string to buffer or use the first 32 bytes of the provided key
        this.key = Buffer.from(encryptionKey.padEnd(64, '0').slice(0, 64), 'hex');
    }

    /**
     * Encrypt a token
     */
    encrypt(token: string): string {
        try {
            // Generate a random IV (Initialization Vector)
            const iv = randomBytes(12);

            // Create cipher
            const cipher = createCipheriv(this.algorithm, this.key, iv);

            // Encrypt the token
            let encrypted = cipher.update(token, 'utf8', 'hex');
            encrypted += cipher.final('hex');

            // Get auth tag
            const authTag = cipher.getAuthTag();

            // Combine IV, auth tag, and encrypted data
            return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
        } catch (error) {
            console.error('Encryption error:', error);
            throw new Error('Failed to encrypt token');
        }
    }

    /**
     * Decrypt a token
     */
    decrypt(encryptedData: string): string {
        try {
            // Split the encrypted data into its components
            const [ivHex, authTagHex, encryptedText] = encryptedData.split(':');

            // Convert hex strings back to buffers
            const iv = Buffer.from(ivHex, 'hex');
            const authTag = Buffer.from(authTagHex, 'hex');

            // Create decipher
            const decipher = createDecipheriv(this.algorithm, this.key, iv);
            decipher.setAuthTag(authTag);

            // Decrypt the data
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;
        } catch (error) {
            console.error('Decryption error:', error);
            throw new Error('Failed to decrypt token');
        }
    }

    /**
     * Generate a random encryption key
     */
    static generateKey(): string {
        return randomBytes(32).toString('hex');
    }
}