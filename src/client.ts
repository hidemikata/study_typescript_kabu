import WebSocket from 'ws';
import { JsonParseMain } from "./json_parse_main.js";
import { MessageAnalysis } from "./message_analysis.js";
import { TestCallback } from "./test_callback.js";
import { PriceChangedCounter } from "./price_changed_counter.js";
import { InagoRader } from "./inago_rader.js";
import db_initialize from './db/db_init.js';

//実行方法
//npx tsc -p .\tsconfig.json; node .\dist\client.js

let map_of_message_each_code = new Map<string, JsonParseMain>();

db_initialize();

let ws: any;
if (process.argv[2] == '--test') {
  ws = new TestCallback();
  ws.start_notify();
} else {
  ws = new WebSocket('ws://localhost:18080/kabusapi/websocket');
}

const counter = new PriceChangedCounter();
const inago_rader = new InagoRader(3, 1);//秒、数


ws.on('open', () => {
  console.log('Connected to server');
  ws.send('Hello, server!');
});

ws.on('message', (message: string) => {
  //  console.log(`Received message from server: ${ message }`);
  const json_obj = new JsonParseMain(message)
  const code = json_obj.getCode()
  counter.add(json_obj);
  inago_rader.addData(code, counter);
  const message_analysis = new MessageAnalysis(json_obj);
  message_analysis.start();
});

ws.on('close', () => {
  console.log('Disconnected from server');
});
