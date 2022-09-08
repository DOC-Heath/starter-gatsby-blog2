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
			accessToken: "MRXtkCKsX6m0pXGCTTWbAyyOXZJwY7GNa90ea_km7qs",
			space: "5x0q4l6e6sfl"
		})
		this.iTick = 0
	}
	componentDidMount() {
		this.client.getEntry('5Lst9GoxbCg66KGi2uVvW9').then(function (entry) {
			console.log(entry)
			this.timerID = setInterval(
				() => this.tick(entry.fields.ticks),
				3000
			)
		})
	}  
	componentWillUnmount() {
	  clearInterval(this.timerID)
	} 
	tick(ticks) {
		const t = ticks[this.iTick++]
		this.setState({
			image: t.fields.heroImage,
			title: t.fields.title,
			content: t.fields.description
		})
		if ( this.iTick = ticks.length ) { this.iTick = 0 }
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
