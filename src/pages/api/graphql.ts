import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { gql } from "graphql-tag";
import { Travel } from "@prisma/client";

const prisma = new PrismaClient();
const resolvers = {
  // データ取得のための関数
  Query: {
    hello: () => "world",
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/#handling-arguments
    getTravelByToken: (parent, args) => {
      const data = prisma.travel.findUnique({
        where: {
          token: args.token,
        },
      });
      return data;
    },
  },
  // データの更新のための関数
  Mutation: {
    loginTravelByToken: async (parent, args) => {
      try {
        const data = await prisma.travel.findUniqueOrThrow({
          where: {
            token: args.token,
          },
        });
        return data;
      } catch (e) {
        throw e;
      }
    },
    // Travelに紐づくScrapを登録する
    createScrap: async (parent, args) => { 
      try {
        const data = await prisma.scrap.create({
          data: {
            title: args.title,
            url: args.url,
            travelId: args.travelId,
          },
        });
        return data;
      } catch (e) {
        throw e;
      }
    }
  },
};

// resolvers自体の型を定義しているのと、モデルの型を定義している。
// モデルの定義 -> schemaから自動的に読み込む？
// いったんモデルも定義しないといけない
const typeDefs = gql`
  type Travel {
    id: Int
    name: String
    token: String
  }

  type Scrap {
    id:      Int
    travelId: Int
    title:    String
    url:      String
    mapUrl:   String
    Travel:   Travel
  }

  type Query {
    hello: String
    getTravelByToken(token: String!): Travel
  }

  type Mutation {
    loginTravelByToken(token: String!): Travel
    createScrap(title: String!, url: String!, travelId: Int!): Scrap
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
