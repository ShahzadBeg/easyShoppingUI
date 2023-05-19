import moment from "moment/moment";
import React, { useState } from "react";
import styled from "styled-components";

const Transactions = ({ transactions }) => {
  const [isLoading, setIsloading] = useState(false);

  return (
    <StyledTransaction>
      {isLoading ? (
        <p>Transaction loading...</p>
      ) : (
        <>
          <h3>Latest Transactions</h3>
          {transactions.map((transaction, index) => (
            <Transaction key={index}>
              <p>{transaction.name}</p>
              <p>INR {transaction.amount.toLocaleString()}</p>
              <p>{moment(transaction.createdAt).fromNow()}</p>
            </Transaction>
          ))}
        </>
      )}
    </StyledTransaction>
  );
};

export default Transactions;

const StyledTransaction = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 5px;
`;

const Transaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  p {
    flex: 1;
  }
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
