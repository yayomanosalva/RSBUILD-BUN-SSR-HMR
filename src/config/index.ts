import { z } from "zod";

const configSchema = z.object({
     // Variables de servidor
     PORT: z.string().default("3000"),
     NODE_ENV: z
          .enum(["development", "production", "test"])
          .default("development"),

     // Variables públicas (accesibles desde el cliente)
     NEXT_PUBLIC_API_URL: z
          .string()
          .url()
          .default("https://jsonplaceholder.typicode.com"),
     NEXT_PUBLIC_API_URL_TODOS: z
          .string()
          .url()
          .default("https://jsonplaceholder.typicode.com/todos"),
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z
          .string()
          .default("default_key"), // Añadido valor por defecto
     NEXT_PUBLIC_ENV: z
          .enum(["development", "production", "test"])
          .default("development"),
});

export type Config = z.infer<typeof configSchema>;

const validateConfig = (config: Record<string, unknown>): Config => {
     try {
          return configSchema.parse(config);
     } catch (error) {
          if (error instanceof z.ZodError) {
               const { errors } = error;
               console.error('Config validation error:', errors);
               return configSchema.parse({}); // Usar valores por defecto si hay error
          }
          throw error;
     }
};

export const config = validateConfig(process.env);
export type Env = Config;

export default config;