import React, {Component, useState} from 'react';
import styles from './integrationcase.module.scss'



class Integrationcase extends React.Component {
  render() {
    var i = this.props.data;
    const lang = this.props.lang
    const translation = require(`../../lokalise/${lang}/integration-card.json`)
    const t = translation[lang]["integration-card"]

    if (i) {
      var label = "";
      if (i.status == "SOON") {
        label = t.integration.labels.soon
      }
      return (<a className={styles["integration-link"]} data-status={i.status} href={`/${this.props.lang}/${i.id}`} data-utm-delay="true">
        <div className={styles.label}>{label}</div>
        <li className={styles.integration}>
          <header>
            <figure className={styles["integration-hero-image"]}>
              {(i.images.hero.src &&
              <img src={i.images.hero.src} loading="lazy"
              alt={`${i.title} hero image`} />
                // <Image
                //   fill={true}
                //   placeholder = "empty"
                //   sizes="(min-width: 998px) 247.5"
                //   src={i.images.hero.src}
                //   loading="lazy"
                //   alt={`${i.title} hero image`}
                // />
              )}
            </figure>
            <figure className={styles["integration-thumbnail"]}>
              <img                 src={i.images.thumbnail.src}
                loading="lazy"
                className={styles["thumbnail-img"]}
                alt={`${i.title} logo`} />
              {/* <Image
                fill={true}
                src={i.images.thumbnail.src}
                loading="lazy"
                className={styles["thumbnail-img"]}
                alt={`${i.title} logo`}
                sizes="(min-width: 998px) 80"
              /> */}
            </figure>
            <h3 data="integration-category"></h3>
          </header>
          <div className={styles["integration-main"]}>
            <div className={styles["integration-main-header"]}>
              <h2 data="integration-name" className={styles["integration-name"]}>{i.title}</h2>
              <p data="integration-tagline" className={styles["integration-tagline"]}>{i.content.short_description}</p>
            </div>
            <button type="button" aria-label={t.integration["learn-more"]} data="more">{t.integration["learn-more"]}</button>
          </div>
        </li>
      </a>)
    }
    else {
      return (<a className={`${styles["integration-link"]} ` + `${styles.new}`} href="https://openspace.sportalliance.com/de/partner-werden/" target="_blank">
        <div className={styles.label}></div>
        <li className={styles.integration}>
          <header>
            <div className={styles["integration-hero-image"]}></div>
            <div className={styles["integration-thumbnail"]}></div>
            <h3 data="integration-category"></h3>
          </header>
          <div className={styles["integration-main"]}>
            <div className={styles["integration-main-header"]}>
              <h2 data="integration-name" className={styles["integration-name"]}>{t.new.hl}</h2>
              <p data="integration-tagline" className={styles["integration-tagline"]}>{t.new.p}</p>
            </div>
            <button aria-label={t.new.button} type="button">{t.new.button}</button>
          </div>
        </li>
      </a>)
    }
  }
}

export default Integrationcase;
