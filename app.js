const baseString = '// =============================================================================';
let maxLength = 80;
let maxCommentLength = 67;

const convertBtn = document.getElementById('convert-btn');
const clearBtn = document.getElementById('clear-btn');
const resultParagraph = document.getElementById('result');
const textArea = document.getElementById('entry-field');
const copyBtn = document.getElementById('copy-to-clipboard');

// =============================================================================

// =============================================================================
// ========================= Best comment in the world =========================
// =============================================================================
const mesureCommentLength = (text) => {
    return text.length;
}

// =============================================================================
// ==== Spliting the comment string into pieces , and generating an array o ====
// ================================= f strings =================================
const generateCommentArray = (commentLength, comment) => {

    const commentPieces = Math.ceil(commentLength / 62);
    let commentArr = [];

    if (comment) {
        for (let i = 0; i < commentPieces; i++) {

            if (comment.length >= maxCommentLength) {
                commentArr.push(comment.slice(0, maxCommentLength));
                comment = comment.slice(maxCommentLength);
            } else if (comment.length < maxCommentLength) {
                commentArr.push(comment);
            }
        }
    }

    return commentArr;
}

// =============================================================================
// ============= Generating a second array with converted strings  =============
// =============================================================================
const generateFinalCommentString = (commentArr) => {

    let finalcommentArr = [baseString];
    let symbolRepeat = "=";
    let leftSide;
    let rightSide;

    for (let commentLine of commentArr) {

        if (commentLine.length === maxCommentLength) {

            finalcommentArr.push('// ' + '====' + ' ' + commentLine + ' ' + '====');

        } else {

            let repeat;

            if (commentLine.length % 2 === 0) {
                repeat = (maxLength - commentLine.length - 6) / 2;
                rightSide = symbolRepeat.repeat(repeat + 1);

            } else {
                repeat = (maxLength - commentLine.length - 5) / 2;
                rightSide = symbolRepeat.repeat(repeat);
            }
            console.log(commentLine.length);
            console.log(commentLine);

            leftSide = symbolRepeat.repeat(repeat);

            finalcommentArr.push('// ' + leftSide + ' ' + commentLine + ' ' + rightSide);
        }
    }

    finalcommentArr.push(baseString);
    return finalcommentArr;
}

// =============================================================================
// ======== Generate a brand new comment string, ready to be displayed =========
// =============================================================================
const generateNewCommentString = (commentArr) => {
    let newString = '';
    for (let line of commentArr) {
        // newString += `<p>${line}<p>`;
        newString += '<br>' + line;
    }
    return newString;
}

// =============================================================================
// ============================ calling all methods ============================
// =============================================================================
const generateComment = (comment) => {
    const commentLength = mesureCommentLength(comment);
    const commentArray = generateCommentArray(commentLength, comment);
    const finalcommentArray = generateFinalCommentString(commentArray);
    return generateNewCommentString(finalcommentArray);
}

// =============================================================================

// =============================================================================
// ========================== Adding event listeners ===========================
// =============================================================================
convertBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const comment = textArea.value;
    const result = generateComment(comment);
    resultParagraph.innerHTML = result;
});

clearBtn.addEventListener('click', function (event) {
    event.preventDefault();
    textArea.value = '';
    resultParagraph.value = '';
});

copyBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const value = resultParagraph.value;

});

