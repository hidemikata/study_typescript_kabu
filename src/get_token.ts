import axios from 'axios';

export class GetToken {
    public static token: string = '';
    public async getToken() {
        const url = 'http://localhost:18080/kabusapi/token';
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';
        try {
            const response = await axios.post(url, {
                "APIPassword": "HideMikata39"
            }
                , {
                    headers: {
                        'User-Agent': ua,
                        'Content-Type': 'application/json'
                    }
                });
            console.log(response.data.Token);
            GetToken.token = response.data.Token;
        } catch (error) {
            console.error(error);
        }
    }
}
