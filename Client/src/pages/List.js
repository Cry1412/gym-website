import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

const images = Array.from({ length: 20 }).map((_, index) => ({
  id: index + 1,
  url: 'https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Barbell-Bench-Press_0316b783-43b2-44f8-8a2b-b177a2cfcbfc_600x600.png?v=1612137800',
}));

const List = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={3} key={image.id}>
            <Card>
              <img src={image.url} alt="exercise" style={{ maxWidth: '100%', height: 'auto' }} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Bài tập thể thao
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default List;