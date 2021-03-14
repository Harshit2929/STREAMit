import {io} from "socket.io-client";

require('dotenv').config()
export default io("http://192.168.0.104:4000");