import React, { Component } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { createClient } from "contentful"

import * as styles from './hero.module.css'

class Hero extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		  image: this.props.image,
		  title: this.props.title,
		  content: this.props.content
		}		
		this.client = createClient({
			accessToken:
			"MRXtkCKsX6m0pXGCTTWbAyyOXZJwY7GNa90ea_km7qs",
			space: "5x0q4l6e6sfl"
		})
	}
	render() {
		return (
		      <div className={styles.hero}>
			{this.state.image && (
			  <GatsbyImage className={styles.image} alt={this.state.title} image={this.state.image} />
			)}
			<div className={styles.details}>
			  {this.state.title && ( <h1 className={styles.title}>{this.state.title}</h1> ) }
			  {this.props.content && (
			    <div className={styles.content}>{renderRichText(this.state.content)}</div>
			  )}
			</div>
		      </div>
		)
	}
}

export default Hero
