const baseString = '// =============================================================================';
let maxLength = 80;
let maxcommentLength = 67;

const convertBtn = document.getElementById('convert-btn');
const clearBtn = document.getElementById('clear-btn');
const resultParagraph = document.getElementById('result');
const textArea = document.getElementById('entry-field');

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

            if (comment.length >= maxcommentLength) {
                commentArr.push(comment.slice(0, maxcommentLength));
                comment = comment.slice(maxcommentLength);
            } else if (comment.length < maxcommentLength) {
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

        if (commentLine.length === maxcommentLength) {

            finalcommentArr.push('// ' + '====' + ' ' + commentLine + ' ' + '====');
        } else {

            let repeat = Math.floor((maxLength - commentLine.length - 5) / 2);
            leftSide = symbolRepeat.repeat(repeat);          

            if (repeat % 2 == 0) {              
                rightSide = symbolRepeat.repeat(repeat);
            } else {              
                rightSide = symbolRepeat.repeat(repeat +1);
            }

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
    console.log(typeof result);
    resultParagraph.innerHTML = result;
});

convertBtn.addEventListener('click', function (event) {
    event.preventDefault();
    textArea.value = '';
    resultParagraph.value = '';
});