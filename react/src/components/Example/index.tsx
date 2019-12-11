import classnames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.css';

const Example = () => {
  return (
    <div className={classnames(styles.App)}>
      <header className={classnames(styles.AppHeader)}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png"
          className={classnames(styles.AppLogo)}
          alt="logo"
        />
        <h1 className={classnames(styles.AppTitle)}>
          <FormattedMessage id="welcome" />
        </h1>
      </header>
      <p className={classnames(styles.AppIntro)}>
        <FormattedMessage id="getstarted" /> <code>src/App.tsx</code> <FormattedMessage id="saveTo" />
      </p>
    </div>
  );
};

export default Example;
