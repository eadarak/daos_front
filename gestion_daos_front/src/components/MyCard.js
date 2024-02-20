
import { Card, CardContent, Grid, Skeleton } from "@mui/material";
import ImagePlaceholder from "./ImagePlaceholder";

const MyCard = () => {
  return (
   
    <Card sx={{ backgroundColor: "#5e35b1", borderRadius: 5,  maxWidth: 350 }}>
      
      <CardContent>
      
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
              <ImagePlaceholder>
                <Skeleton variant="rectangular" width={34} height={34} sx={{ backgroundColor: "#000000" }} />
                
                </ImagePlaceholder>
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" width={34} height={34} sx={{ backgroundColor: "#e0e0e0" }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Skeleton variant="rectangular" sx={{ my: 2, height: 40, backgroundColor: "#e0e0e0" }} />
          </Grid>
          <Grid item>
            <Skeleton variant="rectangular" height={30} sx={{ backgroundColor: "#e0e0e0" }} />
          </Grid>
        </Grid>
        
      </CardContent>
      
    </Card>

  );
};

export default MyCard;