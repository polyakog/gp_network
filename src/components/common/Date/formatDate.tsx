import React from "react";

const padTo2Digits = (num:number) => {
    return num.toString().padStart(2, '0');
}

function getMonthName(monthNumber:number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', { month: 'short' });
}

export const formatDate = (date: Date) => (
    [
        padTo2Digits(date.getDate()),
        getMonthName(date.getMonth() + 1),
        date.getFullYear(),

    ].join(' ') +
    ', ' +
    [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
    ].join(':')
)