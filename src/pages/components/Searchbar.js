import React, {Component, useState, createRef} from 'react';
import { render } from 'react-dom';
import styles from './searchbar.module.scss'
import $ from 'jquery';


class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      integrations: null,
      loader: false,
      counter: 0,
      selectedResult: 0
    }
    this.handleKeyUp = this.keyUpHandler.bind(this, 'Search');
    this.handleSubmit = this.submitHandler.bind(this, 'Submit');
  }



  inputField = React.createRef()
  searchList = React.createRef()
  searchForm = React.createRef()
  submitHandler(refName, e) {
    e.preventDefault()
    if (this.state.integrations) {
      if (!this.state.integrations.length) {
        this.inputField.current.value = ""
        this.inputField.current.focus()
      }
      else {
        const url = `/${this.props.lang}/${this.state.integrations[this.state.selectedResult].id}`
        window.location.href = url
      }
    }
    else {
      this.inputField.current.value = ""
      this.inputField.current.focus()
    }
  }
  keyUpHandler(refName, e) {
    if (refName == "Search") {
      if (e.keyCode == 38 || e.keyCode == 40) {
        e.preventDefault()
        const r = this.state.selectedResult
        const i = this.state.integrations.length
        if (e.keyCode == 38) {
          if (r > 0) {
            this.setState({ selectedResult: r-1})
          }
          else {
            this.setState({ selectedResult: i-1})
          }
        }
        else if (e.keyCode == 40) {
          if (r > i-2) {
            this.setState({ selectedResult: 0})
          }
          else {
            this.setState({ selectedResult: r+1})
          }

        }
      }
      else if (e.keyCode == 13) {}
      else {
        this.setState({ counter: 0, selectedResult: 0})
        const input = this.inputField.current.value
        var component = this;
        if (input.length > 2) {
          const data = {
            "account_uuid": "20174a7309564698b8b0a268ea8de4f9",
            "query": {
              "limit": 5,
              "lang": this.props.lang,
              "search_query": input,
              "status": ["LIVE","SOON"]
            }
          };
          $.ajax({
            url: "https://esther.sportalliance.corpex-kunden.de/api/v1/marketplace/integrations/get",
            type: 'GET',
            data: data,
            dataType: "json",
            success: function(data){
              component.setState({ integrations: data });
            },
            error: function(data) {
              component.setState({ integrations: data });
            }
          });
        }
        else {
          component.setState({ integrations: null })
        }
      }
    }
  }


  render() {
    return (<div ref={this.searchWrapper} id="search-form-wrapper" className={styles["search-form-wrapper"]}>
      <form ref={this.searchForm} id="search-form" onSubmit={this.handleSubmit} className={styles["search-form"]}>
        <fieldset className={styles.fieldset}>
          <input aria-labelledby={this.props.placeholder} id="search-input" className={styles.input} onKeyUp={this.handleKeyUp} ref={this.inputField}  placeholder={this.props.placeholder} autoComplete="off" id="search-input" type="text" />
        </fieldset>
        <button className={styles["search-submit"]} aria-label={this.props.placeholder} type="submit" id="search-submit">
        </button>
      </form>
      <ul ref={this.searchList}>
        {this.state.integrations && (this.state.integrations.length > 0 ? (this.state.integrations.map((i, index) => (
          <a key={i.id} className={`${styles.integrationlist}`+(index == `${this.state.selectedResult}` ? ` ${styles.active}` : '')} href={`/${this.props.lang}/${i.id}`}>
            <li className={styles.integration}>
              <figure className={styles["integration-thumbnail"]}>
                <img src={i.images.thumbnail.src} className={styles["thumbnail-img"]} />
              </figure>
              <div>
                <b data="integration-name">{i.title}</b>
                <span data="integration-tagline" className={styles["integration-tagline"]}>{i.content["short_description"]}</span>
              </div>
            </li>
          </a>
        ))) : <li className={styles.error}>{this.props["error-no-results"]}</li>)}
      </ul>
    </div>);
  }
}

export default Searchbar;
