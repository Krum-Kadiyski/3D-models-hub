import { Card, CardContent, Typography } from "@mui/material";
import CountUp from "react-countup";

const Statistic = ({ title, value }) => (
  <Card variant="outlined" sx={{ width: 250, p: 1 }}>
    <CardContent>
      <Typography variant="body1" align="center">
        {title}
      </Typography>
      <Typography variant="h6" align="center" fontWeight={600}>
        <CountUp end={value} separator="," />
      </Typography>
    </CardContent>
  </Card>
);

export default Statistic;
