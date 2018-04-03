import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { header, content } from 'antd';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <header className={styles.title}>this is dashboard title</header>
      <content>this is dashboard content</content>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
