import React, {Component} from "react";
import createYouTube from 'react-youtube-component';

const YouTube = createYouTube();

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.playerVars = {
          autoplay: 0,
          color: 0,
          controls: 1,
          videoId: props.videoId,
          height: props.height,
          width: props.width

        };
      }
     
      onStateChange = (event) => {
        // do something with the state change event
      };
     
      onReady = (event) => {
        // your player is now ready
        this.player.loadVideoById(this.playerVars.videoId);
      };
     
      onPlayer = (player) => {
        // save your player reference for later
        this.player = player;
      };
     
      onClick = (event) => {
        // interact with your player using javascript methods
      };

      onLoad = (event) => {
        // interact with your player using javascript methods
        this.player.loadVideoById(this.playerVars.videoId);
      };
     
      render() {
        return (
          <div id="video-frame">
            <YouTube
              height={this.playerVars.height}
              width={this.playerVars.width}
              videoId={this.playerVars.videoId}
              playerVars={this.playerVars}
              onStateChange={this.onStateChange}
              onReady={this.onReady}
              onPlayer={this.onPlayer}
              onLoad={this.onLoad}
            />
          </div>
        );
      }
    };

  export default VideoPlayer;