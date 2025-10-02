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
import { useNavigate } from 'react-router-dom'
import { cartWithDetails } from '../../../utils/cartUtils';

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '90vh',
    width: '95vw',
    maxWidth: '800px',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
    overflow: 'auto',
};

const Cart: React.FC = () => {
    const { cartItems, addItem, removeItem, clearCart, isCartOpen, closeCart } = useCart();
    const { products } = useProducts();
    const navigate = useNavigate();

    const detailedCart = cartWithDetails(cartItems, products);

    return (
        <Modal open={isCartOpen} onClose={closeCart}>
            <Box sx={modalStyle}>
                {detailedCart.length === 0 ? (
                    <p>Seu carrinho está vazio.</p>
                ) : (
                    <div style={{ height: '100%', overflowY: 'auto' }}>
                        <h2 id="modal-carrinho-title" className="text-xl font-bold mb-4 text-center">Seu Carrinho</h2>
                        <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 'none' }}>
                            <Table aria-label="simple table" sx={{ minWidth: 0 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.75rem', md: '1rem' } }}>#</TableCell>
                                        <TableCell align="left" sx={{ display: { xs: 'none', md: 'table-cell' }, p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.75rem', md: '1rem' } }}>Foto</TableCell>
                                        <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>Produto</TableCell>
                                        <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>Qtd</TableCell>
                                        <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>Preço</TableCell>
                                        <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>Total</TableCell>
                                        <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailedCart.map((item, index) => (
                                        <TableRow
                                            key={item.productId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, p: { xs: 0.5, md: 2 } }} component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, p: { xs: 0.5, md: 2 } }}>
                                                <img
                                                    src={item.img}
                                                    alt={item.name}
                                                    style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row" sx={{ whiteSpace: 'normal', p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>{item.name}</TableCell>
                                            <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>{item.quantity}</TableCell>
                                            <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>{item.price}</TableCell>
                                            <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>{item.price ? item.price * item.quantity : '123'}</TableCell>
                                            <TableCell sx={{ p: { xs: 0.5, md: 2 } }}>
                                                <IconButton onClick={() => addItem(item.productId, 1)} color="primary" size="small">
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={() => addItem(item.productId, -1)} color="secondary" size="small">
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={() => removeItem(item.productId)} color="error" size="small">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full"
                            onClick={() => {
                                closeCart();
                                navigate('/checkout');
                            }}
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