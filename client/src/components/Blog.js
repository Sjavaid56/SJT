import React, {useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import NoContent from './Pin/NoContent'
import CreatePin from './Pin/CreatePin'
import Context from '../context'
const Blog = ({ classes }) => {
  const {state} = useContext(Context)
  const {draft} = state
  
  let Blogcontent;

  if(!draft){
    Blogcontent = NoContent
  } else if (draft) {
    Blogcontent = CreatePin
  }
  return ( 
    <Paper className={classes.root}>
      <Blogcontent />
    </Paper>
  )
}
const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center"
  },
  rootMobile: { 
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
};

export default withStyles(styles)(Blog);
