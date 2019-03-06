import React from 'react';
import Layout from './layout';
import Message from '../../models/Message';
import { Block, Message as MessageComponent, Header, Footer } from './shared';

const Messages = ({ messages }) => {
  const _messages = messages.map((attrs) => new Message(attrs));
  return (
    <Block py={4}>
      {_messages.map((message, i) => (
        <MessageComponent isLast={i === _messages.length - 1} message={message} key={i} />
      ))}
    </Block>
  );
};

export default ({ user, messages }) => (
  <Layout hiddenText="💩 Post digest from Banter.">
    <Header user={user} title="Some recent 💩." />
    <Messages messages={messages} />
    <Footer />
  </Layout>
);
