const validTypes = ['Midterm', 'Final', 'Quiz'];
const validQuestionTypes = ['Classic', 'Test', 'Classic + Test'];

function validateType(type) {
    return !validTypes.includes(type);
}

function validateQuestionType(questionType) {
    return !validQuestionTypes.includes(questionType);
}

module.exports = { validateType, validateQuestionType };
