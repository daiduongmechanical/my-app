import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames/bind";
import style from "./aboutus.module.scss";
import MyButton from "../pageComponents/myButton";

const AboutUsPage = () => {
  let map = [
    {
      TotalCost: "50.00",
      created_at: null,
      updated_at: null,
      userID: "10018",
      OrderID: 60068,
      type: "table",
      detail: "2023-04-04T20:30",
      status: "finished",
      name: "atetar",
      phone: "233777890",
      dishid: "20005",
      dishprice: "35.0000",
      dishname: "GRILLED CHICKEN WITH FRESH CHERRY SALSA",
      dishimage: "http://localhost:8000/images/1678789231.jpg",
      require: null,
      quantity: "1",
      DiscountID: null,
      DiscountName: null,
      DiscountAmount: null,
      StartDate: null,
      EndDate: null,
      object: null,
    },
    {
      TotalCost: "50.00",
      created_at: null,
      updated_at: null,
      userID: "10018",
      OrderID: 60068,
      type: "table",
      detail: "2023-04-04T20:30",
      status: "finished",
      name: "atetar",
      phone: "233777890",
      dishid: "20000",
      dishprice: "15.0000",
      dishname: "pasta Italia",
      dishimage: "http://localhost:8000/images/pasta.jpg",
      require: null,
      quantity: "1",
      DiscountID: null,
      DiscountName: null,
      DiscountAmount: null,
      StartDate: null,
      EndDate: null,
      object: null,
    },
    {
      TotalCost: "60.00",
      created_at: null,
      updated_at: null,
      userID: "10018",
      OrderID: 60064,
      type: "table",
      detail: "2023-03-29T19:30",
      status: "finished",
      name: "atetar",
      phone: "233777890",
      dishid: "20001",
      dishprice: "10.0000",
      dishname: "Taco mexico original",
      dishimage: "http://localhost:8000/images/taco.jpg",
      require: null,
      quantity: "3",
      DiscountID: null,
      DiscountName: null,
      DiscountAmount: null,
      StartDate: null,
      EndDate: null,
      object: null,
    },
  ];
  let x = document.querySelectorAll(".x");

  const changeColor = (a, e) => {
    if (e.target.innerText === a) {
      x.forEach((e) => {
        e.style.backgroundColor = "white";
      });
      e.target.style.backgroundColor = "red";
    }
  };

  const handle = (e) => {
    changeColor(e.target.value, e);
  };

  return (
    <div>
      <button onClick={handle} className="x">
        1
      </button>
      <button onClick={handle} className="x">
        2
      </button>
      <button onClick={handle} className="x">
        3
      </button>
    </div>
  );
};

export default AboutUsPage;
