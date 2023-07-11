import React from 'react'
import {Link, useParams } from 'react-router-dom';
import styles from './footer.module.scss'

function Footer(props) {
  const lang = props.lang;
  const translation = require(`./../lokalise/${lang}/navigation.json`);
  const t = translation[lang]["navigation"].footer

  const handleCookieClick = (e) => {


  }


    return (
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles["footer-container"]}>
            <ul>
              {t.list.map((a, index) => (
                <li key={index}>
                  {( a.link ?
                    <a href={a.link} target="_blank">{a.title}</a>
                  :
                    <a href={void(0)} onClick={handleCookieClick} >{a.title}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
  )
}

export default Footer;
