// import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/Homepage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";

const App = () => {
  // const useStyles = makeStyles(() => ({
  //   App: {
  //     backgroundColor: "#14161a",
  //     color: "white",
  //     minHeight: "100vh",
  //   },
  // }));
  // const classes = useStyles();
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
    </BrowserRouter>
  )
}

export default App