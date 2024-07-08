import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image=""
          alt="3D Model"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            3D Model
          </Typography>
          <Typography variant="body2" color="text.secondary">
           3D Model of something
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
