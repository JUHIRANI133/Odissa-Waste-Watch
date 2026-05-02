// src/lib/auth/types.ts

export type UserRole = "admin" | "official";

export type AllowedUsers = {
  admin: string[];
  official: string[];
};