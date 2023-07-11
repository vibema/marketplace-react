import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';


import { BrowserRouter, Navigate, Routes, Route, Link  } from 'react-router-dom';
import {Helmet} from "react-helmet";

 import Navigation from './layout/Navigation.js'
 import Footer from './layout/Footer.js'

import Home from './pages/Home.js';
import Marketplace from './pages/Marketplace.js';
import About from './pages/About.js';
import NotFound from './pages/NotFound.js';

function App(pageProps) {

  const languages = [
    {
      path: '/de',
      exact: true,
      lang: 'de'
    },
    {
      path: '/en',
      exact: true,
      lang: 'en'
    },

  ];

  const [integrationsFetchedEn, fetchIntegrationsEn] = useState([]);

  const getIntegrationsEn = async () => {
    const response = await fetch(`https://esther.sportalliance.corpex-kunden.de/api/v1/marketplace/integrations/get?account_uuid=20174a7309564698b8b0a268ea8de4f9&query%5Blang%5D=en&query%5Bstatus%5D%5B%5D=LIVE&query%5Bstatus%5D%5B%5D=SOON&query%5Border_by%5D=order`);
    const integrationsFetchedEn = await response.json();
    return integrationsFetchedEn;
  }
  useEffect(() => {
      getIntegrationsEn().then(fetchIntegrationsEn);
  },[])

  console.log(integrationsFetchedEn);

  const integrationSlugArrayEn = integrationsFetchedEn.map((int) => 
    int.slug
  );

  console.log(integrationSlugArrayEn);

  const [integrationsFetchedDe, fetchIntegrationsDe] = useState([]);

  const getIntegrationsDe = async () => {
    const response = await fetch(`https://esther.sportalliance.corpex-kunden.de/api/v1/marketplace/integrations/get?account_uuid=20174a7309564698b8b0a268ea8de4f9&query%5Blang%5D=de&query%5Bstatus%5D%5B%5D=LIVE&query%5Bstatus%5D%5B%5D=SOON&query%5Border_by%5D=order`);
    const integrationsFetchedDe = await response.json();
    return integrationsFetchedDe;
  }
  useEffect(() => {
      getIntegrationsDe().then(fetchIntegrationsDe);
  },[])

  console.log(integrationsFetchedDe);

  const integrationSlugArrayDe = integrationsFetchedDe.map((int) => 
    int.slug
  );

  return (
    <BrowserRouter>
          <div className="app">
        {/* <Helmet htmlAttributes={{lang: pageProps.lang}}>
        </Helmet> */}
      <Routes>
        <Route path='/' element={ <Navigate to="/de" /> }/>
        {languages.map((language) => (
            <Route
              path={language.path}
              exact={language.exact}
              element={ 
                <>
                  <Navigation lang={language.lang}  />
                  <Marketplace lang={language.lang} />
                  <Footer lang={language.lang} slug={pageProps.paramId} />
                </>} 
            />
          ))}

          {integrationSlugArrayDe.map((slugDe) => (
            <Route
              path={`/de/${slugDe}`}
              exact="true"
              element={ 
                <>
                  <Navigation lang='de'  />
                  {/* <Marketplace lang={language.lang} /> */}
                  <Footer lang='de' slug={pageProps.paramId} />
                </>} 
            />
          ))}

        {integrationSlugArrayEn.map((slugEn) => (
            <Route
              path={`/en/${slugEn}`}
              exact="true"
              element={ 
                <>
                  <Navigation lang='en'  />
                  {/* <Marketplace lang={language.lang} /> */}
                  <Footer lang='en' slug={pageProps.paramId} />
                </>} 
            />
          ))}



       
          {/* <Route path="/:lang" element={ 
            <>
              <Navigation lang={pageProps.lang}  />
              <Marketplace lang={pageProps.lang} />
              <Footer lang={pageProps.lang} slug={pageProps.paramId} />
            </>} 
          /> */}
          {/* <Route path="/:lang/:integration" element={ 
            <>
              <Navigation lang={pageProps.lang}  />
              <About />
              <Footer lang={pageProps.lang} slug={pageProps.paramId} />
            </>} 
          /> */}



       {/* This is the route for the 404 page. It has to be the last route. */}
          <Route path="*" element={
            <>
              <Navigation lang='de'  />
              < NotFound />
              {/* <Footer lang='de'  /> */}
            </>
            } 
          />
            
        </Routes>



            {/* <Component {...pageProps} >
            </Component> */}


      </div>

    </BrowserRouter>
  );
}




export default App;
