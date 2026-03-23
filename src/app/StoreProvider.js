"use client";
import { Provider } from "react-redux";
import appStore from "@/store/appstore";

export default function StoreProvider({ children }) {
  
  return <Provider store={appStore}>{children}</Provider>;
}
