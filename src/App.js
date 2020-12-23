import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { StoreProvider } from "./utils/GlobalState";
import { AuthProvider } from "./utils/AuthContext";
import "./App.css";
import SignUpUserForm from "./components/SignUpUserForm";

// TODO: Dan, research material UI themeing context
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Router>
            <div className='wrapper'>
              <Nav />
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/signup' component={SignUpUserForm} />
                <Route path='/' render={() => <div>NOTFOUND</div>} />
              </Switch>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
