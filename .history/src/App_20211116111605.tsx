import { useEffect, useState } from 'react';
import { SimpleTable } from './components/SimpleTable/SimpleTable';
import { Price, PriceFromEndPoint, PricesFromEndPoint } from './components/SimpleTable/types'

function App() {

  // Get prices every 3 seconds
  const MILISECONDS_TO_FETCH_DATA = 3000
  const [getPrices, setPrices] = useState<Price[]>([])

  // Instead of using mocks of prices I am using an API that provides prices of cryptocurrency
  // This API returns usd prices for criptocurrency
  // I assume that there is no limit calls to this api
  useEffect(() => {
    const fetchPrices = () => {
      fetch('https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd')
      .then(response => response.json())
      .then((response: PricesFromEndPoint)=> {
          setPrices(dataParserFromEndpointToPrice(response))
        }
      )
    }
    fetchPrices()
    const interval = setInterval(() => fetchPrices(), MILISECONDS_TO_FETCH_DATA)
    return () => {
      clearInterval(interval)
    }
  },[]);

  const dataParserFromEndpointToPrice = (dataToParse : PricesFromEndPoint) : Price[]=> {
    return dataToParse.data.map( (data : PriceFromEndPoint) => ({
      id: data.id,
      name: data.slug,
      // Since messari endpoint does not return an ask price nor bid(as far as I am concerned), but return an unique price
      // I assume that this is a mid price, so I calculate bid = mid price - 1% and ask = mid price + 1%
      bid: data.metrics.market_data.price_usd - data.metrics.market_data.price_usd * 0.01,
      ask: data.metrics.market_data.price_usd + data.metrics.market_data.price_usd * 0.01,
      timestamp: dataToParse.status.timestamp
    }))
  }

  return (
    <div>
      <h1 style={{textAlign:"center"}}>FX PRICING</h1>
      <SimpleTable prices={getPrices}></SimpleTable>
    </div>
  );
}

export default App;
