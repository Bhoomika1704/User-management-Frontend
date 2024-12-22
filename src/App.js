import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  ]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: "", email: "" });
  const [search, setSearch] = useState("");

  const handleOpen = (user = { id: null, name: "", email: "" }) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (currentUser.id) {
      setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
    } else {
      setUsers([...users, { ...currentUser, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => setUsers(users.filter(user => user.id !== id));

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            User Management
          </Typography>
          <Button color="inherit" onClick={() => handleOpen()}>
            Add User
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "20px" }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpen(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(user.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser.id ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={currentUser.name}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={currentUser.email}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
