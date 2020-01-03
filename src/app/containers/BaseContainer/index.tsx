import * as React from 'react';
import * as style from './style.css';

export class BaseContainer extends React.Component {
  public render() {
    return (
      <div className={style.rootContainer}>
        {this.props.children}
      </div>
    );
  }
}
