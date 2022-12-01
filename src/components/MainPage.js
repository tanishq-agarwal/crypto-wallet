import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import "../App.css";
import { Button } from '@material-ui/core';

const MainPage = () => {
  let [data, setData] = useState([]);
  let [refresh, setRefresh] = useState(0);
  let [qty, setQty] = useState(1000);
  const [loaded, setLoaded] = useState(true)
  const [user, setUser] = useState({})
  const [popup, setPopup] = useState(false);

  let price = 1000;
  const url = " https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd";

  useEffect(() => {
    setLoaded(false)
    axios
      .get(url)
      .then((res) => {
        setData(res.data.data);
        console.log(data);
      })
      .catch((err => {
        console.log(err);
      }))
    setTimeout(() => setLoaded(true), 1000)
  }, [refresh])

  let name, value;
  const updateQty = (e) => {
    console.log(e.target)
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
    console.log(user)
  }

  const checkOut = () => {
    let sum = 0;
    for (let [key, value] of Object.entries(user)) {
      //  console.log(`${key}: ${value}`);
      let price = data[key].metrics.market_data.price_usd.toFixed(2)
      sum = sum + price * value;
      console.log(sum)
    }
    if (sum > qty) {
      alert("You have not enough balance")
      let temp=user;
      for(var key in temp) {
        temp[key] = "";
      }
      setUser(temp)
      console.log(user)
      setRefresh(refresh+1)
    }
    else {
      setUser({})
      setQty(qty - sum)
      alert("Transaction completed")
    }
  }

  return (

    <div>
      {loaded ?
        <>

          <div className='header'>
            <p className='balance'>Balance <span>${qty}</span></p>
            <Button variant="outlined" onClick={() => setRefresh(refresh + 1)}>Refresh</Button>
            {/* <button className='btn' onClick={() => setRefresh(refresh + 1)}>Refresh</button> */}
            <Button variant="outlined" onClick={() => checkOut()}>Buy Now</Button>
            
          </div>
          <div className='table'>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Coin</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">Price(US$)</th>
                  <th scope="col">Order</th>
                </tr>
              </thead>
              <tbody id="tbody">
                {/* <TableData props={item} index={i} user={user} updateQty={updateQty}/> */}
                {data.map((item, i) => (

                  <tr key={i}>
                    <td>{item.slug}</td>
                    <td>{item.symbol}</td>
                    <td>{item.metrics.market_data.price_usd.toFixed(2)}</td>
                    <td><input type="number" id="order" placeholder="Place Order" name={`${i}`} value={user[i]?.number} onChange={updateQty}  /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* {popup && <div aria-live="polite" aria-atomic="true" style={{position: "relative", minHeight: "200px"}}>
              <div class="toast" style={{position: "absolute", top: 0, right: 0}}>
                <div class="toast-header">
                  <img src="..." class="rounded mr-2" alt="..."/>
                    <strong class="mr-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                  Hello, world! This is a toast message.
                </div>
              </div>
            </div>
            } */}
        </> : <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      }

    </div>
  )
}

export default MainPage