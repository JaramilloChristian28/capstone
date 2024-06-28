import React, { useState, useEffect } from 'react';
import Homepage from './homepage'; // Assuming Homepage component is correctly imported

export default function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editStudent, setEditStudent] = useState(null);
    const [deleteStudent, setDeleteStudent] = useState(null);
    const [newStudent, setNewStudent] = useState(null);
    const [strands, setStrands] = useState([]);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        fetchStudents();
        fetchStrands();
        fetchSections();
        
    }, []);

    const fetchStudents = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/students');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            let data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchStrands = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/strands');
            if (!response.ok) {
                throw new Error('Failed to fetch strands');
            }
            let data = await response.json();
            setStrands(data);
        } catch (error) {
            console.error('Error fetching strands:', error);
        }
    };

    const fetchSections = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/sections');
            if (!response.ok) {
                throw new Error('Failed to fetch sections');
            }
            let data = await response.json();
            setSections(data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const openViewStudent = (student) => {
        setSelectedStudent(student);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        setEditStudent(null);
        setDeleteStudent(null);
        setNewStudent(null);
    };

    const openEditStudent = (student) => {
        setEditStudent({ ...student });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditStudent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitEditedStudent = async (e) => {
        e.preventDefault();
        const { student_id, first_name, middle_name, last_name, suffix, email, phone_number, learner_reference_number, gender, birth_date, birth_place, address, nationality, strand_name, section_name } = editStudent;
    
        try {
            let response = await fetch(`http://127.0.0.1:8000/api/students/${student_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ first_name, middle_name, last_name, suffix, email, phone_number, learner_reference_number, gender, birth_date, birth_place, address, nationality, strand_name, section_name }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update student');
            }
    
            let updatedStudent = await response.json();
            setStudents(students.map(student => (student.student_id === student_id ? updatedStudent : student)));
            handleCloseModal();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };
    
    
    const openDeleteStudent = (student) => {
        setDeleteStudent(student);
    };

    const submitDeletedStudent = async (e) => {
        e.preventDefault();
        const { student_id } = deleteStudent;

        try {
            let response = await fetch(`http://127.0.0.1:8000/api/students/${student_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            setStudents(students.filter(student => student.student_id !== student_id));
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const openAddStudent = () => {
        setNewStudent({});
    };

    const handleNewStudentInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitNewStudent = async (e) => {
        e.preventDefault();
        const { first_name, middle_name, last_name, suffix, email, phone_number, learner_reference_number, gender, birth_date, birth_place, address, nationality, strand_name, section_name } = newStudent;
    
        try {
            let response = await fetch('http://127.0.0.1:8000/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ first_name, middle_name, last_name, suffix, email, phone_number, learner_reference_number, gender, birth_date, birth_place, address, nationality, strand_name, section_name }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add new student');
            }
    
            let addedStudent = await response.json();
            setStudents([...students, addedStudent]);
            handleCloseModal();
        } catch (error) {
            console.error('Error adding new student:', error);
        }
    };
    
    return (
        <div className="crud">
            <Homepage />
            <main className="crud-body">
                <button className="btn btn-primary mb-3" onClick={openAddStudent}>Add Student</button>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.first_name}</td>
                                <td>{student.middle_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone_number}</td>
                                <td>
                                    <button className="btn btn-success mr-2" onClick={() => openViewStudent(student)} type="button">
                                        View
                                    </button>
                                    <button className="btn btn-warning mr-2" onClick={() => openEditStudent(student)} type="button">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => openDeleteStudent(student)} type="button">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            {selectedStudent && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedStudent.first_name} {selectedStudent.last_name}</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Email: {selectedStudent.email}</p>
                                <p>Phone Number: {selectedStudent.phone_number}</p>
                                <p>Address: {selectedStudent.address}</p>
                                {/* Add more fields as necessary */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
         {editStudent && (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Student</h5>
                    <button type="button" className="close" onClick={handleCloseModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={submitEditedStudent}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="editFirstName">First Name</label>
                            <input type="text" className="form-control" id="editFirstName" name="first_name" value={editStudent.first_name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editMiddleName">Middle Name</label>
                            <input type="text" className="form-control" id="editMiddleName" name="middle_name" value={editStudent.middle_name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editLastName">Last Name</label>
                            <input type="text" className="form-control" id="editLastName" name="last_name" value={editStudent.last_name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editSuffix">Suffix</label>
                            <input type="text" className="form-control" id="editSuffix" name="suffix" value={editStudent.suffix} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editEmail">Email</label>
                            <input type="email" className="form-control" id="editEmail" name="email" value={editStudent.email} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editPhoneNumber">Phone Number</label>
                            <input type="text" className="form-control" id="editPhoneNumber" name="phone_number" value={editStudent.phone_number} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editLearnerReferenceNumber">Learner Reference Number</label>
                            <input type="text" className="form-control" id="editLearnerReferenceNumber" name="learner_reference_number" value={editStudent.learner_reference_number} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editGender">Gender</label>
                            <input type="text" className="form-control" id="editGender" name="gender" value={editStudent.gender} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editBirthDate">Birth Date</label>
                            <input type="date" className="form-control" id="editBirthDate" name="birth_date" value={editStudent.birth_date} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editBirthPlace">Birth Place</label>
                            <input type="text" className="form-control" id="editBirthPlace" name="birth_place" value={editStudent.birth_place} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editAddress">Address</label>
                            <input type="text" className="form-control" id="editAddress" name="address" value={editStudent.address} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editNationality">Nationality</label>
                            <input type="text" className="form-control" id="editNationality" name="nationality" value={editStudent.nationality} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editStrandName">Strand</label>
                            <select className="form-control" id="editStrandName" name="strand_name" value={editStudent.strand_name} onChange={handleInputChange}>
                               
                                {strands.map(strand => (
                                    <option key={strand.strand_id} value={strand.strand_name}>{strand.strand_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="editSectionName">Section</label>
                            <select className="form-control" id="editSectionName" name="section_name" value={editStudent.section_name} onChange={handleInputChange}>
                                {sections.map(section => (
                                    <option key={section.id} value={section.section_name}>{section.section_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}


            {deleteStudent && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete {deleteStudent.first_name} {deleteStudent.last_name}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={submitDeletedStudent}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
{newStudent && (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add New Student</h5>
                    <button type="button" className="close" onClick={handleCloseModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={submitNewStudent}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="newFirstName">First Name</label>
                            <input type="text" className="form-control" id="newFirstName" name="first_name" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newMiddleName">Middle Name</label>
                            <input type="text" className="form-control" id="newMiddleName" name="middle_name" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newLastName">Last Name</label>
                            <input type="text" className="form-control" id="newLastName" name="last_name" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newSuffix">Suffix</label>
                            <input type="text" className="form-control" id="newSuffix" name="suffix" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newEmail">Email</label>
                            <input type="email" className="form-control" id="newEmail" name="email" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPhoneNumber">Phone Number</label>
                            <input type="text" className="form-control" id="newPhoneNumber" name="phone_number" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newLearnerReferenceNumber">Learner Reference Number</label>
                            <input type="text" className="form-control" id="newLearnerReferenceNumber" name="learner_reference_number" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newGender">Gender</label>
                            <input type="text" className="form-control" id="newGender" name="gender" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newBirthDate">Birth Date</label>
                            <input type="date" className="form-control" id="newBirthDate" name="birth_date" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newBirthPlace">Birth Place</label>
                            <input type="text" className="form-control" id="newBirthPlace" name="birth_place" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newAddress">Address</label>
                            <input type="text" className="form-control" id="newAddress" name="address" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newNationality">Nationality</label>
                            <input type="text" className="form-control" id="newNationality" name="nationality" onChange={handleNewStudentInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newStrandName">Strand</label>
                            <select className="form-control" id="newStrandName" name="strand_name" onChange={handleNewStudentInputChange}>
                            <option value="">Select Strand</option>
                                {strands.map(strand => (
                                    <option key={strand.strand_id} value={strand.strand_name}>{strand.strand_name}</option>
                                ))}
                            </select>

                        </div>
                        <div className="form-group">
                            <label htmlFor="newSectionName">Section</label>
                            <select className="form-control" id="newSectionName" name="section_name" onChange={handleNewStudentInputChange}>
                            <option value="">Select Section</option>
                                {sections.map(section => (
                                    <option key={section.id} value={section.section_name}>{section.section_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}


        </div>
    );
}
