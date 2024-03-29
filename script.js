const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('quote-author');
const quoteText = document.getElementById('quote');
const newQuoteBtn = document.getElementById('new-quote-btn');
const twitterBtn = document.getElementById('twitter-btn');
const loader = document.getElementById('loader')

let apiQuotes = [];

function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author || 'Unknown';
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    }
    else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        newQuote();
    } catch (error) {
        console.log(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

function hideLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
};

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

window.addEventListener('DOMContentLoaded', getQuotes)