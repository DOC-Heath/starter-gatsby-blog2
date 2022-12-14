import React from 'react'
import { Link } from 'gatsby'

import * as styles from './navigation.module.css'

const Navigation = () => (
  <nav role="navigation" className={styles.container} aria-label="Main">
    <Link to="/" className={styles.logoLink}>
      <span className={styles.logo} />
      <span className={styles.logoNameAddress}>
        <span className={styles.navigationItem+' '+styles.logoName}>First Christian Church</span>
        <span className={styles.navigationItem+' '+styles.logoAddress}>Granbury, Texas</span>
      </span>
    </Link>
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName="active">
          Home
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/news/" activeClassName="active">
          News
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/" activeClassName="active">
          Blog
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/live/" activeClassName="active">
          Live
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="https://fccgranbury.breezechms.com/give/online" activeClassName="active">
          Give
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navigation
