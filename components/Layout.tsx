"use client";
import Navbar from "./Navbar";

const Layout = (props: { children: any }) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};
export default Layout;
