import React from "react";
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import {AddShoppingCart } from '@mui/icons-material';
import useStyles from './styles'

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia  className={classes.media} image={product.image.url} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent} >
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        {product.price.formatted_with_symbol}
                    </Typography>
                    <Typography dangerouslySetInnerHTML={{__html: product.description}} variant='body2' gutterBottom/>
                </div>
            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label={'Add to Card'} onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product;