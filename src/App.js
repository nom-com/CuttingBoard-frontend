import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
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
import UserAccountForm from "./components/UserAccountForm";
import NewRecipe from "./pages/NewRecipe";
import Favorites from "./pages/Favorites";
import Admin from "./pages/Admin";
import Recipe from "./pages/Recipe";
import UserAccount from "./pages/UserAccount";
import Search from "./pages/Search";

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
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={UserAccountForm} />
                <Route exact path='/new-recipe' component={NewRecipe}/>
                <Route exact path='/favorites' component={Favorites}/>
                <Route exact path='/admin' component={Admin}/>
                <Route exact path='/recipe/:id' component={Recipe}/>
                <Route exact path='/search' component={Search}/>
                <Route exact path='/user-account' component={UserAccount}/>
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
