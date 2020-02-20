const path = require(`path`)
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({graphql, actions}) => {
  const { createPage } = actions

  const workPost = path.resolve(`./src/templates/work-post.js`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )
    if (result.errors) {
      throw new Error(result.errors)
    }

    //Create work post pages
    const works = result.data.allMarkdownRemark.edges

    works.forEach((work, index) => {
      const previous = index === works.length - 1 ? null : works[index + 1].node
      const next = index === 0 ? null : works[index - 1].node
      
      createPage({
        path: work.node.fields.slug,
        component: workPost,
        context: {
          slug: work.node.fields.slug,
          previous,
          next,
        },
      })
    return null
    })
};

exports.onCreateNode = ({node, actions, getNode}) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
