import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.posts.nodes')
    const [billboard] = get(this, 'props.data.welcome.nodes')
    
    return (
      <Layout location={this.props.location}>
        <Hero
          image={billboard.heroImage.gatsbyImageData}
          title={billboard.title}
          content={billboard.description}
        />
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    posts: allContentfulPost(
      sort: { fields: [publishDate], order: ASC }
      filter: { index: { eq: "home" } }
    ) {
      nodes {
        path
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        heroImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
      }
    }
    welcome: allContentfulPost( filter: { slug: { eq: "welcome" } } ) {
      nodes {
        title
        description {
          raw
        }
        heroImage {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 1180
          )
        }
      }
    }
  }
`
