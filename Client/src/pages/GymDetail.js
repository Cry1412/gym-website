import Content from '../components/Content';
import Gallery from '../components/Gallery';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GymDetail = () => {
    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái fetch
    const { gymName } = useParams();
    
    useEffect(() => {
      axios.get(`http://localhost:2000/gyms/${gymName}`)
        .then(response => {
          if (response.data && response.data.length > 0) {
            setGym(response.data); 
          } else {
            // Nếu response rỗng, set Gym là null
            setGym(null);
          }
          setLoading(false); // Dừng loading khi fetch hoàn thành
        })
        .catch(error => {
          console.error('Error fetching exercise data:', error);
          setLoading(false); // Dừng loading nếu có lỗi
        });
    }, []);

    // Kiểm tra nếu đang loading hoặc không có dữ liệu gym
    if (loading || !gym) {
        return (
            <p style={styles.errorMessage}>This facility is not currently available in our system</p>
        );
    }

    // Nếu có dữ liệu gym
    return (
        <>
            <Content gym={gym}/>
            <Gallery gym={gym}/>
        </>
    );
}

// Định dạng CSS bằng cách sử dụng JavaScript object
const styles = {
    errorMessage: {
        textAlign: 'center',
        fontSize: '24px', 
        marginTop: '30vh', 
        marginBottom: '15vh',
        //transform: 'translateY(-50%)', 
    }
};

export default GymDetail;
