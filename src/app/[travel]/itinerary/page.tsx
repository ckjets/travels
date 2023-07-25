"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import {
  Avatar,
  Box,
  chakra,
  Flex,
  Heading,
  Stack,
  Input,
  Button,
  VStack,
  StackDivider,
  Tag,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaExternalLinkAlt, FaPen } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import Header from "../Header";
import { useEffect, useState } from "react";
import ScrapModal from "@/components/ScrapModal";
import { useScrapContext } from "../../context/scrap";
import Footer from "@/components/Footer";
import { apolloClient } from "../../../graphql/client";

import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import MediaCard from "./features/Card";
import DateTab from "./features/Card/DateTab";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { getSessionStorageItem } from "@/utils/sessionStorage";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ScheduleModal from "./features/ScheduleModal";
import dayjs from "dayjs";

export default function Itinerary() {
  const router = useRouter();

  const { isOpenScrapModal, setIsOpenScrapModal } = useScrapContext();
  const [isOpenScheduleModal, setIsOpenScheduleModal] = useState(false);
  const [itineraries, setItineraries] = useState<
    { id: number; date: string }[]
  >([]);
  const [selectedItinerary, setSelectedItinerary] = useState<{
    id: number;
    date: string;
  }>();

  const [schedules, setSchedules] = useState<
    {
      title: string;
      startTime: string;
    }[]
  >([]);

  const GET_ITINARY_BY_TOKEN = gql`
    query getItinerary($token: String!) {
      getItinerary(token: $token) {
        id
        date
        schedule {
          title
          startTime
        }
      }
    }
  `;
  const { data, loading, error, refetch } = useQuery(GET_ITINARY_BY_TOKEN, {
    variables: { token: getSessionStorageItem("travelToken") },
  });

  useEffect(() => {
    if (!data) return;
    const dates = data.getItinerary.map((d) => {
      return { id: d.id, date: d.date };
    });

    setItineraries(dates);
    setSelectedItinerary(data.getItinerary[0]);
    // console.log(data.getItinerary[0])
    setSchedules(data.getItinerary[0].schedule);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const targetItinerary = data.getItinerary.find(
      (d) => d.id === selectedItinerary?.id
    );
    console.log("targetItinerary", targetItinerary);

    setSchedules(targetItinerary?.schedule ?? []);
  }, [data, selectedItinerary]);

  useEffect(() => {
    console.log("selectedItinerary", selectedItinerary);
  }, [selectedItinerary]);

  return (
    <>
      {/* headerの高さ分だけpaddingを設定 */}
      <main>
        {!data ? (
          <div>...loading</div>
        ) : (
          <Box maxW={480} style={{ height: "100%", margin: "auto" }}>
            <div style={{ paddingTop: 80, paddingBottom: 160 }}>
              <DateTab
                {...{ itineraries, selectedItinerary, setSelectedItinerary }}
              />
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setIsOpenScheduleModal(true)}
              >
                <AddIcon />
              </Fab>

              {schedules.length === 0 ? (
                <div>予定がありません。追加しましょう。</div>
              ) : (
                <Timeline>
                  {schedules.map((d, index) => {
                    return (
                      <TimelineItem key={index}>
                        <TimelineOppositeContent
                          color="text.secondary"
                          sx={{ maxWidth: 100 }}
                        >
                          {dayjs(d.startTime).format("hh:mm A")}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          {/* Card */}
                          <MediaCard data={{ title: d.title }} />
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              )}
            </div>
            <Footer token="hoge" />
            <ScheduleModal
              isOpen={isOpenScheduleModal}
              setIsOpen={setIsOpenScheduleModal}
              itinarary={selectedItinerary}
              refetch={refetch}
            />
          </Box>
        )}
      </main>
    </>
  );
}
