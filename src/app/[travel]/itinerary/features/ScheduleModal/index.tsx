import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itinarary:
    | {
        id: number;
        date: string;
      }
    | undefined;
  refetch: () => void;
}
export default function ScheduleModal(props: ModalProps) {
  const { isOpen, setIsOpen, itinarary, refetch } = props;
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // graphql
  const CREATE_SCHEDULE = gql`
    mutation createSchedule(
      $title: String!
      $startTime: String!
      $map: String
      $itineraryId: Int!
    ) {
      createSchedule(
        title: $title
        startTime: $startTime
        map: $map
        itineraryId: $itineraryId
      ) {
        id
      }
    }
  `;
  const [mutate, { data, loading, error }] = useMutation(CREATE_SCHEDULE);

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [map, setMap] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      variables: {
        title: title,
        startTime: startTime,
        itineraryId: itinarary?.id,
        map: "",
      },
      onCompleted: (data) => {
        window.alert("追加に成功しました");
        handleClose();
        refetch();

        // refetchしたい
      },
    });
  };

  useEffect(() => {
    setStartTime(dayjs(itinarary?.date));
  }, [itinarary?.date]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* MUI form */}
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              プランを追加する
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TimePicker
                label="開始時間"
                defaultValue={dayjs(itinarary?.date)}
                onChange={(date) => {
                  setStartTime(date);
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="タイトル"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="map url"
                onChange={(e) => {
                  setMap(e.target.value);
                }}
              />
            </Box>
            <Button variant="contained" sx={{ mt: 2 }} type="submit">
              追加
            </Button>
          </form>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
