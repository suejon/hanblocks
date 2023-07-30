import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const entryRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const result =  await ctx.prisma.$runCommandRaw({
      aggregate: "entry",
      pipeline: [
        {
          $search: {
            index: "eng_name_and_definition",
            text: {
              query: input,
              path: {
                wildcard: "*",
              },
            },
          },
        },
        {$limit: 10}
      ],
      cursor: {},
    });
    return result.cursor?.firstBatch ?? []
  }),
  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.entry.findUnique({
      where: { id: input },
    });
  }),
});
