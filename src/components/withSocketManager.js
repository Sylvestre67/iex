import React from 'react';
import io from 'socket.io-client';

function withSocketManager(WrappedComponent) {
    return class extends React.Component {

        connectToSocket() {
            return io('http://localhost:3030/');
        }

        subscribeToNewQuote(socket, callback) {
            socket.on('new quote', (msg) => {
                return callback(msg);
            });
        }

        render() {
            return <WrappedComponent connectToSocket={this.connectToSocket}
                                     subscribeToNewQuote={this.subscribeToNewQuote}
                                     {...this.props} />;
        }
    };
}

withSocketManager.propTypes = {};
withSocketManager.defaultProps = {};

export default withSocketManager;
