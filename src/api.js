const BASE_URL = `https://api.coingecko.com/api/v3/coins`;

export async function fetchCoins(currency,num){
    num *= 50;
    return fetch(`${BASE_URL}/markets?vs_currency=${currency}&order=market_cap_rank&per_page=${num}&page=1&price_change_percentage=1h%2C24h%2C7d`).then((response) => response.json());
}

export function fetchCoinInfo(id) {
  return fetch(`${BASE_URL}/${id}`).then((response) =>
    response.json()
  );
}
