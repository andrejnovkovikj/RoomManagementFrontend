import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './rooms.css';
import RoomService from "../repository/roomRepository";
import { Link } from "react-router-dom";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        try {
            const fetchedRooms = await RoomService.fetchRooms();
            setRooms(fetchedRooms);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleDelete = async (roomName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the room "${roomName}"?`);
        if (!confirmDelete) return;

        try {
            await RoomService.deleteRoom(roomName);
            const updatedRooms = rooms.filter(room => room.name !== roomName);
            setRooms(updatedRooms);
            alert('Room deleted successfully!');
        } catch (error) {
            console.error('Error deleting room:', error);
            alert('Error deleting room. Please try again later.');
        }
    };

    return (
        <div className="container mm-4 mt-5">
            <div className="row">
                <div className="table-responsive">
                    <h1>Rooms</h1>
                    <table className="table table-striped table-bordered mt-3">
                        <thead>
                            <tr>
                                <th scope="col" className="text-primary">Name</th>
                                <th scope="col" className="text-primary">Location</th>
                                <th scope="col" className="text-primary">Equipment</th>
                                <th scope="col" className="text-primary">Capacity</th>
                                <th scope="col" className="text-primary">Type</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.length > 0 ? rooms.map((room) => (
                                <tr key={room.id}>
                                    <td>{room.name}</td>
                                    <td>{room.locationDescription}</td>
                                    <td>{room.equipmentDescription}</td>
                                    <td>{room.capacity}</td>
                                    <td>{room.type}</td>
                                    <td>
                                        <Link to={`/edit-room/${room.name}`} className="btn btn-info">Edit</Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(room.name)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No rooms available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Link to="/add" className="btn btn-primary">Add Room</Link>
                </div>
            </div>
        </div>
    );
};

export default Rooms;
