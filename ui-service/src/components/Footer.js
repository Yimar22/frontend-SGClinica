import React from "react";
import { CDBFooter, CDBBox } from "cdbreact";
import emtImage from "../img/emt.png";

export const Footer = () => {
  return (
    <div>
      <CDBFooter style={{ backgroundColor: "#F3F5F6" }}>
        <CDBBox
          display="flex"
          justifyContent="between"
          alignItems="center"
          className="mx-auto py-4 flex-wrap"
          style={{ width: "80%" }}
        >
          <CDBBox display="flex" alignItems="center">
            <a href="/home" className="d-flex align-items-center p-0 text-dark">
              <img alt="logo" src={emtImage} width="60px" />
            </a>
          </CDBBox>
          <CDBBox>
            <small className="ml-2">
              &copy; EmtSystem, 2022. Todos los derechos reservados.
            </small>
          </CDBBox>
        </CDBBox>
      </CDBFooter>
    </div>
  );
};
