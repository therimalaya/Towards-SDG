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
    name: String
    faculty: String
    coauthorsFaculty: [String]
    research: Research
    sdgrecord: [SDGResearchRecord]
    createdAt: String
    updatedAt: String
  }
  type Research {
    outreach: String
    title: String
    type: String
    url: String
  }
  type SDGResearchRecord {
    goals: [Int]
    interaction: Interaction
    targets: [String]
  }
  type Interaction {
    direction: String
    type: String
    value: String
  }
  type Query {
    getResearchRecord(_id: ID!): ResearchRecord
    getAllResearchRecords: [ResearchRecord]
  }
  type Mutation {
    deleteResearchRecord(_id: ID!): ResearchRecord!
    createResearchRecord(data: ResearchRecordInput): ResearchRecord!
  }
  input ResearchInput {
    outreach: String
    title: String
    type: String
    url: String
  }
  input SDGResearchRecordInput {
    goals: [Int]
    interaction: InteractionInput
    targets: [String]
  }
  input InteractionInput {
    direction: String
    type: String
    value: String
  }
  input ResearchRecordInput {
    name: String
    faculty: String
    coauthorsFaculty: [String]
    research: ResearchInput
    sdgrecord: [SDGResearchRecordInput]
  }
`;
