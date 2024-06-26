import { SOCKET_URL } from "@/constant";
import { User } from "@/interfaces";
import { setLoggedUserSlice, setLoggedUserTokenSlice } from "@/redux/reducers/userSlice";
import { io } from "socket.io-client";
import { formatDistanceToNow } from 'date-fns';

// 1)
export const limitText = (str: string | undefined, limit: number): string | undefined => {
    if (str) {
        if (str.split("").length > limit) {
            const strArr = str.slice(0, limit).trim().split(" ");
            const string = strArr.slice(0, strArr.length).join(" ");
            return string.concat(`...`);
        } else {
            return str;
        }
    }
};

// 2)
export const capitalize = (str: string | undefined): string | undefined => {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
};

// 3)
export const lowercase = (str: string | undefined): string | undefined => {
    return str && str.toLowerCase();
};

// 4)
export const dateObj = (dateInput: string): { hour: number, minute: number, second: number, year: number, month: number, date: number, day: number } => {
    const newDate = new Date(dateInput);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    const second = newDate.getSeconds();
    const year = newDate.getFullYear();
    const date = newDate.getDate();
    return { hour, minute, second, year, month, date, day };
};

// 5)
export const lightenDarkenColor = (col: string, amt: number): string => {
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
};

// 6)
export const generateRandom = (from: number, to: number): number => {
    let random = Math.floor(Math.random() * to) + from;
    return random;
};

// 7)
export const connectToSocketIO = (setIsConnectedToSocket: any, loggedUser: User, setLiveUsers: any, setArrivalMessage: any) => {
    const serverURL = SOCKET_URL;
    const socket = io(serverURL);
    socket.on("connect", () => {
        setIsConnectedToSocket(true);
        socket.emit('addUser', { userId: loggedUser?._id, socketId: socket.id, email: loggedUser?.email });
        socket.on('getUsers', (lUsers: any) => { setLiveUsers(lUsers) })
        socket.on('getMessage', (message: any) => { setArrivalMessage(message) })
    })
    socket.on("disconnect", () => {
        setIsConnectedToSocket(false);
    })
};

// 8)
export const disconnectToSocketIO = (setIsConnectedToSocket: any) => {
    const serverURL = SOCKET_URL;
    const socket = io(serverURL);
    setIsConnectedToSocket(false);
    socket.disconnect();
};

// 9)
export const getRelativeTime = (date: Date) => {
    if (!date) return ''
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};
