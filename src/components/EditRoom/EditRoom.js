import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../custom-axios/axios';

const EditRoom = () => {
    const { roomName } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        locationDescription: '',
        equipmentDescription: '',
        capacity: '',
        type: '',
    });

    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(`/api/rooms/${roomName}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching room details:', error);
                alert('Error fetching room details. Please try again later.');
            }
        };

        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get('/api/rooms/room-types');
                setRoomTypes(response.data);
            } catch (error) {
                console.error('Error fetching room types:', error);
                alert('Error fetching room types. Please try again later.');
            }
        };

        fetchRoomDetails();
        fetchRoomTypes();
    }, [roomName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/rooms/edit/${roomName}`, formData);
            alert('Room updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating room:', error);
            alert('Error updating room. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Edit Room</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="locationDescription" className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="locationDescription"
                        name="locationDescription"
                        value={formData.locationDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="equipmentDescription" className="form-label">Equipment</label>
                    <input
                        type="text"
                        className="form-control"
                        id="equipmentDescription"
                        name="equipmentDescription"
                        value={formData.equipmentDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Room Type</label>
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
                <button type="submit" className="btn btn-primary">Update Room</button>
            </form>
        </div>
    );
};

export default EditRoom;

