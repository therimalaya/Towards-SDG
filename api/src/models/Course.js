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

const CourseSchema = new mongoose.Schema({
  Type: String,
  CourseCode: String,
  Year: Number,
  CourseName: String,
  Faculty: String,
  RelatedFaculties: [String],
  Teaching: String,
  SustainFocus: String,
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

CourseSchema.plugin(timestamps);
CourseSchema.index({ createdAt: 1, updatedAt: 1 });

export const Course = mongoose.model("Course", CourseSchema, "course");
