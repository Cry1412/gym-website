import React from 'react'
import {  
    Grid, 
    Typography,
    IconButton,
    Card,
    CardContent,
} from "@mui/material";
// icons
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import WifiPasswordIcon from '@mui/icons-material/WifiPassword';
import SportsMmaOutlinedIcon from '@mui/icons-material/SportsMmaOutlined';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import SportsMartialArtsOutlinedIcon from '@mui/icons-material/SportsMartialArtsOutlined';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
// components
import Title from './Title'
import Paragraph from './Paragraph'

const serviceIcons = {
    Gym: <FitnessCenterOutlinedIcon fontSize="large" color="secondary" />,
    Yoga: <SelfImprovementOutlinedIcon fontSize="large" color="secondary" />,
    Boxing: <SportsMmaOutlinedIcon fontSize="large" color="secondary" />,
    "Swimming Pool": <PoolOutlinedIcon fontSize="large" color="secondary" />,
    Zumba: <EmojiPeopleOutlinedIcon fontSize="large" color="secondary" />,
};

const Content = ({ gym }) => {
    const { Name, Slogan, Address, Services } = gym[0];
    const availableServices = Services.split(',');
  return (    
        <Grid container spacing={0}   
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
            px: 2,
        }}
        >
            <Grid item xs={12} sm={12} md={5}
            component = 'section'
            >
                <Title
                text={
                    gym[0].Name
                }
                textAlign={'start'}
                />

                <Typography 
                variant='h6'
                component='h4' 
                sx = {{
                    fontWeight: '400',
                    paddingTop: 1,
                }}
                >
                    {gym[0].Slogan}
                </Typography>

                <Paragraph 
                text={
                    gym[0].Address
                }
                maxWidth = {'75%'}
                mx={0}
                textAlign={'start'}
                />
            </Grid>
            
            {/* Render cards for each service */}
            {availableServices.map(service => (
                <Grid key={service} item xs={12} sm={6} md={3}>
                    <Card square={true} sx={{
                        ':hover': {
                            boxShadow: 20, // theme.shadows[20]
                        },
                        minHeight: 200,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        border: '1px solid #ccc',
                    }}>
                        <CardContent>
                            {/* Render IconButton only if service icon is available */}
                            {serviceIcons[service] && (
                                <IconButton>
                                    {serviceIcons[service]}
                                </IconButton>
                            )}
                            <Typography variant="h5" component="p" sx={{
                                fontWeight: 700,
                                textTransform: 'capitalize',
                            }}>
                                {service}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    ); 
}

export default Content;