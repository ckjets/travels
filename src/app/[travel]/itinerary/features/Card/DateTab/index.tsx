import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { useEffect } from "react";

interface DateTabProps {
  itineraries: { id: number; date: string }[];

  setSelectedItinerary: React.Dispatch<
    React.SetStateAction<{ id: number; date: string } | undefined>
  >;
  selectedItinerary: { id: number; date: string } | undefined;
}
export default function DateTab(props: DateTabProps) {
  const { itineraries, setSelectedItinerary, selectedItinerary } = props;

  useEffect(() => {
    setSelectedItinerary(itineraries[0]);
  }, [itineraries, setSelectedItinerary]);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: { id: number; date: string }
  ) => {
    console.log("newValue", newValue);
    setSelectedItinerary(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
      <Tabs
        value={selectedItinerary}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {itineraries.map((itinary, index) => {
          return (
            <Tab
              key={index}
              label={dayjs(itinary.date).format("MM/DD")}
              value={itinary}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
