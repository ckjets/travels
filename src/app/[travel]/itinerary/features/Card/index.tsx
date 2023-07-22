import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";

interface MediaCardProps {
  data: {
    title: string;
  };
}
export default function MediaCard(props: MediaCardProps) {
  const { data } = props;
  return (
    // <Card variant="outlined">
    //   <CardMedia
    //     component="img"
    //     height="100"
    //     image="/airplaine.png"
    //     alt="green iguana"
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       移動
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       Lizards are a widespread group of squamate reptiles, with over 6,000
    //       species, ranging across all continents except Antarctica
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Map</Button>
    //     {/* <Button size="small">Learn More</Button> */}
    //   </CardActions>
    // </Card>
    <Card sx={{ display: "flex" }}>
      {/* <CardMedia
        component="img"
        sx={{ width: 100 }}
        image="/airplaine.png"
        alt="Live from space album cover"
      /> */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="subtitle1">
            {data.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          test
        </Box>
      </Box>
    </Card>
  );
}
