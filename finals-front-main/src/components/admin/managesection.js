import React, { useState, useEffect } from 'react';
import Homepage from './homepage'; // Assuming Homepage component is correctly imported

export default function SectionManagement() {
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [editSection, setEditSection] = useState(null);
    const [deleteSection, setDeleteSection] = useState(null);
    const [newSection, setNewSection] = useState(null);

    useEffect(() => {
        fetchSections();
    }, []);

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
            // Handle error appropriately (e.g., show a message to the user)
        }
    };

    const openViewSection = (section) => {
        setSelectedSection(section);
    };

    const handleCloseModal = () => {
        setSelectedSection(null);
        setEditSection(null);
        setDeleteSection(null);
        setNewSection(null);
    };

    const openEditSection = (section) => {
        setEditSection({ ...section }); // Make a copy of the section object
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditSection((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitEditedSection = async (e) => {
        e.preventDefault();
        const { id, section_name, description, adviser } = editSection;
    
        // Check if section_name already exists locally
        const sectionExists = sections.some(section => section.section_name === section_name && section.id !== id);
        if (sectionExists) {
            alert('Section with this name already exists');
            return;
        }
    
        try {
            let response = await fetch(`http://127.0.0.1:8000/api/sections/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ section_name, description, adviser }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update section');
            }
    
            let updatedSection = await response.json();
            setSections(sections.map((section) => (section.id === id ? updatedSection : section)));
            handleCloseModal();
        } catch (error) {
            console.error('Error updating section:', error);
            // Handle error appropriately (e.g., show a message to the user)
        }
    };
    

    const openDeleteSection = (section) => {
        setDeleteSection(section);
    };

    const submitDeletedSection = async (e) => {
        e.preventDefault();
        const { id } = deleteSection;

        try {
            let response = await fetch(`http://127.0.0.1:8000/api/sections/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete section');
            }

            setSections(sections.filter((section) => section.id !== id));
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting section:', error);
            // Handle error appropriately (e.g., show a message to the user)
        }
    };

    const openAddSection = () => {
        setNewSection({});
    };

    const handleNewSectionInputChange = (e) => {
        const { name, value } = e.target;
        setNewSection((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitNewSection = async (e) => {
        e.preventDefault();
        const { section_name, description, adviser } = newSection;
    
        // Check if section_name already exists locally
        const sectionExists = sections.some(section => section.section_name === section_name);
        if (sectionExists) {
            alert('Section with this name already exists');
            return;
        }
    
        try {
            let response = await fetch('http://127.0.0.1:8000/api/sections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ section_name, description, adviser }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add new section');
            }
    
            let addedSection = await response.json();
            setSections([...sections, addedSection]);
            handleCloseModal();
        } catch (error) {
            console.error('Error adding new section:', error);
            // Handle error appropriately (e.g., show a message to the user)
        }
    };
    
    return (
        <div className="crud">
            <Homepage />
            <main className="crud-body">
                <button className="btn btn-primary mb-3" onClick={openAddSection}>
                    Add Section
                </button>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Adviser</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((section) => (
                            <tr key={section.id}>
                                <td>{section.id}</td>
                                <td>{section.section_name}</td>
                                <td>{section.description}</td>
                                <td>{section.adviser}</td>
                                <td>
                                    <button className="btn btn-success mr-2" onClick={() => openViewSection(section)} type="button">
                                        View
                                    </button>
                                    <button className="btn btn-warning mr-2" onClick={() => openEditSection(section)} type="button">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => openDeleteSection(section)} type="button">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            {selectedSection && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedSection.section_name}</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Description: {selectedSection.description}</p>
                                <p>Adviser: {selectedSection.adviser}</p>
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
            {editSection && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Section</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={submitEditedSection}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="editSectionName">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editSectionName"
                                            name="section_name"
                                            value={editSection.section_name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editSectionDescription">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="editSectionDescription"
                                            name="description"
                                            value={editSection.description}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editSectionAdviser">Adviser</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editSectionAdviser"
                                            name="adviser"
                                            value={editSection.adviser}
                                            onChange={handleInputChange}
                                        />
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
            {deleteSection && (
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
                                <p>Are you sure you want to delete {deleteSection.section_name}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={submitDeletedSection}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {newSection && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Section</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={submitNewSection}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="newSectionName">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="newSectionName"
                                            name="section_name"
                                            onChange={handleNewSectionInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newSectionDescription">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="newSectionDescription"
                                            name="description"
                                            onChange={handleNewSectionInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newSectionAdviser">Adviser</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="newSectionAdviser"
                                            name="adviser"
                                            onChange={handleNewSectionInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Section
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
