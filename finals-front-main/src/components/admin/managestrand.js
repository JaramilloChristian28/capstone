import React, { useState, useEffect } from 'react';
import Homepage from './homepage'; // Assuming Homepage component is correctly imported

export default function StrandManagement() {
    const [strands, setStrands] = useState([]);
    const [selectedStrand, setSelectedStrand] = useState(null);
    const [editStrand, setEditStrand] = useState(null);
    const [deleteStrand, setDeleteStrand] = useState(null);
    const [newStrand, setNewStrand] = useState(null);

    useEffect(() => {
        fetchStrands();
    }, []);

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
            // Handle error appropriately (e.g., show a message to the user)
        }
    };

    const openViewStrand = (strand) => {
        setSelectedStrand(strand);
    };

    const handleCloseModal = () => {
        setSelectedStrand(null);
        setEditStrand(null);
        setDeleteStrand(null);
        setNewStrand(null);
    };

    const openEditStrand = (strand) => {
        setEditStrand({ ...strand }); // Make a copy of the strand object
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditStrand((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitEditedStrand = async (e) => {
        e.preventDefault();
        const { strand_id, strand_name, description } = editStrand;

        try {
            let response = await fetch(`http://127.0.0.1:8000/api/strands/${strand_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ strand_name, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to update strand');
            }

            let updatedStrand = await response.json();
            setStrands(strands.map(strand => (strand.strand_id === strand_id ? updatedStrand : strand)));
            handleCloseModal();
        } catch (error) {
            console.error('Error updating strand:', error);
            // Handle error appropriately (e.g., show a message to the user)
        }
    };

    const openDeleteStrand = (strand) => {
        setDeleteStrand(strand);
    };

    const submitDeletedStrand = async (e) => {
        e.preventDefault();
        const { strand_id } = deleteStrand;

        try {
            let response = await fetch(`http://127.0.0.1:8000/api/strands/${strand_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete strand');
            }

            setStrands(strands.filter(strand => strand.strand_id !== strand_id));
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting strand:', error);
            // Handle error appropriately (e.g., show a message to the user)
        }
    };

    const openAddStrand = () => {
        setNewStrand({});
    };

    const handleNewStrandInputChange = (e) => {
        const { name, value } = e.target;
        setNewStrand((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitNewStrand = async (e) => {
        e.preventDefault();
        const { strand_name, description } = newStrand;

        try {
            let response = await fetch('http://127.0.0.1:8000/api/strands', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ strand_name, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to add new strand');
            }

            let addedStrand = await response.json();
            setStrands([...strands, addedStrand]);
            handleCloseModal();
        } catch (error) {
            console.error('Error adding new strand:', error);
            // Handle error appropriately (e.g., show a message to the user)
        }
    };

    return (
        <div className="crud">
            <Homepage />
            <main className="crud-body">
                <button className="btn btn-primary mb-3" onClick={openAddStrand}>Add Strand</button>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {strands.map((strand) => (
                            <tr key={strand.strand_id}>
                                <td>{strand.strand_id}</td>
                                <td>{strand.strand_name}</td>
                                <td>{strand.description}</td>
                                <td>
                                    <button className="btn btn-success mr-2" onClick={() => openViewStrand(strand)} type="button">
                                        View
                                    </button>
                                    <button className="btn btn-warning mr-2" onClick={() => openEditStrand(strand)} type="button">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => openDeleteStrand(strand)} type="button">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            {selectedStrand && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedStrand.strand_name}</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Description: {selectedStrand.description}</p>
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
            {editStrand && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Strand</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={submitEditedStrand}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="editStrandName">Name</label>
                                        <input type="text" className="form-control" id="editStrandName" name="strand_name" value={editStrand.strand_name} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editStrandDescription">Description</label>
                                        <textarea className="form-control" id="editStrandDescription" name="description" value={editStrand.description} onChange={handleInputChange}></textarea>
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
            {deleteStrand && (
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
                                <p>Are you sure you want to delete {deleteStrand.strand_name}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={submitDeletedStrand}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {newStrand && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Strand</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={submitNewStrand}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="newStrandName">Name</label>
                                        <input type="text" className="form-control" id="newStrandName" name="strand_name" onChange={handleNewStrandInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newStrandDescription">Description</label>
                                        <textarea className="form-control" id="newStrandDescription" name="description" onChange={handleNewStrandInputChange}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Strand
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
