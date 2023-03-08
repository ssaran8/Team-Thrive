import { Box, Card, CircularProgress, Divider, Typography } from "@mui/material"
import ReactECharts from 'echarts-for-react';
import dayjs from "dayjs";
import { useTheme } from '@mui/material/styles';
import { Container } from "@mui/system";

// Component that represents the users history of task completion.
export const History = ({ summary, loading }) => {
  const theme = useTheme();
  const weekOption = {
    grid: {
      top: 0
    },
    xAxis: {
      type: 'category',
      data: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
    yAxis: {
      type: 'value',
      show: false,
      max: 100,
    },
    color: theme.palette.primary.main,
    series: [
      {
        data: [...summary.week],
        type: 'bar',
        max: 100,
        showBackground: true,
      }
    ],
    tooltip: {
      show: true,
      axisPointer: {
        type: 'none'
      },
    }
  }

  const monthOption = {
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      inRange: {
        color: [theme.palette.grey['50'], theme.palette.primary.main]
      },
    },
    calendar: {
      left: 'center',
      orient: 'vertical',
      range: `${dayjs().year()}-${dayjs().month()}`,
      cellSize: 45,
      yearLabel: {
        show: false,
      },
      monthLabel: {
        show: false,
      }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: [...summary.month].map((val, idx) => [`${dayjs().year()}-${dayjs().month()}-${idx + 1}`, val])
    },
    tooltip: {
      position: 'top'
    },
  }

  return (
    <Card
      sx={{
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        '& h2': { alignSelf: 'center' },
        '& hr': { border: '0.1px solid #ccc', width: '100%' },
        '& h3': { alignSelf: 'center' },
        '& *': { m: 0 },
        height: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}  
      >
        <Typography
          variant="h4"
          align="center"
        >
          History 
        </Typography>
        {loading && <CircularProgress sx={{position: "absolute", ml: 20}} size={20} />}
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <Container sx={{ mt: 2 }}>
          <Typography variant='h6' align='center' sx={{ p: 0, m: 0 }}>This Week</Typography>
          <ReactECharts option={weekOption} />
        </Container>
        <Container sx={{ mt: 2, height: '100%', }}>
          <Typography variant='h6' align='center' sx={{ p: 0, m: 0 }}>This Month</Typography>
          <ReactECharts option={monthOption} />
        </Container>
      </Box>
    </Card>
  )
}