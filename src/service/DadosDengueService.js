import axios from 'axios';
import { getCurrentWeekAndYear } from './DateService';

const ObtemDadosDengue = async () => {
    const { semana: semana1, ano: ano1 } = getCurrentWeekAndYear(1);
    const { semana: semana2, ano: ano2 } = getCurrentWeekAndYear(2);
    const { semana: semana3, ano: ano3 } = getCurrentWeekAndYear(3);

    const apiEndpoint1 = `https://localhost:44397/api/consulta_dados_dengue/semana?semana=${semana3}&ano=${ano3}`;
    const apiEndpoint2 = `https://localhost:44397/api/consulta_dados_dengue/semana?semana=${semana2}&ano=${ano2}`;
    const apiEndpoint3 = `https://localhost:44397/api/consulta_dados_dengue/semana?semana=${semana1}&ano=${ano1}`;

    try {
        const [response1, response2, response3] = await Promise.all([
            axios.get(apiEndpoint1),
            axios.get(apiEndpoint2),
            axios.get(apiEndpoint3)
        ]);

        const data1 = response1.data;
        const data2 = response2.data;
        const data3 = response3.data;

        const combinedData = [...data1, ...data2, ...data3];

        return combinedData;
    } catch (error) {
        console.error('Erro ao buscar dados da API', error);
        return [];
    }
};

export { ObtemDadosDengue };