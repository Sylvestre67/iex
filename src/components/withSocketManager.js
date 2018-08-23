import React from 'react';
import io from 'socket.io-client';

function withSocketManager(WrappedComponent) {
    return class extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                data: {
                    'FB': []
                }
            };
        }

        componentWillMount() {

        }

        componentDidMount() {
            const {data} = this.state;
            const IexSocket =  io('http://localhost:3030/'); //eslint-disable-line no-undef

            IexSocket.on('new quote', (msg) => {
                const symbol = msg.symbol;
                const quoteList = data[symbol];

                if (quoteList) {
                    quoteList.push(msg);
                }else{
                    data[symbol] = [msg]
                }

                this.setState({data});
            });
        }

        render() {
            const {data} = this.state;
            // console.log(data);

            // // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent quotes={data}
                                     {...this.props} />;
        }
    };
}

withSocketManager.propTypes = {};
withSocketManager.defaultProps = {};

export default withSocketManager;
