import { Price } from "./types"
import './styles.css';

const LIMIT_NUMBER_TO_ROUND = 2
const DECIMAL_PRECISION_FOR_BIG_PRICES = 2
const DECIMAL_PRECISION_FOR_SMALL_PRICES = 4

interface PricesProps {
    prices: Price[];
}

// component to render all prices
export const SimpleTable = ( {prices} : PricesProps) => {
    //function to round numbers using 2 decimals or 4
    const roundPrice = (priceToBeFixed : number) => {
        return priceToBeFixed > LIMIT_NUMBER_TO_ROUND ? priceToBeFixed.toFixed(DECIMAL_PRECISION_FOR_BIG_PRICES) : priceToBeFixed.toFixed(DECIMAL_PRECISION_FOR_SMALL_PRICES)
    }

    return (
            <div className="container">
            { prices.length ? (
                <>
                <h4>Last Time Updated: {prices[0].timestamp}</h4>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Instrument</th>
                            <th>Bid(USD)</th>
                            <th>Ask(USD)</th>
                        </tr>
                        { prices.map( (price) => (
                            <tr key={price.id}>
                                <td className="col-container">{price.name}</td>
                                <td className="col-container">{roundPrice(price.bid)}</td>
                                <td className="col-container">{roundPrice(price.ask)}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                </>
                ) : (<div>no data available</div>)
            }
            </div>
    )
}
