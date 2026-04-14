function checkPlagiarism() {
    const inputText = document.getElementById("inputText").value.trim();

    if (inputText === "") {
        alert("Please enter text to check.");
        return;
    }

    // Sample database for comparison
    const database = [
        "Artificial intelligence is transforming the world by automating tasks and analyzing data at unprecedented speeds.",
        "AI technologies help drive innovation in various fields, making processes more efficient and effective.",
        "Ensuring originality and avoiding plagiarism are essential in academic and professional environments.",
        "Machine learning is a subset of artificial intelligence that enables systems to learn from data.",
        "Data science combines statistics, programming, and domain expertise to extract insights from data."
    ];

    let plagiarizedSentences = [];
    let highlightedText = inputText;

    const inputSentences = inputText.split(/[.?!]/).filter(s => s.trim() !== "");
    let matchCount = 0;

    inputSentences.forEach(sentence => {
        database.forEach(source => {
            let similarity = calculateSimilarity(sentence.toLowerCase(), source.toLowerCase());

            if (similarity > 0.6) {
                matchCount++;
                plagiarizedSentences.push(sentence.trim());
                highlightedText = highlightedText.replace(
                    sentence,
                    `<mark>${sentence}</mark>`
                );
            }
        });
    });

    let plagiarismPercent = Math.min(
        Math.round((matchCount / inputSentences.length) * 100),
        100
    );

    let uniquePercent = 100 - plagiarismPercent;

    // Update UI
    document.getElementById("similarityCircle").innerText = plagiarismPercent + "%";
    document.getElementById("uniquePercent").innerText = uniquePercent + "%";
    document.getElementById("plagiarizedPercent").innerText = plagiarismPercent + "%";
    document.getElementById("sourcesCount").innerText = matchCount;
    document.getElementById("highlightedText").innerHTML = highlightedText;

    updateCircle(plagiarismPercent);

    document.getElementById("resultText").innerText =
        plagiarismPercent > 0
            ? "Similarity Detected"
            : "No Similarity Detected";
}

// Calculate similarity using Jaccard Similarity
function calculateSimilarity(text1, text2) {
    const words1 = new Set(text1.split(/\s+/));
    const words2 = new Set(text2.split(/\s+/));

    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
}

// Update circular progress indicator
function updateCircle(percent) {
    const circle = document.getElementById("similarityCircle");
    circle.style.background =
        `conic-gradient(#e74c3c ${percent * 3.6}deg, #ecf0f1 ${percent * 3.6}deg)`;
}