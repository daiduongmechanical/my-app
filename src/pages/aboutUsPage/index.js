import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames/bind";
import style from "./aboutus.module.scss";
import MyButton from "../pageComponents/myButton";

const AboutUsPage = () => {
  return (
    <form>
      <span>name</span> <input type="text" name="name" />
      <br />
      <span>age </span> <input type="number" name="age" />
      <input type="text" />
    </form>
  );
};

export default AboutUsPage;
