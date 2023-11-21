import React from "react";
import { useSelector } from "react-redux";
import useCapitalizeFirstLetter from "../../components/hooks/useCapitalizeFirstLetter";

const Profile = () => {
  const { firstName, lastName, age, birthday, gender, country, employeeCode } =
    useSelector((store) => store?.auth?.profile);
  return (
    <div>
      Hey{" "}
      <b>
        {useCapitalizeFirstLetter(firstName)}&nbsp;
        {useCapitalizeFirstLetter(lastName)},
      </b>
      <br />
      <b>Age</b>:{age}
      <br />
      <b>BirthDay</b>:{birthday.split("T")[0]}
      <br />
      <b>Gender</b>:{useCapitalizeFirstLetter(gender)}
      <br />
      <b>Country</b>:{useCapitalizeFirstLetter(country)}
      <br />
      <b>Employee Code</b>:{useCapitalizeFirstLetter(employeeCode)}
      <br />
    </div>
  );
};

export default Profile;
