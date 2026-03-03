export default class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.loginPayload });
        const loginResponseJson = await loginResponse.json();
        // const loginResponseBody = await loginResponse.body();
        // const loginResponseText = await loginResponse.text();
        // console.log('\nloginResponseJson: ', loginResponseJson);
        // console.log('\nloginResponseBody: ', loginResponseBody);
        // console.log('\nloginResponseText: ', loginResponseText);
        const token = loginResponseJson.token;
        return token;
    }

    async createOrder(orderPayload) {

        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload, headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        })
        const orderResponseJson = await orderResponse.json();
        console.log('orderResponseJson: ', orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
};