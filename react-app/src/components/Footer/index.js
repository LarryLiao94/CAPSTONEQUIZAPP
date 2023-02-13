import {
  Grid,
  Typography,
  Container,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Footer.css"

const Footer = () => {
  return (
    <Grid container bgcolor="#F8F9FA" rowSpacing={4} mt={4} className="footer">
      <Container>
        <Grid item>
          <Box py={1}>
            <Typography display="inline" variant="body2" color="textSecondary">
              Follow me
            </Typography>
            <IconButton href="www.linkedin.com/in/larry-liao-704a85143">
              <LinkedInIcon />
            </IconButton>
            <IconButton href="https://github.com/LarryLiao94/CAPSTONEQUIZAPP">
              <GitHubIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Box py={1} display="flex" alignItems="center">
            <Typography variant="body2" color="textSecondary" align="center">
              This website is for educational
              purposes only. All logos, trademarks, and content belong to their
              respective owners.
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Footer;