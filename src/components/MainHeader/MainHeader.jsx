import React from "react";
import classNames from "classnames";
import "./MainHeader.css";
import VideoBackground from "../VideoCover/VideoCover";

class MainHeader extends React.Component {
  render() {
    const { children, cover, video, className } = this.props;
    const classes = classNames("main-header", className, {
      "no-cover": !cover
    });

    const getStyle = () => {
      if (cover) {
        return { backgroundImage: `url("${cover}")` };
      }
      return null;
    };

    return (
      <header className={classes} style={getStyle()}>
        <VideoBackground video={video} />
        {children}
      </header>
    );
  }
}

export default MainHeader;
