import { Research } from "./models/Research";

export const resolvers = {
  Query: {
    getResearchRecord: async (_, args) => await Research.findById(args),
    getAllResearchRecords: async () => await Research.find({}),
  },
  Mutation: {
    deleteResearchRecord: async (_, args) => {
      const deletedResearchRecord = await Research.findByIdAndDelete(args);
      if (!deletedResearchRecord) {
        throw new Error("No record found and deleted.");
      }
      return deletedResearchRecord;
    },
    createResearchRecord: async (_, args) => {
      const record = await Research.create(args.data);
      return record;
    },
  },
};
