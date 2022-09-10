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
		this.i = 0
	}
	componentDidMount() {
		const me = this
		this.client.getEntry('5Lst9GoxbCg66KGi2uVvW9').then(function(entry) {
			console.log(entry)
			me.ticks = entry.fields.ticks
			me.timerID = setTimeout( () => me.tick(), 3000 )
		})
	} 
	componentWillUnmount() {
	  clearTimeout(this.timerID)
	}
	
	tick() {
		console.log('tick')
		const tic = this.ticks[this.i].fields
		console.log(tic)
		console.log(tic.heroImage)
		console.log(tic.title)
		console.log(tic.description)
		this.setState({
			image: tic.heroImage,
			title: tic.title,
			content: tic.description
		})
		if ( ++this.i >= this.ticks.length ) { this.i = 0 }
		this.timerID = setTimeout( () => this.tick(), 3000 )
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
