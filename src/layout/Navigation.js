import React, { useState } from 'react'
// import Image from 'next/image';

import {Link, useParams } from 'react-router-dom';

import styles from './navigation.module.scss';

import globe from './../img/svg/globe.svg';
import mlLogo from './../img/logo-claim.svg';




function Navigation(props) {

  console.log(props.lang);

    const lang = props.lang;
    const translation = require(`./../lokalise/${lang}/navigation.json`);

    const t = translation[lang]["navigation"].menu
    const [selectedLang, setSelectedLang] = useState(props.lang)
    const handleLangChange = (e) => {
      if (props.slug) {
        window.location.href = `/${(e.target).value}/${props.slug}`
      }
      else {
        window.location.href = `/${(e.target).value}`
      }
    }
  
  return (
    <nav className={styles.nav}>
      <div className={`container `+`${styles.container}`}>
        <a className={styles.logo} href={`https://magicline.com/${lang}`} target="_blank">
          <figure>
            <picture>
              <img src={mlLogo} alt="Magicline logo" height="36" width="180" />
            </picture>
          </figure>
        </a>
        <div className={styles["nav-wrapper"]}>
          <ul className={styles.ul}>
            <li>
              <Link to={`/${props.lang}`}>{t["all-integrations"].title}</Link>
            </li>
            <li>
              <span>{t["partner"].title}</span>
              <ul>
                <li>
                  <a target="_blank" href="https://openspace.sportalliance.com/de/partner-marketplace">
                    {t["partner"].list["become-a-partner"]}
                  </a>
                </li>
                <li>
                  <a href="https://developer.magicline.com/apis/openapi/general-information" target="_blank">
                    {t["partner"].list["open-api"]}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <button aria-label="Language picker" type="button">
            <figure>
              <picture>
              <img src={globe} alt="Languages" height="22" width="22" />
              </picture>

  
            </figure>
            <select id="lang-picker" defaultValue={selectedLang} onChange={handleLangChange}>
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
          </button>
          <ul className={styles.ul}>
            <li>
              <a href={`https://www.magicline.com/${props.lang}`} target="_blank">
                {t["magicline"].title}
              </a>
            </li>
          </ul>
        </div>
      </div>
  </nav>
)
}

export default Navigation;