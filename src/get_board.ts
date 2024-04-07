import axios from 'axios';
import { GetToken } from "./get_token.js";
import { JsonParseMain } from "./json_parse_main.js";

export async function getBoard(code: number) {
    const url = 'http://localhost:18080/kabusapi/board/' + code.toString() + '@1';
    try {
        const response = await axios.get(url, {
            headers: {
                'X-API-KEY': GetToken.token,
            }
        });
        console.log(response.data);
        return new JsonParseMain(response.data);//errorがでる。debug

    } catch (error) {
        console.error(error);
    }
};

