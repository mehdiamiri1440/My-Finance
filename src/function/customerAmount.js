import React, {useState, useEffect, useContext} from 'react';
import {contextsStore} from '../contexts';

function TotalCustomerAmount() {
  const {total, setTotal} = useContext(contextsStore);
  useEffect(() => {
    database
      .get('customerdebt')
      .query()
      .fetch()
      .then(res => {
        res.map(res => {
          setTotal(total + res.amount);
        });
      });
  }, []);
  return total;
}

export default TotalCustomerAmount;
