import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import styled from "styled-components";
import Widget from "../summary-components/Widget";
import { useEffect } from "react";

import axios from "axios";
import { baseUrl, config } from "../../features/api";
import { useState } from "react";
import Chart from "../summary-components/Chart";
import Transactions from "../summary-components/Transactions";
import AllTimeData from "../summary-components/AllTimeData";

const Summary = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(0);
  const [userPer, setUserPer] = useState(0);
  const [orders, setOrders] = useState(0);
  const [orderPer, setOrderPer] = useState(0);
  const [sell, setSell] = useState(0);
  const [sellPer, setsellPer] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [allData, setAllData] = useState({});

  useEffect(() => {
    async function fetchSummaryData() {
      try {
        setLoading(true);
        const respose = await axios.get(`${baseUrl}/getsummary`, config);
        setUser(respose.data.currentMonthUsers);
        setUserPer(respose.data.userPercentage);

        setOrders(respose.data.currentMonthOrders);
        setOrderPer(respose.data.orderPercentage);

        setSell(respose.data.currentMonthSell);
        setsellPer(respose.data.sellPercentage);

        setChartData(respose.data.last7DaysSell);
        setTransactions(respose.data.transactionData);
        setAllData(respose.data.allData);
        setLoading(false);
      } catch (error) {
        console.log(error.respose);
      }
    }
    fetchSummaryData();
  }, [user]);

  const data = [
    {
      icon: <FaUsers />,
      digits: user,
      IsMoney: false,
      title: "Users",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.12)",
      percentage: userPer,
    },
    {
      icon: <FaClipboard />,
      digits: orders,
      IsMoney: false,
      title: "Orders",
      color: "rgb(38,198,249)",
      bgColor: "rgba(38,198,249,0.12)",
      percentage: orderPer,
    },
    {
      icon: <FaChartBar />,
      digits: sell,
      IsMoney: true,
      title: "Earnings",
      color: "rgb(253,181,40)",
      bgColor: "rgba(253,181,40,0.12)",
      percentage: sellPer,
    },
  ];

  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <StyledSummary>
          <MainStats>
            <Overview>
              <Title>
                <h2>Overview</h2>
                <p>How your shop is performing compared to previus month.</p>
              </Title>
              <WidgetWrapper>
                {data.map((data, index) => (
                  <Widget key={index} data={data} />
                ))}
              </WidgetWrapper>
            </Overview>
            <Chart data={chartData} />
          </MainStats>
          <SideStats>
            <Transactions transactions={transactions} />
            <AllTimeData allData={allData} />
          </SideStats>
        </StyledSummary>
      )}
    </>
  );
};

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  width: 100%;
  flex: 2;
`;
const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;

const Loader = styled.p`
  margin-top: 2rem;
`;
