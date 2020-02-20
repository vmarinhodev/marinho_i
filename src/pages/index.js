import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SiteIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const works = data.allMarkdownRemark.edges
  let workCounter = 0

  return (
    <Layout title={siteTitle}>
      <SEO 
        title="Work"
        keywords={[`vmarinho`, `portfolio`, `gatsby`, `javascript`, `react`]}
      />
      {data.site.siteMetadata.description && ( 
        
          <h2>
          {data.site.siteMetadata.description}
          </h2>
        
      )}
      
      <div className="post-feed">
        this is body div for home page
      </div>

    </Layout>
  )
}
  const indexQuery = graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM D, YYYY")
              title
              description
            }
          }
        }
      }
    }
  `

  export default props => (
    <StaticQuery
      query={indexQuery}
      render={data => (
        <SiteIndex location={props.location} props data={data} {...props} />
      )}
    />
  )
