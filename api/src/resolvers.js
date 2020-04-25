import { Research } from "./models/Research";
import { Course } from "./models/Course";

export const resolvers = {
  Query: {
    getCourseRecord: async (_, args) => await Course.findById(args),
    getAllCourseRecords: async () => await Course.find({}),
    getResearchRecord: async (_, args) => await Research.findById(args),
    getAllResearchRecords: async () => await Research.find({}),
  },
  Mutation: {
    deleteCourseRecord: async (_, args) => {
      const deletedCourseRecord = await Course.findByIdAndDelete(args);
      if (!deletedCourseRecord) {
        throw new Error("No record found and deleted.");
      }
      return deletedCourseRecord;
    },
    createCourseRecord: async (_, args) => {
      const record = await Course.create(args.data);
      return record;
    },
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
