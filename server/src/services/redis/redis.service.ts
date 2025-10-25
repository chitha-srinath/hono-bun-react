import { env } from "@/utils/env.utils";
import { RedisClient } from "bun";

/**
 * Redis Service for handling Redis operations using Bun's built-in Redis client
 */
class RedisService {
    private client: RedisClient | null = null;
    private isConnected = false;

    constructor() {
        this.initializeClient();
    }

    /**
     * Initialize Redis client
     */
    private initializeClient(): void {
        try {
            // Use REDIS_URL if provided, otherwise construct from host/port
            if (env.REDIS_URL) {
                this.client = new RedisClient(env.REDIS_URL);
            } else {
                // Construct Redis URL from host and port
                const redisUrl = `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`;
                this.client = new RedisClient(redisUrl);
            }
            this.isConnected = true;
            console.log("✅ Redis client initialized successfully");
        } catch (error) {
            console.error("❌ Failed to initialize Redis client:", error);
            this.isConnected = false;
        }
    }

    /**
     * Get Redis client instance
     */
    getClient(): RedisClient | null {
        return this.client;
    }

    /**
     * Check if Redis is connected
     */
    isConnectedToRedis(): boolean {
        return this.isConnected;
    }

    /**
     * Set a key-value pair in Redis
     */
    async set(key: string, value: string, expiryInSeconds?: number): Promise<boolean> {
        if (!this.client || !this.isConnected) {
            console.warn("Redis client is not connected");
            return false;
        }

        try {
            await this.client.set(key, value);

            // Set expiration separately if provided
            if (expiryInSeconds) {
                await this.client.expire(key, expiryInSeconds);
            }

            return true;
        } catch (error) {
            console.error(`Failed to set key ${key} in Redis:`, error);
            return false;
        }
    }

    /**
     * Get a value by key from Redis
     */
    async get(key: string): Promise<string | null> {
        if (!this.client || !this.isConnected) {
            console.warn("Redis client is not connected");
            return null;
        }

        try {
            const value = await this.client.get(key);
            return value;
        } catch (error) {
            console.error(`Failed to get key ${key} from Redis:`, error);
            return null;
        }
    }

    /**
     * Delete a key from Redis
     */
    async del(key: string): Promise<boolean> {
        if (!this.client || !this.isConnected) {
            console.warn("Redis client is not connected");
            return false;
        }

        try {
            const result = await this.client.del(key);
            return result > 0;
        } catch (error) {
            console.error(`Failed to delete key ${key} from Redis:`, error);
            return false;
        }
    }

    /**
     * Check if a key exists in Redis
     */
    async exists(key: string): Promise<boolean> {
        if (!this.client || !this.isConnected) {
            console.warn("Redis client is not connected");
            return false;
        }

        try {
            const result = await this.client.exists(key);
            return result; // exists returns boolean directly
        } catch (error) {
            console.error(`Failed to check existence of key ${key} in Redis:`, error);
            return false;
        }
    }

    /**
     * Set a key with expiration time
     */
    async setex(key: string, expiryInSeconds: number, value: string): Promise<boolean> {
        return this.set(key, value, expiryInSeconds);
    }

    /**
     * Get TTL (Time To Live) for a key
     */
    async ttl(key: string): Promise<number> {
        if (!this.client || !this.isConnected) {
            console.warn("Redis client is not connected");
            return -1;
        }

        try {
            return await this.client.ttl(key);
        } catch (error) {
            console.error(`Failed to get TTL for key ${key} from Redis:`, error);
            return -1;
        }
    }

    /**
     * Close Redis connection
     */
    async disconnect(): Promise<void> {
        if (this.client) {
            this.client.close();
            this.isConnected = false;
            console.log("Redis connection closed");
        }
    }
}

// Export singleton instance
export const redisService = new RedisService();