import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import * as styles from '../templates/blog-post.module.css'

class RootIndex extends React.Component {
	constructor(props) {
		super(props)
		this.i = 0
		console.log(this.i)
		this.heros = get(this, 'props.data.heros.nodes.ticks')
		console.log(this.heros)
		this.state = {
		  hero: this.heros[i]
		}
		console.log(this.state.hero)
	}
  render() {
    const posts = get(this, 'props.data.posts.nodes')
    const pins = get(this, 'props.data.pins.nodes')
    const pinsPosts = [...pins, ...posts]
    const h = this.state.hero

    return (
      <Layout location={this.props.location}>
	<Hero
	  image={h.heroImage.gatsbyImageData}
	  title={h.title}
	  content={h.description}
	/>
	<div className={styles.article}>
	  <div className={styles.body}>
	    {h.body?.raw && renderRichText(h.body)}
	  </div>
	</div>
	<ArticlePreview posts={pinsPosts} />
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
    heros: allContentfulTicker( filter: { slug: { eq: "welcome" } } ) {
      nodes {
	ticks { 
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
    
  }
`
