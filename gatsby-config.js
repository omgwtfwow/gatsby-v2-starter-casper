const config = require("./data/SiteConfig");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const pathPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;

module.exports = {
	pathPrefix: config.pathPrefix,
	siteMetadata: {
		siteUrl: config.siteUrl + pathPrefix,
		rssMetadata: {
			site_url: config.siteUrl + pathPrefix,
			feed_url: config.siteUrl + pathPrefix + config.siteRss,
			title: config.siteTitle,
			description: config.siteDescription,
			image_url: `${config.siteUrl + pathPrefix}/logos/logo-512.png`,
			author: config.siteRssAuthor,
			copyright: `${config.copyright.label} © ${config.copyright.year ||
			new Date().getFullYear()}`
		}
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "posts",
				path: `${__dirname}/content/${config.blogPostDir}`
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "authors",
				path: `${__dirname}/content/${config.blogAuthorDir}`
			}
		},
		"gatsby-transformer-json",
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: "gatsby-remark-images",
						options: {
							maxWidth: 710
						}
					},
					{
						resolve: "gatsby-remark-responsive-iframe"
					},
					"gatsby-remark-prismjs",
					"gatsby-remark-copy-linked-files",
					"gatsby-remark-autolink-headers"
				]
			}
		},
		{
			resolve: "gatsby-plugin-nprogress",
			options: {
				color: config.themeColor
			}
		},
		"gatsby-plugin-sharp",
		"gatsby-plugin-catch-links",
		"gatsby-plugin-twitter",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: config.siteTitle,
				short_name: config.siteTitle,
				description: config.siteDescription,
				start_url: config.pathPrefix,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: "minimal-ui",
				icons: [
					{
						src: "/logos/logo-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "/logos/logo-512x512.png",
						sizes: "512x512",
						type: "image/png"
					}
				]
			}
		},
		"gatsby-plugin-offline",
		{
			resolve: "gatsby-plugin-feed",
			options: {
				setup(ref) {
					const ret = ref.query.site.siteMetadata.rssMetadata;
					ret.allMarkdownRemark = ref.query.allMarkdownRemark;
					ret.generator = "GatsbyJS Casper Starter";
					return ret;
				},
				query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
				feeds: [
					{
						serialize(ctx) {
							const {rssMetadata} = ctx.query.site.siteMetadata;
							return ctx.query.allMarkdownRemark.edges.map(edge => ({
								categories: edge.node.frontmatter.tags,
								date: edge.node.frontmatter.date,
								title: edge.node.frontmatter.title,
								description: edge.node.excerpt,
								author: rssMetadata.author,
								url: rssMetadata.site_url + edge.node.fields.slug,
								guid: rssMetadata.site_url + edge.node.fields.slug,
								custom_elements: [{"content:encoded": edge.node.html}]
							}));
						},
						query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields { slug }
                    frontmatter {
                      title
                      cover
                      date
                      category
                      tags
                      author
                    }
                  }
                }
              }
            }
          `,
						output: config.siteRss
					}
				]
			}
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl: "https://juangonzalez.com.au",
			}
		},
		{
			resolve: `gatsby-plugin-segment-js`,
			options: {
				// your segment write key for your production environment
				// when process.env.NODE_ENV === 'production'
				// required; non-empty string
				prodKey: process.env.GATSBY_SEGMENT_KEY,

				// if you have a development env for your segment account, paste that key here
				// when process.env.NODE_ENV === 'development'
				// optional; non-empty string
				devKey: process.env.GATSBY_SEGMENT_DEV_KEY,

				// boolean (defaults to false) on whether you want
				// to include analytics.page() automatically
				// if false, see below on how to track pageviews manually
				trackPage: true,

				// boolean (defaults to false); whether to delay load Segment
				// ADVANCED FEATURE: only use if you leverage client-side routing (ie, Gatsby <Link>)
				// This feature will force Segment to load _after_ either a page routing change
				// or user scroll, whichever comes first. This delay time is controlled by
				// `delayLoadTime` setting. This feature is used to help improve your website's
				// TTI (for SEO, UX, etc).  See links below for more info.
				// NOTE: But if you are using server-side routing and enable this feature,
				// Segment will never load (because although client-side routing does not do
				// a full page refresh, server-side routing does, thereby preventing Segment
				// from ever loading).
				// See here for more context:
				// GIF: https://github.com/benjaminhoffman/gatsby-plugin-segment-js/pull/19#issuecomment-559569483
				// TTI: https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#performance
				// Problem/solution: https://marketingexamples.com/seo/performance
				delayLoad: false,

				// number (default to 1000); time to wait after scroll or route change
				// To be used when `delayLoad` is set to `true`
				// delayLoadTime: 1000
			}
		},
		// Deployment stuff
		{
			resolve: `gatsby-plugin-prefetch-google-fonts`,
			options: {
				fonts: [
					{
						family: `Cardo`,
						variants: [`400`, `700`]
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-s3`,
			options: {
				bucketName: process.env.GATSBY_S3_BUCKET,
				region: process.env.GATSBY_S3_REGION,
				protocol: "https",
				hostname: "juangonzalez.com.au",
				acl: null
			},
		},
		"local-plugin",
		{
			// gzip compression
			resolve: 'gatsby-plugin-zopfli',
			options: {
				extensions: ['css', 'html', 'js', 'jsx', 'svg', 'png', 'mp4', 'jpg', 'jpeg', 'ico', 'webm', 'txt'],
				verbose: true
			}
		},
	]
};
