function validateType(type) {
    return !(type === 'Midterm') && !(type === 'Final') && !(type === 'Quiz');
}

function validateQuestionType(questionType) {
    return !(questionType === 'Classic') && !(questionType === 'Test') && !(questionType === 'Classic + Test');
}

module.exports = { validateType, validateQuestionType };
