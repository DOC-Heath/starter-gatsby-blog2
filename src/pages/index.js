import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import * as styles from '../templates/blog-post.module.css'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.pins.nodes')
    const [billboard] = get(this, 'props.data.welcome.nodes')
    
    return (
      <Layout location={this.props.location}>
        <Hero
          image={billboard.heroImage.gatsbyImageData}
          title={billboard.title}
          content={billboard.description}
        />
        <div className={styles.article}>
          <div className={styles.body}>
            {billboard.body?.raw && renderRichText(billboard.body)}
          </div>
        </div>
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    pins: allContentfulPost(
      limit: 7
      sort: { fields: [startTime], order: ASC }
      filter: { pinToTopOf: { eq: "home" } }
    ) {
      nodes {
        path
        title
        slug
        videoUrl
        startTime
        publishDate(formatString: "MMMM Do, YYYY")
        metadata { tags { name, id } }
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
    posts: allContentfulPost(
      limit: 21
      sort: { fields: [startTime], order: DESC }
      filter: { index: { eq: "home" } }
    ) {
      nodes {
        path
        title
        slug
        videoUrl
        startTime
        publishDate(formatString: "MMMM Do, YYYY")
        metadata { tags { name, id } }
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
        body { 
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
