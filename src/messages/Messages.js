import React from 'react';
import './messages.css';

export default class Messages extends React.Component {
  render() {
    const messages = [];
    this.props.messageService.messages.forEach((message, index) => {
      messages.push(<div key={index}>{message}</div>);
    });

    return this.props.messageService.messages.length ? (
      <div className="messages">
        <h2>Messages</h2>
        <button className="clear" onClick={this.props.messageService.clear.bind(this.props.messageService)}>
          clear
        </button>
        {messages}
      </div>
    ) : null;
  }
}
