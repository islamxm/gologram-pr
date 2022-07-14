const translateStatus = (item) => {
    switch(item) {
        case 'work':
            return 'работаю'
        case 'rest':
            return 'отдыхаю'
        case 'leave':
            return 'в отпуске'
        case 'traffic_jam':
            return 'в пробке'
        case 'driving_from_work':
            return 'еду с работы'
        case 'creation':
            return 'занимаюсь творчеством'
        default:
            return 'нет перевода'
    }
}

export default translateStatus;