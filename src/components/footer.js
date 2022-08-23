import React from 'react'

import Container from './container'
import * as styles from './footer.module.css'

const Footer = () => (
  <Container as="footer">
    <div className={styles.container}>
      <a href="https://www.google.com/maps/dir//first+christian+church+granbury/@32.4347606,-97.8810187,12z/data=!3m1!4b1!4m9!4m8!1m1!4e2!1m5!1m1!1s0x8651dfa13bd40545:0xd14ee4321035a11a!2m2!1d-97.8109303!2d32.4350606">
        First Christian Church &middot; 2109 W. Hwy 377 Granbury TX 76048 U.S.A. </a>
      &middot; <a href="tel:8175735431">817-573-5431</a> &middot; <a href="office@fccgranbury.org">office@fccgranbury.org</a>
    </div>
    <div className={styles.container}>
      Built with <a href="https://contentful.com/">Contentful</a> and{' '}
      <a href="https://gatsbyjs.com">Gatsby</a> &middot;{' '}
      <a href="https://github.com/contentful/starter-gatsby-blog">Source</a>
    </div>
  </Container>
)

export default Footer
