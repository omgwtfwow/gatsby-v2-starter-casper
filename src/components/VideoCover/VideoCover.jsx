import React from 'react';
import VideoCover from 'react-video-cover'

class VideoBackground extends React.Component {
    state = {
        // eslint-disable-next-line react/no-unused-state
        resizeNotifier: () => {},
    }

    render() {
        const { video } = this.props;

        const videoOptions = {
            src: video,
            autoPlay: true,
            loop: true,
            muted: true
        };
        const style = {
            width: '100%',
            height: '100%',
            position: 'absolute',
            objectFit: 'cover',
            top: 0,
            left: 0,
            zIndex: 0,

        };
        return (
          <div style={style}>

            <VideoCover
              videoOptions={videoOptions}
              remeasureOnWindowResize
              getResizeNotifier={resizeNotifier => {
                        this.setState({
                            // eslint-disable-next-line react/no-unused-state
                            resizeNotifier,
                        });
                    }}
            />
          </div>
        );
    }
}
export default VideoBackground;
