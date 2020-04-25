import { gql } from "apollo-server-express";

export const typeDefs = gql`
  # enum AllowedFaculties {
  #   Biovit
  #   KBM
  #   MINA
  #   Landsam
  #   HH
  #   Realtek
  #   Vet
  #   Other
  # }
  type ResearchRecord {
    _id: ID!
    Name: String
    Faculty: String
    Coauthors: Coauthor
    Research: Research
    SDGRecords: [SDGRecord]
    createdAt: String
    updatedAt: String
  }
  type CourseRecord {
    _id: ID!
    Type: String
    CourseCode: String
    Year: Int
    CourseName: String
    CourseResponsible: String
    Faculty: String
    RelatedFaculties: [String]
    Teaching: String
    SustainFocus: String
    SDGRecords: [SDGRecord]
    createdAt: String
    updatedAt: String
  }
  type Coauthor {
    Faculty: [String]
  }
  type Research {
    Outreach: String
    Title: String
    Type: String
    URL: String
  }
  type SDGRecord {
    Goals: [Int]
    Interaction: Interaction
    Targets: [String]
  }
  type Interaction {
    direction: String
    type: String
    value: String
  }
  type Query {
    getCourseRecord(_id: ID!): CourseRecord
    getAllCourseRecords: [CourseRecord]
    getResearchRecord(_id: ID!): ResearchRecord
    getAllResearchRecords: [ResearchRecord]
  }
  type Mutation {
    deleteCourseRecord(_id: ID!): CourseRecord!
    createCourseRecord(data: CourseRecordInput): CourseRecord!
    deleteResearchRecord(_id: ID!): ResearchRecord!
    createResearchRecord(data: ResearchRecordInput): ResearchRecord!
  }
  input ResearchInput {
    Outreach: String
    Title: String
    Type: String
    URL: String
  }
  input CoauthorsInput {
    Faculty: [String]
  }
  input SDGRecordInput {
    Goals: [Int]
    Interaction: InteractionInput
    Targets: [String]
  }
  input InteractionInput {
    direction: String
    type: String
    value: String
  }
  input ResearchRecordInput {
    Name: String
    Faculty: String
    Coauthors: CoauthorsInput
    Research: ResearchInput
    SDGRecords: [SDGRecordInput]
  }
  input CourseRecordInput {
    Type: String
    CourseCode: String
    Year: Int
    CourseName: String
    CourseResponsible: String
    Faculty: String
    RelatedFaculties: [String]
    Teaching: String
    SustainFocus: String
    SDGRecords: [SDGRecordInput]
  }
`;
