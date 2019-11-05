import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export var ScrollToTop = withRouter(
    class ScrollToTopWithoutRouter extends React.Component {
        componentDidUpdate(prevProps) {
            if (this.props.location !== prevProps.location) {
                window.scrollTo(0, 0);
            }
        }

        render() {
            return null;
        }
    }
);
