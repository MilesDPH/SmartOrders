// NewOrders.tsx
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    Grid,
    Button,
    Fab,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";

import { useMenuitems } from "./NewOrders/hooks/useMenuItem";
import { useCart } from "./NewOrders/hooks/useCart";

export default function NewOrders() {
    const { menuItems, loading } = useMenuitems();
    const { cart, addCart, removeCart, total } = useCart();

    /* UI state solo para mostrar/ocultar el Drawer */
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen((o) => !o);

    return (
        <Container sx={{ mt: 5, position: "relative" }}>
            {/* Loader simple */}
            {loading && <Typography>Cargando wea…</Typography>}

            {/* GRID DE PRODUCTOS */}
            <Grid container spacing={2}>
                {menuItems.data.map((menu_item) => (
                    <Grid item xs={12} sm={6} md={4} key={menu_item.id}>
                        <Card>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="h6">{menu_item.name}</Typography>
                                <Typography variant="body2">${menu_item.price}</Typography>

                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => addCart(menu_item, 1)}
                                >
                                    Agregar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* FAB con badge */}
            <Fab
                color="primary"
                sx={{ position: "fixed", bottom: 24, right: 24 }}
                onClick={toggleDrawer}
            >
                <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </Fab>

            {/* Drawer del carrito */}
            <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                <Box sx={{ width: 320, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Carrito
                    </Typography>
                    <Divider />

                    <List>
                        {cart.length === 0 && (
                            <ListItem>
                                <ListItemText primary="Vacío 🙃" />
                            </ListItem>
                        )}

                        {cart.map((c) => (
                            <ListItem
                                key={c.id}
                                secondaryAction={
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => removeCart(c)}
                                    >
                                        Quitar
                                    </Button>
                                }
                            >
                                <ListItemText
                                    primary={`${c.name} x${c.quantity}`}
                                    secondary={`$${c.price * c.quantity}`}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle1" textAlign="right">
                        Total: ${total}
                    </Typography>
                </Box>
            </Drawer>
        </Container>
    );
}
