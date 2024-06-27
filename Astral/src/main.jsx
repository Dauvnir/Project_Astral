import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

// import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ScrollToTop />
			<AuthProvider>
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
