/* eslint-disable import/no-anonymous-default-export */
import { Route, Switch, Redirect } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Container } from "react-bootstrap";

import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";

import "./assets/styles/App.scss";

// routes
const Home = lazy(() => import("./routes/Home"));
const Terms = lazy(() => import("./routes/Terms"));
const PrivacyPolicy = lazy(() => import("./routes/PrivacyPolicy"));

export default () => {
  return (
    <>
      <Navigation />
      <Container className="main">
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacypolicy" component={PrivacyPolicy} />
            <Route
              path="*"
              render={() => {
                return <Redirect to="/" />;
              }}
            />
          </Switch>
        </Suspense>
      </Container>
      <Footer />
    </>
  );
};
