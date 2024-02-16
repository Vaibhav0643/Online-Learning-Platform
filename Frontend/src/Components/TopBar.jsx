import { AppBar, Typography, Toolbar } from "@mui/material";

function TopBar(props) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          JLearn
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;
