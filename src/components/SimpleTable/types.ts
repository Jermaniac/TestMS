
export interface Price {
    id: string,
    name: string,
    bid: number,
    ask: number,
    timestamp: string
}

export interface PriceFromEndPoint {
    id: string,
    metrics: {market_data: { price_usd: number}},
    slug: string,
    symbol?: string
}

export interface PricesFromEndPoint {
    data: PriceFromEndPoint[],
    status: {
        elapsed: number,
        timestamp: string
    }
}
