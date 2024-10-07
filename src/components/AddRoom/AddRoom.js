import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const AddRoom = ({ onRoomAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        locationDescription: '',
        equipmentDescription: '',
        capacity: '',
        type: '',
    });

    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const fetchRoomTypes = async () => {
        try {
            const response = await axios.get('https://roommanagement-d503.onrender.com/api/rooms/room-types');
            setRoomTypes(response.data);
        } catch (error) {
            console.error('Error fetching room types:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        setFormData({
            name: '',
            locationDescription: '',
            equipmentDescription: '',
            capacity: '',
            type: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await axios.post('https://roommanagement-d503.onrender.com/api/rooms/add', formData);
                alert('Room added successfully!');
                resetForm();

        } catch (error) {
            console.error('Error during room addition:', error);
            alert('Error adding room. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Room Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="locationDescription">Location Description:</label>
                <input
                    type="text"
                    id="locationDescription"
                    name="locationDescription"
                    value={formData.locationDescription}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="equipmentDescription">Equipment Description:</label>
                <input
                    type="text"
                    id="equipmentDescription"
                    name="equipmentDescription"
                    value={formData.equipmentDescription}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="capacity">Capacity:</label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Room Type</option>
                    {roomTypes.map(roomType => (
                        <option key={roomType} value={roomType}>{roomType}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Add Room</button>
            <button style={{ textDecoration: 'none', color: 'black' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home page</Link>
            </button>
        </form>
    );
};

export default AddRoom;
