import React, { Fragment } from "react";
import "./Chips.css";

//mui
import { Avatar, Chip } from "@material-ui/core";

//react icons
import { FaReact, FaStripeS, FaNodeJs } from "react-icons/fa";
import { SiMaterialUi, SiFirebase } from "react-icons/si";

function Chips() {
  return (
    <Fragment>
      <a
        href="https://nodejs.org/en/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Chip
          avatar={
            <Avatar alt="Node Js React Stripe Payment">
              <FaNodeJs />
            </Avatar>
          }
          label="Node Js"
          color="primary"
          clickable
        />
      </a>
      <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
        <Chip
          avatar={
            <Avatar alt="React Js Stripe Payment">
              <FaReact />
            </Avatar>
          }
          label="React Js"
          color="primary"
          clickable
        />
      </a>

      <a href="https://stripe.com/" rel="noopener noreferrer" target="_blank">
        <Chip
          avatar={
            <Avatar alt="React Js Stripe Payment">
              <FaStripeS />
            </Avatar>
          }
          label="Stipe Payment"
          color="primary"
          clickable
        />
      </a>

      <a
        href="https://firebase.google.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Chip
          avatar={
            <Avatar alt="React Js Stripe Payment Firebase">
              <SiFirebase />
            </Avatar>
          }
          label="Firebase"
          color="primary"
          clickable
        />
      </a>
      <a
        href="https://material-ui.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Chip
          avatar={
            <Avatar alt="React Js Stripe Payment Material UI">
              <SiMaterialUi />
            </Avatar>
          }
          label="Material UI"
          color="primary"
          clickable
        />
      </a>
    </Fragment>
  );
}

export default Chips;
