import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import Layout from "../components/layout"

class WorkPostTemplate extends React.Component {
  render() {
    const work = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={work.frontmatter.title}
          description={work.frontmatter.description || work.excerpt}
        />
        <article></article>
      </Layout>
    )
  }
}

export default WorkPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`