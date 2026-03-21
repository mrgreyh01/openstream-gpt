"use client"
import { Provider } from "react-redux";
import appStore from "@/store/appstore";
import Body from "../components/Body";

export default function Home() {

  return (
    // <div className="flex min-h-screen items-center justify-center bg-[url('https://occ.a.nflxso.net/dnm/api/v6/iMyKkw5SVrkCXbCfSBEb_Pjar5Y/AAAAQBTxE26zgLJoqZnmxUCfZtVJ2HbJUsVonZ_9Uo-pn68zarPK.png')] font-sans">
    //   <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between sm:items-start">
    <>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </>
  );
}
