 import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Travel {
    id    Int    
    name  String?
    token String 
    Scrap Scrap[]
   }
 `;