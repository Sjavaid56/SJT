import React, {useState,useEffect, useContext} from "react";
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl'
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import PinIcon from './PinIcon';
import Context from "../context";
import Blog from './Blog'
const INITAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13 
}

const Map = ({ classes }) => {
  const { state, dispatch } =  useContext(Context) 
  const [viewport, setViewport] = useState(INITAL_VIEWPORT)
  const [userPostion, setUserPostion] = useState(null)
  useEffect(() => {
    getUserPostion()
  }, [])
  
  const getUserPostion = () => {
    if("geolocation" in navigator)
    navigator.geolocation.getCurrentPosition(postion => {
      const {latitude, longitude} = postion.coords
      setViewport({...viewport, latitude, longitude})
      setUserPostion({latitude, longitude});
    });
    }
  
    const handleMapClick = ({ lngLat, leftButton }) => {
      if (!leftButton) return
      if (!state.draft) {
        dispatch({ type: "CREATE_DRAFT" })
      }
      const [longitude, latitude] = lngLat
      dispatch({
        type: "UPDATE_DRAFT_LOCATION",
        payload: { longitude, latitude }
      });
    };
  
  
  return (
    <div className={classes.root}>
      <ReactMapGL 
      width="100vw"
      height="calc(100vh - 64px)"
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
      mapboxApiAccessToken="pk.eyJ1Ijoic2hhd25qYXZhaWQiLCJhIjoiY2p2bXdxY2w1MWg4ZzQzbzk3M3pxaG01cCJ9.TbByNV0PMJozp3_2WhHUgA"
      onViewportChange={newViewport => setViewport(newViewport)}
      onClick={handleMapClick}
      {...viewport}
      >
        {/* navigationControl */}

     <div className={classes.navigationControl}>
      <NavigationControl
      onViewportChange={newViewport => setViewport(newViewport)}
      /> 
     </div>
      {/* pin for user location  */}

      {userPostion && (
       <Marker
       latitude={userPostion.latitude}
       longitude={userPostion.longitude}
       offsetLeft={-19}
       offsetTop={-37}
       >
         <PinIcon size={40} color='red'/>
       </Marker>
      )}
      {/* draft pin  */}
          {state.draft && (
            <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
            >
              <PinIcon size={40} color='hot-pink'/>
            </Marker>
          )} 
      </ReactMapGL>

      {/* blog area  */}

      <Blog /> 
    </div> 
  )

          }


const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
