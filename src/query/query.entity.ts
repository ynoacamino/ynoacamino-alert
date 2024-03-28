import { z } from "zod";

export const newQuerySchema = z.object({
  status: z.string(),
});

export type NewQueryType = z.infer<typeof newQuerySchema>;

export const querySchema = z.object({
  id: z.number(),
  status: z.string(),
  createdAt: z.date(),
});

export enum QueryStatus {
  AVARILABLE = "AVAILABLE",
  PENDING = "PENDING",
}

export type QueryType = {
  id: number;
  status: QueryStatus;
  createdAt: Date;
};