import {io} from "socket.io-client";

require('dotenv').config()
export default io("http://"+process.env.ip+":4000");