import React, { useEffect,  useState, useRef, createRef } from 'react'
// import Head from 'next/head';
import {Link, useParams } from 'react-router-dom';

import moment from 'moment';

import headerImage from './../img/marketplace/magicline-marketplace.jpg';

/* components */
import Searchbar from './components/Searchbar.js';
import Integration from './components/Integrationcase.js';

/* styles */
import styles from './marketplace.module.scss';

export default function Marketplace(props){

  const lang = props.lang;

  const [categoriesFetched, fetchCategories] = useState([]);
  const [integrationsFetched, fetchIntegrations] = useState([]);

  
  const getCategories = async () => {
    const response = await fetch(`https://esther.sportalliance.corpex-kunden.de/api/v1/marketplace/categories/get?account_uuid=20174a7309564698b8b0a268ea8de4f9&query%5Blang%5D=${lang}&query%5Border_by%5D=order`);
    const categoriesFetched = await response.json();
    return categoriesFetched;
  }

  const getIntegrations = async () => {
    const response = await fetch(`https://esther.sportalliance.corpex-kunden.de/api/v1/marketplace/integrations/get?account_uuid=20174a7309564698b8b0a268ea8de4f9&query%5Blang%5D=${lang}&query%5Bstatus%5D%5B%5D=LIVE&query%5Bstatus%5D%5B%5D=SOON&query%5Border_by%5D=order`);
    const integrationsFetched = await response.json();
    return integrationsFetched;
  }



  useEffect(() => {
      getCategories().then(fetchCategories);
      getIntegrations().then(fetchIntegrations);
  },[])


    const categorySelect = React.createRef()

     const translation = require(`./../lokalise/${lang}/marketplace.json`);
     const t = translation[lang]["marketplace"];
     console.log(t);


     var currentRadioValue;
     var currentCategoryValue = "NONE";
     var [categoryChecked, setCategoryChecked] = useState(false);
     const [categoryWidth, setCategoryWidth] = useState("auto");
    // const categories = props.categories;
    // const translation = props.translation[lang].marketplace;
    // const t = translation.content;
     const integrationsArray = integrationsFetched;
     const [integrations, setIntegrations] = useState(integrationsArray);

     const categories = categoriesFetched;

    const handleRadioChange = (e) => {
     setCategoryChecked(false)
     currentRadioValue = e.target.value
     if (e.target.value == "all") {
      setIntegrations(integrationsArray)
    }
    else if (e.target.value == "soon") {
      var filtered_integrations = integrationsArray.filter(function(o) {
        return o.status == "SOON"
      })
      if (filtered_integrations) {
        setIntegrations(filtered_integrations)
      }
    }
    else if(e.target.value == "recent") {
      var filtered_integrations = integrationsArray.filter(function(o) {
        if (moment().unix() < moment(o.created_at).unix() + 86400 * 30) {
          return o
        }
      })
      if (filtered_integrations) {
        setIntegrations(filtered_integrations)
      }
    }
    if (e.target.value !== "categories") {
      categorySelect.current.value = "NONE"
      const width = (adjustSelectorSize(null))
      setCategoryWidth(width)
    }
  };

    const handleCategoryChange = (e) => {
    currentRadioValue = "categories"
    currentCategoryValue = e.target.value
    setCategoryChecked(true)
    const width = (adjustSelectorSize(e))
    setCategoryWidth(width)
    var filtered_integrations = integrationsArray.filter(function(o) {
      var cat = o.categories.filter(function(i) {
        return i.id == currentCategoryValue;
      });
      if (cat.length) {
        return o
      }
    })
    if (filtered_integrations) {
      setIntegrations(filtered_integrations)
    }
  };

  function adjustSelectorSize(e = null) {
    if (e) {
      const i = e.target.options.selectedIndex;
      const width = (e.target.options[i].getAttribute('data-key').length * 9) + 15;
      return width
    }
    else {
      const width = 140
      return width
    }

  }

    var categoryStyle
  if (categoryWidth !== "auto") {
    categoryStyle = {
      "width": categoryWidth+"px",
     };
  }
  else {
    categoryStyle = {
      "width": categoryWidth,
     };
  }

  const content = t.content;

    return (
    <div>
      <header className={styles.header}>
        <div className={styles["teaser-image-wrapper"]}>
          <picture className={styles["teaser-image"]}>
            <img src={headerImage} className={styles.hero} alt={content.intro.hl} />
            {/* <Image
              src="/img/marketplace/magicline-marketplace.jpg"
              fill={true}
              loading="eager"
              placeholder="empty"
              className={styles.hero}
              alt={t.intro.hl}
              sizes="(min-width: 998) 1261px"
            /> */}
          </picture>
        </div>
        <div className="container">
          <article>
            <h1 className="h1">{content.intro.hl}</h1>
            <p className="hyphens">{content.intro.p}</p>
            <Searchbar lang={lang} error-no-results={content.intro.searchbar.error['no-results']} placeholder={content.intro.searchbar.placeholder}/>
          </article>
        </div>
      </header>
      <main>

        <section className="container">
          <nav className={styles["catalogue-header"]}>
            <form id="select" className={styles.select}>
              <fieldset>
                <input id="radio-all" type="radio" aria-labelledby={content.nav.all} name="select" value="all" onChange={handleRadioChange}  defaultChecked />
                <label for="radio-all">
                  <button type="button" aria-label={content.nav.all} id="all-integrations" className={styles["all-integrations"]}>{content.nav.all}</button>
                </label>
              </fieldset>
              <fieldset>
                <input id="radio-recent" type="radio" aria-labelledby={content.nav.recent} name="select" value="recent" onChange={handleRadioChange} />
                <label for="radio-recent">
                  <button type="button" aria-label={content.nav.recent} id="recent-integrations" className={styles["recent-integrations"]}>{content.nav.recent}</button>
                </label>
              </fieldset>
              <fieldset>
                <input type="radio" id="radio-soon" aria-labelledby={content.nav.soon} name="select" value="soon" onChange={handleRadioChange} />
                <label for="radio-soon">
                  <button type="button" aria-label={content.nav.soon}>{content.nav.soon}</button>
                </label>
              </fieldset>
              {categories.length > 0 && (
                <fieldset>
                  <input id="radio-categories" type="radio" name="select" aria-labelledby={content.nav.categories} value="categories" onChange={handleRadioChange} checked={categoryChecked}  />
                  <label for="radio-categories">
                    <div className={styles["category-selector-wrapper"]}>
                      <select ref={categorySelect} name="categories" aria-label={content.nav.categories} id="category-selector" style={categoryStyle} defaultValue={currentCategoryValue} className={styles["category-selector"]} onChange={handleCategoryChange}>
                        <option value="NONE" disabled>{content.nav.categories}</option>
                        {categories.map(category => (
                          <option data-key={category.title} key={category.title} value={category.id}>{category.title}</option>
                        ))}
                      </select>
                    </div>
                  </label>
                </fieldset>
              )}
            </form>
          </nav>
          {content.home}
          <article>
            <ul className="catalogue" id="catalogue">
              {integrations.length > 0 && (integrations.map(i => (
                <Integration key={i.id} data={i} lang={lang} />
              )))}
              <Integration key="new" lang={lang} />
            </ul>
          </article>
        </section>
      </main>
    </div>
  )

 }




// export async function MarketplaceProps(context) {

// const lang = context.params.lang
//   const translation = require(`./../lokalise/${lang}/marketplace.json`)

//   const fetchCategories = await fetch(`https://esther.sportalliance.corpex-kunden.de/api/v1/marketplace/categories/get?account_uuid=20174a7309564698b8b0a268ea8de4f9&query%5Blang%5D=${lang}&query%5Border_by%5D=order`);
//   const fetchIntegrations = await fetch(`https://esther.sportalliance.corpex-kunden.de/api/v1/marketplace/integrations/get?account_uuid=20174a7309564698b8b0a268ea8de4f9&query%5Blang%5D=${lang}&query%5Bstatus%5D%5B%5D=LIVE&query%5Bstatus%5D%5B%5D=SOON&query%5Border_by%5D=order`);

//   const categories = await fetchCategories.json();
//   const integrations = await fetchIntegrations.json();


//   const meta = {
//     title: translation[lang].marketplace.meta.title,
//     description: translation[lang].marketplace.meta.description,
//     path: lang,
//     images: {
//       og: ""
//     },
//     robots: {
//       index: "index",
//       follow: "follow"
//     }
//   }


//   return {
//     props: {
//       categories,
//       integrations,
//       lang,
//       translation,
//       meta
//     },
//   };
// }

