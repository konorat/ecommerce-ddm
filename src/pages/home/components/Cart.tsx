import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useCart } from '../../../context/CartContext';
import { useProducts } from '../../../context/ProductContext';

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 500,
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const Cart: React.FC = () => {

    const { cartItems, addItem, removeItem, clearCart, isCartOpen, closeCart } = useCart();
    const { products } = useProducts();

    const cartWithDetails = cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { ...item, ...product };
    });

    return (
        <Modal open={isCartOpen} onClose={closeCart}>
            <Box sx={modalStyle}>
                {cartWithDetails.length === 0 ? (
                    <p>Seu carrinho está vazio.</p>
                ) : (
                    <div>
                        <h2 id="modal-carrinho-title" className="text-xl font-bold mb-4">Seu Carrinho</h2>


                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell align="left">Foto</TableCell>
                                        <TableCell align="left">Produto</TableCell>
                                        <TableCell align="left">Qtd</TableCell>
                                        <TableCell align="left">Preço</TableCell>
                                        <TableCell align="left">Total</TableCell>
                                        <TableCell align="left">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartWithDetails.map((item, index) => (
                                        <TableRow
                                            key={item.productId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={item.img}        // ou item.image dependendo do seu objeto
                                                    alt={item.nome}
                                                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">{item.nome}</TableCell>
                                            <TableCell align="left">{item.quantity}</TableCell>
                                            <TableCell align="left">{item.preco}</TableCell>
                                            <TableCell align="left">{item.preco ? item.preco * item.quantity : '123'}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => addItem(item.productId, 1)} color="primary">
                                                    <AddIcon />
                                                </IconButton>
                                                <IconButton onClick={() => addItem(item.productId, -1)} color="secondary">
                                                    <RemoveIcon />
                                                </IconButton>
                                                <IconButton onClick={() => removeItem(item.productId)} color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={() => alert('Checkout!')}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                )}
            </Box>
        </Modal>
    );
};
export default Cart;