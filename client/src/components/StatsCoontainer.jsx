import React from "react";

import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

function StatsContainer({ defaultStats }) {
  console.log(defaultStats);
  const stats = [
    {
      title: "Pending applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      bcg: "#fef3c7",
      color: "#f59e0b",
    },
    {
      title: "interview Schedule",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      bcg: "#647acb",
      color: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      bcg: "#d66a6a",
      color: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem {...item} key={item.title} />;
      })}{" "}
    </Wrapper>
  );
}

export default StatsContainer;
