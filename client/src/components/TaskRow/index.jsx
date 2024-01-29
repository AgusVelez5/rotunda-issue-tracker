import React from 'react';
import { Card, Typography, Box, CardContent, Button } from '@mui/material';
import dayjs from 'dayjs';
import envs from '../../utils/envs';

const TaskRow = ({title, number, labels, assignees, score, opener, created_at, ...props }) => {
  return (
    <Card sx={{ mb: '5px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pl: 1, pb: 1, flex: 0.1 }}>
          <Typography variant="h6" color={score >= envs.CRITIC_SCORE ? 'red': 'black'}>{score}</Typography>
        </Box>
        <CardContent sx={{ flex: 0.9 }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            #{number}, opened {dayjs(Date.now()).diff(created_at, 'days')} days by {opener}
          </Typography>
          <Box>
            {labels.map((tagName) => <Button key={tagName} variant="outlined" sx={{borderRadius: 20}}>{tagName}</Button>)}
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
};

export default TaskRow;
