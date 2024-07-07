import SplitPaneComponent from "@/components/SplitPane";
import { Grid } from "@mui/material";

export default function Home() {

  return (
    <>
    <Grid container>
    <Grid sx={{display:{xs:'none',md:'block'}}} xs={12}> <SplitPaneComponent /></Grid>
    <Grid sx={{display:{xs:'block',md:'none'}}}  xs={12}> dsfsdf</Grid>
    </Grid>
    </>
  );
}
