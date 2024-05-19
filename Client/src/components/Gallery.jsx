import React, { useState } from 'react';
// mui
import { 
    Typography,
    Box,
    Stack,
} from "@mui/material";
// carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// components
import Title from './Title';
import Paragraph from './Paragraph';


const Gallery = ({ gym }) => {
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const imageData = gym.length > 0 ? gym[0].Images.split(',').slice(0, 7) : [];

    const renderSlides = imageData.map((image, index) => (
        <div key={index}>
            <img src={image} alt={`image${index}`} />
        </div>
    ));

    const handleChange = (index) => {
        setCurrentIndex(index);
    }

    return (
        <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            sx={{
                py: 8,
                px: 2,
                display: { xs: 'flex'},
            }}
        >
            <Box
                component='section'
                sx={{
                    paddingBottom: 3,
                }}
            >
                <Title 
                    text={'Plans and dimension'}
                    textAlign={'center'}
                />
                <Typography
                    variant='h5'
                    component='h4'
                    align='center'
                    sx={{
                        paddingTop: 1,
                    }}
                >
                    Rooms Gallery
                </Typography>
                <Paragraph 
                    text={
                        'We have more 5000 reviews and our\
                        customers trust on our quality product\
                        and trust own our product. If you interested,\
                        contact us.'
                    } 
                    maxWidth={'sm'}
                    mx={'auto'}
                    textAlign={'center'}
                />
            </Box>
            
            <Box sx={{ 
                maxWidth: 700,
                width: '100%',
            }}>
                <Carousel
                    centerSlidePercentage={40}
                    thumbWidth={200}
                    dynamicHeight={false}
                    centerMode={false}
                    showArrows={true}
                    autoPlay={true}
                    infiniteLoop={true}
                    selectedItem={currentIndex}
                    onChange={handleChange}
                    className="carousel-container"
                >
                    {renderSlides}
                </Carousel>
            </Box>
        </Stack>
    )
}

export default Gallery;
