import axios from '../custom-axios/axios';

const RoomService = {
    fetchRooms: async () => {
        try {
            const response = await axios.get(`/api/rooms`);
            return response.data;
        } catch (error) {
            console.error("Error fetching rooms:", error);
            throw error;
        }
    },

    addRoom: async (roomData) => {
        try {
            const response = await axios.post(`/api/rooms/add`, roomData);
            return response.data;
        } catch (error) {
            console.error("Error adding room:", error);
            throw error;
        }
    },

    fetchRoomDetails: async (roomName) => {
        try {
            const response = await axios.get(`/api/rooms/${roomName}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching room details:", error);
            throw error;
        }
    },

    fetchRoomTypes: async () => {
        try {
            const response = await axios.get('https://roommanagement-d503.onrender.com/api/rooms/room-types');
            return response.data;
        } catch (error) {
            console.error("Error fetching room types:", error);
            throw error;
        }
    },

    deleteRoom: async (roomName) => {
            try {
                await axios.delete(`/api/rooms/delete/${roomName}`);
            } catch (error) {
                console.error('Error deleting room:', error);
                throw error;
            }
        },


    updateRoom: async (roomName, roomData) => {
        try {
            const response = await axios.put(`/api/rooms/update/${roomName}`, roomData);
            return response.data;
        } catch (error) {
            console.error("Error updating room:", error);
            throw error;
        }
    },
};

export default RoomService;
