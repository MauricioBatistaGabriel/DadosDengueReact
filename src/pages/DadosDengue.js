import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ObtemDadosDengue } from '../service/DadosDengueService';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const DadosDengue = () => {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dados = await ObtemDadosDengue();
            setData(dados);
        };

        fetchData();
    }, []);

    const handleChartClick = (event) => {
        if (event && event.activePayload && event.activePayload.length) {
            setSelectedItem(event.activePayload[0].payload);
        }
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { casos, casos_est, nivel, se } = payload[0].payload;
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                    <p>Semana Epidemiológica: {se}</p>
                    <p>Casos: {casos}</p>
                    <p>Casos Estimados: {casos_est}</p>
                    <p>Nível de alerta: {nivel}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Layout>
            <Header style={{ textAlign: 'center', color: '#fff' }}>
                <Title level={2} style={{ color: '#fff' }}>Consulta Dados Dengue</Title>
            </Header>
            <Content style={{ padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LineChart 
                    width={600} 
                    height={300} 
                    data={data} 
                    onClick={handleChartClick}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="se" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="casos_est" stroke="#8884d8" />
                    <Line type="monotone" dataKey="casos" stroke="#82ca9d" />
                </LineChart>
                {selectedItem && (
                    <Card style={{ marginTop: '20px', width: 300 }}>
                        <p>Casos: {selectedItem.casos}</p>
                        <p>Casos Estimados: {selectedItem.casos_est}</p>
                        <p>Nível: {selectedItem.nivel}</p>
                        <p>Semana Epidemiológica: {selectedItem.se}</p>
                    </Card>
                )}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <Title level={5}>©2025 Dados Dengue</Title>
            </Footer>
        </Layout>
    );
}

export default DadosDengue;