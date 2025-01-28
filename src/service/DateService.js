const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
};

const getCurrentWeekAndYear = (weeksAgo = 0) => {
    const now = new Date();
    now.setDate(now.getDate() - weeksAgo * 7);

    const ano = now.getFullYear();
    const semana = getWeekNumber(now);

    return { semana, ano };
};

export { getCurrentWeekAndYear };
