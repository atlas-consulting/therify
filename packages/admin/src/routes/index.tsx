import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import auth from '../utils/Auth';
import { Login, Matches } from './pages';

const ProtectedRoute = ({ component: Component, redirectPath: string, ...rest }: any) => {
    const handleAuthStatus = (props: Record<string, any>) =>
        auth.isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: props.redirectPath, state: { from: props.locations } }} />
        );
    return <Route {...rest} render={handleAuthStatus} />;
};

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="/matches" />
            <ProtectedRoute path="/matches" redirectPath="/login" component={Matches} />
            <Route path="/login" component={Login} />
            <Route path="*" component={() => <h1>404</h1>} />
        </Switch>
    </BrowserRouter>
);
