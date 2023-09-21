import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { Outlet } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import { useAppContext } from "./context/appContext";

function App() {
  const {showDark, showDarkClass,dispatch} = useAppContext()
  const handleDarkMode = ()=> {
      
    if(!showDark){
      dispatch({ type: "SHOW_DARK_MODE" }); 
    
     
    }else{
      dispatch({type:"HIDE_DARK_MODE"})
    }


  }
    return (
        <>
            <body className={`${showDarkClass}`}>
                <div className={`App ${showDarkClass}`}>
                    <Navbar
                        handleDarkMode={handleDarkMode}
                        showDark={showDark}
                        showDarkClass={showDarkClass}
                    />
                    <ToastContainer autoClose={2500} />
                    <Outlet />
                </div>
            </body>
        </>
    );
}

export default App;
