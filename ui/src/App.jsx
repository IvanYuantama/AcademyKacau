import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router, Link, Routes, Route } from "react-router-dom";

function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    courses: "",
    photo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/addStudent", formData);
      onAddStudent(formData);
      setFormData({
        name: "",
        age: "",
        address: "",
        courses: "",
        photo: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="bg-slate-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-amber-200">Add Student</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="font-bold text-white">
            Name
          </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div>
          <label htmlFor="age" className="font-bold text-white">
            Age
          </label>
          <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div>
          <label htmlFor="address" className="font-bold text-white">
            Address
          </label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div>
          <label htmlFor="courses" className="font-bold text-white">
            Courses
          </label>
          <input type="text" id="courses" name="courses" value={formData.courses} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div>
          <label htmlFor="photo" className="font-bold text-white">
            Photo URL
          </label>
          <input type="text" id="photo" name="photo" value={formData.photo} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
}

function StudentFormUpdate({ student }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    courses: [],
    photo: "",
  });

  useEffect(() => {
    // Mengatur nilai awal form dengan data siswa yang akan diperbarui
    if (student) {
      setFormData({
        name: student.name,
        age: student.age,
        address: student.address,
        courses: student.courses,
        photo: student.photo,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/updateStudent/${student._id}`, formData);
      // Reset form setelah berhasil memperbarui siswa
      setFormData({
        name: "",
        age: "",
        address: "",
        courses: [],
        photo: "",
      });
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="bg-slate-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-amber-200">Update Student</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="font-bold text-white">
            Name
          </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div>
          <label htmlFor="age" className="font-bold text-white">
            Age
          </label>
          <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div>
          <label htmlFor="address" className="font-bold text-white">
            Address
          </label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div>
          <label htmlFor="courses" className="font-bold text-white">
            Courses
          </label>
          <input type="text" id="courses" name="courses" value={formData.courses} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div>
          <label htmlFor="photo" className="font-bold text-white">
            Photo URL
          </label>
          <input type="text" id="photo" name="photo" value={formData.photo} onChange={handleChange} className="form-input mt-1 block w-full rounded-md border-gray-300" required />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update Student
          </button>
        </div>
      </form>
    </div>
  );
}

function App() {
  const [students, setStudents] = useState([]);
  const [updatingStudent, setUpdatingStudent] = useState(null); // State untuk menyimpan data siswa yang akan diperbarui

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/getStudent");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddStudent = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getStudent");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deleteStudent/${id}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleUpdate = (id) => {
    // Menemukan siswa yang akan diperbarui berdasarkan ID
    const studentToUpdate = students.find((student) => student._id === id);
    // Menetapkan siswa yang akan diperbarui ke dalam state
    setUpdatingStudent(studentToUpdate);
  };

  return (
    <>
      <div className="bg-blue-950">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold pt-10 mb-4 text-indigo-500">Student of Academy Crypto</h1>
          <StudentForm />
          <StudentFormUpdate student={updatingStudent} /> {/* Mengirim data siswa yang akan diperbarui ke komponen StudentForm */}
          <div>
            <h2 className="text-xl font-bold mb-2 text-white">Student List:</h2>
            {students.map((student) => (
              <div key={student._id} className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-lg font-bold mb-2">Name: {student.name}</p>
                <p>
                  <span className="font-bold">Age:</span> {student.age}
                </p>
                <p>
                  <span className="font-bold">Address:</span> {student.address}
                </p>
                <p>
                  <span className="font-bold">Courses:</span> {student.courses.join(", ")}
                </p>
                <img src={student.photo} alt="Student Photo" className="w-32 h-32 mt-2 rounded-md" />
                <div className="flex mt-4">
                  <button onClick={() => handleUpdate(student._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                    Update
                  </button>
                  <button onClick={() => handleDelete(student._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
