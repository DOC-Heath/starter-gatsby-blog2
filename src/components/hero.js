import React, { Component } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { createClient } from "contentful"

import * as styles from './hero.module.css'

function tick(ticks, i, setState) {
	console.log('tick')
	const tic = ticks[i].fields
	console.log(tic)
	console.log(tic.heroImage)
	console.log(tic.title)
	console.log(tic.description)
/*	setState({
		image: tic.heroImage,
		title: tic.title,
		content: tic.description
	})*/
	if ( i+1 < ticks.length ) { setTimeout( () => tick(ticks, i+1, setState), 3000 ) }
	else { setTimeout( () => tick(ticks, 0, setState), 3000 ) }
}

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
	}
	componentDidMount() {
		const me = this  // this will change in getEntry callback
		this.client.getEntry('5Lst9GoxbCg66KGi2uVvW9').then(function(entry) {
			console.log(entry)
			me.timerID = setTimeout( () => tick(entry.fields.ticks, 0, me.setState), 3000 )
		})
	} 
	componentWillUnmount() {
	  clearTimeout(this.timerID)
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
