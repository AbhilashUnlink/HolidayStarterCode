import React from 'react'
import BasicCard from '../../components/card/BasicCard'
import './style.css'
import { useSelector } from 'react-redux';

const Home = () => {
const { casualleave, sickleave, earnedleave } = useSelector(
  (store) => store.auth.profile
);
  return (
    <div className="leaves-list">
      <BasicCard title={"Earned Leaves"} text={earnedleave} />
      <BasicCard title={"Casual Leaves"} text={casualleave} />
      <BasicCard title={"Sick Leaves"} text={sickleave} />
      {/* <BasicCard title={"Pending Leaves"} text={"5"} /> */}
    </div>
  );
}

export default Home