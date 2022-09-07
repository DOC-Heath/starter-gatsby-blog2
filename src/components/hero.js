import React, { Component } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import * as styles from './hero.module.css'

class Hero extends React.Component {
	render() {
		return (
		      <div className={styles.hero}>
			{this.props.image && (
			  <GatsbyImage className={styles.image} alt={this.props.title} image={this.props.image} />
			)}
			<div className={styles.details}>
			  {this.props.title && ( <h1 className={styles.title}>{this.props.title}</h1> ) }
			  {this.props.content && (
			    <div className={styles.content}>{renderRichText(this.props.content)}</div>
			  )}
			</div>
		      </div>
		)
	}
}

export default Hero
