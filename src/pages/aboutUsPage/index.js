import { Fragment } from "react";

const AboutUsPage = () => {
  //su ly logic

  let x = [
    { name: "hello", age: 20, gender: "male" },
    { name: "hi", age: 23, gender: "male" },
    { name: "xin chao", age: 40, gender: "female" },
  ];

  return (
    <div>
      {x.map((e, index) => (
        <Fragment>
          <p>name :{e.name}</p>
          <p>age :{e.age}</p>
          <p>gender :{e.gender}</p>
          <hr></hr>
        </Fragment>
      ))}
    </div>
  );
};

export default AboutUsPage;
