import { Price } from "./types"
import './styles.css';

interface PricesProps {
    prices: Price[];
}

// component to render all prices
export const SimpleTable = ( {prices} : PricesProps) => {
    return (
            <div className="container">
            { prices.length ? (
                <>
                <h1>Last Time Updated: <br></br> { prices[0].timestamp}</h1>
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="col">Instrument</th>
                            <th className="col">Bid(USD)</th>
                            <th className="col">Ask(USD)</th>
                        </tr>
                        { prices.map( (price) => (
                            <tr key={price.id}>
                                <td className="col">{price.name}</td>
                                <td className="col">{price.bid}</td>
                                <td className="col">{price.ask}</td>
                                <td> </td>
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
