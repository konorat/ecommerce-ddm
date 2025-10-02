import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCart } from '../../../context/CartContext';
import { cartWithDetails } from '../../../utils/cartUtils';
import { useProducts } from '../../../context/ProductContext';

const ItemsInfo: React.FC = () => {

    const { cartItems } = useCart();
    const { products } = useProducts();
    const detailedCart = cartWithDetails(cartItems, products);

    return (

        <div className="bg-white rounded-xl shadow-lg p-8 w-full mx-auto">
            <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 'none' }}>
                <Table aria-label="checkout table" >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.75rem', md: '1rem' } }}>#</TableCell>
                            <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.75rem', md: '1rem' } }}>Foto</TableCell>
                            <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>Produto</TableCell>
                            <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>Qtd</TableCell>
                            <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>Preço</TableCell>
                            <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {detailedCart.map((item, index) => (
                            <TableRow key={item.productId}>
                                <TableCell sx={{ p: { xs: 0.5, md: 2 } }}>{index + 1}</TableCell>
                                <TableCell sx={{ p: { xs: 0.5, md: 2 } }}>
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' }, whiteSpace: 'normal' }}>{item.name}</TableCell>
                                <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>{item.quantity}</TableCell>
                                <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>{item.price}</TableCell>
                                <TableCell align="left" sx={{ p: { xs: 0.5, md: 2 }, fontSize: { xs: '0.85rem', md: '1rem' } }}>{item.price ? item.price * item.quantity : '123'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <tfoot>
                        <TableRow>
                            <TableCell colSpan={5} sx={{ py: 2, px: 4, fontWeight: 'bold', textAlign: 'right' }}>Total</TableCell>
                            <TableCell sx={{ py: 2, px: 4, fontWeight: 'bold' }}>
                                R$ {detailedCart.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0)}
                            </TableCell>
                        </TableRow>
                    </tfoot>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ItemsInfo;