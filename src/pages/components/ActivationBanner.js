import React, {Component, useState} from 'react';
import styles from './activationBanner.module.scss'
import Image from 'next/image';

class ActivationBanner extends React.Component {
  render() {
    return (
      <a href={this.props.link} className={`${styles["activation-button"]} ${styles[this.props.className] || ""}`} target="_blank">
        <figure className={styles["activation-logo"]}>
          <Image
            src={this.props.thumbnail}
            alt={this.props.title}
            layout="filled"
            fill={true}
            placeholder="empty"
          />
        </figure>
        <div>
          <h1 className={styles["partner-name"]}>{this.props.title}</h1>
          {(this.props.status == "LIVE" ?
            <button className={styles.pulsing} type="button">
              {this.props.button}
            </button>
            :
            <button type="button">
              {this.props.soon}
            </button>
          )}
        </div>
      </a>
    );
  }
}

export default ActivationBanner;
