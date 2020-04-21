import mongoose from "mongoose";
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
  Name: String,
  Faculty: String,
  Coauthors: new mongoose.Schema({
    Faculty: [String],
  }),
  Research: new mongoose.Schema({
    Outreach: String,
    Title: String,
    Type: String,
    URL: String,
  }),
  SDGRecords: [
    new mongoose.Schema({
      Goals: [Number],
      Targets: [String],
      Interaction: new mongoose.Schema({
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
