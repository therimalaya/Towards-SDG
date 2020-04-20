import mongoose, { mongo } from "mongoose";
import timestamps from "mongoose-timestamp";

const AllowedFaculties = {
  Biovit: "Biovit",
  KBM: "KBM",
  MINA: "MINA",
  Landsam: "Landsam",
  HH: "HH",
  Realtek: "Realtek",
  Vet: "Vet",
  Other: "Other",
};

const ResearchSchema = new mongoose.Schema({
  name: String,
  faculty: String,
  coauthorsFaculty: [String],
  research: new mongoose.Schema({
    outreach: String,
    title: String,
    type: String,
    url: String,
  }),
  sdgrecord: [
    new mongoose.Schema({
      goals: [Number],
      targets: [String],
      interaction: new mongoose.Schema({
        direction: String,
        type: String,
        value: String,
      }),
    }),
  ],
});

ResearchSchema.plugin(timestamps);
ResearchSchema.index({ createdAt: 1, updatedAt: 1 });

export const Research = mongoose.model("records", ResearchSchema, "research");
