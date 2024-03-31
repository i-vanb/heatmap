import React from "react";
import { HighchartsWidget, HandsontableWidget } from "./widgets";
import {
  Alert,
  AppBar,
  Box,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {HeatmapContextProvider} from "./context";
import {HeaderButtonGroup} from "./components/HeaderButtonGroup";


function App() {
  return (
    <HeatmapContextProvider>
      <Box className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h1"
              noWrap
              component="div"
              sx={{fontSize: 20, flexGrow: 1}}
            >
              Developer Assessment
            </Typography>
            <Box>
              <Typography
                variant="overline"
                component="span"
                sx={{marginRight: 3}}
              >
                Data Source:
              </Typography>
              <HeaderButtonGroup />
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{paddingTop: 3}} maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Typography variant="h5" sx={{marginBottom: 1}}>
                Highcharts Heatmap
              </Typography>
              <Alert severity="success">
                Modified the highcharts-widget so that it returns a heatmap
                using &nbsp;
                <Link
                  href="https://www.npmjs.com/package/highcharts"
                  target="_blank"
                >
                  highcharts
                </Link>
                .
              </Alert>
              <HighchartsWidget  />
            </Grid>
            <Grid item lg={12}>
              <Typography variant="h5" sx={{marginBottom: 1}}>
                Handsontable Heatmap
              </Typography>
              <Alert severity="success">
                Modified the handsontable-widget so that it returns a heatmap
                using &nbsp;
                <Link
                  href="https://www.npmjs.com/package/handsontable"
                  target="_blank"
                  underline="hover"
                >
                  handsontable
                </Link>
              </Alert>
              <HandsontableWidget />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </HeatmapContextProvider>
  );
}

export default App;