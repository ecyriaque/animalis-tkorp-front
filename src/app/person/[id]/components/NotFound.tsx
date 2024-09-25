import { Card, CardContent, Typography, Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#F5F5F5"
    >
      <Card sx={{ maxWidth: 400, textAlign: "center", padding: 3 }}>
        <CardContent>
          <Typography variant="h4" color="error" gutterBottom>
            Person Not Found
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Sorry, the person you are looking for does not exist.
          </Typography>
          <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxX3f6/giphy.gif"
            alt="Not Found Animation"
            style={{ width: "100%", height: "auto", marginBottom: "16px" }}
          />
          <Typography variant="body2" color="textSecondary">
            Please check the URL or return to the homepage.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotFound;
