import { Box } from "@mui/material";


export const ContentLayout = ({title, children}) => {
  return (
    <Box
      sx={{
        p: 5,
        height:`100%`,
        width: '100%',
      }}
    >
      <h2 style={{marginTop: 0, marginLeft: '20px'}}>{title}</h2>
      <Box
        sx={{
          outline: 'rgba(100,100,100,0.5) solid',
          width: '100%',
          height: `calc(100% - ${32+20}px)`,
          borderRadius: 10,
          p: 5
        }}
      >
        {children}
      </Box>
    </Box>
  );
}