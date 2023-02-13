import * as z from "zod";

export const DashboardData = z.object({
  beetsEmissionsPerDay: z.number(),
  fantomBlocksPerDay: z.number(),
  totalFbeetsSupply: z.number(),
  roundBeetsEmissions: z.number(),
  roundEmissionsUsd: z.number(),
  voteIncentivesRoi: z.number(),
  poolsOverThreshold: z.number(),
  totalRelics: z.number(),
  payoutStatus: z.enum(["estimated", "payout active", "settled"]),
});

export type DashboardData = z.infer<typeof DashboardData>;

export const BribesRoi = z.object({
  poolname: z.string(),
  votes: z.number(),
  votesPercent: z.number(),
  rawPercent: z.number().optional(),
  totalIncentivesUsd: z.number(),
  poolIncentivesUsd: z.number(),
  totalEmissionUsd: z.number(),
  poolEmissionUsd: z.number(),
  roiPercent: z.number(),
  payoutStatus: z.enum(["estimated", "payout active", "settled"]),
});

export type BribesRoi = z.infer<typeof BribesRoi>;
