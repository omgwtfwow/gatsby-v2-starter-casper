/* eslint-disable react/destructuring-assignment */
import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-scroll";
// import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Drawer from "../components/Drawer/Drawer";
import Navigation from "../components/Navigation/Navigation";
import SiteWrapper from "../components/SiteWrapper/SiteWrapper";
import Footer from "../components/Footer/Footer";
import MainContent from "../components/MainContent/MainContent";
import MainHeader from "../components/MainHeader/MainHeader";
import MainNav from "../components/MainNav/MainNav";
import MenuButton from "../components/MenuButton/MenuButton";
import PageTitle from "../components/PageTitle/PageTitle";
import PageDescription from "../components/PageDescription/PageDescription";
// import PaginatedContent from "../components/PaginatedContent/PaginatedContent";
import SocialMediaIcons from "../components/SocialMediaIcons/SocialMediaIcons";
import Layout from "../components/layout";
import PostFormatting from "../components/PostFormatting/PostFormatting";
import AuthorImage from "../components/AuthorImage/AuthorImage";
import PostHeader from "../components/PostHeader/PostHeader";

class IndexTemplate extends React.Component {
  state = {
    menuOpen: false
  };

  handleOnClick = evt => {
    evt.stopPropagation();
    if (this.state.menuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };

  handleOnClose = evt => {
    evt.stopPropagation();
    this.closeMenu();
  };

  openMenu = () => {
    this.setState({ menuOpen: true });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    const {
      nodes
    } = this.props.pageContext;

    return (
      <Layout location={this.props.location}>
        <Drawer className="home-template" isOpen={this.state.menuOpen}>
          <Helmet title={config.siteTitle} />
          <SEO postEdges={nodes} />

          {/* The blog navigation links */}
          <Navigation config={config} onClose={this.handleOnClose} />

          <SiteWrapper>
            {/* All the main content gets inserted here */}
            <div className="home-template">
              {/* The big featured header */}
              <MainHeader className="main-header video-container" cover={config.siteCover} video="/videos/bg.mp4">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <MainNav overlay={config.siteCover}>
                  <MenuButton
                    navigation={config.siteNavigation}
                    onClick={this.handleOnClick}
                  />
                </MainNav>
                <div className="vertical">
                  <div className="main-header-content inner">
                    <PageTitle text={config.siteTitle} />
                    <PageDescription text={config.siteDescription} />
                    <SocialMediaIcons
                      urls={config.siteSocialUrls}
                      color="#ffffffcc"
                    />
                  </div>
                </div>
                <Link
                  className="scroll-down icon-arrow-left"
                  to="content"
                  data-offset="-45"
                  spy
                  smooth
                  duration={500}
                >
                  <span className="hidden">Scroll Down</span>
                </Link>
              </MainHeader>
              <MainContent>
                <PostFormatting className="post">
                  <AuthorImage author={{
                          name:"Juan",
                          profile_image:"/images/juan.jpg",
                          website:"https://juangonzalez.com.au"
                          }}
                  />
                  <PostHeader>
                    <h2 className="post-title">{ this.props.data.homePost.nodes[0].frontmatter.title }</h2>
                    <section className="post-meta" />
                  </PostHeader>

                  <section
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: this.props.data.homePost.nodes[0].html }}
                  />

                </PostFormatting>
              </MainContent>
              {/* PostListing component renders all the posts */}
              {/* <PostListing postEdges={nodes} postAuthors={authors} /> */}

            </div>

            {/* The tiny footer at the very bottom */}
            <Footer
              copyright={config.copyright}
              promoteGatsby={config.promoteGatsby}
            />
          </SiteWrapper>
        </Drawer>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
query IndexQuery {
  authors: allAuthorsJson {
    edges {
      node {
        uid
        name
        profile_image
        url
        bio
      }
    }
  }
  homePost: allMarkdownRemark(filter: {fields: {slug: {eq: "/about-me"}}}) {
    nodes {
      html
      frontmatter {
        title
        author
      }
    }
  }
}
`;

export default IndexTemplate;
