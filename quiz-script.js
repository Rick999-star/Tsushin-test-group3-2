function initializeQuiz(quizData) {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result');

    // クイズのHTMLを生成
    quizData.forEach((item, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.id = `question-${index}`;

        const questionText = document.createElement('p');
        questionText.className = 'question';
        questionText.textContent = item.question;
        questionBlock.appendChild(questionText);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        item.options.forEach(option => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${index}`;
            radio.value = option;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(` ${option}`));
            optionsDiv.appendChild(label);
        });
        questionBlock.appendChild(optionsDiv);

        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'explanation';
        explanationDiv.innerHTML = `<strong>解説:</strong> ${item.explanation}`;
        questionBlock.appendChild(explanationDiv);

        quizContainer.appendChild(questionBlock);
    });

    // ボタンのクリックイベント
    submitButton.addEventListener('click', () => {
        let score = 0;
        quizData.forEach((item, index) => {
            const questionBlock = document.getElementById(`question-${index}`);
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            const explanation = questionBlock.querySelector('.explanation');

            questionBlock.classList.remove('correct', 'incorrect');

            if (selectedOption) {
                if (selectedOption.value === item.answer) {
                    score++;
                    questionBlock.classList.add('correct');
                } else {
                    questionBlock.classList.add('incorrect');
                }
            } else {
                questionBlock.classList.add('incorrect'); // 未解答は不正解扱い
            }
            explanation.style.display = 'block';
        });

        resultContainer.innerHTML = `あなたのスコア: ${score} / ${quizData.length}`;
        resultContainer.className = (score / quizData.length) >= 0.8 ? 'result-correct' : 'result-incorrect';
        window.scrollTo(0, 0); // ページトップにスクロール
    });
}