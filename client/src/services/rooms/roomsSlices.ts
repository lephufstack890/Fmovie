import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomState, Room } from "./rooms.interface";


const initialState: RoomState = {
    rooms: []
}

const roomSlice = createSlice({
    name: 'rooms',
    initialState: initialState,
    reducers: {
        loadRoomList: (state, action: PayloadAction<Room[]>) => {
            state.rooms = action.payload
        },
        addNewRoom: (state, action: PayloadAction<Room>) => {
            state.rooms.push(action.payload)
        },
        editNewRoom: (state, action: PayloadAction<Room>) => {
            const newRoom = action.payload
            state.rooms = state.rooms.map((room) => room.id === newRoom.id ? newRoom : room)
        },
        deleteRoom: (state, action: PayloadAction<string | number>) => {
            state.rooms = state.rooms.filter((room) => room.id !== action.payload)
        }
    }
})

export const { addNewRoom, loadRoomList, editNewRoom, deleteRoom } = roomSlice.actions
export default roomSlice.reducer