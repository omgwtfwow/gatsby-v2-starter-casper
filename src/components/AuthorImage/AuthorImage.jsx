/* eslint-disable camelcase */
import React from "react";
import "./AuthorImage.css";

class AuthorImage extends React.Component {
    render() {
        const {
            author: { name, profile_image, website }
        } = this.props;
        if (profile_image) {
            return (
              <figure className="author-image">
                <a
                  className="img"
                  href={website}
                  style={{ backgroundImage: `url("${profile_image}")` }}
                  rel="no-follow"
                >
                  <span className="hidden">{`${name}'s Picture`}</span>
                </a>
              </figure>
            );
        }
        return null;
    }
}

export default AuthorImage;
