import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'

const ArticlePreview = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  return (
    <Container>
      <ul className={styles.articleList}>
        {posts.map((post) => {
          const hero = '<GatsbyImage alt="" image=' + post.heroImage.gatsbyImageData + ' />'
          return (
            <li key={post.slug}>
              <Link to={`${post.path}${post.slug}`} className={styles.link}>
                {hero}
                <h2 className={styles.title}>{post.title}</h2>
              </Link>
              <div>
                {post.description?.raw && renderRichText(post.description)}
              </div>
              <div className={styles.meta}>
                <small className="meta">{post.publishDate}</small>
                <Tags tags={post.metadata.tags} />
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default ArticlePreview
