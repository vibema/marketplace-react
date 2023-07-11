import React, { useEffect, Component, useState, useRef, createRef } from 'react'
import Image from 'next/image';

import styles from './Navigation.module.scss'

export default function PostDetailPage(props) {
  const lang = props.lang || "de"
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
              <Image
                className={styles.img}
                src="/img/logo-claim.svg"
                alt="Magicline logo"
                width={180}
                height={36}
              />
            </figure>
          </a>
          <div className={styles["nav-wrapper"]}>
            <ul className={styles.ul}>
              <li>
                <a href={`/${props.lang}`}>{t["all-integrations"].title}</a>
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
                <Image
                  src="/img/svg/globe.svg"
                  alt="Languages"
                  height={22}
                  width={22}
                />
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
