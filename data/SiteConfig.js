module.exports = {
  blogPostDir: "posts", // The name of directory that contains your posts.
  blogAuthorDir: "authors", // The name of directory that contains your 'authors' folder.
  blogAuthorId: "juan", // The default and fallback author ID used for blog posts without a defined author.
  siteTitle: "Juan González", // Site title.
  siteTitleAlt: "Juan González | Technical Marketing Consultant", // Alternative site title for SEO.
  siteLogo:"/logos/logo-192x192.png",
  siteUrl: "https://haysclark.github.io", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-starter-casper/.
  siteDescription:
      "Into people, marketing, tech, business, economics, games and science", // Website description used for RSS feeds/meta description tag.
  siteCover:
    "/images/transparent.png", // Optional, the cover image used in header for home page. e.g: "/images/blog-cover.jpg",
  siteNavigation: true, // If navigation is enabled the Menu button will be visible
  siteRss: "/rss.xml", // Path to the RSS file.
  siteRssAuthor: "Juan González", // The author name used in the RSS file
  // siteFBAppID: "1825356251115265", // optional, sets the FB Application ID for using app insights
  sitePaginationLimit: 10, // The max number of posts per page.
 // googleAnalyticsID: "UA-111982167-1", // GA tracking ID.
  // disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // enables Disqus comments, visually deviates from original Casper theme.
  siteSocialUrls: [
    "https://www.linkedin.com/in/juangc/",
    "mailto:hello@juangonzalez.com.au",
    "https://github.com/omgwtfwow",
    "https://api.whatsapp.com/send?phone=+61432110431"
  ],
  postDefaultCategoryID: "Default", // Default category for posts.
  // Links to social profiles/projects you want to display in the navigation bar.
  userLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/juangc/",
      iconClassName: "fa fa-linkedin" // Disabled, see Navigation.jsx
    },
    {
      label: "Email",
      url: "mailto:hello@juangonzalez.com.au",
      iconClassName: "fa fa-envelope" // Disabled, see Navigation.jsx
    },
    {
      label: "Phone",
      url: "tel:+61432110431",
      iconClassName: "fa fa-phone" // Disabled, see Navigation.jsx
    }
  ],
  // Copyright string for the footer of the website and RSS feed.
  copyright: {
    label: "" // Label used before the year
    // year: "2018" // optional, set specific copyright year or range of years, defaults to current year
    // url: "https://www.gatsbyjs.org/" // optional, set link address of copyright, defaults to site root
  },
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0", // Used for setting manifest background color.
  promoteGatsby: true // Enables the GatsbyJS promotion information in footer.
};
