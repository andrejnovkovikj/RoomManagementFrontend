import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomService from "../repository/roomRepository";
import Rooms from "../Rooms/Rooms";
import EditRoom from "../EditRoom/EditRoom";
import AddRoom from "../AddRoom/AddRoom";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        };
    }

    setRooms = (rooms) => {
        this.setState({ rooms });
    }

    render() {
        return (
            <Router>
                <main className={"container"}>
                    <Routes>
                        <Route path="/" element={<Rooms rooms={this.state.rooms} setRooms={this.setRooms} />} />
                        <Route path="/edit-room/:roomName" element={<EditRoom />} />
                        <Route path="/add" element={<AddRoom />} />

                    </Routes>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadRooms();
    }

    loadRooms = () => {
        RoomService.fetchRooms()
            .then((data) => {
                this.setState({
                    rooms: data.data
                });
            })
            .catch(error => {
                console.error("Failed to load rooms:", error);
            });
    }
}

export default App;
