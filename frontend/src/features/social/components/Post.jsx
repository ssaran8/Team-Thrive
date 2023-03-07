import { Avatar, Paper, Box, Typography } from "@mui/material";

import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import AddCommentIcon from '@mui/icons-material/AddComment';


export const Post = ({uid, content}) => {
    return (
        <Paper sx={{ width: '100%', height: '190px', borderRadius: '10px', marginTop: '10px' }}>
          <Box sx={{ padding: "10px" }}>
            <Box sx={{  display: 'flex', alignItems: 'center' }}> 
              <Avatar sx={{ height: "55px", width:'55px', marginRight: '10px' }} />
              <Box>
                <Typography variant='h6' sx={{mb: '-5px'}}> {uid} </Typography>
                {/* <Typography variant='caption'> CS Student @ UW </Typography> */}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ml: '5px', mt: '20px'}}> {content} </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '5px'}}>
                    <EnergySavingsLeafIcon sx={{ fontSize: '12px', marginRight: '3px', color: '#5bebbd' }}/>
                    <span style={{ fontSize: '12px', fontWeight: '500', color: 'grey'}}>100</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '5px', cursor: 'pointer'}}>
                    <span style={{ fontSize: '12px', fontWeight: '500', color: 'grey'}}>20 comments</span>
                </Box>
            </Box>
            <hr style={{  marginLeft: '5px', marginRight: '5px'}}></hr>
            <Box sx={{  display: 'flex', marginLeft: '5px'}} >
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer' }}>
                    <EnergySavingsLeafIcon sx={{ fontSize: '15px', marginRight: '3px', color: 'grey' }}/>
                    <span style={{ fontSize: '15px', fontWeight: '500', color: 'grey'}}>Like</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer' }}>
                    <AddCommentIcon sx={{ fontSize: '15px', marginRight: '3px', color: 'grey' }}/>
                    <span style={{ fontSize: '15px', fontWeight: '500', color: 'grey'}}>Comment</span>
                </Box>
            </Box>
          </Box>
        </Paper>
    )
    
}