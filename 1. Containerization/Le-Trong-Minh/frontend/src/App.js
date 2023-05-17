import React, { useState, useEffect } from "react";
import axios from "axios";

import logo from "./assets/viettel.png";
import "./App.css";
import StudentModal from "./components/modal/StudentModal";
import { message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

function App() {
    const [students, setStudents] = useState();
    const [currentId, setCurrentId] = useState("");
    const [isOpen, setIsOpen] = useState();
    const [isEdit, setIsEdit] = useState(true);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if (reload) {
            axios
                .get("http://localhost:80/api/v1/students")
                .then((res) => {
                    setStudents(res.data.data[0]);
                })
                .then(() => {
                    setReload(false);
                });
        }
    }, [reload]);

    const deleteStudent = (id, name) => {
        axios
            .delete(`http://localhost:80/api/v1/students/${id}`)
            .then(() => {
                message.success(`Da xoa hoc sinh ${name}`);
                setReload(true);
            })
            .catch((err) => {
                message.error(JSON.stringify(err));
            });
    };

    return (
        <div className={`App ${isOpen ? "mask" : ""}`}>
            {/* <header className='header'>
                <div className='logo'>
                    <img src={logo} alt='Logo' />
                </div>
            </header> */}
            <div className='text-list'>
                Apprentices in Cloud Computing
            </div>
            <div className='table-container'>
                <table style={{ position: "relative" }}>
                    <div
                        style={{
                            position: "absolute",
                            top: "-5px",
                            right: 0,
                            transform: "translate(0,-100%)",
                            display: "flex",
                        }}
                    >
                        <UserAddOutlined
                            style={{ fontSize: "2rem", color: "#2986cc" }}
                            onClick={() => {
                                setCurrentId("");
                                setIsEdit(true);
                                setIsOpen(true);
                            }}
                        ></UserAddOutlined>
                    </div>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th className='name'>Name</th>
                            <th>Username</th>
                            {/* <th>Year</th>
                            <th>Gender</th>
                            <th>University</th>
                            <th>Major</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map((student) => (
                            <tr
                                key={student.id}
                                onClick={() => {
                                    setIsOpen(true);
                                    setIsEdit(false);
                                    setCurrentId(student.id);
                                }}
                            >
                                <td>{student.stt}</td>
                                <td>{student.name}</td>
                                <td>{student.username}</td>
                                {/* <td>{student.year_of_birth}</td>
                                <td>{student.gender}</td>
                                <td>{student.university}</td>
                                <td>{student.major}</td> */}
                                <td className='button-row'>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsOpen(true);
                                            setCurrentId(student.id);
                                            setIsEdit(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteStudent(
                                                student.id,
                                                student.name
                                            );
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <footer className='footer'>Copyright ©  2023</footer> */}

            <StudentModal
                id={currentId}
                isOpen={isOpen}
                isEdit={isEdit}
                onCancel={() => setIsOpen(false)}
                onSuccess={() => {
                    setReload(true);
                }}
            />
        </div>
    );
}

export default App;
