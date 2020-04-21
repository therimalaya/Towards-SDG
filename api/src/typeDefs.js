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
    SDGRecords: [SDGResearchRecord]
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
  type SDGResearchRecord {
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
    getResearchRecord(_id: ID!): ResearchRecord
    getAllResearchRecords: [ResearchRecord]
  }
  type Mutation {
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
  input SDGResearchRecordInput {
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
    SDGRecords: [SDGResearchRecordInput]
  }
`;
