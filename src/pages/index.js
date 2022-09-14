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
		this.t0 = props.data.heros.firstTickTime*1000 || 9000
		this.t  = props.data.heros.tickTime*1000 || 7000
		if (props.data.heros.reEntry === undefined) { 
			this.i0 = 1 
		} else { 
			this.i0 = props.data.heros.reEntry  
		}
		this.i = 0
		this.heros = get(this, 'props.data.heros.ticks')
		this.state = {
		  hero: this.heros[this.i]
		}
	}
	componentDidMount() {
		this.timerID = setTimeout( () => this.tick(), this.t0 )
	}
	componentWillUnmount() {
		clearTimeout(this.timerID)
	}
	
	tick() {
		this.setState({
			hero: this.heros[this.i]
		})
		if ( ++this.i >= this.heros.length ) { this.i = this.i0 }
		this.timerID = setTimeout( () => this.tick(), this.t )
	}
	
  render() {
    const posts = get(this, 'props.data.posts.nodes')
    const pins = get(this, 'props.data.pins.nodes')
    const pinsPosts = [...pins, ...posts]
    const h = this.state.hero
    const welcomeBody = this.heros[0].body

    return (
      <Layout location={this.props.location}>
	<Hero
	  image={h.heroImage.gatsbyImageData}
	  title={h.title}
	  content={h.description}
	/>
	<div className={styles.article}>
	  <div className={styles.body}>
	    {welcomeBody?.raw && renderRichText(welcomeBody)}
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
    heros: contentfulTicker( slug: { eq: "home" } ) {
    	firstTickTime
	tickTime
	reEntry
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
`
