import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { gql } from "graphql-tag";
import { Travel } from "@prisma/client";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { resolvers as scalarResolvers } from "graphql-scalars";
import dayjs from "dayjs";

const prisma = new PrismaClient();
const resolvers = {
  // データ取得のための関数
  Query: {
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/#handling-arguments
    getTravelByToken: (parent, args) => {
      const data = prisma.travel.findUnique({
        where: {
          token: args.token,
        },
      });
      return data;
    },
    getItinerary: async (parent, args) => {
      const travel = await prisma.travel.findUnique({
        where: {
          token: args.token,
        },
      });

      if (!travel) {
        throw new Error("Travel not found");
      }

      const data = await prisma.itinerary.findMany({
        where: {
          travelId: travel.id,
        },
        // inlucdeのscheduleを返却する際に、startTimeが昇順のデータから返却したい
        // startTimeがStringのため、orderByでソートできない
        include: {
          schedule: {
            orderBy: {
              startTime: "asc",
            },
          },
        },
      });
      console.log(data);
      return data;
    },
  },
  // データの更新のための関数
  Mutation: {
    createTravel: async (parent, args) => {
      try {
        const travel = await prisma.travel.create({
          data: {
            name: args.name,
            // ランダムの英語と数字を混ぜた文字列を生成する
            token: Math.random().toString(36).slice(-8),
            startDate: args.startDate,
            endDate: args.endDate,
          },
        });

        const startDate = new Date(args.startDate);
        const endDate = new Date(args.endDate);
        const diffInDays = Math.floor(
          (endDate - startDate) / (1000 * 60 * 60 * 24)
        );

        const itineraryData = [];
        for (let i = 0; i <= diffInDays; i++) {
          const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
          itineraryData.push({
            date,
            travelId: travel.id,
            // title: "a",
          });
        }

        await prisma.itinerary.createMany({
          data: itineraryData,
        });

        return travel;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
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
    /** itineraryに紐づくScheduleを登録する */
    createSchedule: async (parent, args) => {
      try {
        const data = await prisma.schedule.create({
          data: {
            title: args.title,
            startTime: args.startTime,
            itineraryId: args.itineraryId,
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
    },
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
    startDate: String
    endDate: String
  }

  type Itinerary {
    id: Int
    date: DateTime
    travelId: Int
    schedule: [Schedule!]!
  }

  type Schedule {
    id: Int
    itineraryId: Int
    title: String
    startTime: DateTime
  }

  type Scrap {
    id: Int
    travelId: Int
    title: String
    url: String
    mapUrl: String
    Travel: Travel
  }

  type Query {
    hello: String
    getTravelByToken(token: String!): Travel
    getItinerary(token: String!): [Itinerary]
  }

  type Mutation {
    loginTravelByToken(token: String!): Travel
    createScrap(title: String!, url: String!, travelId: Int!): Scrap
    createTravel(name: String!, startDate: String!, endDate: String!): Travel
    createSchedule(
      title: String!
      startTime: String!
      itineraryId: Int!
    ): Schedule
  }
`;

const server = new ApolloServer({
  resolvers: [resolvers, scalarResolvers],
  typeDefs: [typeDefs, scalarTypeDefs],
});

export default startServerAndCreateNextHandler(server);
